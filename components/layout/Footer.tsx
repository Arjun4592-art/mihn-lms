import Image from 'next/image'
import Link from 'next/link'
import {
  IconMail,
  IconPhone,
  IconPin,
  IconInstagram,
  IconLinkedin,
  IconFacebook,
} from '@/components/icons'

const EXPLORE_LINKS = [
  { href: '/#programs', label: 'Certification Programs' },
  { href: '/#faculty', label: 'Faculty' },
  { href: '/#benefits', label: 'Student Benefits' },
  { href: '/#certificate', label: 'Sample Certificate' },
]

const INSTITUTE_LINKS = [
  { href: '/masb', label: 'Academic Standards Board' },
  { href: '/verify', label: 'Verify a Certificate' },
  { href: '/#about', label: 'About MIHN' },
  { href: '/#contact', label: 'Contact' },
]

const LEGAL_LINKS = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms & Conditions' },
  { href: '/refund-policy', label: 'Refund Policy' },
]

export default function Footer() {
  return (
    <footer className='bg-navy-900 text-ivory/80'>
      <div className='mx-auto max-w-6xl px-6 pt-16 pb-10'>
        <div className='grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]'>
          <div>
            <div className='flex items-center gap-3'>
              <Image
                src='/brand/logo-navy.jpg'
                alt='MIHN — Multiverse Institute of Health &amp; Nutrition'
                width={220}
                height={185}
                className='h-16 w-auto'
              />
              <Image
                src='/brand/submark.png'
                alt='Diet Univeerse'
                width={80}
                height={80}
                className='h-20 w-20 flex-none rounded-full transition-transform duration-700 ease-out hover:rotate-[30deg]'
              />
            </div>
            <p className='mt-5 max-w-xs font-sans text-sm leading-relaxed text-ivory/60'>
              An education initiative by Diet Univeerse, building certification
              pathways for practitioners in health, nutrition, sports science
              and fitness coaching.
            </p>
            <div className='mt-6 flex items-center gap-4'>
              <a
                href='#'
                aria-label='MIHN on Instagram'
                className='text-ivory/60 transition-all duration-200 hover:-translate-y-0.5 hover:text-gold-400'
              >
                <IconInstagram className='h-5 w-5' />
              </a>
              <a
                href='#'
                aria-label='MIHN on LinkedIn'
                className='text-ivory/60 transition-all duration-200 hover:-translate-y-0.5 hover:text-gold-400'
              >
                <IconLinkedin className='h-5 w-5' />
              </a>
              <a
                href='#'
                aria-label='MIHN on Facebook'
                className='text-ivory/60 transition-all duration-200 hover:-translate-y-0.5 hover:text-gold-400'
              >
                <IconFacebook className='h-5 w-5' />
              </a>
            </div>
          </div>

          <div>
            <p className='font-label text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-300'>
              Explore
            </p>
            <ul className='mt-5 space-y-3'>
              {EXPLORE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className='font-sans text-sm text-ivory/65 transition-colors hover:text-ivory'
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className='font-label text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-300'>
              Institute
            </p>
            <ul className='mt-5 space-y-3'>
              {INSTITUTE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className='font-sans text-sm text-ivory/65 transition-colors hover:text-ivory'
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className='font-label text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-300'>
              Reach Us
            </p>
            <ul className='mt-5 space-y-4'>
              <li className='flex items-start gap-3'>
                <IconMail className='mt-0.5 h-4 w-4 flex-none text-gold-400' />
                <a
                  href='mailto:mihninstitute@gmail.com'
                  className='font-sans text-sm text-ivory/65 transition-colors hover:text-ivory'
                >
                  mihninstitute@gmail.com
                </a>
              </li>
              <li className='flex items-start gap-3'>
                <IconPhone className='mt-0.5 h-4 w-4 flex-none text-gold-400' />
                <a
                  href='tel:+917357325855'
                  className='font-sans text-sm text-ivory/65 transition-colors hover:text-ivory'
                >
                  +91 73573 25855
                </a>
              </li>
              <li className='flex items-start gap-3'>
                <IconPin className='mt-0.5 h-4 w-4 flex-none text-gold-400' />
                <span className='font-sans text-sm leading-relaxed text-ivory/65'>
                  Diet Univeerse Health Care
                  <br />
                  (MIHN – Multiverse Institute of Health &amp; Nutrition)
                  <br />
                  Block A, Parsi Building, Abu Road
                  <br />
                  Ambaji Road, Sirohi, Rajasthan – 307026
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-7 text-center sm:flex-row sm:text-left'>
          <p className='font-sans text-xs text-ivory/45'>
            © {new Date().getFullYear()} Multiverse Institute of Health &amp;
            Nutrition. An Education Initiative by Diet Univeerse. All rights
            reserved.
          </p>
          <p className='font-sans text-xs text-ivory/45'>
            MIHN credentials are verifiable via our{' '}
            <Link href='/verify' className='text-gold-400 hover:text-gold-300'>
              Certificate Verification
            </Link>{' '}
            portal.
          </p>
        </div>

        <nav
          aria-label='Legal'
          className='mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center sm:justify-start sm:text-left'
        >
          {LEGAL_LINKS.map((l, i) => (
            <span key={l.href} className='flex items-center gap-2'>
              <Link
                href={l.href}
                className='font-sans text-xs text-ivory/45 transition-colors hover:text-ivory'
              >
                {l.label}
              </Link>
              {i < LEGAL_LINKS.length - 1 && (
                <span aria-hidden className='text-ivory/25'>
                  •
                </span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </footer>
  )
}
