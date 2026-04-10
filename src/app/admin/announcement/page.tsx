'use client'

import { useState, useEffect } from 'react'
import type { Announcement } from '@/types'

const COLORS: { value: Announcement['color']; label: string; bg: string; border: string }[] = [
  { value: 'red', label: 'Red', bg: 'bg-bold', border: 'border-bold' },
  { value: 'yellow', label: 'Yellow', bg: 'bg-lemon', border: 'border-lemon' },
  { value: 'blue', label: 'Blue', bg: 'bg-deep', border: 'border-deep' },
]

const EMPTY: Omit<Announcement, 'id'> = {
  message: '',
  color: 'blue',
  linkText: '',
  linkUrl: '',
  active: false,
}

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/announcements')
      .then((r) => r.json())
      .then((data) => {
        setAnnouncements(data)
        setLoading(false)
      })
  }, [])

  function update(id: string, patch: Partial<Announcement>) {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...patch } : a))
    )
  }

  function setActive(id: string) {
    setAnnouncements((prev) =>
      prev.map((a) => ({ ...a, active: a.id === id ? !a.active : false }))
    )
  }

  function addNew() {
    const id = `ann-${Date.now()}`
    setAnnouncements((prev) => [...prev, { id, ...EMPTY }])
  }

  function remove(id: string) {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id))
  }

  async function save() {
    setSaving(true)
    await fetch('/api/admin/announcements', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(announcements),
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
          <h1 className="font-roboto font-bold text-2xl text-dark">
            Announcement Banner
          </h1>
          <p className="font-sans text-sm text-muted mt-1">
            One banner is shown at the top of every page. Toggle active to show it.
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
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`bg-white rounded-xl shadow-sm border-2 p-6 transition ${
              ann.active ? 'border-deep' : 'border-gray-100'
            }`}
          >
            {/* Active toggle */}
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <button
                  type="button"
                  onClick={() => setActive(ann.id)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    ann.active ? 'bg-deep' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      ann.active ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="font-roboto text-sm font-semibold text-dark">
                  {ann.active ? 'Active' : 'Inactive'}
                </span>
              </label>
              <button
                onClick={() => remove(ann.id)}
                className="text-xs font-roboto text-muted hover:text-bold transition"
              >
                Remove
              </button>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                Banner Message
              </label>
              <input
                type="text"
                value={ann.message}
                onChange={(e) => update(ann.id, { message: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
                placeholder="Enter banner message…"
              />
            </div>

            {/* Color */}
            <div className="mb-4">
              <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                Color
              </label>
              <div className="flex gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => update(ann.id, { color: c.value })}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 text-sm font-roboto transition ${
                      ann.color === c.value
                        ? `${c.border} text-dark font-semibold`
                        : 'border-gray-200 text-muted hover:border-gray-300'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${c.bg}`} />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Link URL + Label */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                  Link URL
                </label>
                <input
                  type="text"
                  value={ann.linkUrl}
                  onChange={(e) => update(ann.id, { linkUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
                  placeholder="/admissions"
                />
              </div>
              <div>
                <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                  Link Label
                </label>
                <input
                  type="text"
                  value={ann.linkText}
                  onChange={(e) => update(ann.id, { linkText: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
                  placeholder="Apply Now"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

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
    </div>
  )
}
