'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2 } from 'lucide-react';
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
} from '@/components/admin/ui';
import { media } from '@/lib/media';
import type { GalleryImage } from '@/types';

const CATEGORIES = [
  'Campus',
  'Academics',
  'Events',
  'Sports',
  'Faith',
  'Arts',
];

const EMPTY = { src: '', alt: '', category: 'Campus' };
type FilterKey = 'all' | (typeof CATEGORIES)[number];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useToast();

  useEffect(() => {
    fetch('/api/admin/gallery')
      .then((r) => r.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setToast({ kind: 'error', message: 'Could not load gallery.' });
      });
  }, [setToast]);

  const filtered = useMemo(
    () => (filter === 'all' ? images : images.filter((i) => i.category === filter)),
    [images, filter]
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: images.length };
    for (const i of images) map[i.category] = (map[i.category] ?? 0) + 1;
    return map;
  }, [images]);

  async function addImage(e: React.FormEvent) {
    e.preventDefault();
    if (!form.src) return;
    setAdding(true);
    setToast({ kind: 'saving' });
    const id = `gallery-${Date.now()}`;
    const newImage: GalleryImage = { id, ...form };
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newImage),
      });
      if (!res.ok) throw new Error();
      setImages((prev) => [...prev, newImage]);
      setForm(EMPTY);
      setToast({ kind: 'saved', message: 'Image added' });
    } catch {
      setToast({ kind: 'error', message: 'Could not add image.' });
    } finally {
      setAdding(false);
    }
  }

  async function deleteImage(id: string) {
    setConfirmId(null);
    const previous = images;
    setImages((prev) => prev.filter((img) => img.id !== id));
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setToast({ kind: 'saved', message: 'Removed' });
    } catch {
      setImages(previous);
      setToast({ kind: 'error', message: 'Could not remove image.' });
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Gallery"
        description="Photos used across the public site. Add an image by pasting its path under /public."
      />

      {/* Add form */}
      <Card className="p-6 mb-8">
        <p
          className="font-roboto text-[11px] uppercase text-muted mb-5"
          style={{ letterSpacing: '0.22em' }}
        >
          Add an image
        </p>
        <form onSubmit={addImage} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5">
            <Field
              label="Image path"
              hint="e.g. /images/students/choir-in-chapel.jpg"
              required
            >
              <input
                type="text"
                value={form.src}
                onChange={(e) => setForm((f) => ({ ...f, src: e.target.value }))}
                placeholder="/images/..."
                required
                className={`${inputClass} font-mono text-xs`}
              />
            </Field>
          </div>
          <div className="md:col-span-4">
            <Field label="Alt text" hint="Describes the image for screen readers">
              <input
                type="text"
                value={form.alt}
                onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))}
                placeholder="Choir in the chapel"
                className={inputClass}
              />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className={inputClass}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="md:col-span-1">
            <Button type="submit" disabled={adding} className="w-full">
              <Plus size={14} strokeWidth={2} />
              Add
            </Button>
          </div>
        </form>
      </Card>

      {/* Filter */}
      {images.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap mb-5">
          <FilterPill
            label="All"
            count={counts.all ?? 0}
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          {CATEGORIES.map((c) => (
            <FilterPill
              key={c}
              label={c}
              count={counts[c] ?? 0}
              active={filter === c}
              onClick={() => setFilter(c)}
            />
          ))}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <LoadingState />
      ) : images.length === 0 ? (
        <EmptyState
          title="No images yet."
          description="Use the form above to add a photo."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Nothing in this category yet."
          description="Switch filter or add an image."
        />
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {filtered.map((img) => (
            <li key={img.id}>
              <article className="group relative aspect-square overflow-hidden rounded-sm bg-deep/5 border border-deep/10">
                <Image
                  src={media(img.src)}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-deep/0 group-hover:bg-deep/40 transition-colors duration-200 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100">
                  <span
                    className="inline-block w-fit bg-white/90 backdrop-blur text-deep font-roboto text-[10px] uppercase px-2 py-0.5 rounded-sm"
                    style={{ letterSpacing: '0.22em' }}
                  >
                    {img.category}
                  </span>
                  <p className="mt-1 text-white font-sans text-xs line-clamp-2">
                    {img.alt}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmId(img.id)}
                  className="absolute top-2 right-2 bg-white/90 backdrop-blur p-1.5 rounded-sm text-bold hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  aria-label="Remove image"
                >
                  <Trash2 size={12} strokeWidth={1.75} />
                </button>
              </article>
            </li>
          ))}
        </ul>
      )}

      <ConfirmInline
        open={!!confirmId}
        message="Remove this image from the gallery?"
        confirmLabel="Remove"
        onConfirm={() => confirmId && deleteImage(confirmId)}
        onCancel={() => setConfirmId(null)}
      />

      <Toast state={toast} />
    </>
  );
}

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'px-3.5 py-2 font-roboto text-[10px] uppercase rounded-sm transition-colors cursor-pointer',
        active ? 'bg-deep text-white' : 'text-muted hover:text-deep',
      ].join(' ')}
      style={{ letterSpacing: '0.22em' }}
    >
      {label}
      <span
        className={[
          'ml-2 tabular-nums normal-case',
          active ? 'text-white/60' : 'text-muted/60',
        ].join(' ')}
        style={{ letterSpacing: '0.06em' }}
      >
        {count}
      </span>
    </button>
  );
}
