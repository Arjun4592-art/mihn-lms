import { Eyebrow } from "@/components/ui/Eyebrow";
import { SealMotif } from "@/components/ui/SealMotif";

export function MasbHero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-ivory">
      <SealMotif className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] text-gold-500/10" />
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 sm:pb-24 sm:pt-28">
        <Eyebrow tone="ivory">Governance</Eyebrow>
        <h1 className="font-display text-balance mt-6 max-w-3xl text-4xl font-medium leading-[1.1] text-ivory sm:text-6xl">
          The MIHN Academic Standards Board.
        </h1>
        <p className="mt-7 max-w-2xl font-sans text-base leading-relaxed text-ivory/65 sm:text-lg">
          MASB is the academic authority behind every MIHN program — the
          body that sets curriculum standards, approves faculty, defines
          assessment and governs certification integrity across the
          institute.
        </p>
      </div>
    </section>
  );
}
