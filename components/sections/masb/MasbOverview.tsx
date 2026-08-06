import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconGavel } from "@/components/icons";

export function MasbOverview() {
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow>Overview</Eyebrow>
            <h2 className="font-display text-balance mt-6 text-4xl font-medium leading-[1.15] text-navy-900 sm:text-5xl">
              One board, every certification.
            </h2>
          </div>
          <div className="space-y-6">
            <div className="flex gap-5">
              <IconGavel className="h-9 w-9 flex-none text-gold-600" />
              <p className="font-sans text-base leading-relaxed text-ink-soft">
                As MIHN grows to offer certifications across nutrition,
                fitness and human performance, MASB is what keeps every
                program answerable to the same academic standard — so a
                credential means the same thing regardless of which program
                it came from.
              </p>
            </div>
            <p className="font-sans text-base leading-relaxed text-ink-soft">
              The Board reviews curriculum before it is taught, approves
              faculty before they teach, and audits assessment outcomes
              after certification is granted. It exists independently of
              any single program, reporting directly to the institute.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
