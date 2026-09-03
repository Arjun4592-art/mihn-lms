import Image from 'next/image'
import { Eyebrow } from '@/components/ui/Eyebrow'

export function MasbHero() {
  return (
    <section className='relative overflow-hidden bg-navy-900 text-ivory'>
      {/* Faint background watermark of the official MASB seal */}
      <div
        aria-hidden
        className='pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] opacity-[0.07] sm:-right-24 sm:-top-32 sm:h-[680px] sm:w-[680px]'
      >
        <Image
          src='/masb/masb-seal.png'
          alt=''
          fill
          className='object-contain'
          priority
        />
      </div>

      <div className='relative mx-auto max-w-6xl px-6 pb-20 pt-20 sm:pb-24 sm:pt-28'>
        <div className='grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]'>
          <div>
            <Eyebrow tone='ivory'>Governance</Eyebrow>
            <h1 className='font-display text-balance mt-6 max-w-3xl text-4xl font-medium leading-[1.1] text-ivory sm:text-6xl'>
              The MIHN Academic Standards Board.
            </h1>
            <p className='mt-7 max-w-2xl font-sans text-base leading-relaxed text-ivory/65 sm:text-lg'>
              MASB is the academic authority behind every MIHN program — the
              body that sets curriculum standards, approves faculty, defines
              assessment and governs certification integrity across the
              institute.
            </p>
          </div>

          {/* Foreground seal — the real MASB mark, front and center */}
          <div className='mx-auto w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px]'>
            <Image
              src='/masb/masb-seal.png'
              alt='Official seal of the MIHN Academic Standards Board — established 2026'
              width={880}
              height={880}
              sizes='(min-width: 1024px) 300px, 220px'
              className='h-auto w-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.4)]'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
