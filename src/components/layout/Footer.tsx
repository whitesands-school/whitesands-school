'use client';

import Link from 'next/link';
import Image from 'next/image';
// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const ABOUT_LINKS = [
  { label: 'Who We Are', href: '/about/who-we-are' },
  { label: 'History', href: '/about/history' },
  { label: 'Vision & Mission', href: '/about/vision-mission' },
  { label: 'Philosophy', href: '/about/philosophy' },
];

const LEARN_LINKS = [
  { label: 'Academics', href: '/what-we-offer/academics' },
  { label: 'Extracurricular', href: '/what-we-offer/extracurricular' },
  { label: 'Personal Formation', href: '/what-we-offer/personal-formation' },
  { label: 'Facilities', href: '/what-we-offer/facilities' },
];

const CONNECT_LINKS = [
  { label: 'Admissions', href: '/admissions' },
  { label: 'Our People', href: '/our-people' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
  { label: 'Fees Portal', href: '/fees-portal' },
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
  { Icon: IconInstagram, label: 'Instagram', href: '#' },
  { Icon: IconFacebook, label: 'Facebook', href: '#' },
  { Icon: IconLinkedin, label: 'LinkedIn', href: '#' },
  { Icon: IconYoutube, label: 'YouTube', href: '#' },
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
      {/* ROW 1 — Main body                                                   */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-dark py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1 — Identity */}
          <div className="flex flex-col gap-4">
            {/* Logo */}
            <Link href="/" className="w-fit">
              <Image
                src="/images/logos/whitesands-school-logo.svg"
                alt="Whitesands School"
                width={160}
                height={51}
                className="h-12 w-auto"
              />
            </Link>

            {/* Motto */}
            <p className="font-serif italic text-white/60 text-sm leading-relaxed">
              &ldquo;Duc in Altum&rdquo; — Launch into the Deep
            </p>

            {/* Contact */}
            <address className="not-italic flex flex-col gap-1.5 text-sm text-white/60">
              <span>123 School Road, Abuja, Nigeria</span>
              <a
                href="tel:+2348000000000"
                className="hover:text-lemon transition-colors duration-200"
              >
                +234 800 000 0000
              </a>
              <a
                href="mailto:info@whitesandsschool.edu.ng"
                className="hover:text-lemon transition-colors duration-200"
              >
                info@whitesandsschool.edu.ng
              </a>
            </address>
          </div>

          {/* Col 2 — About */}
          <div>
            <ColHeading>About</ColHeading>
            <FooterLinks links={ABOUT_LINKS} />
          </div>

          {/* Col 3 — Learn */}
          <div>
            <ColHeading>Learn</ColHeading>
            <FooterLinks links={LEARN_LINKS} />
          </div>

          {/* Col 4 — Connect */}
          <div>
            <ColHeading>Connect</ColHeading>
            <FooterLinks links={CONNECT_LINKS} />
          </div>
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
          <span className="text-white/50 text-xs font-roboto">
            &copy; 2025 Whitesands School. All rights reserved.
          </span>
          <span className="text-white/50 text-xs font-roboto">
            Designed &amp; developed by Chukwudi Ofoma
          </span>
        </div>
      </div>
    </footer>
  );
}
