'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Search, Film } from 'lucide-react';
import {
  PageHeader,
  Card,
  Button,
  Field,
  Toast,
  useToast,
  ConfirmInline,
  LoadingState,
  EmptyState,
  inputClass,
  textareaClass,
  ImageUploadField,
} from '@/components/admin/ui';
import type { Testimonial } from '@/types';
import { media } from '@/lib/media';

const TYPES: { value: Testimonial['type']; label: string; accent: string }[] = [
  { value: 'parent', label: 'Parent', accent: 'border-l-lemon' },
  { value: 'staff', label: 'Staff', accent: 'border-l-bold' },
  { value: 'student', label: 'Student / Alumni', accent: 'border-l-deep' },
];

const EMPTY: Omit<Testimonial, 'id'> = {
  type: 'parent',
  name: '',
  role: '',
  quote: '',
  videoUrl: '',
  posterUrl: '',
};

type FilterKey = 'all' | Testimonial['type'];

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterKey>('all');
  const [toast, setToast] = useToast();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/testimonials')
      .then((r) => r.json())
      .then((data: Testimonial[]) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setToast({ kind: 'error', message: 'Could not load testimonials.' });
      });
  }, [setToast]);

  function update(id: string, patch: Partial<Testimonial>) {
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function addNew() {
    const id = `t-${Date.now()}`;
    setItems((prev) => [{ id, ...EMPTY }, ...prev]);
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((t) => t.id !== id));
    setConfirmId(null);
  }

  async function save() {
    setToast({ kind: 'saving' });
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });
      if (!res.ok) throw new Error();
      setToast({ kind: 'saved' });
    } catch {
      setToast({ kind: 'error', message: 'Save failed. Please try again.' });
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((t) => {
      if (filter !== 'all' && t.type !== filter) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.role.toLowerCase().includes(q) ||
        t.quote.toLowerCase().includes(q)
      );
    });
  }, [items, query, filter]);

  const counts = useMemo(
    () => ({
      all: items.length,
      parent: items.filter((t) => t.type === 'parent').length,
      staff: items.filter((t) => t.type === 'staff').length,
      student: items.filter((t) => t.type === 'student').length,
    }),
    [items]
  );

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Testimonials"
        description="Quotes and video reviews from parents, staff, and students that appear across the site."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={addNew}>
              <Plus size={14} strokeWidth={2} />
              Add
            </Button>
            <Button onClick={save} disabled={loading}>
              Save changes
            </Button>
          </>
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
            placeholder="Search testimonials"
            className={`${inputClass} pl-9`}
          />
        </div>
        <FilterPills value={filter} onChange={setFilter} counts={counts} />
      </div>

      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState
          title="No testimonials yet."
          description="Add the first parent, student, or staff quote."
          action={
            <Button size="sm" onClick={addNew}>
              <Plus size={14} strokeWidth={2} />
              Add
            </Button>
          }
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Nothing matched."
          description="Try a different search or filter."
        />
      ) : (
        <ul className="space-y-4">
          {filtered.map((t) => {
            const config = TYPES.find((tt) => tt.value === t.type) ?? TYPES[0];
            return (
              <li key={t.id}>
                <Card
                  className={`p-6 sm:p-7 border-l-4 ${config.accent}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <TypeSelect
                        value={t.type}
                        onChange={(type) => update(t.id, { type })}
                      />
                      {t.videoUrl && (
                        <span
                          className="inline-flex items-center gap-1.5 font-roboto text-[10px] uppercase text-deep"
                          style={{ letterSpacing: '0.22em' }}
                        >
                          <Film size={11} strokeWidth={1.75} />
                          Video
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setConfirmId(t.id)}
                      className="text-muted hover:text-bold p-1.5 -m-1.5 cursor-pointer"
                      aria-label="Remove testimonial"
                    >
                      <Trash2 size={16} strokeWidth={1.75} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    <div className="lg:col-span-7 space-y-5">
                      <Field label="Quote" required>
                        <textarea
                          value={t.quote}
                          onChange={(e) =>
                            update(t.id, { quote: e.target.value })
                          }
                          rows={4}
                          className={`${textareaClass} font-serif italic leading-[1.6]`}
                          placeholder="What did they say about the school?"
                        />
                      </Field>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Name" required>
                          <input
                            type="text"
                            value={t.name}
                            onChange={(e) =>
                              update(t.id, { name: e.target.value })
                            }
                            placeholder="Mr. & Mrs. Abu"
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Role" hint="Parent of SS3, Class of 2018, etc.">
                          <input
                            type="text"
                            value={t.role}
                            onChange={(e) =>
                              update(t.id, { role: e.target.value })
                            }
                            placeholder="Parents of SS3"
                            className={inputClass}
                          />
                        </Field>
                      </div>
                    </div>

                    <div className="lg:col-span-5 space-y-5">
                      {t.posterUrl && (
                        <div className="relative aspect-video overflow-hidden rounded-sm bg-deep/5 border border-deep/10">
                          <Image
                            src={media(t.posterUrl)}
                            alt={`${t.name} poster`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <Field
                        label="Video path"
                        hint="optional, e.g. /videos/...mp4"
                      >
                        <input
                          type="text"
                          value={t.videoUrl ?? ''}
                          onChange={(e) =>
                            update(t.id, { videoUrl: e.target.value })
                          }
                          placeholder="/videos/...mp4"
                          className={`${inputClass} font-mono text-xs`}
                        />
                      </Field>
                      <ImageUploadField
                        label="Poster image"
                        hint="optional, shown before play"
                        folder="testimonials"
                        value={t.posterUrl ?? ''}
                        onChange={(posterUrl) => update(t.id, { posterUrl })}
                        showPreview={false}
                      />
                    </div>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmInline
        open={!!confirmId}
        message="Remove this testimonial? You will need to save afterwards."
        confirmLabel="Remove"
        onConfirm={() => confirmId && remove(confirmId)}
        onCancel={() => setConfirmId(null)}
      />

      <Toast state={toast} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TypeSelect({
  value,
  onChange,
}: {
  value: Testimonial['type'];
  onChange: (next: Testimonial['type']) => void;
}) {
  return (
    <div className="inline-flex items-center bg-deep/[0.04] border border-deep/10 rounded-sm overflow-hidden">
      {TYPES.map((t) => {
        const active = value === t.value;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className={[
              'px-3 py-1.5 font-roboto text-[10px] uppercase transition-colors cursor-pointer',
              active
                ? 'bg-deep text-white'
                : 'text-muted hover:text-deep',
            ].join(' ')}
            style={{ letterSpacing: '0.22em' }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function FilterPills({
  value,
  onChange,
  counts,
}: {
  value: FilterKey;
  onChange: (v: FilterKey) => void;
  counts: { all: number; parent: number; staff: number; student: number };
}) {
  const items: { value: FilterKey; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'parent', label: 'Parents', count: counts.parent },
    { value: 'student', label: 'Students', count: counts.student },
    { value: 'staff', label: 'Staff', count: counts.staff },
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
