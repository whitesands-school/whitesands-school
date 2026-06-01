'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function CTAStrip() {
  return (
    <section className="bg-deep py-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-offwhite"
          style={{
            fontSize: 'clamp(2.25rem, 4.8vw, 3.75rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Come and see for{' '}
          <span className="italic">yourself.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 font-sans text-base sm:text-lg text-offwhite/80 leading-relaxed max-w-2xl mx-auto"
        >
          The best way to understand the school is to walk the corridors during
          a school day. Book a parent visit and we will arrange it for a date
          that suits you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <Link
            href="/admissions#visit"
            className="inline-flex items-center justify-center bg-lemon text-deep font-roboto uppercase text-sm px-10 py-4 hover:bg-white transition-colors duration-200"
            style={{ letterSpacing: '0.18em' }}
          >
            Book a Visit
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
        </motion.div>
      </div>
    </section>
  );
}
