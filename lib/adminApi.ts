"use client";

import type { User } from "firebase/auth";

async function authedFetch(user: User, path: string, init?: RequestInit) {
  const token = await user.getIdToken();
  const res = await fetch(path, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`,
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
    },
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}

export type CertificateRecord = {
  certificateId: string;
  studentId: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  validUntil: string;
  grade: string;
  issuedBy: string;
  revoked?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CertificateInput = {
  certificateId: string;
  studentId: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  validUntil: string;
  grade: string;
  issuedBy?: string;
};

export function listCertificatesApi(user: User) {
  return authedFetch(user, "/api/admin/certificates") as Promise<{
    certificates: CertificateRecord[];
  }>;
}

export function createCertificateApi(user: User, input: CertificateInput) {
  return authedFetch(user, "/api/admin/certificates", {
    method: "POST",
    body: JSON.stringify(input),
  }) as Promise<{ certificate: CertificateRecord }>;
}

export function updateCertificateApi(
  user: User,
  certificateId: string,
  input: Partial<CertificateInput> & { revoked?: boolean }
) {
  return authedFetch(user, `/api/admin/certificates/${encodeURIComponent(certificateId)}`, {
    method: "PUT",
    body: JSON.stringify(input),
  }) as Promise<{ certificate: CertificateRecord }>;
}

export function deleteCertificateApi(user: User, certificateId: string) {
  return authedFetch(user, `/api/admin/certificates/${encodeURIComponent(certificateId)}`, {
    method: "DELETE",
  }) as Promise<{ ok: true }>;
}
