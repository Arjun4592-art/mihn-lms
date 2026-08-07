import { Eyebrow } from '@/components/ui/Eyebrow'

const TIERS = [
  {
    n: '01',
    title: 'Foundation Learning',
    desc: "Core coursework in the program's subject area, delivered by MASB-approved faculty.",
  },
  {
    n: '02',
    title: 'Applied Assessment',
    desc: "Case-based and practical evaluation of the candidate's ability to apply what was taught.",
  },
  {
    n: '03',
    title: 'Certification',
    desc: 'On passing, MIHN issues a certificate and pocket ID card tied to a unique credential record.',
  },
  {
    n: '04',
    title: 'Public Verification',
    desc: 'The credential is logged to the verification register, checkable by anyone at any time.',
  },
]

export function CertificationFramework() {
  return (
    <section className='relative overflow-hidden bg-navy-900 text-ivory'>
      <span
        aria-hidden
        className='pointer-events-none absolute right-4 top-6 select-none font-display text-[5rem] font-semibold leading-none text-ivory/[0.03] sm:text-[8rem]'
      >
        04
      </span>
      <div className='relative mx-auto max-w-6xl px-6 py-24 sm:py-28'>
        <Eyebrow tone='ivory'>Certification Framework</Eyebrow>
        <h2 className='font-display text-balance mt-6 max-w-2xl text-4xl font-medium leading-[1.15] text-ivory sm:text-5xl'>
          The same four stages, every program.
        </h2>

        <div className='mt-16 grid gap-0 sm:grid-cols-4'>
          {TIERS.map((t, i) => (
            <div
              key={t.n}
              className='relative border-t border-ivory/15 py-8 pr-8 sm:border-t-0 sm:border-l sm:py-2 sm:pl-8'
            >
              <span className='font-display text-4xl text-gold-400/80'>
                {t.n}
              </span>
              <h3 className='font-display mt-4 text-xl text-ivory'>
                {t.title}
              </h3>
              <p className='mt-3 font-sans text-sm leading-relaxed text-ivory/60'>
                {t.desc}
              </p>
              {i < TIERS.length - 1 && (
                <span className='absolute -right-[5px] top-3 hidden h-2.5 w-2.5 rotate-45 bg-gold-400 sm:block' />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
