'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from 'framer-motion';

interface Stat {
  value: number;
  format: (n: number) => string;
  label: string;
}

const stats: Stat[] = [
  {
    value: 25,
    format: (n) => String(n),
    label: 'Years of Whitesands',
  },
  {
    value: 1000,
    format: (n) => `${n.toLocaleString()}+`,
    label: 'Graduates',
  },
  {
    value: 70,
    format: (n) => `${n}%`,
    label: 'Studies Abroad',
  },
  {
    value: 6,
    format: (n) => String(n),
    label: 'House Teams',
  },
];

function CountUp({ target, format }: { target: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(format(0));

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(format(v)));
    return unsub;
  }, [rounded, format]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, target, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [inView, motionValue, target]);

  return (
    <span
      ref={ref}
      className="font-serif text-deep tabular-nums leading-none"
      style={{
        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
        letterSpacing: '-0.02em',
      }}
    >
      {display}
    </span>
  );
}

export function StatsStrip() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:divide-x lg:divide-deep/15">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center text-center px-4 lg:px-8"
            >
              <CountUp target={stat.value} format={stat.format} />
              <span
                className="mt-4 font-roboto text-xs uppercase text-muted max-w-[16ch]"
                style={{ letterSpacing: '0.22em' }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
