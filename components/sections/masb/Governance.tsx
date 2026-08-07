import { Eyebrow } from '@/components/ui/Eyebrow'

const ROLES = [
  {
    title: 'Academic Chair',
    desc: 'Holds final authority on curriculum standards and certification decisions across MIHN.',
  },
  {
    title: 'Program Reviewers',
    desc: "Subject-matter academics who audit each program's syllabus and assessment design.",
  },
  {
    title: 'Industry Advisors',
    desc: 'Practising professionals who confirm that certification stays relevant to real practice.',
  },
  {
    title: 'Compliance & Records',
    desc: 'Maintains the credential register and oversees the public verification system.',
  },
]

export function Governance() {
  return (
    <section className='relative overflow-hidden bg-paper'>
      <span
        aria-hidden
        className='pointer-events-none absolute right-4 top-6 select-none font-display text-[5rem] font-semibold leading-none text-navy-900/[0.03] sm:text-[8rem]'
      >
        05
      </span>
      <div className='relative mx-auto max-w-6xl px-6 py-24 sm:py-28'>
        <Eyebrow>Board Structure</Eyebrow>
        <h2 className='font-display text-balance mt-6 max-w-2xl text-4xl font-medium leading-[1.15] text-navy-900 sm:text-5xl'>
          How the board is organised.
        </h2>
        <p className='mt-6 max-w-2xl font-sans text-sm leading-relaxed text-ink-soft'>
          MASB is organised into four functions. Individual board members are
          announced to enrolled students and named on official institute
          correspondence.
        </p>

        <dl className='mt-14 grid gap-x-10 gap-y-10 border-t border-paper-line pt-10 sm:grid-cols-2'>
          {ROLES.map((r) => (
            <div key={r.title} className='border-b border-paper-line pb-8'>
              <dt className='font-display text-xl text-navy-900'>{r.title}</dt>
              <dd className='mt-2 font-sans text-sm leading-relaxed text-ink-soft'>
                {r.desc}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
