'use client'

import { FormEvent, useState } from 'react'
import type {
  CertificateInput,
  CertificateRecord,
  ValidityOption,
  ManualStatus,
} from '@/lib/adminApi'

// Suggestions only — NOT a fixed/limited list. The Admin can type any
// current or future MIHN credential/course/combo title freely.
const CREDENTIAL_SUGGESTIONS = [
  'Elite Fitness Coach',
  'Personal Trainer',
  'Nutrition Coach',
  'Personal Trainer & Nutrition Coach',
  'Clinical Nutrition Coach',
]

const VALIDITY_OPTIONS: { value: ValidityOption; label: string }[] = [
  { value: 'lifetime', label: 'Lifetime' },
  { value: '2years', label: '2 Years' },
  { value: '5years', label: '5 Years' },
  { value: 'custom', label: 'Custom' },
]

const STATUS_OPTIONS: { value: ManualStatus; label: string }[] = [
  { value: 'valid', label: 'Valid' },
  { value: 'pending', label: 'Pending' },
  { value: 'revoked', label: 'Revoked' },
]

const emptyForm: CertificateInput = {
  certificateId: '',
  credential: '',
  learnerName: '',
  issuedOn: '',
  validity: 'lifetime',
  validUntil: '',
  status: 'valid',
  issuedBy: 'MIHN – Multiverse Institute of Health & Nutrition',
}

export function CertificateForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial?: CertificateRecord
  submitLabel: string
  onSubmit: (input: CertificateInput) => Promise<void>
  onCancel?: () => void
}) {
  const [form, setForm] = useState<CertificateInput>(
    initial
      ? {
          certificateId: initial.certificateId,
          credential: initial.credential,
          learnerName: initial.learnerName,
          issuedOn: initial.issuedOn,
          validity: initial.validity,
          validUntil: initial.validUntil ?? '',
          status: initial.status,
          issuedBy: initial.issuedBy,
        }
      : emptyForm,
  )
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function update<K extends keyof CertificateInput>(
    key: K,
    value: CertificateInput[K],
  ) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit(form)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  const field =
    'w-full rounded-sm border border-navy-900/15 bg-white px-3 py-2 font-sans text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-gold-500'
  const label =
    'font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-faint'

  return (
    <form onSubmit={handleSubmit} className='grid gap-5 sm:grid-cols-2'>
      <div className='sm:col-span-2'>
        <label className={label} htmlFor='credential'>
          Credential
        </label>
        <input
          id='credential'
          list='mihn-credential-list'
          required
          className={`${field} mt-1.5`}
          value={form.credential}
          onChange={(e) => update('credential', e.target.value)}
          placeholder='e.g. Elite Fitness Coach — or any current/future MIHN credential'
        />
        <datalist id='mihn-credential-list'>
          {CREDENTIAL_SUGGESTIONS.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <p className='mt-1 font-sans text-xs text-ink-faint'>
          Free text — not limited to a fixed course list. Type any single or
          combo credential.
        </p>
      </div>

      <div>
        <label className={label} htmlFor='certificateId'>
          Certificate ID / Certificate No.
        </label>
        <input
          id='certificateId'
          required
          disabled={!!initial}
          className={`${field} mt-1.5 font-mono disabled:opacity-60`}
          value={form.certificateId}
          onChange={(e) => update('certificateId', e.target.value)}
          placeholder='Any format — e.g. EFC-001, MIHN/2026/EFC/001'
        />
        <p className='mt-1 font-sans text-xs text-ink-faint'>
          Fully manual. No fixed format, prefix, or numbering system — only
          uniqueness is enforced.
        </p>
      </div>

      <div>
        <label className={label} htmlFor='learnerName'>
          Learner
        </label>
        <input
          id='learnerName'
          required
          className={`${field} mt-1.5`}
          value={form.learnerName}
          onChange={(e) => update('learnerName', e.target.value)}
          placeholder='e.g. Rahul Sharma'
        />
      </div>

      <div>
        <label className={label} htmlFor='issuedOn'>
          Issued On
        </label>
        <input
          id='issuedOn'
          type='date'
          required
          className={`${field} mt-1.5`}
          value={form.issuedOn}
          onChange={(e) => update('issuedOn', e.target.value)}
        />
      </div>

      <div>
        <label className={label} htmlFor='validity'>
          Validity
        </label>
        <select
          id='validity'
          required
          className={`${field} mt-1.5`}
          value={form.validity}
          onChange={(e) => update('validity', e.target.value as ValidityOption)}
        >
          {VALIDITY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {form.validity === 'custom' && (
        <div>
          <label className={label} htmlFor='validUntil'>
            Valid Until / Expiry Date
          </label>
          <input
            id='validUntil'
            type='date'
            required
            className={`${field} mt-1.5`}
            value={form.validUntil}
            onChange={(e) => update('validUntil', e.target.value)}
          />
        </div>
      )}

      <div>
        <label className={label} htmlFor='status'>
          Certificate Status
        </label>
        <select
          id='status'
          required
          className={`${field} mt-1.5`}
          value={form.status}
          onChange={(e) => update('status', e.target.value as ManualStatus)}
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <p className='mt-1 font-sans text-xs text-ink-faint'>
          Automatically switches to Expired once the expiry date passes.
        </p>
      </div>

      <div>
        <label className={label} htmlFor='issuedBy'>
          Issued By
        </label>
        <input
          id='issuedBy'
          required
          className={`${field} mt-1.5`}
          value={form.issuedBy}
          onChange={(e) => update('issuedBy', e.target.value)}
        />
      </div>

      {error && (
        <p className='sm:col-span-2 font-sans text-sm text-[color:var(--color-status-error)]'>
          {error}
        </p>
      )}

      <div className='sm:col-span-2 flex items-center gap-3 pt-2'>
        <button
          type='submit'
          disabled={submitting}
          className='font-label rounded-sm bg-navy-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory hover:bg-navy-800 disabled:opacity-60'
        >
          {submitting ? 'Saving…' : submitLabel}
        </button>
        {onCancel && (
          <button
            type='button'
            onClick={onCancel}
            className='font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint hover:text-navy-900'
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
