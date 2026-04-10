'use client'

import { useState, useEffect } from 'react'
import type { SitePopover } from '@/types'

const EMPTY: Omit<SitePopover, 'id'> = {
  title: '',
  body: '',
  imageUrl: '',
  ctaLabel: '',
  ctaUrl: '',
  active: false,
  expiresAt: '',
}

export default function PopoverPage() {
  const [popovers, setPopovers] = useState<SitePopover[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/popover')
      .then((r) => r.json())
      .then((data) => {
        setPopovers(data)
        setLoading(false)
      })
  }, [])

  function update(id: string, patch: Partial<SitePopover>) {
    setPopovers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
    )
  }

  function setActive(id: string) {
    // Only one active at a time
    setPopovers((prev) =>
      prev.map((p) => ({ ...p, active: p.id === id ? !p.active : false }))
    )
  }

  function addNew() {
    const id = `pop-${Date.now()}`
    setPopovers((prev) => [...prev, { id, ...EMPTY }])
  }

  function remove(id: string) {
    setPopovers((prev) => prev.filter((p) => p.id !== id))
  }

  async function save() {
    setSaving(true)
    await fetch('/api/admin/popover', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(popovers),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) {
    return <div className="text-sm text-muted font-sans">Loading…</div>
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-roboto font-bold text-2xl text-dark">Popover Manager</h1>
          <p className="font-sans text-sm text-muted mt-1">
            A modal shown once per session on the public site. Only one can be active at a time.
          </p>
        </div>
        <button
          onClick={addNew}
          className="px-4 py-2 text-sm font-roboto font-semibold bg-deep text-white rounded-lg hover:bg-deep/90 transition"
        >
          + Add New
        </button>
      </div>

      <div className="space-y-4">
        {popovers.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-10 text-center text-muted font-sans text-sm">
            No popovers yet. Click "+ Add New" to create one.
          </div>
        )}

        {popovers.map((pop) => (
          <div
            key={pop.id}
            className={`bg-white rounded-xl shadow-sm border-2 p-6 transition ${
              pop.active ? 'border-deep' : 'border-gray-100'
            }`}
          >
            {/* Active toggle + remove */}
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <button
                  type="button"
                  onClick={() => setActive(pop.id)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    pop.active ? 'bg-deep' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      pop.active ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="font-roboto text-sm font-semibold text-dark">
                  {pop.active ? 'Active' : 'Inactive'}
                </span>
              </label>
              <button
                onClick={() => remove(pop.id)}
                className="text-xs font-roboto text-muted hover:text-bold transition"
              >
                Remove
              </button>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                Title
              </label>
              <input
                type="text"
                value={pop.title}
                onChange={(e) => update(pop.id, { title: e.target.value })}
                placeholder="e.g. Admissions Open — 2026/2027"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
              />
            </div>

            {/* Body */}
            <div className="mb-4">
              <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                Body Text
              </label>
              <textarea
                value={pop.body}
                onChange={(e) => update(pop.id, { body: e.target.value })}
                rows={3}
                placeholder="Short message shown in the popover…"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition resize-none"
              />
            </div>

            {/* Image URL */}
            <div className="mb-4">
              <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                Image URL{' '}
                <span className="normal-case font-normal text-muted/70">(optional)</span>
              </label>
              <input
                type="text"
                value={pop.imageUrl ?? ''}
                onChange={(e) => update(pop.id, { imageUrl: e.target.value })}
                placeholder="/images/popover/banner.jpg"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
              />
            </div>

            {/* CTA + Expiry */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                  CTA Label
                </label>
                <input
                  type="text"
                  value={pop.ctaLabel ?? ''}
                  onChange={(e) => update(pop.id, { ctaLabel: e.target.value })}
                  placeholder="Apply Now"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
                />
              </div>
              <div>
                <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                  CTA URL
                </label>
                <input
                  type="text"
                  value={pop.ctaUrl ?? ''}
                  onChange={(e) => update(pop.id, { ctaUrl: e.target.value })}
                  placeholder="/admissions"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
                />
              </div>
            </div>

            {/* Expiry date */}
            <div>
              <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                Expires On{' '}
                <span className="normal-case font-normal text-muted/70">(optional — leave blank for no expiry)</span>
              </label>
              <input
                type="date"
                value={pop.expiresAt ?? ''}
                onChange={(e) => update(pop.id, { expiresAt: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
              />
            </div>
          </div>
        ))}
      </div>

      {popovers.length > 0 && (
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={save}
            disabled={saving}
            className="px-6 py-2.5 bg-deep text-white font-roboto font-semibold text-sm rounded-lg hover:bg-deep/90 transition disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          {saved && (
            <span className="text-sm font-sans text-emerald-600">Saved!</span>
          )}
        </div>
      )}
    </div>
  )
}
