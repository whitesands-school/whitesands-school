'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getNews } from '@/lib/content';
import { PageHero } from '@/components/sections/PageHero';
import { media } from '@/lib/media';
import type { NewsPost } from '@/types';

const POSTS_PER_PAGE = 12;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatMeta(category: string, iso: string) {
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
// Page
// ---------------------------------------------------------------------------

export default function NewsPage() {
  const all = useMemo(() => getNews(), []);
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(all.map((p) => p.category)))],
    [all]
  );

  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);

  const lead = all[0];

  // Grid = everything except the lead, filtered by category.
  const gridSource = useMemo(() => {
    const rest = all.slice(1);
    return activeCategory === 'All'
      ? rest
      : rest.filter((p) => p.category === activeCategory);
  }, [all, activeCategory]);

  // Show the lead only when no filter is active (or when its category matches).
  const showLead =
    activeCategory === 'All' || (lead && lead.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(gridSource.length / POSTS_PER_PAGE));
  const paginated = gridSource.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  function selectCategory(cat: string) {
    setActiveCategory(cat);
    setPage(1);
  }

  return (
    <>
      <PageHero
        size="short"
        image={media('/images/students/orchestra-at-ceremony.jpg')}
        imageAlt="A school ceremony in progress"
        overlay={0.6}
        eyebrow="News"
        title={
          <>
            News &amp;{' '}
            <span className="italic text-lemon">Stories.</span>
          </>
        }
        subtitle="From the classrooms, the chapel, the field."
      />

      {/* ── Mobile filter — horizontal scroll strip ──────────────
          Hidden on lg+, where the sidebar takes over. Sits flush
          beneath the hero so the lead story isn't pushed down. */}
      <div className="lg:hidden sticky top-[calc(7rem+var(--ws-banner-h,0px))] z-20 bg-white/85 backdrop-blur supports-backdrop-filter:bg-white/70 border-b border-deep/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <ul className="flex items-center gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 sm:-mx-10 px-6 sm:px-10">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <li key={cat} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => selectCategory(cat)}
                    className={[
                      'relative py-4 font-roboto text-[11px] uppercase transition-colors duration-200',
                      isActive ? 'text-deep' : 'text-muted hover:text-deep',
                    ].join(' ')}
                    style={{ letterSpacing: '0.22em' }}
                  >
                    {cat}
                    {isActive && (
                      <motion.span
                        layoutId="news-filter-underline"
                        aria-hidden
                        className="absolute left-0 right-0 -bottom-px h-0.5 bg-lemon"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <section className="bg-white py-12 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          {/* 4-col layout: 3-col content + 1-col sidebar filter on lg+ */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Sidebar — desktop only */}
            <aside className="hidden lg:block lg:col-span-1 lg:order-2">
              <div className="lg:sticky lg:top-[calc(10rem+var(--ws-banner-h,0px))]">
                <p
                  className="font-roboto text-[11px] uppercase text-deep"
                  style={{ letterSpacing: '0.28em' }}
                >
                  Filter by topic
                </p>
                <ul className="mt-5 flex flex-col border-t border-deep/10 pt-2">
                  {categories.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                      <li key={cat}>
                        <button
                          type="button"
                          onClick={() => selectCategory(cat)}
                          className={[
                            'group relative inline-flex items-center gap-2 py-2 font-roboto text-xs uppercase transition-colors duration-200',
                            isActive
                              ? 'text-deep'
                              : 'text-muted hover:text-deep',
                          ].join(' ')}
                          style={{ letterSpacing: '0.22em' }}
                        >
                          {isActive && (
                            <span
                              aria-hidden
                              className="block w-3 h-px bg-lemon"
                            />
                          )}
                          {cat}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-3 lg:order-1">
              {/* Lead story */}
              {showLead && lead && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <LeadCard post={lead} />
                </motion.div>
              )}

              {/* Grid */}
              {paginated.length > 0 ? (
                <ul
                  className={[
                    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-12',
                    showLead && lead ? 'mt-20 pt-16 border-t border-deep/15' : '',
                  ].join(' ')}
                >
                  {paginated.map((post, i) => (
                    <motion.li
                      key={post.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: Math.min(i * 0.04, 0.3),
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <NewsCard post={post} />
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="mt-16 font-sans text-base text-muted">
                  No stories in this category yet.
                </p>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  aria-label="Pagination"
                  className="mt-16 flex items-center justify-between border-t border-deep/10 pt-6"
                >
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="font-roboto text-xs uppercase text-deep hover:text-bold disabled:text-muted/60 disabled:cursor-not-allowed transition-colors"
                    style={{ letterSpacing: '0.22em' }}
                  >
                    ← Prev
                  </button>
                  <p
                    className="font-roboto text-xs uppercase text-muted tabular-nums"
                    style={{ letterSpacing: '0.22em' }}
                  >
                    Page {page} of {totalPages}
                  </p>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="font-roboto text-xs uppercase text-deep hover:text-bold disabled:text-muted/60 disabled:cursor-not-allowed transition-colors"
                    style={{ letterSpacing: '0.22em' }}
                  >
                    Next →
                  </button>
                </nav>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

function LeadCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group block"
    >
      <div className="relative aspect-video lg:aspect-21/9 overflow-hidden rounded-sm bg-deep/5">
        <Image
          src={media(post.coverImage)}
          alt={post.title}
          fill
          sizes="(max-width: 1024px) 100vw, 75vw"
          priority
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="mt-7 max-w-3xl">
        <p
          className="font-roboto text-[11px] uppercase text-muted"
          style={{ letterSpacing: '0.22em' }}
        >
          {formatMeta(post.category, post.date)}
        </p>
        <h2
          className="mt-3 font-serif text-deep group-hover:text-bold transition-colors leading-[1.08]"
          style={{
            fontSize: 'clamp(1.875rem, 3.6vw, 3rem)',
            letterSpacing: '-0.02em',
          }}
        >
          {post.title}
        </h2>
        <p className="mt-4 font-sans text-base lg:text-lg text-dark/70 leading-relaxed line-clamp-2 max-w-2xl">
          {post.excerpt}
        </p>
        <span
          className="mt-5 inline-flex items-center gap-2 font-roboto uppercase text-xs text-deep group-hover:text-bold transition-colors"
          style={{ letterSpacing: '0.2em' }}
        >
          Read article
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function NewsCard({ post }: { post: NewsPost }) {
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
      <div className="mt-5 flex flex-col flex-1">
        <p
          className="font-roboto text-[10px] uppercase text-muted"
          style={{ letterSpacing: '0.22em' }}
        >
          {formatMeta(post.category, post.date)}
        </p>
        <h3 className="mt-3 font-serif text-xl text-deep leading-snug group-hover:text-bold transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-3 font-sans text-sm text-dark/65 leading-relaxed line-clamp-2 flex-1">
          {post.excerpt}
        </p>
        <span
          className="mt-4 inline-flex items-center gap-1.5 font-roboto uppercase text-[11px] text-deep group-hover:text-bold transition-colors"
          style={{ letterSpacing: '0.2em' }}
        >
          Read
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
