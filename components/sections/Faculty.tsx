import Image from 'next/image'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { IconCap, IconSeal, IconBook, IconShieldCheck } from '@/components/icons'

type Credential = { label: string; icon: 'cap' | 'seal' | 'book' | 'shield' }

const ICONS: Record<Credential['icon'], typeof IconCap> = {
  cap: IconCap,
  seal: IconSeal,
  book: IconBook,
  shield: IconShieldCheck,
}

const FACULTY: {
  name: string
  badge: string
  title: string
  photo: string
  credentials: Credential[]
}[] = [
  {
    name: 'Dr. Subrata Dey',
    badge: 'Faculty Member',
    title: 'Founder, Subrata Pain Relief Clinic',
    photo: '/faculty/subrata-dey.jpg',
    credentials: [
      { label: 'Founder — Subrata Pain Relief Clinic', icon: 'shield' },
      { label: 'Teaching Faculty — MIHN', icon: 'cap' },
    ],
  },
  {
    name: 'Dt. Deepali',
    badge: 'Senior Expert',
    title: 'MSc Clinical Nutrition & Dietetics',
    photo: '/faculty/deepali.jpg',
    credentials: [
      { label: 'MSc Clinical Nutrition & Dietetics', icon: 'cap' },
      { label: 'Certified Diabetic Educator', icon: 'seal' },
      { label: 'Sports & Medicine Nutrition', icon: 'shield' },
      { label: '14 years multispeciality hospital experience', icon: 'book' },
    ],
  },
  {
    name: 'Ayush Verma',
    badge: 'Manager',
    title: 'MIHN General Manager',
    photo: '/faculty/ayush-verma.jpg',
    credentials: [
      { label: 'ACE Certified Personal Trainer', icon: 'seal' },
      { label: 'PG in Nutrition & Dietetics', icon: 'cap' },
      { label: 'Precision Nutrition Level 1 & 2', icon: 'shield' },
      { label: 'CSCS — pursuing', icon: 'book' },
    ],
  },
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
            MIHN faculty are appointed, not merely hired — each undergoes
            review by the Academic Standards Board before joining a program.
          </p>
        </Reveal>

        <div className='mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {FACULTY.map((member, i) => (
            <Reveal key={member.name} delay={i * 80}>
              <div className='group flex h-full flex-col overflow-hidden rounded-sm border border-ivory/10 bg-navy-800/40 transition-colors duration-300 hover:border-gold-400/40 hover:bg-navy-800'>
                <div className='relative aspect-[4/5] w-full overflow-hidden bg-navy-950'>
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
                    className='object-cover object-top grayscale-[15%] transition-transform duration-700 ease-out group-hover:scale-[1.04]'
                  />
                  <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/0 to-navy-950/0' />
                  <span className='absolute left-4 top-4 rounded-full border border-gold-400/40 bg-navy-950/70 px-3 py-1 font-label text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-300 backdrop-blur-sm'>
                    {member.badge}
                  </span>
                </div>

                <div className='flex flex-1 flex-col p-6 text-left'>
                  <h3 className='font-display text-lg font-semibold text-ivory'>
                    {member.name}
                  </h3>
                  <p className='mt-1 font-sans text-xs leading-snug text-gold-300/90'>
                    {member.title}
                  </p>

                  <ul className='mt-4 space-y-2 border-t border-ivory/10 pt-4'>
                    {member.credentials.map((c) => {
                      const Icon = ICONS[c.icon]
                      return (
                        <li
                          key={c.label}
                          className='flex items-start gap-2.5 font-sans text-[11.5px] leading-snug text-ivory/60'
                        >
                          <Icon className='mt-0.5 h-3.5 w-3.5 flex-none text-gold-400' />
                          <span>{c.label}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
