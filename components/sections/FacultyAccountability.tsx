import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import {
  IconCap,
  IconBook,
  IconPeople,
  IconShieldCheck,
} from '@/components/icons'

const OBLIGATIONS = [
  {
    icon: IconCap,
    title: 'Practitioner-Academics',
    desc: 'Faculty combine applied clinical or coaching experience with formal academic credentials in their field.',
  },
  {
    icon: IconBook,
    title: 'Curriculum Ownership',
    desc: "Each program's curriculum is authored and revised by the faculty teaching it, reviewed against current evidence.",
  },
  {
    icon: IconPeople,
    title: 'Cohort Mentorship',
    desc: 'Faculty remain reachable across the certification cycle, not limited to scheduled sessions alone.',
  },
  {
    icon: IconShieldCheck,
    title: 'MASB Oversight',
    desc: 'All faculty appointments and course content are reviewed by the MIHN Academic Standards Board.',
  },
]

export function FacultyAccountability() {
  return (
    <section className='relative overflow-hidden bg-paper'>
      <span
        aria-hidden
        className='pointer-events-none absolute right-4 top-6 select-none font-display text-[5rem] font-semibold leading-none text-navy-900/[0.03] sm:text-[8rem]'
      >
        04
      </span>

      <div className='relative mx-auto max-w-6xl px-6 py-24 sm:py-28'>
        <Reveal>
          <Eyebrow>How Faculty Are Held Accountable</Eyebrow>
          <h2 className='font-display text-balance mt-6 max-w-2xl text-4xl font-medium leading-[1.15] text-navy-900 sm:text-5xl'>
            Every instructor answers to the same standard.
          </h2>
          <p className='mt-7 max-w-2xl font-sans text-base leading-relaxed text-ink-soft'>
            Being appointed to teach at MIHN comes with four ongoing
            obligations, reviewed by the Academic Standards Board.
          </p>
        </Reveal>

        <div className='mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {OBLIGATIONS.map((o, i) => (
            <Reveal key={o.title} delay={i * 70}>
              <div className='group h-full rounded-sm border border-paper-line bg-ivory p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400 hover:shadow-[0_16px_40px_-16px_rgba(7,28,59,0.18)]'>
                <o.icon className='h-8 w-8 text-gold-600 transition-transform duration-300 group-hover:-translate-y-0.5' />
                <h3 className='font-display mt-5 text-lg text-navy-900'>
                  {o.title}
                </h3>
                <p className='mt-3 font-sans text-sm leading-relaxed text-ink-soft'>
                  {o.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
