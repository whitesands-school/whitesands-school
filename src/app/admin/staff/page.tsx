'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Pencil, Trash2, X, Check } from 'lucide-react'
import type { StaffMember } from '@/types'

const DEPARTMENTS = ['Leadership', 'Mathematics', 'Sciences', 'English', 'Social Studies', 'Arts', 'Physical Education', 'Religious Studies', 'ICT']

const EMPTY: Omit<StaffMember, 'id'> = {
  name: '',
  title: '',
  department: 'Mathematics',
  bio: '',
  qualifications: [],
  yearsAtSchool: 1,
  photo: '',
  order: 99,
  isLeadership: false,
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<StaffMember | null>(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState<Omit<StaffMember, 'id'>>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [qualInput, setQualInput] = useState('')

  useEffect(() => {
    fetch('/api/admin/staff')
      .then((r) => r.json())
      .then((data) => {
        setStaff(data)
        setLoading(false)
      })
  }, [])

  function openAdd() {
    setForm(EMPTY)
    setQualInput('')
    setEditing(null)
    setAdding(true)
  }

  function openEdit(member: StaffMember) {
    setForm({ ...member })
    setQualInput('')
    setEditing(member)
    setAdding(true)
  }

  function closeForm() {
    setAdding(false)
    setEditing(null)
  }

  function setF(patch: Partial<typeof form>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  function addQualification() {
    if (!qualInput.trim()) return
    setF({ qualifications: [...form.qualifications, qualInput.trim()] })
    setQualInput('')
  }

  function removeQualification(i: number) {
    setF({ qualifications: form.qualifications.filter((_, idx) => idx !== i) })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    if (editing) {
      const updated: StaffMember = { ...editing, ...form }
      await fetch(`/api/admin/staff/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      setStaff((prev) =>
        prev.map((s) => (s.id === editing.id ? updated : s))
      )
    } else {
      const id = `staff-${Date.now()}`
      const newMember: StaffMember = { id, ...form }
      await fetch('/api/admin/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      })
      setStaff((prev) => [...prev, newMember])
    }

    setSaving(false)
    closeForm()
  }

  async function deleteMember(id: string) {
    if (!confirm('Remove this staff member?')) return
    await fetch(`/api/admin/staff/${id}`, { method: 'DELETE' })
    setStaff((prev) => prev.filter((s) => s.id !== id))
  }

  if (loading) {
    return <div className="text-sm text-muted font-sans">Loading…</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-roboto font-bold text-2xl text-dark">Staff Directory</h1>
          <p className="font-sans text-sm text-muted mt-1">
            {staff.length} members · {staff.filter((s) => s.isLeadership).length} in leadership
          </p>
        </div>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-deep text-white font-roboto font-semibold text-sm rounded-lg hover:bg-deep/90 transition"
        >
          + Add Staff Member
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 font-roboto font-semibold text-xs uppercase tracking-wide text-muted">
                Staff Member
              </th>
              <th className="text-left px-4 py-3 font-roboto font-semibold text-xs uppercase tracking-wide text-muted hidden md:table-cell">
                Department
              </th>
              <th className="text-left px-4 py-3 font-roboto font-semibold text-xs uppercase tracking-wide text-muted hidden lg:table-cell">
                Leadership
              </th>
              <th className="px-4 py-3 w-24" />
            </tr>
          </thead>
          <tbody>
            {staff
              .sort((a, b) => a.order - b.order)
              .map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-deep/10 overflow-hidden shrink-0">
                        {member.photo ? (
                          <Image
                            src={member.photo}
                            alt={member.name}
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                            unoptimized
                          />
                        ) : (
                          <span className="flex items-center justify-center h-full text-deep font-roboto font-bold text-xs">
                            {member.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-sans text-dark font-medium">
                          {member.name}
                        </p>
                        <p className="font-sans text-muted text-xs">{member.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className="font-sans text-muted">{member.department}</span>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    {member.isLeadership ? (
                      <Check size={14} className="text-emerald-600" />
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => openEdit(member)}
                        className="p-1.5 text-muted hover:text-deep hover:bg-deep/5 rounded transition"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => deleteMember(member.id)}
                        className="p-1.5 text-muted hover:text-bold hover:bg-bold/5 rounded transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Drawer */}
      {adding && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/30 backdrop-blur-sm"
            onClick={closeForm}
          />
          <div className="w-full max-w-md bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="font-roboto font-bold text-lg text-dark">
                {editing ? 'Edit Staff Member' : 'Add Staff Member'}
              </h2>
              <button
                onClick={closeForm}
                className="p-1.5 text-muted hover:text-dark rounded transition"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setF({ name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
                  placeholder="e.g. Mrs. Adaeze Nwosu"
                />
              </div>

              <div>
                <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                  Title / Role
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setF({ title: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
                  placeholder="e.g. Mathematics Teacher"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                    Department
                  </label>
                  <select
                    value={form.department}
                    onChange={(e) => setF({ department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                    Years at School
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.yearsAtSchool}
                    onChange={(e) => setF({ yearsAtSchool: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
                  />
                </div>
              </div>

              <div>
                <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={form.photo}
                  onChange={(e) => setF({ photo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
                  placeholder="/images/staff/name.jpg"
                />
              </div>

              <div>
                <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                  Bio
                </label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setF({ bio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition resize-none"
                  placeholder="Short biography…"
                />
              </div>

              {/* Qualifications */}
              <div>
                <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                  Qualifications
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={qualInput}
                    onChange={(e) => setQualInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') { e.preventDefault(); addQualification() }
                    }}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
                    placeholder="e.g. B.Sc Mathematics (UNN)"
                  />
                  <button
                    type="button"
                    onClick={addQualification}
                    className="px-3 py-2 bg-gray-100 text-dark text-sm font-roboto rounded-lg hover:bg-gray-200 transition"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-1">
                  {form.qualifications.map((q, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between bg-gray-50 px-3 py-1.5 rounded text-sm font-sans text-dark"
                    >
                      {q}
                      <button
                        type="button"
                        onClick={() => removeQualification(i)}
                        className="text-muted hover:text-bold transition"
                      >
                        <X size={12} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={form.order}
                    onChange={(e) => setF({ order: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
                  />
                </div>
                <div>
                  <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
                    &nbsp;
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer h-[38px]">
                    <button
                      type="button"
                      onClick={() => setF({ isLeadership: !form.isLeadership })}
                      className={`relative w-10 h-5 rounded-full transition-colors ${
                        form.isLeadership ? 'bg-deep' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                          form.isLeadership ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span className="font-roboto text-sm text-dark">Leadership</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 bg-deep text-white font-roboto font-semibold text-sm rounded-lg hover:bg-deep/90 transition disabled:opacity-60"
                >
                  {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Member'}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2.5 border border-gray-200 text-muted font-roboto text-sm rounded-lg hover:border-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
