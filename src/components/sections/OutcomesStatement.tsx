'use client';

import { motion } from 'framer-motion';

export function OutcomesStatement() {
  return (
    <section className="bg-white py-32 lg:py-40">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-roboto text-xs uppercase text-deep"
          style={{ letterSpacing: '0.3em' }}
        >
          Where they go
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.9,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 font-serif text-deep"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Over seventy percent of Whitesands boys continue their studies{' '}
          <span className="italic">abroad.</span> At Harvard, Imperial, Oxford,
          LSE, MIT, and Toronto.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12 font-roboto text-sm text-muted"
          style={{ letterSpacing: '0.08em' }}
        >
          Eighteen graduating classes. More than one thousand alumni. Twenty-five
          years.
        </motion.p>
      </div>
    </section>
  );
}
