'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import {
  PageHeader,
  Card,
  Button,
  Field,
  Toggle,
  Toast,
  useToast,
  ConfirmInline,
  LoadingState,
  EmptyState,
  inputClass,
} from '@/components/admin/ui';
import type { Announcement } from '@/types';

const COLORS: { value: Announcement['color']; label: string; swatch: string }[] = [
  { value: 'blue', label: 'Deep', swatch: 'bg-deep' },
  { value: 'red', label: 'Bold', swatch: 'bg-bold' },
  { value: 'yellow', label: 'Lemon', swatch: 'bg-lemon' },
];

const EMPTY: Omit<Announcement, 'id'> = {
  message: '',
  color: 'blue',
  linkText: '',
  linkUrl: '',
  active: false,
};

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useToast();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/announcements')
      .then((r) => r.json())
      .then((data) => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setToast({ kind: 'error', message: 'Could not load announcements.' });
      });
  }, [setToast]);

  function update(id: string, patch: Partial<Announcement>) {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...patch } : a))
    );
  }

  function setActive(id: string) {
    setAnnouncements((prev) =>
      prev.map((a) => ({ ...a, active: a.id === id ? !a.active : false }))
    );
  }

  function addNew() {
    const id = `ann-${Date.now()}`;
    setAnnouncements((prev) => [...prev, { id, ...EMPTY }]);
  }

  function remove(id: string) {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    setConfirmId(null);
  }

  async function save() {
    setToast({ kind: 'saving' });
    try {
      const res = await fetch('/api/admin/announcements', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(announcements),
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
        eyebrow="Promotions"
        title="Announcement bar"
        description="One slim banner can be shown at the top of every page. Turning a banner on automatically turns the others off."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={addNew}>
              <Plus size={14} strokeWidth={2} />
              Add banner
            </Button>
            <Button onClick={save} disabled={loading}>
              Save changes
            </Button>
          </>
        }
      />

      {loading ? (
        <LoadingState />
      ) : announcements.length === 0 ? (
        <EmptyState
          title="No banners yet."
          description="Create a banner to highlight a deadline, announcement, or event."
          action={
            <Button variant="primary" size="sm" onClick={addNew}>
              <Plus size={14} strokeWidth={2} />
              Add banner
            </Button>
          }
        />
      ) : (
        <ul className="space-y-4">
          {announcements.map((ann) => (
            <li key={ann.id}>
              <Card className={`p-6 ${ann.active ? 'border-deep/40' : ''}`}>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <Toggle
                    checked={ann.active}
                    onChange={() => setActive(ann.id)}
                    label={ann.active ? 'Live' : 'Off'}
                    description={
                      ann.active
                        ? 'This banner is showing on every page.'
                        : 'Turn on to make this banner visible.'
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setConfirmId(ann.id)}
                    className="text-muted hover:text-bold transition-colors p-1.5 -m-1.5 cursor-pointer"
                    aria-label="Remove banner"
                  >
                    <Trash2 size={16} strokeWidth={1.75} />
                  </button>
                </div>

                <Field label="Message" required className="mb-5">
                  <input
                    type="text"
                    value={ann.message}
                    onChange={(e) => update(ann.id, { message: e.target.value })}
                    placeholder="e.g. Applications for 2026 close on 9 May."
                    className={inputClass}
                  />
                </Field>

                <div className="mb-5">
                  <p
                    className="font-roboto text-[11px] uppercase text-muted mb-2"
                    style={{ letterSpacing: '0.22em' }}
                  >
                    Colour
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map((c) => {
                      const isActive = ann.color === c.value;
                      return (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => update(ann.id, { color: c.value })}
                          className={[
                            'inline-flex items-center gap-2 px-3.5 py-2 rounded-sm border font-roboto text-[11px] uppercase transition-colors cursor-pointer',
                            isActive
                              ? 'border-deep text-deep'
                              : 'border-deep/15 text-muted hover:border-deep/30',
                          ].join(' ')}
                          style={{ letterSpacing: '0.2em' }}
                        >
                          <span
                            aria-hidden
                            className={`block w-3 h-3 rounded-full ${c.swatch} border border-deep/15`}
                          />
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Link URL" hint="optional">
                    <input
                      type="text"
                      value={ann.linkUrl ?? ''}
                      onChange={(e) => update(ann.id, { linkUrl: e.target.value })}
                      placeholder="/admissions"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Link label" hint="optional">
                    <input
                      type="text"
                      value={ann.linkText ?? ''}
                      onChange={(e) => update(ann.id, { linkText: e.target.value })}
                      placeholder="Apply now"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <ConfirmInline
        open={!!confirmId}
        message="Remove this banner? This cannot be undone after you save."
        confirmLabel="Remove"
        onConfirm={() => confirmId && remove(confirmId)}
        onCancel={() => setConfirmId(null)}
      />

      <Toast state={toast} />
    </>
  );
}
