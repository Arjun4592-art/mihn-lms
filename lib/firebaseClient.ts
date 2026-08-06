"use client";

import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/**
 * Client-side Firebase config. These NEXT_PUBLIC_* values are safe to
 * expose in the browser bundle — they identify the project, they are not
 * secrets. They are only used here to sign admin users in with Firebase
 * Authentication; all certificate data access happens through the
 * server-side API routes, guarded by lib/certificates.ts#requireAdmin.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  // Loud, specific error instead of Firebase's opaque "auth/invalid-api-key" —
  // this almost always means the NEXT_PUBLIC_FIREBASE_* vars aren't set in
  // the environment this code is currently running in (e.g. set only for
  // "Production" in Vercel but this is a Preview build, or not added to the
  // build environment at all).
  console.error(
    "[firebaseClient] Missing NEXT_PUBLIC_FIREBASE_* env vars. " +
      "Admin login/certificate pages will not work until these are set."
  );
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const clientAuth = getAuth(app);
