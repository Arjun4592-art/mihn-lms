"use client";

import { FormEvent, useState } from "react";
import type { CertificateInput, CertificateRecord } from "@/lib/adminApi";

const COURSE_PREFIXES: { label: string; prefix: string }[] = [
  { label: "Elite Fitness Coach Certification", prefix: "EFC" },
  { label: "Master Personal Coach", prefix: "MPC" },
  { label: "Human Performance & Health Nutritionist", prefix: "HPHN" },
  { label: "Master Sports Supplement Specialist", prefix: "MSS" },
];

const emptyForm: CertificateInput = {
  certificateId: "",
  studentId: "",
  studentName: "",
  courseName: "",
  issueDate: "",
  validUntil: "",
  grade: "Distinction",
  issuedBy: "MIHN – Multiverse Institute of Health & Nutrition",
};

export function CertificateForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial?: CertificateRecord;
  submitLabel: string;
  onSubmit: (input: CertificateInput) => Promise<void>;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState<CertificateInput>(
    initial
      ? {
          certificateId: initial.certificateId,
          studentId: initial.studentId,
          studentName: initial.studentName,
          courseName: initial.courseName,
          issueDate: initial.issueDate,
          validUntil: initial.validUntil,
          grade: initial.grade,
          issuedBy: initial.issuedBy,
        }
      : emptyForm
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof CertificateInput>(key: K, value: CertificateInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  const field =
    "w-full rounded-sm border border-navy-900/15 bg-white px-3 py-2 font-sans text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-gold-500";
  const label = "font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-faint";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className={label} htmlFor="courseName">
          Course Name
        </label>
        <input
          id="courseName"
          list="mihn-course-list"
          required
          className={`${field} mt-1.5`}
          value={form.courseName}
          onChange={(e) => update("courseName", e.target.value)}
          placeholder="e.g. Elite Fitness Coach Certification"
        />
        <datalist id="mihn-course-list">
          {COURSE_PREFIXES.map((c) => (
            <option key={c.prefix} value={c.label} />
          ))}
        </datalist>
      </div>

      <div>
        <label className={label} htmlFor="certificateId">
          Certificate ID
        </label>
        <input
          id="certificateId"
          required
          disabled={!!initial}
          className={`${field} mt-1.5 font-mono disabled:opacity-60`}
          value={form.certificateId}
          onChange={(e) => update("certificateId", e.target.value.toUpperCase())}
          placeholder="e.g. EFC-000127"
        />
      </div>

      <div>
        <label className={label} htmlFor="studentId">
          Student ID (internal)
        </label>
        <input
          id="studentId"
          required
          className={`${field} mt-1.5 font-mono`}
          value={form.studentId}
          onChange={(e) => update("studentId", e.target.value.toUpperCase())}
          placeholder="e.g. MIHN0001"
        />
      </div>

      <div className="sm:col-span-2">
        <label className={label} htmlFor="studentName">
          Student Name
        </label>
        <input
          id="studentName"
          required
          className={`${field} mt-1.5`}
          value={form.studentName}
          onChange={(e) => update("studentName", e.target.value)}
          placeholder="e.g. Rahul Sharma"
        />
      </div>

      <div>
        <label className={label} htmlFor="issueDate">
          Issue Date
        </label>
        <input
          id="issueDate"
          type="date"
          required
          className={`${field} mt-1.5`}
          value={form.issueDate}
          onChange={(e) => update("issueDate", e.target.value)}
        />
      </div>

      <div>
        <label className={label} htmlFor="validUntil">
          Valid Until
        </label>
        <input
          id="validUntil"
          type="date"
          required
          className={`${field} mt-1.5`}
          value={form.validUntil}
          onChange={(e) => update("validUntil", e.target.value)}
        />
      </div>

      <div>
        <label className={label} htmlFor="grade">
          Grade
        </label>
        <select
          id="grade"
          required
          className={`${field} mt-1.5`}
          value={form.grade}
          onChange={(e) => update("grade", e.target.value)}
        >
          <option>Distinction</option>
          <option>First Class</option>
          <option>Pass</option>
        </select>
      </div>

      <div>
        <label className={label} htmlFor="issuedBy">
          Issued By
        </label>
        <input
          id="issuedBy"
          required
          className={`${field} mt-1.5`}
          value={form.issuedBy}
          onChange={(e) => update("issuedBy", e.target.value)}
        />
      </div>

      {error && (
        <p className="sm:col-span-2 font-sans text-sm text-[color:var(--color-status-error)]">
          {error}
        </p>
      )}

      <div className="sm:col-span-2 flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="font-label rounded-sm bg-navy-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory hover:bg-navy-800 disabled:opacity-60"
        >
          {submitting ? "Saving…" : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint hover:text-navy-900"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
