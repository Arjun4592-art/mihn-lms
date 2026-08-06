import type { Metadata } from "next";
import { AdminApp } from "@/components/admin/AdminApp";

// This page depends entirely on client-side Firebase Auth (onAuthStateChanged,
// signOut, etc). It must never be statically prerendered at build time —
// doing so makes the whole `next build` fail with `auth/invalid-api-key`
// whenever NEXT_PUBLIC_FIREBASE_* env vars aren't present in the build
// environment, which takes every page down with it, not just /admin.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Certificate Records — MIHN Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminApp />;
}
