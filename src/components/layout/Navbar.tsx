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
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui';
import type { Announcement } from '@/types';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type DropdownItem = { label: string; href: string };
type NavItem = {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
};

const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    dropdown: [
      { label: 'Who We Are', href: '/about/who-we-are' },
      { label: 'Our History', href: '/about/history' },
      { label: 'Vision & Mission', href: '/about/vision-mission' },
      { label: 'Educational Philosophy', href: '/about/philosophy' },
    ],
  },
  {
    label: 'What We Offer',
    href: '/what-we-offer',
    dropdown: [
      { label: 'Academics', href: '/what-we-offer/academics' },
      { label: 'Extracurricular', href: '/what-we-offer/extracurricular' },
      { label: 'Personal Formation', href: '/what-we-offer/personal-formation' },
      { label: 'Facilities', href: '/what-we-offer/facilities' },
    ],
  },
  { label: 'Admissions', href: '/admissions' },
  {
    label: 'Our People',
    href: '/our-people',
    dropdown: [
      { label: 'Staff', href: '/our-people/staff' },
      { label: 'Students', href: '/our-people/students' },
      { label: 'Parents', href: '/our-people/parents' },
      { label: 'Alumni', href: '/our-people/alumni' },
    ],
  },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const BANNER_BG: Record<Announcement['color'], string> = {
  red: 'bg-bold',
  yellow: 'bg-lemon',
  blue: 'bg-deep',
};

const BANNER_TEXT: Record<Announcement['color'], string> = {
  red: 'text-white',
  yellow: 'text-dark',
  blue: 'text-white',
};

const BANNER_LINK: Record<Announcement['color'], string> = {
  red: 'text-white underline hover:no-underline',
  yellow: 'text-dark underline hover:no-underline',
  blue: 'text-lemon underline hover:no-underline',
};

export function Navbar({ announcement }: { announcement?: Announcement }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track scroll position
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80);
  });

  // On bfcache restore, useMotionValueEvent won't fire unless scroll moves.
  // Re-read window.scrollY immediately so the nav state is correct.
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setScrolled(window.scrollY > 80);
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  // Dropdown hover helpers — use a delay so the panel doesn't flicker on
  // the gap between the nav item and the panel itself
  function handleItemEnter(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  }

  function handlePanelEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  // Text + icon color tokens based on nav state
  const linkColor = scrolled
    ? 'text-dark hover:text-deep'
    : 'text-white hover:text-white [filter:drop-shadow(0_1px_4px_rgba(0,0,0,0.55))]';
  const chevronColor = scrolled ? 'text-muted' : 'text-white/70';

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Fixed header wrapper                                                 */}
      {/* ------------------------------------------------------------------ */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* ---------------------------------------------------------------- */}
        {/* Announcement banner                                                */}
        {/* ---------------------------------------------------------------- */}
        {announcement && !bannerDismissed && (
          <div
            className={`${BANNER_BG[announcement.color]} ${BANNER_TEXT[announcement.color]} py-2 pl-4 pr-10 md:pl-8 md:pr-12 lg:pl-12 lg:pr-16 text-center text-xs font-sans relative`}
          >
            {announcement.message}
            {announcement.linkUrl && announcement.linkText && (
              <>
                {' '}
                <Link
                  href={announcement.linkUrl}
                  className={`font-semibold ml-1 ${BANNER_LINK[announcement.color]}`}
                >
                  {announcement.linkText} →
                </Link>
              </>
            )}
            <button
              onClick={() => setBannerDismissed(true)}
              aria-label="Dismiss banner"
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded opacity-60 hover:opacity-100 transition-opacity ${BANNER_TEXT[announcement.color]}`}
            >
              <X size={13} />
            </button>
          </div>
        )}
        {/* ---------------------------------------------------------------- */}
        {/* Utility bar                                                        */}
        {/* ---------------------------------------------------------------- */}
        <div className="bg-deep h-9 flex items-center px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            {/* Motto */}
            <span className="font-serif italic text-white/70 text-sm leading-none">
              Duc in Altum
            </span>

            {/* Utility links */}
            <div className="flex items-center gap-3 text-sm font-roboto">
              <Link
                href="/fees-portal"
                className="text-white/80 hover:text-lemon transition-colors duration-200"
              >
                Parent Portal
              </Link>
              <span className="text-white/30 select-none">|</span>
              <Link
                href="/25th-anniversary"
                className="text-white/80 hover:text-lemon transition-colors duration-200"
              >
                25th Anniversary
              </Link>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Main nav                                                           */}
        {/* ---------------------------------------------------------------- */}
        <motion.nav
          animate={{
            backgroundColor: scrolled
              ? 'rgba(255,255,255,1)'
              : 'rgba(255,255,255,0)',
            borderBottomWidth: scrolled ? 2 : 0,
            borderBottomColor: scrolled ? '#2C246B' : 'transparent',
            boxShadow: scrolled
              ? '0 1px 6px rgba(44,36,107,0.10)'
              : '0 0 0 rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative"
          onMouseLeave={scheduleClose}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 h-16 flex items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src="/images/logos/whitesands-school-logo.svg"
                alt="Whitesands School"
                width={120}
                height={38}
                className={[
                  'h-9 w-auto transition-all duration-300',
                  scrolled ? '' : 'brightness-0 invert drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]',
                ].join(' ')}
              />
            </Link>

            {/* Desktop nav links */}
            <nav
              className="hidden md:flex items-center gap-1 font-roboto text-sm font-medium"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.dropdown
                      ? handleItemEnter(item.label)
                      : scheduleClose()
                  }
                >
                  <Link
                    href={item.href}
                    className={[
                      'flex items-center gap-1 px-3 py-2 rounded transition-colors duration-200',
                      linkColor,
                      isActive(item.href)
                        ? scrolled
                          ? 'text-deep font-semibold'
                          : 'text-white font-semibold'
                        : '',
                    ].join(' ')}
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown
                        size={14}
                        className={[
                          'transition-transform duration-200',
                          chevronColor,
                          activeDropdown === item.label ? 'rotate-180' : '',
                        ].join(' ')}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Apply Now CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <Link href="/admissions" className="hidden md:block">
                <Button variant="primary" size="sm">
                  Apply Now
                </Button>
              </Link>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className={[
                  'md:hidden p-2 rounded transition-colors duration-200',
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
                      <X size={22} />
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
                      <Menu size={22} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Mega dropdown panel — desktop                                    */}
          {/* -------------------------------------------------------------- */}
          <AnimatePresence>
            {activeDropdown && (
              <motion.div
                key={activeDropdown}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute left-0 right-0 bg-white border-t border-deep/10 shadow-lg hidden md:block"
                onMouseEnter={handlePanelEnter}
                onMouseLeave={scheduleClose}
              >
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6">
                  <ul className="flex flex-col gap-1">
                    {NAV_LINKS.find(
                      (n) => n.label === activeDropdown
                    )?.dropdown?.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className={[
                            'group flex items-center gap-0 text-sm font-roboto text-dark',
                            'hover:text-deep transition-colors duration-150',
                          ].join(' ')}
                        >
                          {/* Lemon left-border accent on hover */}
                          <span
                            className={[
                              'block w-0.5 h-4 mr-3 rounded-full bg-lemon',
                              'scale-y-0 group-hover:scale-y-100 origin-center',
                              'transition-transform duration-150',
                            ].join(' ')}
                          />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile full-screen overlay                                           */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-deep md:hidden flex flex-col"
            style={{ paddingTop: '9rem' }} // utility bar (36px) + main nav (64px) + gap
          >
            <nav
              className="flex-1 overflow-y-auto px-6 pb-8"
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col divide-y divide-white/10">
                {NAV_LINKS.map((item) => (
                  <li key={item.label}>
                    {item.dropdown ? (
                      <>
                        {/* Accordion trigger */}
                        <button
                          onClick={() =>
                            setMobileExpanded((prev) =>
                              prev === item.label ? null : item.label
                            )
                          }
                          className="w-full flex items-center justify-between py-4 text-white font-roboto font-medium text-base"
                        >
                          {item.label}
                          <motion.span
                            animate={{
                              rotate:
                                mobileExpanded === item.label ? 180 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={18} className="text-white/60" />
                          </motion.span>
                        </button>

                        {/* Accordion content */}
                        <AnimatePresence initial={false}>
                          {mobileExpanded === item.label && (
                            <motion.ul
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: 'easeInOut' }}
                              className="overflow-hidden pl-4 pb-2"
                            >
                              {item.dropdown.map((sub) => (
                                <li key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    className="flex items-center gap-3 py-2.5 text-white/80 hover:text-white font-roboto text-sm transition-colors duration-150"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-lemon shrink-0" />
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={[
                          'block py-4 font-roboto font-medium text-base transition-colors duration-150',
                          isActive(item.href)
                            ? 'text-lemon'
                            : 'text-white hover:text-lemon',
                        ].join(' ')}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* Apply Now CTA inside mobile menu */}
              <div className="mt-6">
                <Link href="/admissions" className="block">
                  <Button variant="primary" size="md" className="w-full justify-center">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
