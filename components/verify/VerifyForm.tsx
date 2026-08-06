"use client";

import { FormEvent, useEffect, useState, useCallback } from "react";
import {
  IconSearch,
  IconLoader,
  IconShieldCheck,
  IconAlert,
  IconQrCode,
} from "@/components/icons";
import { SealMotif } from "@/components/ui/SealMotif";
import { QrScanner } from "@/components/verify/QrScanner";

type PublicCertificate = {
  certificateId: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  validUntil: string;
  grade: string;
  issuedBy: string;
  status: "verified" | "expired" | "revoked";
};

type ViewState = "idle" | "loading" | "verified" | "expired" | "revoked" | "not-found" | "error";

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const STATUS_COPY: Record<
  "verified" | "expired" | "revoked",
  { label: string; dot: string }
> = {
  verified: { label: "Certificate Verified", dot: "🟢" },
  expired: { label: "Certificate Expired", dot: "🟠" },
  revoked: { label: "Certificate Revoked", dot: "🔴" },
};

export function VerifyForm({ initialId }: { initialId?: string }) {
  const [query, setQuery] = useState(initialId ?? "");
  const [status, setStatus] = useState<ViewState>("idle");
  const [result, setResult] = useState<PublicCertificate | null>(null);
  const [scannerOpen, setScannerOpen] = useState(false);

  const runVerification = useCallback(async (rawId: string) => {
    const id = rawId.trim();
    if (!id) return;
    setStatus("loading");
    try {
      const res = await fetch(`/api/verify?id=${encodeURIComponent(id)}`, {
        cache: "no-store",
      });
      if (res.status === 404) {
        setResult(null);
        setStatus("not-found");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        return;
      }
      const data = await res.json();
      setResult(data.certificate);
      setStatus(data.certificate.status);
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (initialId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      runVerification(initialId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialId]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await runVerification(query);
  }

  function handleScanDetected(id: string) {
    setScannerOpen(false);
    setQuery(id);
    runVerification(id);
  }

  const badge =
    status === "verified" || status === "expired" || status === "revoked"
      ? STATUS_COPY[status]
      : null;

  return (
    <div className="mx-auto max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-sm border border-navy-900/10 bg-white p-3 shadow-sm sm:flex-row"
      >
        <div className="flex flex-1 items-center gap-3 px-3 py-2">
          <IconSearch className="h-5 w-5 flex-none text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Enter Certificate ID (e.g. EFC-000127)"
            className="w-full bg-transparent font-sans text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            aria-label="Certificate ID"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setScannerOpen(true)}
            title="Scan QR code"
            aria-label="Scan QR code"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-navy-900/15 px-4 py-3 text-navy-900 transition-colors hover:border-gold-500 hover:text-gold-600"
          >
            <IconQrCode className="h-5 w-5" />
          </button>
          <button
            type="submit"
            disabled={status === "loading"}
            className="font-label inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-navy-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-navy-800 disabled:opacity-60"
          >
            {status === "loading" ? (
              <>
                <IconLoader className="h-4 w-4 animate-spin" />
                Checking
              </>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </form>

      <div className="mt-8" aria-live="polite">
        {status === "loading" && (
          <div className="animate-fade-up rounded-sm border border-navy-900/10 bg-white p-8">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 animate-pulse rounded-full bg-navy-900/10" />
              <div className="h-3 w-40 animate-pulse rounded-sm bg-navy-900/10" />
            </div>

            <div className="mt-5 h-7 w-56 animate-pulse rounded-sm bg-navy-900/10" />

            <div className="mt-7 grid grid-cols-2 gap-6 border-t border-navy-900/10 pt-6 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <div className="h-2.5 w-20 animate-pulse rounded-sm bg-navy-900/10" />
                  <div
                    className="mt-2 h-3.5 animate-pulse rounded-sm bg-navy-900/10"
                    style={{ width: `${60 + (i % 3) * 15}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-navy-900/10 pt-5">
              <div className="h-2.5 w-full animate-pulse rounded-sm bg-navy-900/10" />
              <div className="mt-2 h-2.5 w-4/5 animate-pulse rounded-sm bg-navy-900/10" />
            </div>
          </div>
        )}

        {(status === "verified" || status === "expired" || status === "revoked") &&
          result &&
          badge && (
            <div
              className="animate-fade-up relative overflow-hidden rounded-sm border p-8"
              style={{
                borderColor:
                  status === "verified"
                    ? "var(--color-status-verified)"
                    : status === "expired"
                      ? "var(--color-status-expired)"
                      : "var(--color-status-error)",
                background:
                  status === "verified"
                    ? "var(--color-status-verified-soft)"
                    : status === "expired"
                      ? "var(--color-status-expired-soft)"
                      : "var(--color-status-error-soft)",
              }}
            >
              <SealMotif className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 text-navy-900/[0.06]" />

              <div className="relative flex items-center gap-3">
                <span aria-hidden className="text-lg leading-none">
                  {badge.dot}
                </span>
                <p
                  className="font-label text-[12px] font-bold uppercase tracking-[0.2em]"
                  style={{
                    color:
                      status === "verified"
                        ? "var(--color-status-verified)"
                        : status === "expired"
                          ? "var(--color-status-expired)"
                          : "var(--color-status-error)",
                  }}
                >
                  {badge.label}
                </p>
              </div>

              <p className="font-display relative mt-4 text-3xl text-navy-900">
                {result.studentName}
              </p>

              <dl className="relative mt-7 grid grid-cols-2 gap-6 border-t border-navy-900/10 pt-6 sm:grid-cols-3">
                <div>
                  <dt className="font-label text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    Course Name
                  </dt>
                  <dd className="mt-1 font-sans text-sm text-ink">{result.courseName}</dd>
                </div>
                <div>
                  <dt className="font-label text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    Certificate ID
                  </dt>
                  <dd className="mt-1 font-sans text-sm text-ink">{result.certificateId}</dd>
                </div>
                <div>
                  <dt className="font-label text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    Grade
                  </dt>
                  <dd className="mt-1 font-sans text-sm text-ink">{result.grade}</dd>
                </div>
                <div>
                  <dt className="font-label text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    Issue Date
                  </dt>
                  <dd className="mt-1 font-sans text-sm text-ink">
                    {formatDate(result.issueDate)}
                  </dd>
                </div>
                <div>
                  <dt className="font-label text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    Valid Until
                  </dt>
                  <dd className="mt-1 font-sans text-sm text-ink">
                    {formatDate(result.validUntil)}
                  </dd>
                </div>
                <div>
                  <dt className="font-label text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    Issued By
                  </dt>
                  <dd className="mt-1 font-sans text-sm text-ink">{result.issuedBy}</dd>
                </div>
              </dl>

              <p className="relative mt-7 border-t border-navy-900/10 pt-5 font-sans text-xs leading-relaxed text-ink-soft">
                This credential has been verified through the official MIHN
                Certificate Verification System. The above information
                matches the certification records maintained by MIHN
                (Multiverse Institute of Health &amp; Nutrition).
              </p>
            </div>
          )}

        {status === "not-found" && (
          <div
            className="animate-fade-up flex items-start gap-4 rounded-sm border p-7"
            style={{
              borderColor: "var(--color-status-error)",
              background: "var(--color-status-error-soft)",
            }}
          >
            <span aria-hidden className="text-lg leading-none">
              🔴
            </span>
            <div>
              <p
                className="font-label text-[12px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--color-status-error)" }}
              >
                Certificate Not Found
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-soft">
                The entered Certificate ID could not be found in the official
                MIHN certification records. Please verify the Certificate ID
                or contact{" "}
                <a
                  href="mailto:support@mihn.edu.in"
                  className="text-gold-600 underline underline-offset-4"
                >
                  MIHN Support
                </a>{" "}
                for assistance.
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="animate-fade-up flex items-start gap-4 rounded-sm border border-ink-faint/25 bg-paper p-7">
            <IconAlert className="h-7 w-7 flex-none text-gold-600" />
            <div>
              <p className="font-display text-lg text-navy-900">
                Verification temporarily unavailable
              </p>
              <p className="mt-1 font-sans text-sm leading-relaxed text-ink-soft">
                Something went wrong on our end. Please try again in a
                moment.
              </p>
            </div>
          </div>
        )}

        {status === "idle" && (
          <div className="flex items-center gap-4 rounded-sm border border-dashed border-paper-line p-7 text-ink-faint">
            <IconShieldCheck className="h-7 w-7 flex-none" />
            <p className="font-sans text-sm">
              Enter a Certificate ID above, or scan the QR code on the
              certificate, to see the course, issue date, validity and
              current status.
            </p>
          </div>
        )}
      </div>

      {scannerOpen && (
        <QrScanner onDetected={handleScanDetected} onClose={() => setScannerOpen(false)} />
      )}
    </div>
  );
}
