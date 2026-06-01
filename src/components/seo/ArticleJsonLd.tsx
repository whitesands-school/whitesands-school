import { SITE } from '@/lib/site';
import { media } from '@/lib/media';
import type { NewsPost } from '@/types';

/**
 * BlogPosting JSON-LD for individual news articles. Mounted at the top of
 * the article page so search engines can pick up structured metadata
 * alongside the human-readable header.
 *
 * Validates at https://validator.schema.org/ and Google's Rich Results test.
 */
export function ArticleJsonLd({ post }: { post: NewsPost }) {
  const articleUrl = `${SITE.url}/news/${post.slug}`;
  const imageUrl = media(post.coverImage);

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': articleUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    articleSection: post.category,
    author: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: media('/images/logos/whitesands-school-logo.png'),
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
