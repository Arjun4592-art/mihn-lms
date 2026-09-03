import 'server-only'
import { adminDb, adminAuth } from '@/lib/firebaseAdmin'

const COLLECTION = 'certificates'

/** Manually controlled status, set by the Admin. "Expired" is derived, never
 *  stored as a manual choice. */
export type ManualStatus = 'valid' | 'revoked' | 'pending'

/** Status shown to everyone (admin + public), after applying auto-expiry. */
export type CertificateStatus = 'valid' | 'expired' | 'revoked' | 'pending'

export type ValidityOption = 'lifetime' | '2years' | '5years' | 'custom'

/** Full record as stored in Firestore.
 *  NOTE: Certificate ID has NO fixed format/prefix/pattern — it is fully
 *  Admin controlled. The system only guarantees uniqueness. */
export type CertificateRecord = {
  certificateId: string
  credential: string // course/credential title — free text, not a fixed list
  learnerName: string
  issuedOn: string // "YYYY-MM-DD"
  validity: ValidityOption
  validUntil?: string // "YYYY-MM-DD" — required for 2years/5years/custom, absent for lifetime
  status: ManualStatus // admin-controlled base status
  issuedBy: string
  createdAt?: string
  updatedAt?: string
}

/** Safe shape returned to the public verification page.
 *  Deliberately excludes anything not in the approved public result:
 *  phone, email, DOB, address, city, payment, marks/grade, internal IDs,
 *  photo, or certificate file/PDF. */
export type PublicCertificate = {
  certificateId: string
  credential: string
  learnerName: string
  issuedOn: string
  validity: ValidityOption
  validUntil?: string
  status: CertificateStatus
  issuedBy: string
}

const DEFAULT_ISSUER = 'MIHN – Multiverse Institute of Health & Nutrition'

/** Applies auto-expiry on top of the Admin's manually set status.
 *  Revoked and Pending are always Admin-controlled and never overridden
 *  here. Only a "valid" record can automatically flip to "expired" once
 *  its Valid Until date has passed. Lifetime credentials never expire. */
function computeStatus(record: CertificateRecord): CertificateStatus {
  if (record.status === 'revoked') return 'revoked'
  if (record.status === 'pending') return 'pending'
  if (record.validity !== 'lifetime' && record.validUntil) {
    const today = new Date().toISOString().slice(0, 10)
    if (today > record.validUntil) return 'expired'
  }
  return 'valid'
}

function toPublic(record: CertificateRecord): PublicCertificate {
  return {
    certificateId: record.certificateId,
    credential: record.credential,
    learnerName: record.learnerName,
    issuedOn: record.issuedOn,
    validity: record.validity,
    validUntil: record.validity === 'lifetime' ? undefined : record.validUntil,
    issuedBy: record.issuedBy,
    status: computeStatus(record),
  }
}

/**
 * Certificate ID is stored and matched EXACTLY as the Admin entered it.
 * No forced casing, no forced prefix, no forced pattern — the system's
 * only job is to keep IDs unique and to match them precisely on lookup.
 */
function normalizeId(certificateId: string): string {
  return certificateId.trim()
}

/**
 * Firestore document IDs cannot contain "/" (it's read as a sub-path) and
 * a few other characters cause issues. Since the Admin must be free to use
 * ANY Certificate ID format — including ones with slashes, e.g.
 * "MIHN/2026/EFC/001" — we URL-encode the id only for the Firestore path.
 * The real, exact certificateId (as typed by the Admin) is always stored
 * as a field on the document and is what's shown/matched everywhere else.
 */
function docId(certificateId: string): string {
  return encodeURIComponent(certificateId)
}

/** Public lookup used by the verification page. Returns null if not found. */
export async function getPublicCertificate(
  certificateId: string,
): Promise<PublicCertificate | null> {
  const id = normalizeId(certificateId)
  if (!id) return null
  const snap = await adminDb().collection(COLLECTION).doc(docId(id)).get()
  if (!snap.exists) return null
  return toPublic(snap.data() as CertificateRecord)
}

/** Internal (admin) lookup. */
export async function getCertificateAdmin(
  certificateId: string,
): Promise<CertificateRecord | null> {
  const id = normalizeId(certificateId)
  const snap = await adminDb().collection(COLLECTION).doc(docId(id)).get()
  if (!snap.exists) return null
  return snap.data() as CertificateRecord
}

export async function listCertificates(): Promise<CertificateRecord[]> {
  const snap = await adminDb()
    .collection(COLLECTION)
    .orderBy('createdAt', 'desc')
    .get()
  return snap.docs.map((d) => d.data() as CertificateRecord)
}

export type CertificateInput = {
  certificateId: string
  credential: string
  learnerName: string
  issuedOn: string
  validity: ValidityOption
  validUntil?: string
  status?: ManualStatus
  issuedBy?: string
}

function computeValidUntil(
  input: Pick<CertificateInput, 'issuedOn' | 'validity' | 'validUntil'>,
): string | undefined {
  if (input.validity === 'lifetime') return undefined
  if (input.validity === 'custom') return input.validUntil

  // 2years / 5years — derive automatically from Issued On so the Admin
  // doesn't have to compute the date by hand, unless one was supplied.
  if (input.validUntil) return input.validUntil
  const years = input.validity === '2years' ? 2 : 5
  const issued = new Date(`${input.issuedOn}T00:00:00`)
  if (Number.isNaN(issued.getTime())) return undefined
  issued.setFullYear(issued.getFullYear() + years)
  return issued.toISOString().slice(0, 10)
}

export async function createCertificate(input: CertificateInput) {
  const id = normalizeId(input.certificateId)
  if (!id) {
    throw Object.assign(new Error('Certificate ID is required.'), {
      status: 422,
    })
  }
  const ref = adminDb().collection(COLLECTION).doc(docId(id))
  const existing = await ref.get()
  if (existing.exists) {
    throw Object.assign(new Error(`Certificate ID "${id}" already exists.`), {
      status: 409,
    })
  }
  if (input.validity === 'custom' && !input.validUntil) {
    throw Object.assign(
      new Error('"Valid Until" is required when Validity is Custom.'),
      {
        status: 422,
      },
    )
  }
  const now = new Date().toISOString()
  const validUntil = computeValidUntil(input)
  const record: CertificateRecord = {
    certificateId: id,
    credential: input.credential.trim(),
    learnerName: input.learnerName.trim(),
    issuedOn: input.issuedOn,
    validity: input.validity,
    ...(validUntil ? { validUntil } : {}),
    status: input.status ?? 'valid',
    issuedBy: input.issuedBy?.trim() || DEFAULT_ISSUER,
    createdAt: now,
    updatedAt: now,
  }
  // Firestore's `.set()` rejects `undefined` values outright (unlike
  // `.update()`), so validUntil is only included above when it exists —
  // e.g. Lifetime certificates simply have no validUntil field at all.
  await ref.set(record)
  return record
}

export async function updateCertificate(
  certificateId: string,
  input: Partial<CertificateInput>,
) {
  const id = normalizeId(certificateId)
  const ref = adminDb().collection(COLLECTION).doc(docId(id))
  const existing = await ref.get()
  if (!existing.exists) {
    throw Object.assign(new Error(`Certificate ID "${id}" was not found.`), {
      status: 404,
    })
  }
  const current = existing.data() as CertificateRecord

  const merged: CertificateRecord = {
    ...current,
    credential:
      input.credential !== undefined
        ? input.credential.trim()
        : current.credential,
    learnerName:
      input.learnerName !== undefined
        ? input.learnerName.trim()
        : current.learnerName,
    issuedOn: input.issuedOn ?? current.issuedOn,
    validity: input.validity ?? current.validity,
    validUntil: input.validUntil ?? current.validUntil,
    status: input.status ?? current.status,
    issuedBy:
      input.issuedBy !== undefined ? input.issuedBy.trim() : current.issuedBy,
  }

  if (merged.validity === 'custom' && !merged.validUntil) {
    throw Object.assign(
      new Error('"Valid Until" is required when Validity is Custom.'),
      {
        status: 422,
      },
    )
  }
  merged.validUntil = computeValidUntil(merged)

  const updates: Record<string, unknown> = {
    credential: merged.credential,
    learnerName: merged.learnerName,
    issuedOn: merged.issuedOn,
    validity: merged.validity,
    status: merged.status,
    issuedBy: merged.issuedBy,
    updatedAt: new Date().toISOString(),
  }
  // Firestore rejects `undefined` — only write validUntil when present,
  // and explicitly clear it for lifetime credentials.
  if (merged.validity === 'lifetime') {
    updates.validUntil = null
  } else if (merged.validUntil) {
    updates.validUntil = merged.validUntil
  }

  await ref.update(updates)
  const updated = await ref.get()
  return updated.data() as CertificateRecord
}

export async function deleteCertificate(certificateId: string) {
  const id = normalizeId(certificateId)
  await adminDb().collection(COLLECTION).doc(docId(id)).delete()
}

/**
 * Verifies a Firebase Auth ID token from the Authorization header and checks
 * it belongs to an allow-listed admin email. Set ADMIN_EMAILS as a comma
 * separated list in your environment (see .env.example).
 */
export async function requireAdmin(
  request: Request,
): Promise<{ email: string }> {
  const authHeader = request.headers.get('authorization') || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) {
    throw Object.assign(new Error('Missing Authorization header.'), {
      status: 401,
    })
  }

  let decoded
  try {
    decoded = await adminAuth().verifyIdToken(token)
  } catch {
    throw Object.assign(
      new Error('Invalid or expired session. Please sign in again.'),
      {
        status: 401,
      },
    )
  }

  const email = decoded.email?.toLowerCase()
  const allowList = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  if (!email || !allowList.includes(email)) {
    throw Object.assign(
      new Error('This account is not authorized for admin access.'),
      {
        status: 403,
      },
    )
  }

  return { email }
}
