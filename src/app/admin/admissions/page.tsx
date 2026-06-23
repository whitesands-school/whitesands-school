'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import {
  PageHeader,
  Card,
  Section,
  Button,
  Field,
  Toast,
  useToast,
  ConfirmInline,
  LoadingState,
  EmptyState,
  inputClass,
} from '@/components/admin/ui';
import type { AdmissionsInfo, AdmissionsScheduleRow } from '@/types';

const EMPTY_ROW: Omit<AdmissionsScheduleRow, 'id'> = {
  category: '',
  opens: '',
  exam: '',
};

export default function AdmissionsAdminPage() {
  const [info, setInfo] = useState<AdmissionsInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useToast();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/admissions')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('load'))))
      .then((data: AdmissionsInfo) => {
        if (!data || !Array.isArray(data.schedule)) {
          throw new Error('Unexpected response shape');
        }
        setInfo(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setToast({ kind: 'error', message: 'Could not load admissions dates.' });
      });
  }, [setToast]);

  function setField<K extends keyof AdmissionsInfo>(
    key: K,
    value: AdmissionsInfo[K]
  ) {
    setInfo((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateRow(id: string, patch: Partial<AdmissionsScheduleRow>) {
    setInfo((prev) =>
      prev
        ? {
            ...prev,
            schedule: prev.schedule.map((r) =>
              r.id === id ? { ...r, ...patch } : r
            ),
          }
        : prev
    );
  }

  function addRow() {
    setInfo((prev) =>
      prev
        ? {
            ...prev,
            schedule: [
              ...prev.schedule,
              { id: `row-${Date.now()}`, ...EMPTY_ROW },
            ],
          }
        : prev
    );
  }

  function removeRow(id: string) {
    setInfo((prev) =>
      prev
        ? { ...prev, schedule: prev.schedule.filter((r) => r.id !== id) }
        : prev
    );
    setConfirmId(null);
  }

  async function save() {
    if (!info) return;
    setToast({ kind: 'saving' });
    try {
      const res = await fetch('/api/admin/admissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info),
      });
      if (!res.ok) throw new Error('Save failed');
      setToast({ kind: 'saved' });
    } catch {
      setToast({ kind: 'error', message: 'Save failed. Please try again.' });
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Admissions dates"
        description="The academic year, application deadline, and the key-dates table shown on the public Admissions page."
        actions={
          <Button onClick={save} disabled={loading || !info}>
            Save changes
          </Button>
        }
      />

      {loading || !info ? (
        <LoadingState />
      ) : (
        <>
          <Section
            title="Headline"
            description="These two values appear in the page hero (“Open for … Applications close …”) and the key-dates heading."
          >
            <Card className="p-6 sm:p-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Academic year" hint="e.g. 2026/2027" required>
                  <input
                    type="text"
                    value={info.academicYear}
                    onChange={(e) => setField('academicYear', e.target.value)}
                    placeholder="2026/2027"
                    className={inputClass}
                  />
                </Field>
                <Field
                  label="Applications close"
                  hint="e.g. 9 May 2026"
                  required
                >
                  <input
                    type="text"
                    value={info.applicationCloseDate}
                    onChange={(e) =>
                      setField('applicationCloseDate', e.target.value)
                    }
                    placeholder="9 May 2026"
                    className={inputClass}
                  />
                </Field>
              </div>
            </Card>
          </Section>

          <Section
            title="Key dates"
            description="Each row is a line in the table: a category, when applications open, and the exam date."
            actions={
              <Button variant="secondary" size="sm" onClick={addRow}>
                <Plus size={14} strokeWidth={2} />
                Add row
              </Button>
            }
          >
            {info.schedule.length === 0 ? (
              <EmptyState
                title="No rows yet."
                description="Add a category such as JS1 or Transfer."
                action={
                  <Button size="sm" onClick={addRow}>
                    <Plus size={14} strokeWidth={2} />
                    Add row
                  </Button>
                }
              />
            ) : (
              <ul className="space-y-4">
                {info.schedule.map((row) => (
                  <li key={row.id}>
                    <Card className="p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <div className="grid flex-1 grid-cols-1 sm:grid-cols-3 gap-4">
                          <Field label="Category" required>
                            <input
                              type="text"
                              value={row.category}
                              onChange={(e) =>
                                updateRow(row.id, { category: e.target.value })
                              }
                              placeholder="JS1"
                              className={inputClass}
                            />
                          </Field>
                          <Field label="Applications open" required>
                            <input
                              type="text"
                              value={row.opens}
                              onChange={(e) =>
                                updateRow(row.id, { opens: e.target.value })
                              }
                              placeholder="1 October 2025"
                              className={inputClass}
                            />
                          </Field>
                          <Field label="Exam date" required>
                            <input
                              type="text"
                              value={row.exam}
                              onChange={(e) =>
                                updateRow(row.id, { exam: e.target.value })
                              }
                              placeholder="9 May 2026"
                              className={inputClass}
                            />
                          </Field>
                        </div>
                        <button
                          type="button"
                          onClick={() => setConfirmId(row.id)}
                          className="mt-7 text-muted hover:text-bold transition-colors p-1.5 -m-1.5 cursor-pointer"
                          aria-label="Remove row"
                        >
                          <Trash2 size={16} strokeWidth={1.75} />
                        </button>
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </>
      )}

      <ConfirmInline
        open={!!confirmId}
        message="Remove this row? This cannot be undone after you save."
        confirmLabel="Remove"
        onConfirm={() => confirmId && removeRow(confirmId)}
        onCancel={() => setConfirmId(null)}
      />

      <Toast state={toast} />
    </>
  );
}
