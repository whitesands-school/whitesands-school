'use client';

import { useEffect, useState } from 'react';
import {
  PageHeader,
  Card,
  Button,
  Field,
  Toast,
  useToast,
  LoadingState,
  inputClass,
  textareaClass,
} from '@/components/admin/ui';
import type { VirtueOfMonth } from '@/types';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const EMPTY: VirtueOfMonth = {
  month: MONTHS[new Date().getMonth()],
  virtue: '',
  definition: '',
  reflection: '',
};

export default function VirtuePage() {
  const [virtues, setVirtues] = useState<VirtueOfMonth[]>([]);
  const [form, setForm] = useState<VirtueOfMonth>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useToast();

  useEffect(() => {
    fetch('/api/admin/virtue')
      .then((r) => r.json())
      .then((data: VirtueOfMonth[]) => {
        setVirtues(data);
        setLoading(false);
        // Pre-load current month's virtue
        const currentMonth = MONTHS[new Date().getMonth()];
        const current = data.find(
          (v) => v.month.toLowerCase() === currentMonth.toLowerCase()
        );
        setForm(current ?? { ...EMPTY, month: currentMonth });
      })
      .catch(() => {
        setLoading(false);
        setToast({ kind: 'error', message: 'Could not load virtues.' });
      });
  }, [setToast]);

  function selectMonth(month: string) {
    const existing = virtues.find(
      (v) => v.month.toLowerCase() === month.toLowerCase()
    );
    setForm(existing ?? { month, virtue: '', definition: '', reflection: '' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setToast({ kind: 'saving' });
    try {
      const res = await fetch('/api/admin/virtue', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setVirtues((prev) => {
        const idx = prev.findIndex(
          (v) => v.month.toLowerCase() === updated.month.toLowerCase()
        );
        if (idx === -1) return [...prev, updated];
        const next = [...prev];
        next[idx] = updated;
        return next;
      });
      setToast({ kind: 'saved' });
    } catch {
      setToast({ kind: 'error', message: 'Save failed. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <>
        <PageHeader
          eyebrow="Content"
          title="Virtue of the Month"
        />
        <LoadingState />
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Virtue of the Month"
        description="Set the virtue, definition, and reflection that appear on the site each month."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card className="p-6 sm:p-7">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label="Month" required>
                <select
                  value={form.month}
                  onChange={(e) => selectMonth(e.target.value)}
                  className={inputClass}
                >
                  {MONTHS.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </Field>

              <Field label="Virtue" required>
                <input
                  type="text"
                  value={form.virtue}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, virtue: e.target.value }))
                  }
                  placeholder="e.g. Humility"
                  required
                  className={inputClass}
                />
              </Field>

              <Field
                label="Definition"
                hint="One sentence shown on cards across the site"
                required
              >
                <textarea
                  value={form.definition}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, definition: e.target.value }))
                  }
                  rows={3}
                  required
                  className={textareaClass}
                  placeholder="An accurate, honest view of oneself before God and others."
                />
              </Field>

              <Field
                label="Reflection"
                hint="A longer passage or scripture for the page"
                required
              >
                <textarea
                  value={form.reflection}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, reflection: e.target.value }))
                  }
                  rows={6}
                  required
                  className={`${textareaClass} font-serif leading-[1.65]`}
                  placeholder="A monthly reflection that pairs with the virtue."
                />
              </Field>

              <div className="pt-2">
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving' : 'Save virtue'}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Month index */}
        <div className="lg:col-span-1">
          <Card className="p-6 lg:sticky lg:top-6">
            <p
              className="font-roboto text-[11px] uppercase text-muted mb-4"
              style={{ letterSpacing: '0.22em' }}
            >
              The year
            </p>
            <ul className="space-y-px">
              {MONTHS.map((m) => {
                const existing = virtues.find(
                  (v) => v.month.toLowerCase() === m.toLowerCase()
                );
                const isSelected = form.month === m;
                return (
                  <li key={m}>
                    <button
                      type="button"
                      onClick={() => selectMonth(m)}
                      className={[
                        'group relative flex items-center justify-between w-full text-left px-3 py-2.5 rounded-sm font-sans text-sm transition-colors cursor-pointer',
                        isSelected
                          ? 'bg-deep/5 text-deep'
                          : 'text-dark/70 hover:text-deep hover:bg-deep/2.5',
                      ].join(' ')}
                    >
                      {isSelected && (
                        <span
                          aria-hidden
                          className="absolute left-0 top-2 bottom-2 w-0.5 bg-lemon rounded-r"
                        />
                      )}
                      <span className={isSelected ? 'font-medium' : ''}>{m}</span>
                      <span
                        className={[
                          'font-roboto text-[10px] uppercase',
                          existing ? 'text-deep/70' : 'text-muted/40',
                        ].join(' ')}
                        style={{ letterSpacing: '0.18em' }}
                      >
                        {existing ? existing.virtue : '—'}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>

      <Toast state={toast} />
    </>
  );
}
