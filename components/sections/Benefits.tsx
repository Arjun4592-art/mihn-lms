import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import {
  IconScrollCert,
  IconIdCard,
  IconShieldCheck,
  IconPath,
  IconPeople,
  IconLayers,
} from "@/components/icons";

const BENEFITS = [
  {
    icon: IconScrollCert,
    title: "Recognised Certification",
    desc: "A credential issued under one consistent institutional standard, regardless of program.",
  },
  {
    icon: IconIdCard,
    title: "Digital & Physical ID",
    desc: "Every certified practitioner receives a certificate and a pocket credential card.",
  },
  {
    icon: IconShieldCheck,
    title: "Public Verification",
    desc: "Anyone can confirm a credential's authenticity through MIHN's verification portal.",
  },
  {
    icon: IconPath,
    title: "A Defined Pathway",
    desc: "Programs are structured to build on one another as your practice grows.",
  },
  {
    icon: IconPeople,
    title: "Faculty Access",
    desc: "Direct mentorship access across the certification cycle, not a one-way lecture format.",
  },
  {
    icon: IconLayers,
    title: "Standards You Can Cite",
    desc: "Certification governed by MASB — a framework you can point to with employers and clients.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="bg-ivory">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <Reveal>
          <Eyebrow>Student Benefits</Eyebrow>
          <h2 className="font-display text-balance mt-6 max-w-2xl text-4xl font-medium leading-[1.15] text-navy-900 sm:text-5xl">
            What certification through MIHN carries with it.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 60}>
              <div className="group flex gap-5">
                <b.icon className="h-8 w-8 flex-none text-gold-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                <div>
                  <h3 className="font-display text-lg text-navy-900">
                    {b.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink-soft">
                    {b.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
