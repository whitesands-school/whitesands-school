'use client';

import { use, useEffect, useState } from 'react';
import { PageHeader, LoadingState } from '@/components/admin/ui';
import { NewsForm } from '@/components/admin/NewsForm';
import type { NewsPost } from '@/types';

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [post, setPost] = useState<NewsPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/news/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(setPost)
      .catch(() => setError('Could not load this post.'));
  }, [id]);

  if (error) {
    return (
      <>
        <PageHeader eyebrow="News" title="Edit post" />
        <p className="font-sans text-sm text-bold">{error}</p>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <PageHeader eyebrow="News" title="Edit post" />
        <LoadingState />
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="News"
        title="Edit post"
        description={post.title}
      />
      <NewsForm initial={post} mode="edit" />
    </>
  );
}
