'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { clientAuth } from '@/lib/firebaseClient'
import {
  listCertificatesApi,
  createCertificateApi,
  updateCertificateApi,
  deleteCertificateApi,
  type CertificateRecord,
  type CertificateInput,
} from '@/lib/adminApi'
import { AdminLogin } from '@/components/admin/AdminLogin'
import { CertificateForm } from '@/components/admin/CertificateForm'
import { QrCodeButton } from '@/components/admin/QrCodeButton'
import {
  IconLogout,
  IconPlus,
  IconTrash,
  IconLoader,
  IconIdCard,
} from '@/components/icons'

type DisplayStatus = 'valid' | 'expired' | 'revoked' | 'pending'

function statusOf(cert: CertificateRecord): DisplayStatus {
  if (cert.status === 'revoked') return 'revoked'
  if (cert.status === 'pending') return 'pending'
  if (cert.validity !== 'lifetime' && cert.validUntil) {
    const today = new Date().toISOString().slice(0, 10)
    if (today > cert.validUntil) return 'expired'
  }
  return 'valid'
}

const VALIDITY_LABEL: Record<string, string> = {
  lifetime: 'Lifetime',
  '2years': '2 Years',
  '5years': '5 Years',
  custom: 'Custom',
}

const STATUS_STYLE: Record<string, string> = {
  valid: 'text-[color:var(--color-status-verified)]',
  expired: 'text-[color:var(--color-status-expired)]',
  revoked: 'text-[color:var(--color-status-error)]',
  pending: 'text-ink-faint',
}

const STATUS_DOT: Record<string, string> = {
  valid: '🟢',
  expired: '🟠',
  revoked: '🔴',
  pending: '⚪',
}

const STATUS_FILTERS: { value: 'all' | DisplayStatus; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'valid', label: 'Valid' },
  { value: 'expired', label: 'Expired' },
  { value: 'revoked', label: 'Revoked' },
  { value: 'pending', label: 'Pending' },
]

export function AdminApp() {
  const [user, setUser] = useState<User | null>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [authorized, setAuthorized] = useState(true)

  const [certificates, setCertificates] = useState<CertificateRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<CertificateRecord | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | DisplayStatus>('all')

  useEffect(() => {
    const unsub = onAuthStateChanged(clientAuth, (u) => {
      setUser(u)
      setAuthChecked(true)
    })
    return unsub
  }, [])

  const refresh = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setLoadError(null)
    try {
      const { certificates } = await listCertificatesApi(user)
      setCertificates(certificates)
      setAuthorized(true)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load certificates.'
      if (message.toLowerCase().includes('not authorized')) {
        setAuthorized(false)
      } else {
        setLoadError(message)
      }
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user) refresh()
  }, [user, refresh])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return certificates.filter((c) => {
      const matchesQuery =
        !q ||
        c.certificateId.toLowerCase().includes(q) ||
        c.learnerName.toLowerCase().includes(q) ||
        c.credential.toLowerCase().includes(q)
      const matchesStatus =
        statusFilter === 'all' || statusOf(c) === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [certificates, search, statusFilter])

  async function handleCreate(input: CertificateInput) {
    if (!user) return
    await createCertificateApi(user, input)
    setShowForm(false)
    await refresh()
  }

  async function handleUpdate(input: CertificateInput) {
    if (!user || !editing) return
    await updateCertificateApi(user, editing.certificateId, input)
    setEditing(null)
    await refresh()
  }

  async function handleDelete(certificateId: string) {
    if (!user) return
    if (
      !confirm(
        `Deactivate/delete certificate ${certificateId}? This cannot be undone.`,
      )
    )
      return
    await deleteCertificateApi(user, certificateId)
    await refresh()
  }

  async function handleToggleRevoke(cert: CertificateRecord) {
    if (!user) return
    await updateCertificateApi(user, cert.certificateId, {
      status: cert.status === 'revoked' ? 'valid' : 'revoked',
    })
    await refresh()
  }

  if (!authChecked) {
    return (
      <div className='flex min-h-[50vh] items-center justify-center'>
        <IconLoader className='h-6 w-6 animate-spin text-navy-900/40' />
      </div>
    )
  }

  if (!user) {
    return <AdminLogin />
  }

  if (!authorized) {
    return (
      <div className='mx-auto max-w-md px-6 py-24 text-center'>
        <p className='font-display text-2xl text-navy-900'>Not authorized</p>
        <p className='mt-3 font-sans text-sm text-ink-soft'>
          {user.email} is signed in but isn&rsquo;t on the MIHN admin
          allow-list. Ask whoever manages the deployment to add your email to{' '}
          <code className='font-mono text-xs'>ADMIN_EMAILS</code>.
        </p>
        <button
          onClick={() => signOut(clientAuth)}
          className='font-label mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600 underline underline-offset-4'
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-6xl px-6 py-12'>
      <div className='flex flex-wrap items-center justify-between gap-4 border-b border-navy-900/10 pb-6'>
        <div>
          <p className='font-label text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-600'>
            Internal — Not Public
          </p>
          <h1 className='font-display mt-2 text-3xl text-navy-900'>
            Certificate Records
          </h1>
          <p className='mt-1 font-sans text-sm text-ink-soft'>
            Signed in as {user.email}
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => {
              setEditing(null)
              setShowForm((v) => !v)
            }}
            className='font-label inline-flex items-center gap-2 rounded-sm bg-navy-900 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory hover:bg-navy-800'
          >
            <IconPlus className='h-4 w-4' />
            Add Certificate
          </button>
          <button
            onClick={() => signOut(clientAuth)}
            title='Sign out'
            className='inline-flex items-center gap-2 rounded-sm border border-navy-900/15 px-4 py-2.5 text-navy-900 hover:border-gold-500 hover:text-gold-600'
          >
            <IconLogout className='h-4 w-4' />
          </button>
        </div>
      </div>

      {showForm && (
        <div className='mt-8 rounded-sm border border-navy-900/10 bg-paper p-6'>
          <p className='font-label mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-800'>
            New Certificate
          </p>
          <CertificateForm
            submitLabel='Add Certificate'
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {editing && (
        <div className='mt-8 rounded-sm border border-gold-400/40 bg-paper p-6'>
          <p className='font-label mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-800'>
            Edit {editing.certificateId}
          </p>
          <CertificateForm
            initial={editing}
            submitLabel='Save Changes'
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      <div className='mt-8 flex flex-wrap items-center gap-3'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search by Certificate ID or Learner Name…'
          className='w-full max-w-md rounded-sm border border-navy-900/15 bg-white px-3 py-2 font-sans text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-gold-500'
        />
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as 'all' | DisplayStatus)
          }
          className='rounded-sm border border-navy-900/15 bg-white px-3 py-2 font-sans text-sm text-ink focus:outline-none focus:border-gold-500'
        >
          {STATUS_FILTERS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
        {loading && (
          <IconLoader className='h-4 w-4 animate-spin text-navy-900/40' />
        )}
      </div>

      {loadError && (
        <p className='mt-4 font-sans text-sm text-[color:var(--color-status-error)]'>
          {loadError}
        </p>
      )}

      <div className='mt-6 overflow-x-auto rounded-sm border border-navy-900/10'>
        <table className='w-full min-w-[900px] border-collapse text-left'>
          <thead>
            <tr className='border-b border-navy-900/10 bg-paper'>
              {[
                'Status',
                'Certificate ID',
                'Learner',
                'Credential',
                'Issued On',
                'Validity',
                'Valid Until',
                '',
              ].map((h) => (
                <th
                  key={h}
                  className='font-label px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint'
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((cert) => {
              const status = statusOf(cert)
              return (
                <tr
                  key={cert.certificateId}
                  className='border-b border-navy-900/5 last:border-0'
                >
                  <td
                    className={`px-4 py-3 font-sans text-sm ${STATUS_STYLE[status]}`}
                  >
                    {STATUS_DOT[status]} {status}
                  </td>
                  <td className='px-4 py-3 font-mono text-sm text-ink'>
                    {cert.certificateId}
                  </td>
                  <td className='px-4 py-3 font-sans text-sm text-ink'>
                    {cert.learnerName}
                  </td>
                  <td className='px-4 py-3 font-sans text-sm text-ink-soft'>
                    {cert.credential}
                  </td>
                  <td className='px-4 py-3 font-sans text-sm text-ink-soft'>
                    {cert.issuedOn}
                  </td>
                  <td className='px-4 py-3 font-sans text-sm text-ink-soft'>
                    {VALIDITY_LABEL[cert.validity] ?? cert.validity}
                  </td>
                  <td className='px-4 py-3 font-sans text-sm text-ink-soft'>
                    {cert.validity === 'lifetime'
                      ? '—'
                      : (cert.validUntil ?? '—')}
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex items-center gap-4'>
                      <QrCodeButton certificateId={cert.certificateId} />
                      <button
                        onClick={() => {
                          setShowForm(false)
                          setEditing(cert)
                        }}
                        className='font-label text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-800 hover:text-gold-600'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleRevoke(cert)}
                        className='font-label text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-800 hover:text-gold-600'
                      >
                        {cert.status === 'revoked' ? 'Unrevoke' : 'Revoke'}
                      </button>
                      <button
                        onClick={() => handleDelete(cert.certificateId)}
                        title='Delete'
                        className='text-ink-faint hover:text-[color:var(--color-status-error)]'
                      >
                        <IconTrash className='h-4 w-4' />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={8} className='px-4 py-14 text-center'>
                  <div className='flex flex-col items-center gap-3 text-ink-faint'>
                    <IconIdCard className='h-8 w-8' />
                    <p className='font-sans text-sm'>
                      {certificates.length === 0
                        ? 'No certificates yet — add the first one above.'
                        : 'No certificates match your search.'}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
