import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { SealMotif } from '@/components/ui/SealMotif'

export function Hero() {
  return (
    <section className='relative overflow-hidden bg-navy-900 text-ivory'>
      <SealMotif className='pointer-events-none absolute -right-24 -top-24 h-[540px] w-[540px] text-gold-500/10 sm:-right-16 sm:-top-16' />
      <SealMotif className='pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] text-gold-500/[0.06]' />

      <div className='relative mx-auto max-w-6xl px-6 pb-24 pt-20 sm:pb-32 sm:pt-28'>
        <div className='animate-fade-in flex items-center gap-3'>
          <Image
            src='/brand/submark.png'
            alt='Diet Univeerse'
            width={60}
            height={60}
            className='h-15 w-15 flex-none transition-transform duration-700 ease-out hover:rotate-[360deg]'
          />
          <p className='font-label text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-300'>
            An Education Initiative by Diet Univeerse
          </p>
        </div>

        <h1 className='animate-fade-up font-display mt-7 max-w-4xl text-balance text-[2.75rem] font-bold capitalize leading-[1.08] text-ivory sm:text-6xl lg:text-[4.5rem]'>
          The academy behind health &amp; nutrition&rsquo;s next practitioners.
        </h1>

        <p
          className='animate-fade-up mt-8 max-w-xl font-sans text-base leading-relaxed text-ivory/70 sm:text-lg'
          style={{ animationDelay: '120ms' }}
        >
          MIHN is an institutional home for certification in human performance,
          sports nutrition, fitness coaching and clinical supplementation —
          built as a growing academy, not a single course.
        </p>

        <div
          className='animate-fade-up mt-11 flex flex-wrap items-center gap-5'
          style={{ animationDelay: '220ms' }}
        >
          <Button href='#programs' variant='gold'>
            Explore Programs
          </Button>
          <Button href='/verify' variant='outline-ivory'>
            Verify a Certificate
          </Button>
        </div>

        <div
          className='animate-fade-up mt-20 grid max-w-2xl grid-cols-2 gap-x-10 gap-y-8 border-t border-ivory/10 pt-8 sm:grid-cols-4'
          style={{ animationDelay: '320ms' }}
        >
          {[
            ['Institutional', 'Academy structure, not a single course'],
            ['Standards-led', 'Governed by the MASB framework'],
            ['Verifiable', 'Every credential checks out publicly'],
            ['Growing', 'New programs added each cycle'],
          ].map(([title, desc]) => (
            <div key={title}>
              <p className='font-display text-lg text-gold-300'>{title}</p>
              <p className='mt-1 font-sans text-xs leading-snug text-ivory/55'>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
