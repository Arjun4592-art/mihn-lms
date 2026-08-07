'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import {
  IconMail,
  IconPhone,
  IconPin,
  IconLoader,
  IconAlert,
} from '@/components/icons'

const PROGRAM_OPTIONS = [
  'Human Performance & Health Nutritionist',
  'Elite Sports Nutritionist',
  'Elite Fitness Coach',
  'Master Personal Coach',
  'Master Supplementation Specialist',
  'General enquiry',
]

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [program, setProgram] = useState('')
  const [message, setMessage] = useState('')
  const [state, setState] = useState<SubmitState>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setState('submitting')
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, program, message }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      setState('success')
      setName('')
      setEmail('')
      setProgram('')
      setMessage('')
    } catch (err) {
      setState('error')
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      )
    }
  }

  const field =
    'w-full rounded-sm border border-navy-900/15 bg-white px-3 py-2.5 font-sans text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-gold-500'
  const label =
    'font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-faint'

  return (
    <section id='contact' className='relative overflow-hidden bg-paper'>
      <span
        aria-hidden
        className='pointer-events-none absolute right-4 top-6 select-none font-display text-[5rem] font-semibold leading-none text-navy-900/[0.03] sm:text-[8rem]'
      >
        07
      </span>

      <div className='relative mx-auto max-w-6xl px-6 py-24 sm:py-28'>
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
          <h2 className='font-display text-balance mt-6 max-w-2xl text-4xl font-medium leading-[1.15] text-navy-900 sm:text-5xl'>
            Questions about a program or your credential?
          </h2>
          <p className='mt-6 max-w-xl font-sans text-base leading-relaxed text-ink-soft'>
            Reach the admissions team directly, or send a note below — we
            typically reply within one to two working days.
          </p>
        </Reveal>

        <div className='mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16'>
          <Reveal from='left' className='space-y-8'>
            <a
              href='mailto:mihninstitute@gmail.com'
              className='group flex items-start gap-4'
            >
              <span className='flex h-10 w-10 flex-none items-center justify-center rounded-full border border-navy-900/15 bg-ivory transition-colors group-hover:border-gold-500'>
                <IconMail className='h-4 w-4 text-gold-600' />
              </span>
              <div>
                <p className={label}>Email</p>
                <p className='mt-1 font-sans text-sm text-ink transition-colors group-hover:text-gold-700'>
                  mihninstitute@gmail.com
                </p>
              </div>
            </a>

            <a
              href='tel:+917357325855'
              className='group flex items-start gap-4'
            >
              <span className='flex h-10 w-10 flex-none items-center justify-center rounded-full border border-navy-900/15 bg-ivory transition-colors group-hover:border-gold-500'>
                <IconPhone className='h-4 w-4 text-gold-600' />
              </span>
              <div>
                <p className={label}>Phone</p>
                <p className='mt-1 font-sans text-sm text-ink transition-colors group-hover:text-gold-700'>
                  +91 73573 25855
                </p>
              </div>
            </a>

            <div className='flex items-start gap-4'>
              <span className='flex h-10 w-10 flex-none items-center justify-center rounded-full border border-navy-900/15 bg-ivory'>
                <IconPin className='h-4 w-4 text-gold-600' />
              </span>
              <div>
                <p className={label}>Location</p>
                <p className='mt-1 font-sans text-sm leading-relaxed text-ink-soft'>
                  Diet Univeerse Health Care
                  <br />
                  (MIHN – Multiverse Institute of Health &amp; Nutrition)
                  <br />
                  Block A, Parsi Building, Abu Road
                  <br />
                  Ambaji Road, Sirohi, Rajasthan – 307026
                </p>
              </div>
            </div>

            <p className='border-t border-paper-line pt-6 font-sans text-sm text-ink-soft'>
              Verifying a credential instead?{' '}
              <Link
                href='/verify'
                className='text-gold-600 underline decoration-gold-400/40 underline-offset-4 hover:text-gold-700'
              >
                Use the verification portal
              </Link>
              .
            </p>
          </Reveal>

          <Reveal delay={100}>
            {state === 'success' ? (
              <div className='animate-fade-up flex items-start gap-4 rounded-sm border border-[color:var(--color-status-verified)] bg-[color:var(--color-status-verified-soft)] p-7'>
                <span aria-hidden className='text-lg leading-none'>
                  🟢
                </span>
                <div>
                  <p className='font-display text-lg text-navy-900'>
                    Message sent
                  </p>
                  <p className='mt-1 font-sans text-sm leading-relaxed text-ink-soft'>
                    Thanks for reaching out — the admissions team will get back
                    to you within one to two working days.
                  </p>
                  <button
                    type='button'
                    onClick={() => setState('idle')}
                    className='font-label mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600 underline underline-offset-4'
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className='grid gap-5 sm:grid-cols-2'
              >
                <div>
                  <label className={label} htmlFor='contact-name'>
                    Full Name
                  </label>
                  <input
                    id='contact-name'
                    required
                    className={`${field} mt-1.5`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Your full name'
                  />
                </div>

                <div>
                  <label className={label} htmlFor='contact-email'>
                    Email
                  </label>
                  <input
                    id='contact-email'
                    type='email'
                    required
                    className={`${field} mt-1.5`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='you@example.com'
                  />
                </div>

                <div className='sm:col-span-2'>
                  <label className={label} htmlFor='contact-program'>
                    Which program are you enquiring about?
                  </label>
                  <select
                    id='contact-program'
                    className={`${field} mt-1.5`}
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                  >
                    <option value=''>Select a program</option>
                    {PROGRAM_OPTIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='sm:col-span-2'>
                  <label className={label} htmlFor='contact-message'>
                    Message
                  </label>
                  <textarea
                    id='contact-message'
                    required
                    rows={5}
                    className={`${field} mt-1.5 resize-none`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='How can we help?'
                  />
                </div>

                {state === 'error' && error && (
                  <div className='sm:col-span-2 flex items-start gap-3 rounded-sm border border-ink-faint/25 bg-ivory p-4'>
                    <IconAlert className='h-5 w-5 flex-none text-gold-600' />
                    <p className='font-sans text-sm text-ink-soft'>{error}</p>
                  </div>
                )}

                <div className='sm:col-span-2'>
                  <button
                    type='submit'
                    disabled={state === 'submitting'}
                    className='font-label inline-flex items-center gap-2 rounded-sm bg-navy-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-navy-800 disabled:opacity-60'
                  >
                    {state === 'submitting' ? (
                      <>
                        <IconLoader className='h-4 w-4 animate-spin' />
                        Sending
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
