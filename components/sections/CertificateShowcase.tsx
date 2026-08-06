import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SealMotif } from "@/components/ui/SealMotif";
import { IconDnaStrand } from "@/components/icons";

export function CertificateShowcase() {
  return (
    <section id="certificate" className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <Reveal>
          <Eyebrow>Sample Certificate &amp; ID</Eyebrow>
          <h2 className="font-display text-balance mt-6 max-w-2xl text-4xl font-medium leading-[1.15] text-navy-900 sm:text-5xl">
            What a certified practitioner carries.
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-ink-soft">
            Illustrative layout only — names, dates and identifiers shown here
            are placeholders, not a real certification record.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Certificate mock */}
          <Reveal delay={100} className="relative mx-auto aspect-[1.42/1] w-full max-w-xl border-[3px] border-navy-900 bg-ivory p-3 transition-transform duration-500 [transform-style:preserve-3d] hover:-rotate-1 hover:scale-[1.015]">
            <div className="relative flex h-full flex-col items-center justify-between border border-gold-500 px-8 py-8 text-center">
              <SealMotif className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 text-navy-900/[0.05]" />
              <div>
                <p className="font-label text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-600">
                  Multiverse Institute of Health &amp; Nutrition
                </p>
                <p className="mt-3 font-display text-sm text-ink-faint">
                  Certificate of Completion
                </p>
              </div>

              <div>
                <p className="font-display text-3xl text-navy-900 sm:text-4xl">
                  Sample Candidate
                </p>
                <div className="mx-auto mt-3 h-px w-32 bg-gold-400" />
                <p className="mt-3 font-sans text-xs uppercase tracking-[0.14em] text-ink-soft">
                  Human Performance &amp; Health Nutritionist
                </p>
              </div>

              <div className="flex w-full items-end justify-between text-left">
                <div>
                  <p className="font-label text-[9px] uppercase tracking-[0.2em] text-ink-faint">
                    Certificate ID
                  </p>
                  <p className="font-sans text-xs text-ink-soft">MIHN-HPHN-000000</p>
                </div>
                <IconDnaStrand className="h-8 w-8 text-gold-500" />
                <div className="text-right">
                  <p className="font-label text-[9px] uppercase tracking-[0.2em] text-ink-faint">
                    Issued
                  </p>
                  <p className="font-sans text-xs text-ink-soft">00 / 0000</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ID card mock */}
          <Reveal delay={180} className="mx-auto w-full max-w-[280px]">
            <div className="relative aspect-[1.586/1] w-full overflow-hidden rounded-xl bg-navy-900 p-5 text-ivory shadow-xl shadow-navy-900/20 transition-transform duration-500 hover:rotate-1 hover:scale-[1.03]">
              <SealMotif className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 text-gold-500/10" />
              <div className="flex items-start justify-between">
                <p className="font-label text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-300">
                  MIHN
                </p>
                <IconDnaStrand className="h-5 w-5 text-gold-400" />
              </div>
              <div className="mt-7 h-11 w-9 rounded-sm bg-gold-300/25" />
              <p className="mt-3 font-display text-lg leading-tight text-ivory">
                Sample Candidate
              </p>
              <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-ivory/55">
                Certified Practitioner
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-ivory/15 pt-3">
                <p className="font-sans text-[9px] text-ivory/45">ID MIHN-000000</p>
                <p className="font-sans text-[9px] text-ivory/45">Valid</p>
              </div>
            </div>
            <p className="mt-4 text-center font-sans text-xs text-ink-faint">
              Pocket credential card
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
