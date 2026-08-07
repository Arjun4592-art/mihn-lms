import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { IconUserPlaceholder, IconCameraBadge } from '@/components/icons'

const FACULTY = [
  { name: 'Faculty Name', role: 'Program Lead · HPHN' },
  { name: 'Faculty Name', role: 'Program Lead · Elite Sports Nutritionist' },
  { name: 'Faculty Name', role: 'Program Lead · Elite Fitness Coach' },
  { name: 'Faculty Name', role: 'Program Lead · Master Personal Coach' },
]

export function Faculty() {
  return (
    <section
      id='faculty'
      className='relative overflow-hidden bg-navy-900 text-ivory'
    >
      <span
        aria-hidden
        className='pointer-events-none absolute right-4 top-6 select-none font-display text-[5rem] font-semibold leading-none text-ivory/[0.03] sm:text-[8rem]'
      >
        03
      </span>

      <div className='relative mx-auto max-w-6xl px-6 py-24 sm:py-28'>
        <Reveal>
          <Eyebrow tone='ivory'>Our Faculty</Eyebrow>
          <h2 className='font-display text-balance mt-6 max-w-2xl text-4xl font-medium leading-[1.15] text-ivory sm:text-5xl'>
            Meet the practitioners behind every certification.
          </h2>
          <p className='mt-7 max-w-2xl font-sans text-base leading-relaxed text-ivory/65'>
            MIHN faculty are appointed, not merely hired — each undergoes review
            by the Academic Standards Board before joining a program. Full
            faculty profiles, with photos, are published here as each
            program&rsquo;s teaching team is confirmed.
          </p>
        </Reveal>

        <div className='mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4'>
          {FACULTY.map((member, i) => (
            <Reveal key={`${member.name}-${i}`} delay={i * 70}>
              <div className='group h-full rounded-sm border border-ivory/10 bg-navy-800/40 p-6 text-center transition-colors duration-300 hover:border-gold-400/40 hover:bg-navy-800'>
                <div className='relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-ivory/25 bg-navy-900'>
                  <IconUserPlaceholder className='h-9 w-9 text-ivory/30' />
                  <span className='absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 ring-2 ring-navy-800'>
                    <IconCameraBadge className='h-3.5 w-3.5 text-gold-400' />
                  </span>
                </div>
                <h3 className='font-display mt-5 text-base font-semibold text-ivory'>
                  {member.name}
                </h3>
                <p className='mt-1 font-sans text-xs leading-snug text-ivory/55'>
                  {member.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
