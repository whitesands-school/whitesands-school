'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PageHeader,
  Button,
  Field,
  Toggle,
  Toast,
  useToast,
  ConfirmInline,
  LoadingState,
  EmptyState,
  inputClass,
  textareaClass,
  ImageUploadField,
} from '@/components/admin/ui';
import { media } from '@/lib/media';
import { STAFF_CATEGORIES } from '@/lib/staff-categories';
import type { StaffMember } from '@/types';

const DEPARTMENTS = [...STAFF_CATEGORIES];

const EMPTY: Omit<StaffMember, 'id'> = {
  name: '',
  title: 'Member of Faculty',
  department: 'Faculty',
  bio: '',
  qualifications: [],
  yearsAtSchool: 1,
  photo: '',
  order: 99,
  isLeadership: false,
};

type FilterKey = 'all' | 'leadership' | 'faculty';

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterKey>('all');
  const [editing, setEditing] = useState<StaffMember | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useToast();

  useEffect(() => {
    fetch('/api/admin/staff')
      .then((r) => r.json())
      .then((data: StaffMember[]) => {
        data.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
        setStaff(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setToast({ kind: 'error', message: 'Could not load staff.' });
      });
  }, [setToast]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return staff.filter((s) => {
      if (filter === 'leadership' && !s.isLeadership) return false;
      if (filter === 'faculty' && s.isLeadership) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q)
      );
    });
  }, [staff, query, filter]);

  const counts = useMemo(
    () => ({
      all: staff.length,
      leadership: staff.filter((s) => s.isLeadership).length,
      faculty: staff.filter((s) => !s.isLeadership).length,
    }),
    [staff]
  );

  function openAdd() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(member: StaffMember) {
    setEditing(member);
    setDrawerOpen(true);
  }

  async function handleSave(values: Omit<StaffMember, 'id'>) {
    setToast({ kind: 'saving' });
    try {
      if (editing) {
        const updated: StaffMember = { ...editing, ...values };
        const res = await fetch(`/api/admin/staff/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        });
        if (!res.ok) throw new Error();
        setStaff((prev) => prev.map((s) => (s.id === editing.id ? updated : s)));
      } else {
        const id = `staff-${Date.now()}`;
        const newMember: StaffMember = { id, ...values };
        const res = await fetch('/api/admin/staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMember),
        });
        if (!res.ok) throw new Error();
        setStaff((prev) => [...prev, newMember]);
      }
      setToast({ kind: 'saved' });
      setDrawerOpen(false);
      setEditing(null);
    } catch {
      setToast({ kind: 'error', message: 'Save failed. Please try again.' });
    }
  }

  async function handleDelete(id: string) {
    setConfirmId(null);
    const previous = staff;
    setStaff((prev) => prev.filter((s) => s.id !== id));
    try {
      const res = await fetch(`/api/admin/staff/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setToast({ kind: 'saved', message: 'Removed' });
    } catch {
      setStaff(previous);
      setToast({ kind: 'error', message: 'Could not remove staff member.' });
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Staff"
        description="Names, titles, and portraits as they appear on Our People."
        actions={
          <Button onClick={openAdd}>
            <Plus size={14} strokeWidth={2} />
            Add staff
          </Button>
        }
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="relative flex-1 sm:max-w-sm">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, title, or department"
            className={`${inputClass} pl-9`}
          />
        </div>
        <FilterPills value={filter} onChange={setFilter} counts={counts} />
      </div>

      {loading ? (
        <LoadingState />
      ) : staff.length === 0 ? (
        <EmptyState
          title="No staff added yet."
          description="Add the first member to populate the Our People directory."
          action={
            <Button size="sm" onClick={openAdd}>
              <Plus size={14} strokeWidth={2} />
              Add staff
            </Button>
          }
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Nothing matched."
          description="Try a different search or filter."
        />
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
          {filtered.map((member) => (
            <li key={member.id}>
              <StaffCard
                member={member}
                onEdit={() => openEdit(member)}
                onDelete={() => setConfirmId(member.id)}
              />
            </li>
          ))}
        </ul>
      )}

      <ConfirmInline
        open={!!confirmId}
        message="Remove this staff member from the site?"
        confirmLabel="Remove"
        onConfirm={() => confirmId && handleDelete(confirmId)}
        onCancel={() => setConfirmId(null)}
      />

      <StaffDrawer
        open={drawerOpen}
        member={editing}
        departments={DEPARTMENTS}
        onClose={() => {
          setDrawerOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
      />

      <Toast state={toast} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StaffCard({
  member,
  onEdit,
  onDelete,
}: {
  member: StaffMember;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="group">
      <div className="relative aspect-3/4 overflow-hidden rounded-sm bg-deep/5 border border-deep/10">
        {member.photo ? (
          <Image
            src={media(member.photo)}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-deep/40 font-serif text-2xl">
            {member.name
              .split(/\s+/)
              .filter(Boolean)
              .slice(0, 2)
              .map((w) => w[0]?.toUpperCase() ?? '')
              .join('') || '·'}
          </div>
        )}
        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit"
            className="bg-white/90 backdrop-blur p-1.5 rounded-sm text-deep hover:bg-white cursor-pointer"
          >
            <Pencil size={12} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label="Remove"
            className="bg-white/90 backdrop-blur p-1.5 rounded-sm text-bold hover:bg-white cursor-pointer"
          >
            <Trash2 size={12} strokeWidth={1.75} />
          </button>
        </div>
        {member.isLeadership && (
          <span
            className="absolute top-2 left-2 bg-deep text-white font-roboto text-[9px] uppercase px-2 py-0.5 rounded-sm"
            style={{ letterSpacing: '0.22em' }}
          >
            Management
          </span>
        )}
      </div>
      <h3 className="mt-3 font-serif text-base text-deep leading-snug line-clamp-2">
        {member.name}
      </h3>
      <p
        className="mt-1 font-roboto text-[10px] uppercase text-muted leading-snug"
        style={{ letterSpacing: '0.2em' }}
      >
        {member.title}
      </p>
    </article>
  );
}

function FilterPills({
  value,
  onChange,
  counts,
}: {
  value: FilterKey;
  onChange: (v: FilterKey) => void;
  counts: { all: number; leadership: number; faculty: number };
}) {
  const items: { value: FilterKey; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'leadership', label: 'Management Team', count: counts.leadership },
    { value: 'faculty', label: 'Faculty', count: counts.faculty },
  ];
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {items.map((it) => {
        const isActive = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            onClick={() => onChange(it.value)}
            className={[
              'px-3.5 py-2 font-roboto text-[10px] uppercase rounded-sm transition-colors cursor-pointer',
              isActive
                ? 'bg-deep text-white'
                : 'text-muted hover:text-deep',
            ].join(' ')}
            style={{ letterSpacing: '0.22em' }}
          >
            {it.label}
            <span
              className={[
                'ml-2 tabular-nums normal-case',
                isActive ? 'text-white/60' : 'text-muted/60',
              ].join(' ')}
              style={{ letterSpacing: '0.06em' }}
            >
              {it.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Drawer (slide-in form)
// ---------------------------------------------------------------------------

function StaffDrawer({
  open,
  member,
  departments,
  onClose,
  onSave,
}: {
  open: boolean;
  member: StaffMember | null;
  departments: string[];
  onClose: () => void;
  onSave: (values: Omit<StaffMember, 'id'>) => Promise<void>;
}) {
  const [form, setForm] = useState<Omit<StaffMember, 'id'>>(EMPTY);
  const [qualInput, setQualInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(member ? { ...member } : EMPTY);
      setQualInput('');
    }
  }, [open, member]);

  function setF<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function addQualification() {
    if (!qualInput.trim()) return;
    setF('qualifications', [...form.qualifications, qualInput.trim()]);
    setQualInput('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-deep/40"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg bg-white shadow-xl overflow-y-auto"
          >
            <form onSubmit={handleSubmit} className="flex flex-col min-h-full">
              <header className="sticky top-0 z-10 bg-white border-b border-deep/10 px-6 sm:px-8 py-5 flex items-center justify-between">
                <div>
                  <p
                    className="font-roboto text-[11px] uppercase text-muted"
                    style={{ letterSpacing: '0.28em' }}
                  >
                    {member ? 'Edit staff' : 'Add staff'}
                  </p>
                  <h2 className="mt-1 font-serif text-xl text-deep leading-tight">
                    {member ? member.name : 'New member'}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-muted hover:text-deep p-1.5 -m-1.5 cursor-pointer"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </header>

              <div className="px-6 sm:px-8 py-6 space-y-5 flex-1">
                <Field label="Full name" required>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setF('name', e.target.value)}
                    required
                    className={inputClass}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Title" required>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setF('title', e.target.value)}
                      required
                      className={inputClass}
                      placeholder="e.g. Vice Principal · Senior School"
                    />
                  </Field>
                  <Field label="Department" required>
                    <select
                      value={form.department}
                      onChange={(e) => setF('department', e.target.value)}
                      className={inputClass}
                    >
                      {(departments.includes(form.department)
                        ? departments
                        : [form.department, ...departments]
                      ).map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Years at school">
                    <input
                      type="number"
                      min={0}
                      value={form.yearsAtSchool}
                      onChange={(e) =>
                        setF('yearsAtSchool', Number(e.target.value) || 0)
                      }
                      className={inputClass}
                    />
                  </Field>
                  <Field
                    label="Order"
                    hint="Lower numbers appear first"
                  >
                    <input
                      type="number"
                      value={form.order}
                      onChange={(e) =>
                        setF('order', Number(e.target.value) || 99)
                      }
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Toggle
                  checked={form.isLeadership}
                  onChange={(v) => setF('isLeadership', v)}
                  label="Show in Management Team"
                  description="Management Team members get a badge and appear first. Set their department to “Management Team” too so they show under that filter on Our People."
                />

                <ImageUploadField
                  label="Photo"
                  hint="Upload a portrait or paste a URL"
                  folder="staff"
                  value={form.photo}
                  onChange={(photo) => setF('photo', photo)}
                  previewAspect="aspect-3/4"
                />

                <Field label="Short bio" hint="optional">
                  <textarea
                    value={form.bio}
                    onChange={(e) => setF('bio', e.target.value)}
                    rows={4}
                    className={textareaClass}
                  />
                </Field>

                {/* Qualifications */}
                <div>
                  <p
                    className="font-roboto text-[11px] uppercase text-muted mb-2"
                    style={{ letterSpacing: '0.22em' }}
                  >
                    Qualifications
                  </p>
                  <ul className="space-y-2 mb-3">
                    {form.qualifications.map((q, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-2 bg-deep/[0.03] border border-deep/10 rounded-sm px-3 py-2"
                      >
                        <span className="font-sans text-sm text-deep flex-1">
                          {q}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setF(
                              'qualifications',
                              form.qualifications.filter((_, idx) => idx !== i)
                            )
                          }
                          className="text-muted hover:text-bold p-1 cursor-pointer"
                          aria-label="Remove qualification"
                        >
                          <X size={12} />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={qualInput}
                      onChange={(e) => setQualInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addQualification();
                        }
                      }}
                      placeholder="B.Sc. Mathematics, University of Lagos"
                      className={inputClass}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={addQualification}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <footer className="sticky bottom-0 bg-white border-t border-deep/10 px-6 sm:px-8 py-4 flex items-center justify-end gap-2">
                <Button type="button" variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving' : member ? 'Save changes' : 'Add member'}
                </Button>
              </footer>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
