'use client';

import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Virtue of the month — data comes from the editable content store (admin)
// ---------------------------------------------------------------------------

export interface VirtueCard {
  month: string;
  name: string;
  line: string;
}

export function VirtueGrid({ virtues }: { virtues: VirtueCard[] }) {
  return (
    <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
      {virtues.map((v, i) => (
        <motion.li
          key={v.month}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: 0.5,
            delay: i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <article className="h-full bg-white p-7 rounded-sm border-t-2 border-lemon">
            <p
              className="font-roboto text-[10px] uppercase text-muted"
              style={{ letterSpacing: '0.28em' }}
            >
              {v.month}
            </p>
            <h3 className="mt-3 font-serif text-2xl text-deep leading-tight">
              {v.name}
            </h3>
            <p className="mt-3 font-sans text-sm text-dark/75 leading-relaxed">
              {v.line}
            </p>
          </article>
        </motion.li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Job assignments — static content
// ---------------------------------------------------------------------------

const JOBS = [
  {
    title: 'Class Captain',
    body: 'Each class elects a captain who keeps the room ordered, leads opening and closing prayer, and represents the class at student leadership meetings.',
  },
  {
    title: 'Chapel Sacristan',
    body: 'A senior boy who prepares the chapel for daily Mass: vestments, lectionary, candles. Quiet, regular, and important.',
  },
  {
    title: 'House Prefect',
    body: 'Selected senior boys lead each house through the year, organising the inter-house competitions and looking out for the younger members.',
  },
  {
    title: 'Library and Lab Monitors',
    body: 'Boys keep their own learning spaces in order. The library and laboratories are run with their help, not in spite of them.',
  },
];

export function JobsGrid() {
  return (
    <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12">
      {JOBS.map((job, i) => (
        <motion.div
          key={job.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.55,
            delay: i * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h3 className="font-serif text-xl lg:text-2xl text-deep leading-snug">
            {job.title}
          </h3>
          <p className="mt-3 font-sans text-base text-dark/75 leading-relaxed">
            {job.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
