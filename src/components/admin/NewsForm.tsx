'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import {
  Button,
  Card,
  Field,
  Toast,
  Toggle,
  useToast,
  inputClass,
  textareaClass,
} from '@/components/admin/ui';
import { media } from '@/lib/media';
import type { NewsPost } from '@/types';

const CATEGORIES = [
  'Academics',
  'Events',
  'Facilities',
  'Values',
  'Admissions',
  'Sports',
  'Staff',
  'Community',
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

interface NewsFormProps {
  initial: NewsPost;
  /** When true, treat `id` as new and POST. When false, PUT to the existing id. */
  mode: 'create' | 'edit';
}

export function NewsForm({ initial, mode }: NewsFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<NewsPost>(initial);
  const [toast, setToast] = useToast();
  const [saving, setSaving] = useState(false);

  function set<K extends keyof NewsPost>(key: K, value: NewsPost[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function handleTitleChange(value: string) {
    setForm((p) => ({
      ...p,
      title: value,
      // Keep slug auto-synced while it still matches the previous title.
      slug: p.slug === slugify(p.title) || !p.slug ? slugify(value) : p.slug,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setToast({ kind: 'saving' });
    try {
      const url =
        mode === 'create' ? '/api/admin/news' : `/api/admin/news/${form.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setToast({ kind: 'saved' });
      if (mode === 'create') {
        router.push('/admin/news');
      }
    } catch {
      setToast({ kind: 'error', message: 'Save failed. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-5">
          <Card className="p-6 sm:p-7 space-y-5">
            <Field label="Title" required>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="A short, clear headline"
                required
                className={inputClass}
              />
            </Field>

            <Field
              label="Slug"
              hint="Auto-generated from the title — edit if needed"
              required
            >
              <input
                type="text"
                value={form.slug}
                onChange={(e) => set('slug', slugify(e.target.value))}
                required
                className={`${inputClass} font-mono text-xs text-muted`}
                placeholder="my-news-post"
              />
            </Field>

            <Field
              label="Excerpt"
              hint="One or two lines shown in listings"
              required
            >
              <textarea
                value={form.excerpt}
                onChange={(e) => set('excerpt', e.target.value)}
                rows={3}
                required
                className={textareaClass}
                placeholder="A short summary that appears below the title in news cards."
              />
            </Field>

            <Field
              label="Body"
              hint="Separate paragraphs with a blank line"
              required
            >
              <textarea
                value={form.content}
                onChange={(e) => set('content', e.target.value)}
                rows={16}
                required
                className={`${textareaClass} font-serif text-base leading-[1.65]`}
                placeholder="The full article."
              />
            </Field>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-5">
          {/* Publish controls */}
          <Card className="p-6">
            <p
              className="font-roboto text-[11px] uppercase text-muted mb-4"
              style={{ letterSpacing: '0.22em' }}
            >
              Publish
            </p>
            <Toggle
              checked={form.published}
              onChange={(v) => set('published', v)}
              label={form.published ? 'Live on the site' : 'Draft'}
              description={
                form.published
                  ? 'This post is visible to visitors.'
                  : 'Drafts are saved but hidden.'
              }
            />
            <div className="mt-5 pt-5 border-t border-deep/10 space-y-2">
              <Button
                type="submit"
                disabled={saving}
                className="w-full"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving
                  ? 'Saving'
                  : mode === 'create'
                  ? 'Save post'
                  : 'Save changes'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() => router.push('/admin/news')}
              >
                Back to all posts
              </Button>
            </div>
          </Card>

          {/* Meta */}
          <Card className="p-6 space-y-5">
            <p
              className="font-roboto text-[11px] uppercase text-muted"
              style={{ letterSpacing: '0.22em' }}
            >
              Meta
            </p>
            <Field label="Category" required>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className={inputClass}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Date" required>
              <input
                type="date"
                value={form.date.split('T')[0]}
                onChange={(e) => set('date', e.target.value)}
                required
                className={inputClass}
              />
            </Field>
          </Card>

          {/* Cover image */}
          <Card className="p-6 space-y-4">
            <p
              className="font-roboto text-[11px] uppercase text-muted"
              style={{ letterSpacing: '0.22em' }}
            >
              Cover image
            </p>
            {form.coverImage ? (
              <div className="relative aspect-3/2 overflow-hidden rounded-sm bg-deep/5 border border-deep/10">
                <Image
                  src={media(form.coverImage)}
                  alt={form.title || 'Cover image preview'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-3/2 rounded-sm bg-deep/[0.03] border border-dashed border-deep/15 flex items-center justify-center">
                <p className="font-roboto text-[10px] uppercase text-muted" style={{ letterSpacing: '0.22em' }}>
                  No image
                </p>
              </div>
            )}
            <Field
              label="Image path"
              hint="Path under /public on ImageKit, e.g. /images/students/graduands-walking.jpg"
            >
              <input
                type="text"
                value={form.coverImage}
                onChange={(e) => set('coverImage', e.target.value)}
                placeholder="/images/students/..."
                className={`${inputClass} font-mono text-xs`}
              />
            </Field>
          </Card>
        </div>
      </div>

      <Toast state={toast} />
    </form>
  );
}
