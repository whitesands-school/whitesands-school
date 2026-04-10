'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { AnimatedSection } from '@/components/ui';

const stats = [
  { number: 25, suffix: '+', label: 'Years of Excellence' },
  { number: 600, suffix: '+', label: 'Students Enrolled' },
  { number: 100, suffix: '%', label: 'WAEC Pass Rate' },
  { number: 80, suffix: '+', label: 'Dedicated Staff' },
  { number: 15, suffix: ':1', label: 'Student–Teacher Ratio' },
  { number: 3, suffix: '', label: 'Campuses' },
];

function CountUpNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const inView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, target, {
      duration: 2,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [inView, motionValue, target]);

  return (
    <span ref={ref} className="font-roboto font-black text-6xl text-white tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  return (
    <section className="bg-deep py-16">
      <AnimatedSection className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y md:divide-y-0 divide-white/20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={[
                'flex flex-col items-center justify-center py-8 px-4 text-center',
                i > 0 ? 'lg:border-l lg:border-white/20' : '',
              ].join(' ')}
            >
              <CountUpNumber target={stat.number} suffix={stat.suffix} />
              <span className="font-sans text-sm text-lemon tracking-wide mt-2 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
