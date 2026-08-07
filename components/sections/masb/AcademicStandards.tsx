import { Eyebrow } from '@/components/ui/Eyebrow'
import {
  IconBook,
  IconPeople,
  IconScrollCert,
  IconShieldCheck,
} from '@/components/icons'

const PILLARS = [
  {
    icon: IconBook,
    title: 'Curriculum Review',
    desc: 'Every syllabus is checked against current evidence and practice standards before it reaches a cohort.',
  },
  {
    icon: IconPeople,
    title: 'Faculty Approval',
    desc: 'Instructors are vetted for both academic grounding and applied field experience before appointment.',
  },
  {
    icon: IconScrollCert,
    title: 'Assessment Integrity',
    desc: 'Examinations and practical assessments follow a documented, auditable rubric across all programs.',
  },
  {
    icon: IconShieldCheck,
    title: 'Credential Verification',
    desc: "Every certificate issued is logged to a verifiable register accessible through the institute's portal.",
  },
]

export function AcademicStandards() {
  return (
    <section className='relative overflow-hidden bg-paper'>
      <span
        aria-hidden
        className='pointer-events-none absolute right-4 top-6 select-none font-display text-[5rem] font-semibold leading-none text-navy-900/[0.03] sm:text-[8rem]'
      >
        02
      </span>
      <div className='relative mx-auto max-w-6xl px-6 py-24 sm:py-28'>
        <Eyebrow>Academic Standards</Eyebrow>
        <h2 className='font-display text-balance mt-6 max-w-2xl text-4xl font-medium leading-[1.15] text-navy-900 sm:text-5xl'>
          Four pillars every program is built on.
        </h2>

        <div className='mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className='rounded-sm border border-paper-line bg-ivory p-7'
            >
              <p.icon className='h-8 w-8 text-gold-600' />
              <h3 className='font-display mt-5 text-lg text-navy-900'>
                {p.title}
              </h3>
              <p className='mt-3 font-sans text-sm leading-relaxed text-ink-soft'>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
