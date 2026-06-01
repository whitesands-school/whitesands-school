'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getNews } from '@/lib/content';
import { media } from '@/lib/media';
import type { NewsPost } from '@/types';

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

function LeadCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex flex-col h-full"
    >
      {/* Image stretches to fill available row span; min-h keeps a sensible
          floor on mobile where there's no row span to stretch into. */}
      <div className="relative flex-1 min-h-90 lg:min-h-0 overflow-hidden rounded-sm bg-deep/5">
        <Image
          src={media(post.coverImage)}
          alt={post.title}
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          priority
        />
      </div>

      <div className="mt-7">
        <p
          className="font-roboto text-[11px] uppercase text-muted"
          style={{ letterSpacing: '0.22em' }}
        >
          {formatMeta(post.category, post.date)}
        </p>
        <h3
          className="mt-3 font-serif text-deep leading-[1.1] tracking-tight group-hover:text-bold transition-colors"
          style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.5rem)' }}
        >
          {post.title}
        </h3>
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

function SecondaryCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex flex-col sm:flex-row lg:flex-col gap-5 lg:gap-4 h-full"
    >
      <div className="relative w-full sm:w-2/5 lg:w-full aspect-3/2 shrink-0 overflow-hidden rounded-sm bg-deep/5">
        <Image
          src={media(post.coverImage)}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 32vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col">
        <p
          className="font-roboto text-[11px] uppercase text-muted"
          style={{ letterSpacing: '0.22em' }}
        >
          {formatMeta(post.category, post.date)}
        </p>
        <h4 className="mt-2 font-serif text-xl lg:text-2xl text-deep leading-snug group-hover:text-bold transition-colors line-clamp-2">
          {post.title}
        </h4>
        <p className="mt-2 font-sans text-sm text-dark/65 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <span
          className="mt-3 inline-flex items-center gap-2 font-roboto uppercase text-[11px] text-deep group-hover:text-bold transition-colors"
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

export function LatestNews() {
  const recent = getNews().slice(0, 3);
  const [lead, ...secondaries] = recent;

  if (!lead) return null;

  return (
    <section className="bg-offwhite py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p
              className="font-roboto text-xs uppercase text-deep"
              style={{ letterSpacing: '0.28em' }}
            >
              Latest from school
            </p>
            <h2
              className="mt-5 font-serif text-deep"
              style={{
                fontSize: 'clamp(2.25rem, 4.4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              What&apos;s happening at{' '}
              <span className="italic">Whitesands.</span>
            </h2>
          </div>
          <Link
            href="/news"
            className="font-roboto uppercase text-sm text-deep hover:text-bold transition-colors inline-flex items-center gap-2 group shrink-0"
            style={{ letterSpacing: '0.18em' }}
          >
            All news
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Grid: lead spans 2 rows, secondaries 1 row each — equal column heights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[1fr_1fr] gap-10 lg:gap-x-10 lg:gap-y-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 lg:row-span-2 flex"
          >
            <LeadCard post={lead} />
          </motion.div>

          {secondaries.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: 0.12 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={[
                'lg:col-span-5 lg:col-start-8',
                i === 0
                  ? 'lg:row-start-1 lg:pb-10 lg:border-b lg:border-deep/10'
                  : 'lg:row-start-2',
              ].join(' ')}
            >
              <SecondaryCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
