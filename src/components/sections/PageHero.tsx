'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageHeroProps {
  /** Small uppercase label, e.g. "ADMISSIONS · 2026/2027" */
  eyebrow?: string;
  /** Main headline. Use a fragment with <span className="italic text-lemon"> for the accent. */
  title: ReactNode;
  /** Optional supporting paragraph below the title. */
  subtitle?: string;
  /** Backdrop photo path (under /public). */
  image: string;
  /** Alt text for the backdrop (decorative photos use ""). */
  imageAlt?: string;
  /** Vertical size. Default is "medium" (~70vh). */
  size?: 'short' | 'medium' | 'tall';
  /** Optional CTA buttons / links rendered below the subtitle. */
  ctas?: ReactNode;
  /** Override the gradient overlay intensity (0..1). */
  overlay?: number;
  /** Align hero content. Default "left" reads as a magazine spread; "center" for landing-style. */
  align?: 'left' | 'center';
}

const HEIGHT: Record<NonNullable<PageHeroProps['size']>, string> = {
  short: 'min-h-[440px] py-32',
  medium: 'min-h-[560px] py-40',
  tall: 'min-h-[680px] py-48',
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = '',
  size = 'medium',
  ctas,
  overlay = 0.7,
  align = 'left',
}: PageHeroProps) {
  return (
    <section
      className={[
        'relative -mt-28 overflow-hidden bg-deep flex items-end',
        HEIGHT[size],
      ].join(' ')}
    >
      {/* Backdrop */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Gradient stack */}
        <div
          className="absolute inset-0 bg-linear-to-b from-deep/85 via-deep/30 to-deep/85"
          style={{ opacity: overlay }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-deep/55 via-transparent to-transparent" />
      </div>

      {/* Content — top padding clears the fixed header (heritage + nav). */}
      <div
        className={[
          'relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-32',
          align === 'center' ? 'text-center' : '',
        ].join(' ')}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-3xl'}
        >
          {eyebrow && (
            <span
              className={[
                'inline-flex items-center gap-3 font-roboto text-[11px] tracking-[0.28em] uppercase text-lemon',
                align === 'center' ? 'justify-center' : '',
              ].join(' ')}
            >
              <span className="block h-px w-8 bg-lemon" />
              {eyebrow}
              {align === 'center' && <span className="block h-px w-8 bg-lemon" />}
            </span>
          )}

          <h1
            className={[
              'mt-6 font-serif text-white leading-[1.05] tracking-tight',
              'text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem]',
            ].join(' ')}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={[
                'mt-6 font-sans text-base sm:text-lg text-white/80 leading-relaxed',
                align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-xl',
              ].join(' ')}
            >
              {subtitle}
            </p>
          )}

          {ctas && (
            <div
              className={[
                'mt-10 flex flex-wrap items-center gap-4',
                align === 'center' ? 'justify-center' : '',
              ].join(' ')}
            >
              {ctas}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
