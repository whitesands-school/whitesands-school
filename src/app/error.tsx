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
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-roboto text-sm font-semibold text-bold uppercase tracking-widest mb-4">
        Something went wrong
      </p>
      <h1 className="font-serif text-5xl text-deep mb-4">Unexpected Error</h1>
      <p className="font-sans text-muted max-w-md mb-8 leading-relaxed">
        We&apos;re sorry — an unexpected error occurred. Please try again, or return to the home page.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={unstable_retry}
          className="px-6 py-3 bg-deep text-white font-roboto font-semibold rounded hover:bg-bold transition-colors duration-200"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-3 border-2 border-deep text-deep font-roboto font-semibold rounded hover:bg-deep hover:text-white transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
