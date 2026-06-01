'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { media } from '@/lib/media';

// ---------------------------------------------------------------------------
// Flat top-level navigation. No dropdowns — each link is a destination, and
// the destination page handles its own deeper navigation.
//
// The announcement banner lives in src/components/layout/AnnouncementBanner.tsx
// and is mounted ABOVE the Navbar from src/app/layout.tsx so it can never be
// hidden by the navbar's stacking context.
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'What We Offer', href: '/what-we-offer' },
  { label: 'Our People', href: '/our-people' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60);
  });

  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) setScrolled(window.scrollY > 60);
    };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const linkColor = scrolled
    ? 'text-dark hover:text-deep'
    : 'text-white hover:text-lemon [text-shadow:0_1px_4px_rgba(0,0,0,0.45)]';

  return (
    <>
      <div className="contents">
        {/* Main nav — single tier, no dropdowns */}
        <motion.nav
          animate={{
            backgroundColor: scrolled
              ? 'rgba(255,255,255,0.96)'
              : 'rgba(255,255,255,0)',
            backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
            borderBottomColor: scrolled
              ? 'rgba(44,36,107,0.10)'
              : 'rgba(255,255,255,0)',
            boxShadow: scrolled
              ? '0 4px 24px -8px rgba(44,36,107,0.18)'
              : '0 0 0 rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ borderBottomWidth: 1, borderBottomStyle: 'solid' }}
          className="relative"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 h-20 flex items-center justify-between gap-6">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Whitesands School — Home"
              className="shrink-0"
            >
              {/*
               * Logo is a colour mark (deep-purple shield + red wordmark).
               * We never invert it — over the hero we lean on the existing
               * top gradient + a soft drop-shadow for legibility.
               */}
              <Image
                src={media('/images/logos/whitesands-school-logo.png')}
                alt="Whitesands School"
                width={600}
                height={189}
                priority
                sizes="(max-width: 1024px) 120px, 140px"
                style={{ width: 'auto' }}
                className={[
                  'h-9 lg:h-10 w-auto transition-all duration-300',
                  scrolled
                    ? ''
                    : 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]',
                ].join(' ')}
              />
            </Link>

            {/* Desktop nav — flat */}
            <nav
              className="hidden lg:flex items-center gap-1 font-roboto text-[13px] font-medium"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={[
                      'relative px-4 py-2 transition-colors duration-200 uppercase tracking-[0.08em]',
                      linkColor,
                      active
                        ? scrolled
                          ? 'text-deep'
                          : 'text-lemon'
                        : '',
                    ].join(' ')}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className={[
                          'absolute left-3 right-3 -bottom-px h-px',
                          scrolled ? 'bg-deep' : 'bg-lemon',
                        ].join(' ')}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/admissions#visit"
                className={[
                  'hidden lg:inline-flex items-center gap-2 font-roboto font-semibold text-[13px] tracking-wide px-5 py-2.5 rounded-sm transition-colors duration-200',
                  scrolled
                    ? 'bg-deep text-white hover:bg-bold'
                    : 'bg-lemon text-deep hover:bg-white',
                ].join(' ')}
              >
                Book a visit
              </Link>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className={[
                  'lg:hidden p-2 rounded transition-colors duration-200',
                  scrolled
                    ? 'text-deep hover:bg-deep/10'
                    : 'text-white hover:bg-white/10',
                ].join(' ')}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="block"
                    >
                      <X size={24} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="block"
                    >
                      <Menu size={24} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-deep lg:hidden flex flex-col"
            style={{ paddingTop: '5rem' }}
          >
            <nav
              className="flex-1 overflow-y-auto px-6 py-8"
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col divide-y divide-white/10">
                {NAV_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={[
                        'block py-4 font-serif text-2xl transition-colors duration-150',
                        isActive(item.href)
                          ? 'text-lemon'
                          : 'text-white hover:text-lemon',
                      ].join(' ')}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-6 border-t border-white/10">
                <Link
                  href="/admissions#visit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-lemon text-deep font-roboto font-semibold text-base px-6 py-4 rounded-sm hover:bg-white transition-colors"
                >
                  Book a school visit →
                </Link>
                <div className="mt-6 flex justify-center gap-6 font-roboto text-sm text-white/60">
                  <Link href="/fees-portal" className="hover:text-lemon transition-colors">
                    Parent Portal
                  </Link>
                  <span className="text-white/20">·</span>
                  <Link href="/25th-anniversary" className="hover:text-lemon transition-colors">
                    25th Anniversary
                  </Link>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
