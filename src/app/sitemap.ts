import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { getNews } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, '');
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '/', priority: 1.0, freq: 'weekly' },
    { path: '/about', priority: 0.9, freq: 'monthly' },
    { path: '/admissions', priority: 0.95, freq: 'weekly' },
    { path: '/what-we-offer', priority: 0.85, freq: 'monthly' },
    { path: '/what-we-offer/academics', priority: 0.8, freq: 'monthly' },
    { path: '/what-we-offer/extracurricular', priority: 0.8, freq: 'monthly' },
    { path: '/what-we-offer/personal-formation', priority: 0.8, freq: 'monthly' },
    { path: '/what-we-offer/facilities', priority: 0.8, freq: 'monthly' },
    { path: '/our-people', priority: 0.85, freq: 'monthly' },
    { path: '/alumni-prizes', priority: 0.7, freq: 'yearly' },
    { path: '/news', priority: 0.75, freq: 'weekly' },
    { path: '/contact', priority: 0.8, freq: 'monthly' },
    { path: '/fees-portal', priority: 0.6, freq: 'yearly' },
    { path: '/25th-anniversary', priority: 0.6, freq: 'yearly' },
  ];

  const news = getNews().map((post) => ({
    url: `${base}/news/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes.map((r) => ({
      url: `${base}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...news,
  ];
}
