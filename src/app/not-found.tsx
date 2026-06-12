import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

const QUICK_LINKS = [
  { label: 'Admissions', href: '/admissions' },
  { label: 'School Fees', href: '/fees-portal' },
  { label: 'Our People', href: '/our-people' },
  { label: 'News & Stories', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 py-28 lg:py-36 text-center">
        <p
          className="font-roboto text-xs uppercase text-bold"
          style={{ letterSpacing: '0.28em' }}
        >
          404 — Page not found
        </p>

        <h1
          className="mt-6 font-serif text-deep"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          This page has launched a little{' '}
          <span className="italic">too deep.</span>
        </h1>

        <p className="mt-6 font-sans text-base sm:text-lg text-dark/70 leading-relaxed max-w-xl mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back to familiar waters.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-deep text-white font-roboto uppercase text-sm px-8 py-3.5 hover:bg-bold transition-colors duration-200"
            style={{ letterSpacing: '0.14em' }}
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-deep/25 text-deep font-roboto uppercase text-sm px-8 py-3.5 hover:border-deep hover:bg-deep/5 transition-colors duration-200"
            style={{ letterSpacing: '0.14em' }}
          >
            Contact the school
          </Link>
        </div>

        <nav aria-label="Popular pages" className="mt-16">
          <p
            className="font-roboto text-[11px] uppercase text-muted"
            style={{ letterSpacing: '0.24em' }}
          >
            Or were you looking for
          </p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
            {QUICK_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-block border border-deep/15 rounded-full px-4 py-2 font-sans text-sm text-dark/75 hover:border-deep hover:text-deep transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
