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
import { config } from 'dotenv'
config({ path: '.env.local' })

import { cert, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const projectId = process.env.FIREBASE_PROJECT_ID!
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL!
const privateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n')

if (!projectId || !clientEmail || !privateKey) {
  console.error(
    'Missing Firebase Admin env vars. Check .env.local against .env.example.',
  )
  process.exit(1)
}

const app = initializeApp({
  credential: cert({ projectId, clientEmail, privateKey }),
})
const db = getFirestore(app)

const ISSUER = 'MIHN – Multiverse Institute of Health & Nutrition'

// Certificate IDs below are just examples — the Admin can use any format,
// and different certificates can use completely different formats.
const SAMPLE_CERTIFICATES = [
  {
    certificateId: 'EFC-001',
    credential: 'Elite Fitness Coach',
    learnerName: 'Rahul Sharma',
    issuedOn: '2026-08-12',
    validity: 'lifetime' as const,
    status: 'valid' as const,
    issuedBy: ISSUER,
  },
  {
    certificateId: 'MIHN-HPHN-2025-018',
    credential: 'Clinical Nutrition Coach',
    learnerName: 'Rahul Sharma',
    issuedOn: '2025-03-04',
    validity: '2years' as const,
    validUntil: '2027-03-04',
    status: 'valid' as const,
    issuedBy: ISSUER,
  },
  {
    certificateId: 'MSS-000009',
    credential: 'Personal Trainer & Nutrition Coach',
    learnerName: 'Rahul Sharma',
    issuedOn: '2024-11-20',
    validity: '5years' as const,
    validUntil: '2025-11-20', // in the past, on purpose — to demo "expired"
    status: 'valid' as const,
    issuedBy: ISSUER,
  },
  {
    certificateId: 'MPC/2026/041',
    credential: 'Personal Trainer',
    learnerName: 'Ananya Verma',
    issuedOn: '2026-01-15',
    validity: 'custom' as const,
    validUntil: '2027-01-15',
    status: 'pending' as const,
    issuedBy: ISSUER,
  },
]

async function main() {
  const now = new Date().toISOString()
  for (const c of SAMPLE_CERTIFICATES) {
    await db
      .collection('certificates')
      .doc(c.certificateId)
      .set({ ...c, createdAt: now, updatedAt: now })
    console.log(`Seeded ${c.certificateId} — ${c.learnerName}`)
  }
  console.log(
    '\nDone. Try verifying EFC-001, MIHN-HPHN-2025-018, MSS-000009 (expired), or MPC/2026/041 (pending).',
  )
}

main().then(() => process.exit(0))
