'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 py-28 lg:py-36 text-center">
        <p
          className="font-roboto text-xs uppercase text-bold"
          style={{ letterSpacing: '0.28em' }}
        >
          Something went wrong
        </p>

        <h1
          className="mt-6 font-serif text-deep"
          style={{
            fontSize: 'clamp(2.25rem, 5.4vw, 4rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
          }}
        >
          Even the best crews hit{' '}
          <span className="italic">rough water.</span>
        </h1>

        <p className="mt-6 font-sans text-base sm:text-lg text-dark/70 leading-relaxed max-w-xl mx-auto">
          An unexpected error occurred while loading this page. It has been
          noted — please try again, or return to the home page.
        </p>

        {error.digest && (
          <p className="mt-4 font-roboto text-[11px] uppercase text-muted" style={{ letterSpacing: '0.18em' }}>
            Reference: {error.digest}
          </p>
        )}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={unstable_retry}
            className="inline-flex items-center justify-center bg-deep text-white font-roboto uppercase text-sm px-8 py-3.5 hover:bg-bold transition-colors duration-200 cursor-pointer"
            style={{ letterSpacing: '0.14em' }}
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-deep/25 text-deep font-roboto uppercase text-sm px-8 py-3.5 hover:border-deep hover:bg-deep/5 transition-colors duration-200"
            style={{ letterSpacing: '0.14em' }}
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
