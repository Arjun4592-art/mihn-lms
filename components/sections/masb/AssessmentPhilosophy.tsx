import { Eyebrow } from '@/components/ui/Eyebrow'

export function AssessmentPhilosophy() {
  return (
    <section className='relative overflow-hidden bg-ivory'>
      <span
        aria-hidden
        className='pointer-events-none absolute right-4 top-6 select-none font-display text-[5rem] font-semibold leading-none text-navy-900/[0.03] sm:text-[8rem]'
      >
        03
      </span>
      <div className='relative mx-auto max-w-6xl px-6 py-24 sm:py-28'>
        <div className='grid gap-14 lg:grid-cols-2 lg:gap-20'>
          <div>
            <Eyebrow>Assessment Philosophy</Eyebrow>
            <h2 className='font-display text-balance mt-6 text-4xl font-medium leading-[1.15] text-navy-900 sm:text-5xl'>
              Certification should mean something specific.
            </h2>
          </div>
          <div className='space-y-6 font-sans text-base leading-relaxed text-ink-soft'>
            <p>
              MASB treats assessment as the point of the program, not a
              formality at the end of it. Candidates are evaluated on applied
              competence — case-based scenarios and practical demonstration, not
              memorisation alone.
            </p>
            <p>
              A pass reflects readiness to practise, not just attendance. Where
              a program includes a practical component, that component is
              weighted at least as heavily as written assessment, and reviewed
              by faculty independent of instruction.
            </p>
            <p className='border-l-2 border-gold-400 pl-5 font-display text-xl text-navy-900'>
              A certificate should tell an employer or client exactly what a
              candidate can do — nothing more, nothing vaguer.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
