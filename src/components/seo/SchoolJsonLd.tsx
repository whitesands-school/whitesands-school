import { SITE } from '@/lib/site';
import { media } from '@/lib/media';

/**
 * Site-wide EducationalOrganization JSON-LD. Renders an invisible <script>
 * with the school's structured data. Mounted on the homepage.
 *
 * Validates at https://validator.schema.org/ and Google's Rich Results test.
 */
export function SchoolJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': SITE.url,
    name: SITE.name,
    alternateName: 'Whitesands',
    description: SITE.description,
    url: SITE.url,
    logo: media('/images/logos/whitesands-school-logo.png'),
    foundingDate: '2000',
    slogan: SITE.motto,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    telephone: SITE.phone,
    email: SITE.email,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'admissions',
        email: SITE.admissionsEmail,
        telephone: SITE.phone,
        areaServed: 'NG',
        availableLanguage: ['en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SITE.email,
        telephone: SITE.phone,
        areaServed: 'NG',
        availableLanguage: ['en'],
      },
    ],
    areaServed: { '@type': 'Country', name: 'Nigeria' },
    sameAs: SITE.sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
