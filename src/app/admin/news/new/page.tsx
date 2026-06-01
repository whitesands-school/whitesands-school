'use client';

import { PageHeader } from '@/components/admin/ui';
import { NewsForm } from '@/components/admin/NewsForm';
import type { NewsPost } from '@/types';

function blankPost(): NewsPost {
  return {
    id: `news-${Date.now()}`,
    title: '',
    slug: '',
    category: 'Academics',
    excerpt: '',
    content: '',
    coverImage: '',
    date: new Date().toISOString().split('T')[0],
    published: false,
  };
}

export default function NewPostPage() {
  return (
    <>
      <PageHeader
        eyebrow="News"
        title="Write a post"
        description="Drafts stay hidden until you turn Publish on."
      />
      <NewsForm initial={blankPost()} mode="create" />
    </>
  );
}
