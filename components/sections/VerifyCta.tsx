import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { IconShieldCheck } from "@/components/icons";

export function VerifyCta() {
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-6xl px-6 pb-24 sm:pb-28">
        <Reveal className="flex flex-col items-start justify-between gap-8 rounded-sm border border-navy-900/10 bg-navy-900 px-8 py-12 text-ivory transition-shadow duration-300 hover:shadow-[0_20px_60px_-20px_rgba(7,28,59,0.4)] sm:flex-row sm:items-center sm:px-14">
          <div className="group flex items-start gap-5">
            <IconShieldCheck className="h-10 w-10 flex-none text-gold-400 transition-transform duration-300 group-hover:scale-110" />
            <div>
              <h2 className="font-display text-2xl leading-snug text-ivory sm:text-3xl">
                Verifying a MIHN credential?
              </h2>
              <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-ivory/65">
                Look up any Certificate ID or Student ID on our verification
                portal to confirm status, program and validity.
              </p>
            </div>
          </div>
          <Button href="/verify" variant="gold" className="flex-none">
            Verify a Certificate
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
