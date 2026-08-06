import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import {
  IconDnaStrand,
  IconPulseLeaf,
  IconFlaskSpark,
  IconCompassStar,
  IconMolecule,
  IconPlus,
} from "@/components/icons";

const PROGRAMS = [
  {
    icon: IconDnaStrand,
    name: "Human Performance & Health Nutritionist",
    code: "HPHN",
    desc: "A foundation credential covering applied nutrition science, human physiology and health-outcome coaching.",
  },
  {
    icon: IconPulseLeaf,
    name: "Elite Sports Nutritionist",
    code: "ESN",
    desc: "Certification for practitioners working with athletes — performance nutrition, recovery and periodised fuelling.",
  },
  {
    icon: IconFlaskSpark,
    name: "Elite Fitness Coach",
    code: "EFC",
    desc: "A coaching credential bridging exercise science with real-world programming and client management.",
  },
  {
    icon: IconCompassStar,
    name: "Master Personal Coach",
    code: "MPC",
    desc: "An advanced standing for coaches formalising a holistic, behaviour-led approach to client transformation.",
  },
  {
    icon: IconMolecule,
    name: "Master Supplementation Specialist",
    code: "MSS",
    desc: "Specialist certification in evidence-based supplementation — formulation literacy, safety and application.",
  },
];

export function Programs() {
  return (
    <section id="programs" className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Certification Programs</Eyebrow>
            <h2 className="font-display text-balance mt-6 max-w-xl text-4xl font-medium leading-[1.15] text-navy-900 sm:text-5xl">
              One academy, a growing set of certifications.
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm leading-relaxed text-ink-soft">
            Every program below shares MIHN&rsquo;s academic framework and
            verification standard. Curriculum and enrolment details are
            shared directly with applicants.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((program, i) => (
            <Reveal key={program.code} delay={i * 70}>
              <article className="group relative h-full overflow-hidden rounded-sm border border-paper-line bg-ivory p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400 hover:shadow-[0_16px_40px_-16px_rgba(7,28,59,0.18)]">
                <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gold-500 transition-transform duration-300 group-hover:scale-x-100" />
                <program.icon className="h-10 w-10 text-navy-800 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-gold-600" />
                <p className="font-label mt-6 text-[10px] font-semibold tracking-[0.24em] text-gold-600">
                  {program.code}
                </p>
                <h3 className="font-display mt-2 text-xl leading-snug text-navy-900">
                  {program.name}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink-soft">
                  {program.desc}
                </p>
              </article>
            </Reveal>
          ))}

          <Reveal delay={PROGRAMS.length * 70}>
            <article className="flex h-full flex-col items-start justify-center rounded-sm border border-dashed border-gold-400/60 bg-transparent p-8 transition-colors duration-300 hover:border-gold-500 hover:bg-gold-100/30">
              <IconPlus className="h-9 w-9 text-gold-500 transition-transform duration-300 hover:rotate-90" />
              <h3 className="font-display mt-6 text-xl leading-snug text-navy-900">
                More Programs Coming Soon
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-ink-soft">
                MIHN&rsquo;s program catalogue is expanding within the same
                academic framework — no redesign required to add what&rsquo;s
                next.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
