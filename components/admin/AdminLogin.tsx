"use client";

import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { clientAuth } from "@/lib/firebaseClient";
import { IconLock, IconLoader } from "@/components/icons";
import { SealMotif } from "@/components/ui/SealMotif";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(clientAuth, email.trim(), password);
    } catch {
      setError("Incorrect email or password, or this account isn't set up yet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-navy-900 px-6 py-16">
      <div className="relative w-full max-w-sm overflow-hidden rounded-sm border border-gold-400/20 bg-navy-950 p-8">
        <SealMotif className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 text-gold-500/10" />
        <div className="relative flex items-center gap-3">
          <IconLock className="h-6 w-6 text-gold-400" />
          <p className="font-label text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300">
            Admin Access
          </p>
        </div>
        <h1 className="font-display relative mt-4 text-2xl text-ivory">
          MIHN Certificate Records
        </h1>
        <p className="relative mt-2 font-sans text-sm text-ivory/60">
          Sign in with your MIHN admin account to manage certificates.
        </p>

        <form onSubmit={handleSubmit} className="relative mt-7 flex flex-col gap-4">
          <div>
            <label
              htmlFor="admin-email"
              className="font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory/50"
            >
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-sm border border-ivory/15 bg-navy-900 px-3 py-2.5 font-sans text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold-500"
              placeholder="admin@mihn.edu.in"
            />
          </div>
          <div>
            <label
              htmlFor="admin-password"
              className="font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory/50"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-sm border border-ivory/15 bg-navy-900 px-3 py-2.5 font-sans text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="font-sans text-sm text-[color:var(--color-status-error)]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="font-label mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-gold-500 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-950 hover:bg-gold-400 disabled:opacity-60"
          >
            {loading ? (
              <>
                <IconLoader className="h-4 w-4 animate-spin" />
                Signing in
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
