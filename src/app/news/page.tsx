import { readContent } from '@/lib/content-store';
import { NewsClient } from './news-client';
import type { NewsPost } from '@/types';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const all = await readContent<NewsPost[]>('news');
  const posts = all
    .filter((p) => p.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return <NewsClient posts={posts} />;
}
