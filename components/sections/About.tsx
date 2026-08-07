import Image from 'next/image'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { IconLayers } from '@/components/icons'

export function About() {
  return (
    <section id='about' className='relative overflow-hidden bg-ivory'>
      <span
        aria-hidden
        className='pointer-events-none absolute right-4 top-6 select-none font-display text-[5rem] font-semibold leading-none text-navy-900/[0.03] sm:text-[8rem]'
      >
        01
      </span>
      <div className='relative mx-auto max-w-6xl px-6 py-24 sm:py-28'>
        <div className='grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20'>
          <Reveal from='left'>
            <Eyebrow>About MIHN</Eyebrow>
            <h2 className='font-display text-balance mt-6 text-4xl font-medium leading-[1.15] text-navy-900 sm:text-5xl'>
              An academy built for the full arc of a practitioner&rsquo;s
              career.
            </h2>
            <p className='mt-7 font-sans text-base leading-relaxed text-ink-soft'>
              The Multiverse Institute of Health &amp; Nutrition exists to
              formalise how practitioners in nutrition, fitness and human
              performance are trained, assessed and certified — with academic
              rigour applied consistently across every program we offer.
            </p>
            <div className='mt-8 flex items-center gap-3 rounded-sm border border-paper-line bg-paper px-5 py-4 transition-shadow duration-300 hover:shadow-[0_8px_24px_-8px_rgba(7,28,59,0.15)]'>
              <Image
                src='/brand/submark.png'
                alt='Diet Univeerse'
                width={32}
                height={32}
                className='h-8 w-8 flex-none transition-transform duration-700 ease-out hover:rotate-[360deg]'
              />
              <p className='font-sans text-sm leading-snug text-ink-soft'>
                <span className='font-semibold text-navy-900'>
                  An Education Initiative by Diet Univeerse
                </span>
                <br />
                MIHN operates as the certification and academic arm of the Diet
                Univeerse ecosystem.
              </p>
            </div>
          </Reveal>

          <div className='grid gap-6 sm:grid-cols-2'>
            <Reveal delay={80}>
              <article className='group h-full rounded-sm border border-paper-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400 hover:shadow-[0_16px_40px_-16px_rgba(7,28,59,0.2)]'>
                <IconCompassIcon className='transition-transform duration-300 group-hover:rotate-45' />
                <h3 className='font-display mt-5 text-2xl text-navy-900'>
                  Our Mission
                </h3>
                <p className='mt-3 font-sans text-sm leading-relaxed text-ink-soft'>
                  To build a credible, standards-based pathway for nutrition and
                  fitness professionals to formalise their expertise — through
                  certification that employers, clients and peer institutions
                  can trust and verify.
                </p>
              </article>
            </Reveal>

            <Reveal delay={160}>
              <article className='group h-full rounded-sm border border-paper-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400 hover:shadow-[0_16px_40px_-16px_rgba(7,28,59,0.2)]'>
                <IconLayers className='h-9 w-9 text-gold-600 transition-transform duration-300 group-hover:scale-110' />
                <h3 className='font-display mt-5 text-2xl text-navy-900'>
                  Our Vision
                </h3>
                <p className='mt-3 font-sans text-sm leading-relaxed text-ink-soft'>
                  To become the reference academy for health and nutrition
                  certification across the region — an institution that grows
                  one rigorous program at a time, never diluting its standard
                  for scale.
                </p>
              </article>
            </Reveal>

            <Reveal delay={240} className='sm:col-span-2'>
              <article className='rounded-sm border border-paper-line bg-white p-8 transition-all duration-300 hover:border-gold-400 hover:shadow-[0_16px_40px_-16px_rgba(7,28,59,0.2)]'>
                <h3 className='font-display text-2xl text-navy-900'>
                  How the academy is structured
                </h3>
                <p className='mt-3 max-w-2xl font-sans text-sm leading-relaxed text-ink-soft'>
                  Every MIHN program sits under one academic framework, governed
                  by the{' '}
                  <a
                    href='/masb'
                    className='text-gold-600 underline decoration-gold-400/40 underline-offset-4 transition-colors duration-200 hover:text-gold-700 hover:decoration-gold-600'
                  >
                    MIHN Academic Standards Board
                  </a>
                  . As new certifications are introduced, they join the same
                  structure — the same assessment philosophy, the same
                  verification system, the same faculty standard.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function IconCompassIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 48 48'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`h-9 w-9 text-gold-600 ${className}`}
      aria-hidden='true'
    >
      <path d='M24 6v6M24 36v6M6 24h6M36 24h6' />
      <path d='M24 14 30 24 24 34 18 24Z' />
    </svg>
  )
}
