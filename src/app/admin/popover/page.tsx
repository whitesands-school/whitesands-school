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
  textareaClass,
} from '@/components/admin/ui';
import type { SitePopover } from '@/types';

const EMPTY: Omit<SitePopover, 'id'> = {
  title: '',
  body: '',
  imageUrl: '',
  ctaLabel: '',
  ctaUrl: '',
  active: false,
  expiresAt: '',
};

export default function PopoverPage() {
  const [popovers, setPopovers] = useState<SitePopover[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useToast();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/popover')
      .then((r) => r.json())
      .then((data) => {
        setPopovers(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setToast({ kind: 'error', message: 'Could not load popovers.' });
      });
  }, [setToast]);

  function update(id: string, patch: Partial<SitePopover>) {
    setPopovers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  }

  function setActive(id: string) {
    setPopovers((prev) =>
      prev.map((p) => ({ ...p, active: p.id === id ? !p.active : false }))
    );
  }

  function addNew() {
    const id = `pop-${Date.now()}`;
    setPopovers((prev) => [...prev, { id, ...EMPTY }]);
  }

  function remove(id: string) {
    setPopovers((prev) => prev.filter((p) => p.id !== id));
    setConfirmId(null);
  }

  async function save() {
    setToast({ kind: 'saving' });
    try {
      const res = await fetch('/api/admin/popover', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(popovers),
      });
      if (!res.ok) throw new Error();
      setToast({ kind: 'saved' });
    } catch {
      setToast({ kind: 'error', message: 'Save failed. Please try again.' });
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Promotions"
        title="Site popover"
        description="A modal that appears once per session for first-time visitors. Only one popover can be live at a time."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={addNew}>
              <Plus size={14} strokeWidth={2} />
              Add popover
            </Button>
            <Button onClick={save} disabled={loading}>
              Save changes
            </Button>
          </>
        }
      />

      {loading ? (
        <LoadingState />
      ) : popovers.length === 0 ? (
        <EmptyState
          title="No popovers yet."
          description="Create one to spotlight admissions, an event, or an announcement."
          action={
            <Button size="sm" onClick={addNew}>
              <Plus size={14} strokeWidth={2} />
              Add popover
            </Button>
          }
        />
      ) : (
        <ul className="space-y-4">
          {popovers.map((pop) => (
            <li key={pop.id}>
              <Card className={`p-6 sm:p-7 ${pop.active ? 'border-deep/40' : ''}`}>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <Toggle
                    checked={pop.active}
                    onChange={() => setActive(pop.id)}
                    label={pop.active ? 'Live' : 'Off'}
                    description={
                      pop.active
                        ? 'This popover appears once per visit on the public site.'
                        : 'Turn on to start showing this popover.'
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setConfirmId(pop.id)}
                    className="text-muted hover:text-bold p-1.5 -m-1.5 cursor-pointer"
                    aria-label="Remove popover"
                  >
                    <Trash2 size={16} strokeWidth={1.75} />
                  </button>
                </div>

                <Field label="Title" required className="mb-5">
                  <input
                    type="text"
                    value={pop.title}
                    onChange={(e) => update(pop.id, { title: e.target.value })}
                    placeholder="e.g. Admissions open for 2026/2027"
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="Body"
                  hint="Two or three sentences"
                  required
                  className="mb-5"
                >
                  <textarea
                    value={pop.body}
                    onChange={(e) => update(pop.id, { body: e.target.value })}
                    rows={3}
                    className={textareaClass}
                    placeholder="Short message that appears under the title."
                  />
                </Field>

                <Field
                  label="Image path"
                  hint="optional, path under /public"
                  className="mb-5"
                >
                  <input
                    type="text"
                    value={pop.imageUrl ?? ''}
                    onChange={(e) =>
                      update(pop.id, { imageUrl: e.target.value })
                    }
                    placeholder="/images/students/..."
                    className={`${inputClass} font-mono text-xs`}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <Field label="Button label" hint="optional">
                    <input
                      type="text"
                      value={pop.ctaLabel ?? ''}
                      onChange={(e) =>
                        update(pop.id, { ctaLabel: e.target.value })
                      }
                      placeholder="Apply now"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Button URL" hint="optional">
                    <input
                      type="text"
                      value={pop.ctaUrl ?? ''}
                      onChange={(e) =>
                        update(pop.id, { ctaUrl: e.target.value })
                      }
                      placeholder="/admissions"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field
                  label="Expires on"
                  hint="Leave blank for no expiry"
                >
                  <input
                    type="date"
                    value={pop.expiresAt ?? ''}
                    onChange={(e) =>
                      update(pop.id, { expiresAt: e.target.value })
                    }
                    className={inputClass}
                  />
                </Field>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <ConfirmInline
        open={!!confirmId}
        message="Remove this popover? You will need to save afterwards."
        confirmLabel="Remove"
        onConfirm={() => confirmId && remove(confirmId)}
        onCancel={() => setConfirmId(null)}
      />

      <Toast state={toast} />
    </>
  );
}
