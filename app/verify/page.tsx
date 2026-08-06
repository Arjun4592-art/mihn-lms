import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { VerifyForm } from "@/components/verify/VerifyForm";
import { SealMotif } from "@/components/ui/SealMotif";
import { IconSearch, IconShieldCheck, IconScrollCert } from "@/components/icons";

export const metadata: Metadata = {
  title: "Certificate Verification — MIHN",
  description:
    "Verify the authenticity of a MIHN certificate by Certificate ID or by scanning the QR code printed on it.",
};

const STEPS = [
  {
    icon: IconSearch,
    step: "01",
    title: "Enter or scan",
    desc: "Type the Certificate ID printed on the credential, or scan the QR code on the certificate.",
  },
  {
    icon: IconShieldCheck,
    step: "02",
    title: "We check the record",
    desc: "The ID is matched against MIHN's official certification register in real time.",
  },
  {
    icon: IconScrollCert,
    step: "03",
    title: "Get the result",
    desc: "See the candidate's name, course, issue date, validity and current status.",
  },
];

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 text-ivory">
        <SealMotif className="pointer-events-none absolute -right-28 -top-28 h-[480px] w-[480px] text-gold-500/10" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 sm:pb-20 sm:pt-24">
          <Eyebrow tone="ivory">Certificate Verification</Eyebrow>
          <h1 className="font-display text-balance mt-6 max-w-2xl text-4xl font-medium leading-[1.12] text-ivory sm:text-5xl">
            Confirm any MIHN credential in a few seconds.
          </h1>
          <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-ivory/65">
            Every certificate issued by MIHN is recorded on our official
            verification register. Enter the Certificate ID below, or scan
            the QR code printed on the certificate, to check its status.
          </p>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <VerifyForm initialId={id} />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Eyebrow>How Verification Works</Eyebrow>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.step}>
                <div className="flex items-center gap-3">
                  <s.icon className="h-8 w-8 text-gold-600" />
                  <span className="font-display text-2xl text-ink-faint">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-lg text-navy-900">
                  {s.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-soft">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
