import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { readContent } from '@/lib/content-store';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { media } from '@/lib/media';
import type { NewsPost } from '@/types';

interface Props {
  params: Promise<{ slug: string }>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatLongDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatShortMeta(category: string, iso: string) {
  const date = new Date(iso)
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .toUpperCase();
  return `${category.toUpperCase()} · ${date}`;
}

// ---------------------------------------------------------------------------
// Static params + metadata
// ---------------------------------------------------------------------------

async function getPublishedNews() {
  return (await readContent<NewsPost[]>('news'))
    .filter((p) => p.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPublishedNews()).find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: media(post.coverImage) }],
      type: 'article',
      publishedTime: post.date,
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = (await getPublishedNews()).find((p) => p.slug === slug);
  if (!post) notFound();

  const related = (await getPublishedNews())
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const paragraphs = post.content
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article>
      <ArticleJsonLd post={post} />

      {/* ── Header ───────────────────────────────────────────── */}
      <header className="bg-white pt-20 lg:pt-24 pb-12 lg:pb-16">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
          <p
            className="font-roboto text-[11px] uppercase text-deep"
            style={{ letterSpacing: '0.28em' }}
          >
            {post.category}
          </p>
          <h1
            className="mt-5 font-serif text-deep leading-[1.05]"
            style={{
              fontSize: 'clamp(2.25rem, 4.8vw, 3.75rem)',
              letterSpacing: '-0.02em',
            }}
          >
            {post.title}
          </h1>
          <p className="mt-6 font-sans text-lg text-dark/70 leading-relaxed">
            {post.excerpt}
          </p>
          <p
            className="mt-8 font-roboto text-[11px] uppercase text-muted"
            style={{ letterSpacing: '0.22em' }}
          >
            {formatLongDate(post.date)} · Whitesands Communications
          </p>
        </div>
      </header>

      {/* ── Full-bleed cover ─────────────────────────────────── */}
      <figure className="relative w-full aspect-video lg:aspect-21/9 bg-deep/5">
        <Image
          src={media(post.coverImage)}
          alt={post.title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </figure>

      {/* ── Body ─────────────────────────────────────────────── */}
      <section className="bg-white pt-16 lg:pt-20 pb-20 lg:pb-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="space-y-7">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="font-serif text-lg lg:text-xl text-dark/85 leading-[1.7]"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Back to news */}
          <div className="mt-16 pt-8 border-t border-deep/10">
            <Link
              href="/news"
              className="font-roboto uppercase text-xs text-deep hover:text-bold transition-colors inline-flex items-center gap-2"
              style={{ letterSpacing: '0.22em' }}
            >
              ← All news
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-offwhite py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <h2
                className="font-serif text-deep"
                style={{
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.15,
                }}
              >
                More from{' '}
                <span className="italic">Whitesands.</span>
              </h2>
              <Link
                href="/news"
                className="font-roboto uppercase text-xs text-deep hover:text-bold transition-colors inline-flex items-center gap-2 group"
                style={{ letterSpacing: '0.22em' }}
              >
                All news
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10">
              {related.map((p) => (
                <li key={p.id}>
                  <RelatedCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}

// ---------------------------------------------------------------------------
// Related card
// ---------------------------------------------------------------------------

function RelatedCard({ post }: { post: NewsPost }) {
  return (
    <Link href={`/news/${post.slug}`} className="group flex flex-col h-full">
      <div className="relative aspect-3/2 overflow-hidden rounded-sm bg-deep/5">
        <Image
          src={media(post.coverImage)}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="mt-5">
        <p
          className="font-roboto text-[10px] uppercase text-muted"
          style={{ letterSpacing: '0.22em' }}
        >
          {formatShortMeta(post.category, post.date)}
        </p>
        <h3 className="mt-3 font-serif text-xl text-deep leading-snug group-hover:text-bold transition-colors line-clamp-2">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}
