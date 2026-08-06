"use client";

import { useEffect, useRef, useState } from "react";
import { IconClose, IconAlert } from "@/components/icons";

function extractCertificateId(decodedText: string): string {
  try {
    const url = new URL(decodedText);
    const fromQuery = url.searchParams.get("id");
    if (fromQuery) return fromQuery;
  } catch {
    // Not a URL — treat the raw decoded text as the Certificate ID.
  }
  return decodedText.trim();
}

export function QrScanner({
  onDetected,
  onClose,
}: {
  onDetected: (certificateId: string) => void;
  onClose: () => void;
}) {
  const regionId = "mihn-qr-scan-region";
  const scannerRef = useRef<import("html5-qrcode").Html5Qrcode | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        if (cancelled) return;

        const scanner = new Html5Qrcode(regionId, { verbose: false });
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 240, height: 240 } },
          (decodedText) => {
            const id = extractCertificateId(decodedText);
            if (id) onDetected(id);
          },
          () => {
            // per-frame decode miss — expected while aiming the camera, ignore
          }
        );
      } catch {
        if (!cancelled) {
          setError(
            "Couldn't access the camera. Check that you've allowed camera permission, or enter the Certificate ID manually instead."
          );
        }
      }
    }

    start();

    return () => {
      cancelled = true;
      const scanner = scannerRef.current;
      if (scanner) {
        scanner
          .stop()
          .then(() => scanner.clear())
          .catch(() => {
            /* already stopped */
          });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Scan certificate QR code"
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-sm border border-gold-400/30 bg-navy-900 p-6 text-ivory shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <p className="font-label text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300">
            Scan QR Code
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close scanner"
            className="text-ivory/60 hover:text-gold-300"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        {error ? (
          <div className="mt-5 flex items-start gap-3 rounded-sm border border-ivory/15 bg-navy-800 p-4">
            <IconAlert className="h-6 w-6 flex-none text-gold-400" />
            <p className="font-sans text-sm leading-relaxed text-ivory/80">{error}</p>
          </div>
        ) : (
          <>
            <div
              id={regionId}
              className="mt-5 overflow-hidden rounded-sm border border-ivory/15 [&_video]:rounded-sm"
            />
            <p className="mt-4 font-sans text-xs leading-relaxed text-ivory/50">
              Point your camera at the QR code printed on the certificate.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
