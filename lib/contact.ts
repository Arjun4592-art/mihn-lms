import "server-only";
import { adminDb } from "@/lib/firebaseAdmin";

const COLLECTION = "contactMessages";

export type ContactMessageInput = {
  name: string;
  email: string;
  program: string;
  message: string;
};

export type ContactMessageRecord = ContactMessageInput & {
  id: string;
  createdAt: string;
  read?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates and stores a contact-form submission in Firestore
 * (collection: "contactMessages"). Mirrors the admin-facing
 * certificate records in lib/certificates.ts so the same Firebase
 * project/credentials can be reused — no separate email service
 * needed. Messages can be read later from an admin view backed by
 * this same collection.
 */
export async function submitContactMessage(
  input: ContactMessageInput
): Promise<ContactMessageRecord> {
  const name = input.name.trim();
  const email = input.email.trim();
  const program = input.program.trim();
  const message = input.message.trim();

  if (!name || !email || !message) {
    throw Object.assign(new Error("Name, email and message are required."), {
      status: 400,
    });
  }
  if (!EMAIL_RE.test(email)) {
    throw Object.assign(new Error("Enter a valid email address."), {
      status: 400,
    });
  }
  if (message.length > 4000) {
    throw Object.assign(new Error("Message is too long."), { status: 400 });
  }

  const ref = adminDb().collection(COLLECTION).doc();
  const record: ContactMessageRecord = {
    id: ref.id,
    name,
    email,
    program: program || "General enquiry",
    message,
    createdAt: new Date().toISOString(),
    read: false,
  };
  await ref.set(record);
  return record;
}
