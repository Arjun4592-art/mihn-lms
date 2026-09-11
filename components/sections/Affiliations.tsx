import Image from 'next/image'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'

export function Affiliations() {
  return (
    <section
      id='affiliations'
      className='relative overflow-hidden bg-[#f8f3e8]'
    >
      <span
        aria-hidden
        className='pointer-events-none absolute right-4 top-6 select-none font-display text-[5rem] font-semibold leading-none text-navy-900/[0.03] sm:text-[8rem]'
      >
        02
      </span>
      <div className='relative mx-auto max-w-6xl px-6 py-24 sm:py-28'>
        <Reveal>
          <Eyebrow>
            International Professional Affiliations &amp; CPD Recognition
          </Eyebrow>
          <h2 className='font-display text-balance mt-6 max-w-2xl text-4xl font-medium leading-[1.15] text-navy-900 sm:text-5xl'>
            Recognised by international education partners.
          </h2>
          <p className='mt-7 max-w-2xl font-sans text-base leading-relaxed text-ink-soft'>
            MIHN maintains international professional affiliations and
            continuing professional development recognition through its approved
            education partners. These relationships support the
            institute&rsquo;s commitment to structured professional learning,
            quality standards and continuing development across health,
            nutrition and fitness education.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className='mt-14 flex flex-col items-center gap-6 rounded-sm border border-paper-line bg-white p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold-400 hover:shadow-[0_16px_40px_-16px_rgba(7,28,59,0.2)]'>
            <Image
              src='/affiliations/ihfa-cpd-combined.png'
              alt='International Health and Fitness Association — IHFA (UK) and CPD Worldwide — Accreditation & Certification, Approved Provider'
              width={739}
              height={294}
              className='h-auto w-full max-w-[720px]'
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
