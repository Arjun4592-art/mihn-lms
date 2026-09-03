'use client'

import type { User } from 'firebase/auth'

async function authedFetch(user: User, path: string, init?: RequestInit) {
  const token = await user.getIdToken()
  const res = await fetch(path, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`,
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
    },
    cache: 'no-store',
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`)
  }
  return data
}

export type ManualStatus = 'valid' | 'revoked' | 'pending'
export type ValidityOption = 'lifetime' | '2years' | '5years' | 'custom'

export type CertificateRecord = {
  certificateId: string
  credential: string
  learnerName: string
  issuedOn: string
  validity: ValidityOption
  validUntil?: string
  status: ManualStatus
  issuedBy: string
  createdAt?: string
  updatedAt?: string
}

export type CertificateInput = {
  certificateId: string
  credential: string
  learnerName: string
  issuedOn: string
  validity: ValidityOption
  validUntil?: string
  status?: ManualStatus
  issuedBy?: string
}

export function listCertificatesApi(user: User) {
  return authedFetch(user, '/api/admin/certificates') as Promise<{
    certificates: CertificateRecord[]
  }>
}

export function createCertificateApi(user: User, input: CertificateInput) {
  return authedFetch(user, '/api/admin/certificates', {
    method: 'POST',
    body: JSON.stringify(input),
  }) as Promise<{ certificate: CertificateRecord }>
}

export function updateCertificateApi(
  user: User,
  certificateId: string,
  input: Partial<CertificateInput>,
) {
  return authedFetch(
    user,
    `/api/admin/certificates/${encodeURIComponent(certificateId)}`,
    {
      method: 'PUT',
      body: JSON.stringify(input),
    },
  ) as Promise<{ certificate: CertificateRecord }>
}

export function deleteCertificateApi(user: User, certificateId: string) {
  return authedFetch(
    user,
    `/api/admin/certificates/${encodeURIComponent(certificateId)}`,
    {
      method: 'DELETE',
    },
  ) as Promise<{ ok: true }>
}
