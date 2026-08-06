"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { IconQrCode } from "@/components/icons";

export function QrCodeButton({ certificateId }: { certificateId: string }) {
  const [busy, setBusy] = useState(false);

  async function handleDownload() {
    setBusy(true);
    try {
      const verifyUrl = `${window.location.origin}/verify?id=${encodeURIComponent(
        certificateId
      )}`;
      const dataUrl = await QRCode.toDataURL(verifyUrl, {
        margin: 2,
        width: 480,
        color: { dark: "#071c3b", light: "#fbf8f2" },
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${certificateId}-qr.png`;
      link.click();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={busy}
      title="Download QR code for this certificate"
      className="inline-flex items-center gap-1.5 font-label text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-800 hover:text-gold-600 disabled:opacity-50"
    >
      <IconQrCode className="h-4 w-4" />
      {busy ? "…" : "QR"}
    </button>
  );
}
