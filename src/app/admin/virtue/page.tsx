'use client'

import { useState, useEffect } from 'react'
import type { VirtueOfMonth } from '@/types'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const EMPTY: VirtueOfMonth = {
  month: MONTHS[new Date().getMonth()],
  virtue: '',
  definition: '',
  reflection: '',
}

export default function VirtuePage() {
  const [virtues, setVirtues] = useState<VirtueOfMonth[]>([])
  const [form, setForm] = useState<VirtueOfMonth>(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/virtue')
      .then((r) => r.json())
      .then((data: VirtueOfMonth[]) => {
        setVirtues(data)
        setLoading(false)
        // Pre-load current month's virtue
        const currentMonth = MONTHS[new Date().getMonth()]
        const current = data.find(
          (v) => v.month.toLowerCase() === currentMonth.toLowerCase()
        )
        if (current) setForm(current)
        else setForm({ ...EMPTY, month: currentMonth })
      })
  }, [])

  function handleMonthChange(month: string) {
    const existing = virtues.find(
      (v) => v.month.toLowerCase() === month.toLowerCase()
    )
    setForm(existing ?? { month, virtue: '', definition: '', reflection: '' })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/admin/virtue', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      const updated = await res.json()
      setVirtues((prev) => {
        const idx = prev.findIndex(
          (v) => v.month.toLowerCase() === updated.month.toLowerCase()
        )
        if (idx === -1) return [...prev, updated]
        const next = [...prev]
        next[idx] = updated
        return next
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
    setSaving(false)
  }

  if (loading) {
    return <div className="text-sm text-muted font-sans">Loading…</div>
  }

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h1 className="font-roboto font-bold text-2xl text-dark">Virtue of the Month</h1>
        <p className="font-sans text-sm text-muted mt-1">
          Select a month and edit its virtue, definition, and reflection.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        {/* Month selector */}
        <div>
          <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
            Month
          </label>
          <select
            value={form.month}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
          >
            {MONTHS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Virtue name */}
        <div>
          <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
            Virtue Name
          </label>
          <input
            type="text"
            value={form.virtue}
            onChange={(e) => setForm((f) => ({ ...f, virtue: e.target.value }))}
            required
            placeholder="e.g. Humility"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
          />
        </div>

        {/* Definition */}
        <div>
          <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
            Definition
          </label>
          <textarea
            value={form.definition}
            onChange={(e) => setForm((f) => ({ ...f, definition: e.target.value }))}
            required
            rows={3}
            placeholder="A one-sentence definition of the virtue…"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition resize-none"
          />
        </div>

        {/* Reflection */}
        <div>
          <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
            Reflection / Scripture
          </label>
          <textarea
            value={form.reflection}
            onChange={(e) => setForm((f) => ({ ...f, reflection: e.target.value }))}
            required
            rows={5}
            placeholder="Monthly reflection or scripture passage…"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
          />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-deep text-white font-roboto font-semibold text-sm rounded-lg hover:bg-deep/90 transition disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          {saved && (
            <span className="text-sm font-sans text-emerald-600">Saved!</span>
          )}
        </div>
      </form>

      {/* Month index */}
      <div className="mt-6 flex flex-wrap gap-2">
        {MONTHS.map((m) => {
          const hasVirtue = virtues.some(
            (v) => v.month.toLowerCase() === m.toLowerCase()
          )
          return (
            <button
              key={m}
              type="button"
              onClick={() => handleMonthChange(m)}
              className={`px-3 py-1 rounded-full text-xs font-roboto transition ${
                form.month === m
                  ? 'bg-deep text-white'
                  : hasVirtue
                  ? 'bg-deep/10 text-deep hover:bg-deep/20'
                  : 'bg-gray-100 text-muted hover:bg-gray-200'
              }`}
            >
              {m.slice(0, 3)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
