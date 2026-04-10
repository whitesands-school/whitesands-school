import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedPost, getNews } from '@/lib/content';
import { AnimatedSection, Badge, SectionLabel } from '@/components/ui';

type BadgeCategory = 'Academic' | 'Sport' | 'Events' | 'Community' | 'Spiritual';

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
  };
  return map[category] ?? 'Community';
}

export function LatestNews() {
  const featured = getFeaturedPost();
  const sideNews = getNews().slice(1, 5);

  return (
    <section className="bg-offwhite py-20">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="mb-12">
          <SectionLabel label="LATEST NEWS" />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16">

          {/* ── LEFT: Featured post ──────────────────────────────── */}
          <AnimatedSection className="flex flex-col">
            {featured && (
              <article className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="aspect-video relative">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="flex flex-col flex-1 p-7 gap-4">
                  <Badge category={categoryToBadge(featured.category)}>
                    {featured.category}
                  </Badge>

                  <h2 className="font-roboto font-black text-2xl text-dark leading-snug">
                    {featured.title}
                  </h2>

                  <p className="font-sans text-base text-muted leading-relaxed line-clamp-3">
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="font-sans text-sm text-muted">
                      {new Date(featured.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                    <Link
                      href={`/news/${featured.slug}`}
                      className="inline-flex items-center gap-1.5 font-roboto font-semibold text-sm text-white bg-deep hover:bg-bold px-4 py-2 rounded transition-colors duration-200"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            )}
          </AnimatedSection>

          {/* ── RIGHT: Sidebar posts + View All ─────────────────── */}
          <AnimatedSection delay={0.1} className="flex flex-col">
            <div className="flex flex-col divide-y divide-gray-200">
              {sideNews.map((post) => (
                <article key={post.id} className="py-6 first:pt-0 flex flex-col gap-2.5">
                  <Badge category={categoryToBadge(post.category)}>
                    {post.category}
                  </Badge>

                  <Link
                    href={`/news/${post.slug}`}
                    className="font-roboto font-bold text-base text-dark leading-snug hover:text-deep transition-colors duration-200"
                  >
                    {post.title}
                  </Link>

                  <p className="font-sans text-sm text-muted leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  <span className="font-sans text-xs text-muted/70">
                    {new Date(post.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </article>
              ))}
            </div>

            {/* View All — anchored to the list above */}
            <div className="mt-2 pt-5 border-t-2 border-deep/20">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 font-roboto font-semibold text-sm text-deep hover:text-bold transition-colors duration-200 group"
              >
                View all news
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
