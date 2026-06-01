'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import {
  PageHeader,
  Card,
  LinkButton,
  LoadingState,
  EmptyState,
  Toast,
  useToast,
  ConfirmInline,
  inputClass,
} from '@/components/admin/ui';
import type { NewsPost } from '@/types';

export default function AdminNewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [toast, setToast] = useToast();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/news')
      .then((r) => r.json())
      .then((data: NewsPost[]) => {
        // Newest first
        data.sort((a, b) => +new Date(b.date) - +new Date(a.date));
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setToast({ kind: 'error', message: 'Could not load posts.' });
      });
  }, [setToast]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (filter === 'published' && !p.published) return false;
      if (filter === 'draft' && p.published) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
      );
    });
  }, [posts, query, filter]);

  async function deletePost(id: string) {
    setConfirmId(null);
    const previous = posts;
    setPosts((prev) => prev.filter((p) => p.id !== id));
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setToast({ kind: 'saved', message: 'Post deleted' });
    } catch {
      setPosts(previous);
      setToast({ kind: 'error', message: 'Could not delete post.' });
    }
  }

  const counts = useMemo(
    () => ({
      all: posts.length,
      published: posts.filter((p) => p.published).length,
      draft: posts.filter((p) => !p.published).length,
    }),
    [posts]
  );

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="News"
        description="Stories, results, reflections and announcements that appear on the public site."
        actions={
          <LinkButton href="/admin/news/new">
            <Plus size={14} strokeWidth={2} />
            Write a post
          </LinkButton>
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
            placeholder="Search posts"
            className={`${inputClass} pl-9`}
          />
        </div>
        <FilterPills
          value={filter}
          onChange={setFilter}
          counts={counts}
        />
      </div>

      {loading ? (
        <LoadingState />
      ) : posts.length === 0 ? (
        <EmptyState
          title="No posts yet."
          description="Write the first story and it will appear on the site."
          action={
            <LinkButton href="/admin/news/new" size="sm">
              <Plus size={14} strokeWidth={2} />
              Write a post
            </LinkButton>
          }
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Nothing matched."
          description="Try a different search or filter."
        />
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-deep/10">
                <Th>Title</Th>
                <Th className="hidden md:table-cell">Category</Th>
                <Th className="hidden lg:table-cell">Date</Th>
                <Th>Status</Th>
                <th className="w-20" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-deep/5 last:border-0 hover:bg-deep/1.5 transition-colors"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/news/${post.id}`}
                      className="block font-sans text-sm text-deep hover:text-bold transition-colors line-clamp-1 font-medium"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span
                      className="font-roboto text-[10px] uppercase text-muted"
                      style={{ letterSpacing: '0.22em' }}
                    >
                      {post.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="font-sans text-sm text-muted tabular-nums">
                      {new Date(post.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge published={post.published} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/news/${post.id}`}
                        className="p-2 text-muted hover:text-deep rounded-sm transition-colors"
                        aria-label="Edit post"
                      >
                        <Pencil size={14} strokeWidth={1.75} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setConfirmId(post.id)}
                        className="p-2 text-muted hover:text-bold rounded-sm transition-colors cursor-pointer"
                        aria-label="Delete post"
                      >
                        <Trash2 size={14} strokeWidth={1.75} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <ConfirmInline
        open={!!confirmId}
        message="Delete this post? It will be removed from the site immediately."
        confirmLabel="Delete"
        onConfirm={() => confirmId && deletePost(confirmId)}
        onCancel={() => setConfirmId(null)}
      />

      <Toast state={toast} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Th({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`text-left px-5 py-3.5 font-roboto text-[10px] uppercase text-muted ${className}`}
      style={{ letterSpacing: '0.22em' }}
    >
      {children}
    </th>
  );
}

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 font-roboto text-[10px] uppercase',
        published ? 'text-deep' : 'text-muted',
      ].join(' ')}
      style={{ letterSpacing: '0.22em' }}
    >
      <span
        aria-hidden
        className={[
          'block w-1.5 h-1.5 rounded-full',
          published ? 'bg-deep' : 'bg-muted/40',
        ].join(' ')}
      />
      {published ? 'Published' : 'Draft'}
    </span>
  );
}

function FilterPills({
  value,
  onChange,
  counts,
}: {
  value: 'all' | 'published' | 'draft';
  onChange: (v: 'all' | 'published' | 'draft') => void;
  counts: { all: number; published: number; draft: number };
}) {
  const items: { value: typeof value; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'published', label: 'Published', count: counts.published },
    { value: 'draft', label: 'Drafts', count: counts.draft },
  ];
  return (
    <div className="flex items-center gap-1">
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
