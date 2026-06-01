'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * BookVisitTab — persistent conversion CTA.
 *
 * Desktop (lg+): a slim vertical tab fixed to the right edge of the viewport,
 * with "BOOK A VISIT" rotated 90° (reads top-to-bottom). Deep purple
 * background, lemon text.
 *
 * Mobile: a thin horizontal bar fixed to the bottom of the viewport,
 * full-width, same colour treatment.
 *
 * Hidden on /admin/* automatically, since the parent layout already excludes
 * those, but we also no-op here as a safety net so this component is safe to
 * drop in anywhere.
 */
export function BookVisitTab() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      {/* Desktop — vertical tab on the right edge */}
      <Link
        href="/admissions#visit"
        aria-label="Book a school visit"
        className={[
          'hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40',
          'items-center justify-center',
          'bg-deep text-lemon hover:bg-bold hover:text-white',
          'transition-colors duration-200',
          'shadow-[-2px_0_12px_rgba(44,36,107,0.25)]',
          'h-44 w-10',
          'rounded-l-sm',
        ].join(' ')}
      >
        <span
          className="font-roboto text-[11px] uppercase whitespace-nowrap"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            letterSpacing: '0.28em',
          }}
        >
          Book a visit
        </span>
      </Link>

      {/* Mobile — thin horizontal bar at the bottom */}
      <Link
        href="/admissions#visit"
        aria-label="Book a school visit"
        className={[
          'lg:hidden fixed bottom-0 inset-x-0 z-40',
          'flex items-center justify-center',
          'bg-deep text-lemon hover:bg-bold hover:text-white',
          'transition-colors duration-200',
          'h-11 font-roboto text-[11px] uppercase',
        ].join(' ')}
        style={{ letterSpacing: '0.28em' }}
      >
        Book a visit →
      </Link>
    </>
  );
}
