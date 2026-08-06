import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { IconCap, IconBook, IconPeople, IconGavel } from "@/components/icons";

const STANDARDS = [
  {
    icon: IconCap,
    title: "Practitioner-Academics",
    desc: "Faculty combine applied clinical or coaching experience with formal academic credentials in their field.",
  },
  {
    icon: IconBook,
    title: "Curriculum Ownership",
    desc: "Each program's curriculum is authored and revised by the faculty teaching it, reviewed against current evidence.",
  },
  {
    icon: IconPeople,
    title: "Cohort Mentorship",
    desc: "Faculty remain reachable across the certification cycle, not limited to scheduled sessions alone.",
  },
  {
    icon: IconGavel,
    title: "MASB Oversight",
    desc: "All faculty appointments and course content are reviewed by the MIHN Academic Standards Board.",
  },
];

export function Faculty() {
  return (
    <section id="faculty" className="bg-navy-900 text-ivory">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <Reveal>
          <Eyebrow tone="ivory">Faculty</Eyebrow>
          <h2 className="font-display text-balance mt-6 max-w-2xl text-4xl font-medium leading-[1.15] text-ivory sm:text-5xl">
            Taught by practitioners held to an academic standard.
          </h2>
          <p className="mt-7 max-w-2xl font-sans text-base leading-relaxed text-ivory/65">
            MIHN faculty are appointed, not merely hired — each undergoes
            review by the Academic Standards Board before joining a program.
            Individual faculty profiles are shared with enrolled students and
            applicants directly.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
          {STANDARDS.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="group h-full bg-navy-900 p-8 transition-colors duration-300 hover:bg-navy-800">
                <item.icon className="h-8 w-8 text-gold-400 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-display mt-5 text-lg text-ivory">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ivory/60">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
