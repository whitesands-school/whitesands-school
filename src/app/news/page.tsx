'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { getNews } from '@/lib/content'
import { Badge, SectionLabel } from '@/components/ui'
import type { NewsPost } from '@/types'

const POSTS_PER_PAGE = 6

type BadgeCategory = 'Academic' | 'Sport' | 'Events' | 'Community' | 'Spiritual'

function categoryToBadge(category: string): BadgeCategory {
  const map: Record<string, BadgeCategory> = {
    Academics: 'Academic',
    Academic: 'Academic',
    Events: 'Events',
    Facilities: 'Community',
    Values: 'Spiritual',
    Admissions: 'Academic',
    Sports: 'Sport',
    Staff: 'Community',
  }
  return map[category] ?? 'Community'
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function NewsCard({ post }: { post: NewsPost }) {
  return (
    <motion.article
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full"
      whileHover={{ y: -4, boxShadow: '0 12px 28px -6px rgba(0,0,0,0.14)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="relative aspect-video bg-deep/10 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <Badge category={categoryToBadge(post.category)}>{post.category}</Badge>
          <span className="text-muted text-xs font-roboto flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(post.date)}
          </span>
        </div>
        <h3 className="font-roboto font-bold text-xl text-dark mb-2 line-clamp-2 leading-snug">
          {post.title}
        </h3>
        <p className="font-sans text-muted text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
          {post.excerpt}
        </p>
        <Link
          href={`/news/${post.slug}`}
          className="inline-flex items-center gap-1 font-roboto font-semibold text-sm text-deep hover:text-bold transition-colors"
        >
          Read More <ArrowRight size={14} />
        </Link>
      </div>
    </motion.article>
  )
}

export default function NewsPage() {
  const allPosts = getNews()
  const categories = ['All', ...Array.from(new Set(allPosts.map((p) => p.category)))]

  const [activeCategory, setActiveCategory] = useState('All')
  const [page, setPage] = useState(1)

  const featured = allPosts[0]

  const gridPosts = useMemo(() => {
    const rest = allPosts.slice(1)
    if (activeCategory === 'All') return rest
    return rest.filter((p) => p.category === activeCategory)
  }, [allPosts, activeCategory])

  const showFeatured =
    activeCategory === 'All' || (featured && featured.category === activeCategory)

  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE)
  const paginated = gridPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  function handleCategory(cat: string) {
    setActiveCategory(cat)
    setPage(1)
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-deep pt-48 pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel label="Whitesands Community" light className="mb-5" />
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">
              News &amp; Stories
            </h1>
            <p className="font-sans text-white/60 text-lg max-w-xl">
              Updates from across the Whitesands community
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter bar ────────────────────────────────────────────── */}
      <div className="sticky top-[88px] z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={[
                  'flex-shrink-0 px-4 py-1.5 rounded-full font-roboto text-sm font-medium transition-all duration-200',
                  activeCategory === cat
                    ? 'bg-deep text-white'
                    : 'border border-gray-200 text-dark hover:border-deep',
                ].join(' ')}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        {/* Featured post */}
        <AnimatePresence mode="wait">
          {showFeatured && featured && (
            <motion.article
              key="featured"
              className="grid lg:grid-cols-5 rounded-xl overflow-hidden shadow-md mb-14 bg-white border border-gray-100"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Image — 3/5 cols (60%) */}
              <div className="relative lg:col-span-3 h-64 lg:h-auto min-h-[300px] bg-deep/10">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
              {/* Content — 2/5 cols (40%) */}
              <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <Badge category={categoryToBadge(featured.category)}>
                    {featured.category}
                  </Badge>
                  <span className="text-muted text-sm font-roboto flex items-center gap-1.5">
                    <Calendar size={13} />
                    {formatDate(featured.date)}
                  </span>
                </div>
                <h2 className="font-roboto font-bold text-3xl text-dark leading-tight mb-3">
                  {featured.title}
                </h2>
                <p className="font-sans text-muted leading-relaxed mb-7">
                  {featured.excerpt}
                </p>
                <Link
                  href={`/news/${featured.slug}`}
                  className="inline-flex items-center gap-2 font-roboto font-semibold text-sm text-white bg-deep hover:bg-bold px-5 py-2.5 rounded transition-colors duration-200 w-fit"
                >
                  Read More <ArrowRight size={15} />
                </Link>
              </div>
            </motion.article>
          )}
        </AnimatePresence>

        {/* News grid */}
        {paginated.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paginated.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <NewsCard post={post} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted font-sans py-20">
            No posts in this category yet.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded border border-gray-200 text-dark disabled:opacity-30 hover:border-deep transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={[
                  'w-9 h-9 rounded font-roboto text-sm font-medium transition-colors',
                  page === n
                    ? 'bg-deep text-white'
                    : 'border border-gray-200 text-dark hover:border-deep',
                ].join(' ')}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded border border-gray-200 text-dark disabled:opacity-30 hover:border-deep transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  )
}
