/**
 * One-time / repeatable seed script — loads a few example certificates so
 * you can test verification immediately after setup.
 *
 * Usage:
 *   npx tsx scripts/seed.ts
 *
 * Requires the same FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL /
 * FIREBASE_PRIVATE_KEY env vars as the app (see .env.example). Loads them
 * from .env.local automatically.
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID!;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL!;
const privateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.error("Missing Firebase Admin env vars. Check .env.local against .env.example.");
  process.exit(1);
}

const app = initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
const db = getFirestore(app);

const ISSUER = "MIHN – Multiverse Institute of Health & Nutrition";

const SAMPLE_CERTIFICATES = [
  {
    certificateId: "EFC-000127",
    studentId: "MIHN0001",
    studentName: "Rahul Sharma",
    courseName: "Elite Fitness Coach Certification",
    issueDate: "2026-08-12",
    validUntil: "2027-08-12",
    grade: "Distinction",
    issuedBy: ISSUER,
  },
  {
    certificateId: "HPHN-000018",
    studentId: "MIHN0001",
    studentName: "Rahul Sharma",
    courseName: "Human Performance & Health Nutritionist",
    issueDate: "2025-03-04",
    validUntil: "2026-03-04",
    grade: "First Class",
    issuedBy: ISSUER,
  },
  {
    certificateId: "MSS-000009",
    studentId: "MIHN0001",
    studentName: "Rahul Sharma",
    courseName: "Master Sports Supplement Specialist",
    issueDate: "2024-11-20",
    validUntil: "2025-11-20",
    grade: "Distinction",
    issuedBy: ISSUER,
  },
  {
    certificateId: "MPC-000041",
    studentId: "MIHN0002",
    studentName: "Ananya Verma",
    courseName: "Master Personal Coach",
    issueDate: "2026-01-15",
    validUntil: "2027-01-15",
    grade: "Distinction",
    issuedBy: ISSUER,
  },
];

async function main() {
  const now = new Date().toISOString();
  for (const cert of SAMPLE_CERTIFICATES) {
    await db
      .collection("certificates")
      .doc(cert.certificateId)
      .set({ ...cert, revoked: false, createdAt: now, updatedAt: now });
    console.log(`Seeded ${cert.certificateId} — ${cert.studentName}`);
  }
  console.log("\nDone. Try verifying EFC-000127, HPHN-000018 (expired), or MSS-000009 (expired).");
}

main().then(() => process.exit(0));
