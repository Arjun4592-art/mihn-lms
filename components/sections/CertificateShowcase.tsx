import Image from 'next/image'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { SealMotif } from '@/components/ui/SealMotif'
import { IconDnaStrand } from '@/components/icons'

export function CertificateShowcase() {
  return (
    <section id='certificate' className='relative overflow-hidden bg-paper'>
      <span
        aria-hidden
        className='pointer-events-none absolute right-4 top-6 select-none font-display text-[5rem] font-semibold leading-none text-navy-900/[0.03] sm:text-[8rem]'
      >
        06
      </span>
      <div className='relative mx-auto max-w-6xl px-6 py-24 sm:py-28'>
        <Reveal>
          <Eyebrow>Sample Certificate &amp; ID</Eyebrow>
          <h2 className='font-display text-balance mt-6 max-w-2xl text-4xl font-medium leading-[1.15] text-navy-900 sm:text-5xl'>
            What a certified practitioner carries.
          </h2>
          <p className='mt-6 max-w-2xl font-sans text-sm leading-relaxed text-ink-soft'>
            Illustrative sample only — the name, dates and identifier shown
            here are for preview purposes and do not represent a real
            certification record.
          </p>
        </Reveal>

        <div className='mt-14 grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]'>
          {/* Real sample certificate */}
          <Reveal
            delay={100}
            className='relative mx-auto w-full max-w-xl overflow-hidden rounded-sm border-[3px] border-navy-900 bg-ivory shadow-[0_20px_60px_-20px_rgba(7,28,59,0.35)] transition-transform duration-500 hover:-rotate-1 hover:scale-[1.015]'
          >
            <Image
              src='/certificate/sample-certificate.jpg'
              alt='Sample MIHN certificate of completion'
              width={1054}
              height={1492}
              sizes='(min-width: 1024px) 40vw, 90vw'
              className='h-auto w-full'
              priority={false}
            />
          </Reveal>

          {/* ID card mock */}
          <Reveal delay={180} className='mx-auto w-full max-w-[280px]'>
            <div className='relative aspect-[1.586/1] w-full overflow-hidden rounded-xl bg-navy-900 p-5 text-ivory shadow-xl shadow-navy-900/20 transition-transform duration-500 hover:rotate-1 hover:scale-[1.03]'>
              <SealMotif className='pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 text-gold-500/10' />
              <div className='flex items-start justify-between'>
                <p className='font-label text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-300'>
                  MIHN
                </p>
                <IconDnaStrand className='h-5 w-5 text-gold-400' />
              </div>
              <div className='mt-7 h-11 w-9 rounded-sm bg-gold-300/25' />
              <p className='mt-3 font-display text-lg leading-tight text-ivory'>
                Sumit Rawal
              </p>
              <p className='font-sans text-[10px] uppercase tracking-[0.14em] text-ivory/55'>
                Elite Fitness Coach
              </p>
              <div className='mt-4 flex items-center justify-between border-t border-ivory/15 pt-3'>
                <p className='font-sans text-[9px] text-ivory/45'>
                  ID MIHN-EFC-2026-0001
                </p>
                <p className='font-sans text-[9px] text-ivory/45'>Valid</p>
              </div>
            </div>
            <p className='mt-4 text-center font-sans text-xs text-ink-faint'>
              Pocket credential card
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
