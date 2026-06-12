'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/lib/site';
import { media } from '@/lib/media';
// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const COLUMN_GROUPS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'The School',
    links: [
      { label: 'About Whitesands', href: '/about' },
      { label: 'Our Story', href: '/about#story' },
      { label: 'Who We Are', href: '/about#who-we-are' },
      { label: 'Educational Philosophy', href: '/about#philosophy' },
      { label: '25th Anniversary', href: '/25th-anniversary' },
    ],
  },
  {
    heading: 'What We Offer',
    links: [
      { label: 'Academics', href: '/what-we-offer/academics' },
      { label: 'Extracurricular', href: '/what-we-offer/extracurricular' },
      { label: 'Personal Formation', href: '/what-we-offer/personal-formation' },
      { label: 'Facilities & Campus', href: '/what-we-offer/facilities' },
    ],
  },
  {
    heading: 'Our People',
    links: [
      { label: 'Staff & Leadership', href: '/our-people' },
      { label: 'Students', href: '/our-people#students' },
      { label: 'Parents', href: '/our-people#parents' },
      { label: 'Alumni', href: '/our-people#alumni' },
      { label: 'Alumni Prizes', href: '/alumni-prizes' },
    ],
  },
  {
    heading: 'Visit & Apply',
    links: [
      { label: 'Book a school visit', href: '/admissions#visit' },
      { label: 'Apply for admission', href: '/admissions' },
      { label: 'Fees Portal', href: '/fees-portal' },
      { label: 'News & Stories', href: '/news' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Social icons (inline SVG — lucide-react has no brand icons)
// ---------------------------------------------------------------------------

function IconInstagram({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconLinkedin({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconYoutube({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIALS = [
  { Icon: IconInstagram, label: 'Instagram', href: SITE.sameAs[0] },
  { Icon: IconFacebook, label: 'Facebook', href: SITE.sameAs[1] },
  { Icon: IconLinkedin, label: 'LinkedIn', href: SITE.sameAs[2] },
  { Icon: IconYoutube, label: 'YouTube', href: SITE.sameAs[3] },
];

// ---------------------------------------------------------------------------
// Column heading
// ---------------------------------------------------------------------------

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-roboto uppercase text-xs tracking-widest text-lemon mb-4">
      {children}
    </h3>
  );
}

// ---------------------------------------------------------------------------
// Link list
// ---------------------------------------------------------------------------

function FooterLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {links.map(({ label, href }) => (
        <li key={href}>
          <Link
            href={href}
            className="text-white/70 hover:text-lemon transition-colors duration-200 text-sm"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function Footer() {
  return (
    <footer>
      {/* ------------------------------------------------------------------ */}
      {/* ROW 0 — Closing call to action                                      */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-deep">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 py-24 lg:py-32 text-center">
          <p
            className="font-roboto text-xs uppercase text-lemon"
            style={{ letterSpacing: '0.28em' }}
          >
            Come and see
          </p>

          <h2
            className="mt-5 font-serif text-offwhite"
            style={{
              fontSize: 'clamp(2rem, 4.4vw, 3rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
            }}
          >
            The best way to understand Whitesands is to{' '}
            <span className="italic">visit.</span>
          </h2>

          <p className="mt-6 font-sans text-base sm:text-lg text-offwhite/70 leading-relaxed max-w-xl mx-auto">
            Walk the corridors during a school day. We will arrange a visit
            for a date that suits you.
          </p>

          <div className="mt-10 flex flex-col items-center gap-5">
            <Link
              href="/admissions#visit"
              className="inline-flex items-center justify-center bg-lemon text-deep font-roboto uppercase text-sm px-10 py-4 hover:bg-white transition-colors"
              style={{ letterSpacing: '0.18em' }}
            >
              Book a visit
            </Link>

            <Link
              href="/admissions"
              className="group inline-flex items-center gap-2 font-roboto uppercase text-xs text-offwhite/70 hover:text-lemon transition-colors"
              style={{ letterSpacing: '0.22em' }}
            >
              Or read the 2026 admissions process
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* ROW 1 — Identity                                                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-dark pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col gap-5 max-w-md">
            <Link href="/" className="w-fit" aria-label="Whitesands School — Home">
              <Image
                src={media('/images/logos/whitesands-school-logo.png')}
                alt="Whitesands School"
                width={600}
                height={189}
                sizes="160px"
                style={{ width: 'auto' }}
                className="h-11 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              />
            </Link>
            <p className="font-serif italic text-white/60 text-base leading-relaxed">
              &ldquo;{SITE.motto}&rdquo; — Launch into the Deep
            </p>
            <address className="not-italic flex flex-col gap-1.5 text-sm text-white/60 mt-2">
              <span>
                {SITE.address.street}, {SITE.address.locality}, {SITE.address.region}
              </span>
              <a
                href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`}
                className="hover:text-lemon transition-colors duration-200"
              >
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="hover:text-lemon transition-colors duration-200"
              >
                {SITE.email}
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* ROW 2 — Full sitemap of links                                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-dark border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {COLUMN_GROUPS.map((col) => (
            <div key={col.heading}>
              <ColHeading>{col.heading}</ColHeading>
              <FooterLinks links={col.links} />
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* ROW 2 — Social strip                                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-deep py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between gap-4">
          <span className="text-white/60 text-sm font-roboto">Follow us</span>

          <div className="flex items-center gap-5">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-lemon transition-colors duration-200"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* ROW 3 — Legal strip                                                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-deep">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-white/70 text-xs font-roboto">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <span className="text-white/70 text-xs font-roboto">
            Designed &amp; developed by{' '}
            <a
              href="https://www.greyform.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 hover:text-lemon underline underline-offset-2 transition-colors duration-200"
            >
              Greyform
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
