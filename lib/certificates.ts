import "server-only";
import { adminDb, adminAuth } from "@/lib/firebaseAdmin";

const COLLECTION = "certificates";

export type CertificateStatus = "verified" | "expired" | "revoked";

/** Full record as stored in Firestore. `studentId` is INTERNAL ONLY —
 *  it must never be included in a public API response. */
export type CertificateRecord = {
  certificateId: string;
  studentId: string;
  studentName: string;
  courseName: string;
  issueDate: string; // "YYYY-MM-DD"
  validUntil: string; // "YYYY-MM-DD"
  grade: string;
  issuedBy: string;
  revoked?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

/** Safe shape returned to the public verification page — no internal Student ID. */
export type PublicCertificate = Omit<CertificateRecord, "studentId" | "revoked"> & {
  status: CertificateStatus;
};

const DEFAULT_ISSUER = "MIHN – Multiverse Institute of Health & Nutrition";

function computeStatus(record: CertificateRecord): CertificateStatus {
  if (record.revoked) return "revoked";
  const today = new Date().toISOString().slice(0, 10);
  return today > record.validUntil ? "expired" : "verified";
}

function toPublic(record: CertificateRecord): PublicCertificate {
  const rest: Omit<CertificateRecord, "studentId" | "revoked"> = {
    certificateId: record.certificateId,
    studentName: record.studentName,
    courseName: record.courseName,
    issueDate: record.issueDate,
    validUntil: record.validUntil,
    grade: record.grade,
    issuedBy: record.issuedBy,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
  return { ...rest, status: computeStatus(record) };
}

/** Public lookup used by the verification page. Returns null if not found. */
export async function getPublicCertificate(
  certificateId: string
): Promise<PublicCertificate | null> {
  const id = certificateId.trim().toUpperCase();
  if (!id) return null;
  const snap = await adminDb().collection(COLLECTION).doc(id).get();
  if (!snap.exists) return null;
  return toPublic(snap.data() as CertificateRecord);
}

/** Internal (admin) lookup — includes the Student ID. */
export async function getCertificateAdmin(
  certificateId: string
): Promise<CertificateRecord | null> {
  const id = certificateId.trim().toUpperCase();
  const snap = await adminDb().collection(COLLECTION).doc(id).get();
  if (!snap.exists) return null;
  return snap.data() as CertificateRecord;
}

export async function listCertificates(): Promise<CertificateRecord[]> {
  const snap = await adminDb()
    .collection(COLLECTION)
    .orderBy("createdAt", "desc")
    .get();
  return snap.docs.map((d) => d.data() as CertificateRecord);
}

/** All certificates belonging to one internal Student ID (admin-only view). */
export async function listCertificatesForStudent(
  studentId: string
): Promise<CertificateRecord[]> {
  const snap = await adminDb()
    .collection(COLLECTION)
    .where("studentId", "==", studentId.trim().toUpperCase())
    .get();
  return snap.docs.map((d) => d.data() as CertificateRecord);
}

export type CertificateInput = {
  certificateId: string;
  studentId: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  validUntil: string;
  grade: string;
  issuedBy?: string;
};

export async function createCertificate(input: CertificateInput) {
  const id = input.certificateId.trim().toUpperCase();
  const ref = adminDb().collection(COLLECTION).doc(id);
  const existing = await ref.get();
  if (existing.exists) {
    throw new Error(`Certificate ID "${id}" already exists.`);
  }
  const now = new Date().toISOString();
  const record: CertificateRecord = {
    certificateId: id,
    studentId: input.studentId.trim().toUpperCase(),
    studentName: input.studentName.trim(),
    courseName: input.courseName.trim(),
    issueDate: input.issueDate,
    validUntil: input.validUntil,
    grade: input.grade.trim(),
    issuedBy: input.issuedBy?.trim() || DEFAULT_ISSUER,
    revoked: false,
    createdAt: now,
    updatedAt: now,
  };
  await ref.set(record);
  return record;
}

export async function updateCertificate(
  certificateId: string,
  input: Partial<CertificateInput> & { revoked?: boolean }
) {
  const id = certificateId.trim().toUpperCase();
  const ref = adminDb().collection(COLLECTION).doc(id);
  const existing = await ref.get();
  if (!existing.exists) {
    throw new Error(`Certificate ID "${id}" was not found.`);
  }
  const updates: Record<string, unknown> = { updatedAt: new Date().toISOString() };
  if (input.studentId) updates.studentId = input.studentId.trim().toUpperCase();
  if (input.studentName) updates.studentName = input.studentName.trim();
  if (input.courseName) updates.courseName = input.courseName.trim();
  if (input.issueDate) updates.issueDate = input.issueDate;
  if (input.validUntil) updates.validUntil = input.validUntil;
  if (input.grade) updates.grade = input.grade.trim();
  if (input.issuedBy) updates.issuedBy = input.issuedBy.trim();
  if (typeof input.revoked === "boolean") updates.revoked = input.revoked;
  await ref.update(updates);
  const updated = await ref.get();
  return updated.data() as CertificateRecord;
}

export async function deleteCertificate(certificateId: string) {
  const id = certificateId.trim().toUpperCase();
  await adminDb().collection(COLLECTION).doc(id).delete();
}

/**
 * Verifies a Firebase Auth ID token from the Authorization header and checks
 * it belongs to an allow-listed admin email. Set ADMIN_EMAILS as a comma
 * separated list in your environment (see .env.example).
 */
export async function requireAdmin(request: Request): Promise<{ email: string }> {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    throw Object.assign(new Error("Missing Authorization header."), { status: 401 });
  }

  let decoded;
  try {
    decoded = await adminAuth().verifyIdToken(token);
  } catch {
    throw Object.assign(new Error("Invalid or expired session. Please sign in again."), {
      status: 401,
    });
  }

  const email = decoded.email?.toLowerCase();
  const allowList = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!email || !allowList.includes(email)) {
    throw Object.assign(new Error("This account is not authorized for admin access."), {
      status: 403,
    });
  }

  return { email };
}
