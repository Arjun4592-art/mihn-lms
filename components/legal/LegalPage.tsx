import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SealMotif } from "@/components/ui/SealMotif";

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 text-ivory">
        <SealMotif className="pointer-events-none absolute -right-28 -top-28 h-[420px] w-[420px] text-gold-500/10" />
        <div className="relative mx-auto max-w-3xl px-6 pb-14 pt-20 sm:pb-16 sm:pt-24">
          <Eyebrow tone="ivory">{eyebrow}</Eyebrow>
          <h1 className="font-display text-balance mt-6 text-4xl font-medium leading-[1.12] text-ivory sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 font-sans text-sm text-ivory/50">Last updated: {updated}</p>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <div className="legal-prose">{children}</div>
        </div>
      </section>
    </>
  );
}
