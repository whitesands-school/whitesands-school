import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowLeft } from 'lucide-react'
import { getNews, getNewsBySlug } from '@/lib/content'
import { Badge } from '@/components/ui'

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

export async function generateStaticParams() {
  return getNews().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getNewsBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default function NewsPostPage({ params }: { params: { slug: string } }) {
  const post = getNewsBySlug(params.slug)
  if (!post) notFound()

  const allPosts = getNews()
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3)
  const paragraphs = post.content.split('\n\n').filter(Boolean)

  return (
    <>
      {/* ── Cover image ───────────────────────────────────────────── */}
      <div className="relative h-120 bg-deep/20 mt-22">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark/50 to-transparent" />
      </div>

      {/* ── Article body ──────────────────────────────────────────── */}
      <article className="max-w-3xl mx-auto px-6 py-14">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-5">
          <Badge category={categoryToBadge(post.category)}>{post.category}</Badge>
          <span className="text-muted text-sm font-roboto flex items-center gap-1.5">
            <Calendar size={13} />
            {formatDate(post.date)}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-5xl text-dark leading-tight mb-8">
          {post.title}
        </h1>

        <hr className="border-gray-200 mb-8" />

        {/* Body */}
        <div className="space-y-6">
          {paragraphs.map((para, i) => (
            <p key={i} className="font-sans text-lg leading-relaxed text-dark">
              {para}
            </p>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-14 pt-8 border-t border-gray-100">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-roboto font-medium text-sm text-muted hover:text-deep transition-colors"
          >
            <ArrowLeft size={15} />
            Back to News
          </Link>
        </div>
      </article>

      {/* ── Related posts ─────────────────────────────────────────── */}
      <section className="bg-offwhite py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-roboto font-bold text-2xl text-dark mb-8">Related Posts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.id} href={`/news/${p.slug}`} className="group">
                <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <div className="relative aspect-video bg-deep/10">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge category={categoryToBadge(p.category)}>{p.category}</Badge>
                      <span className="text-muted text-xs font-roboto flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDate(p.date)}
                      </span>
                    </div>
                    <h3 className="font-roboto font-bold text-lg text-dark leading-snug line-clamp-2 mb-2 flex-1">
                      {p.title}
                    </h3>
                    <p className="font-sans text-sm text-muted leading-relaxed line-clamp-2 mb-4">
                      {p.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 font-roboto font-semibold text-sm text-deep group-hover:text-bold transition-colors">
                      Read More →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
