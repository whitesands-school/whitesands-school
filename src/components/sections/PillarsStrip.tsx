'use client';

import { motion } from 'framer-motion';

interface Pillar {
  number: string;
  title: string;
  body: string;
}

const pillars: Pillar[] = [
  {
    number: '01',
    title: 'Parental involvement',
    body: 'Parents are the first and primary educators of their children. At Whitesands, we work in close partnership with families — through regular tutorials, mentoring conversations and a shared formation programme — so that the school and the home pull in the same direction.',
  },
  {
    number: '02',
    title: 'Integral education',
    body: 'We educate the whole person — intellect, character and faith — not in separate compartments, but as a single, coherent formation. Academic excellence, virtue, and a serious life of prayer belong together, and shape one another.',
  },
  {
    number: '03',
    title: 'Personalised attention',
    body: 'Every boy meets one-on-one with a personal mentor throughout his time at the school. Class sizes stay small. Teachers know each child by name, and follow his growth closely — academically, personally and spiritually.',
  },
];

export function PillarsStrip() {
  return (
    <section className="bg-deep py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header — centered */}
        <div className="text-center max-w-3xl mx-auto">
          <p
            className="font-roboto text-xs uppercase text-lemon"
            style={{ letterSpacing: '0.3em' }}
          >
            What we believe
          </p>
          <h2
            className="mt-5 font-serif text-offwhite"
            style={{
              fontSize: 'clamp(2.25rem, 4.4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Three things that hold the school{' '}
            <span className="italic">together.</span>
          </h2>
        </div>

        {/* Three columns with hairline dividers on lg+ */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 lg:divide-x lg:divide-lemon/20">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="lg:px-8 first:lg:pl-0 last:lg:pr-0"
            >
              <p
                className="font-roboto text-xs uppercase text-lemon"
                style={{ letterSpacing: '0.25em' }}
              >
                {pillar.number}
              </p>
              <h3 className="mt-5 font-serif text-2xl text-offwhite leading-tight">
                {pillar.title}
              </h3>
              <p className="mt-4 font-sans text-base text-offwhite/80 leading-relaxed">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
