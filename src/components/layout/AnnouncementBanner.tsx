'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Announcement } from '@/types';

/**
 * Site-wide top banner.
 *
 * Mounted at the very top of the fixed header in src/app/layout.tsx so it
 * sits above the Heritage strip and the Navbar. When it's active, the
 * <main> padding is also bumped so nothing slides under it.
 *
 * The dismiss button only hides the banner for the current page view —
 * it does not persist. The school can take a banner off by toggling it off
 * in /admin/announcement.
 */
const BG: Record<Announcement['color'], string> = {
  red: 'bg-bold text-white',
  yellow: 'bg-lemon text-deep',
  blue: 'bg-deep text-lemon border-b border-lemon/20',
};

const LINK: Record<Announcement['color'], string> = {
  red: 'text-white underline underline-offset-2 hover:text-white/85',
  yellow: 'text-deep underline underline-offset-2 hover:text-bold',
  blue: 'text-lemon underline underline-offset-2 hover:text-white',
};

export function AnnouncementBanner({
  announcement,
}: {
  announcement: Announcement;
}) {
  const [dismissed, setDismissed] = useState(false);

  // Sync the banner's rendered height into a CSS variable on <html> so that
  // <main>'s top padding can collapse in lockstep when the user dismisses it.
  // Without this, the fixed header shrinks but `pt-37` lingers, leaving a
  // white gap between the navbar and the page content.
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--ws-banner-h',
      dismissed ? '0px' : '36px'
    );
    return () => {
      document.documentElement.style.setProperty('--ws-banner-h', '0px');
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className={`${BG[announcement.color]} relative`}
      data-announcement-banner
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-2.5 pr-10 sm:pr-12 text-center">
        <p
          className="font-roboto text-[11px] uppercase"
          style={{ letterSpacing: '0.18em' }}
        >
          {announcement.message}
          {announcement.linkUrl && announcement.linkText && (
            <>
              {' '}
              <Link
                href={announcement.linkUrl}
                className={`ml-1 ${LINK[announcement.color]}`}
                style={{ letterSpacing: '0.18em' }}
              >
                {announcement.linkText} →
              </Link>
            </>
          )}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-1 opacity-60 hover:opacity-100 transition-opacity"
      >
        <X size={12} strokeWidth={2} />
      </button>
    </div>
  );
}
