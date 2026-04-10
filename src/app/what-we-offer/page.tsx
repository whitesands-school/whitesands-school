'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedSection, SectionLabel } from '@/components/ui';
import { ArrowRight } from 'lucide-react';

const PILLARS = [
  {
    title: 'Academics',
    tagline: 'Rigorous curriculum grounded in critical thinking',
    image: 'https://images.unsplash.com/photo-1427504494937-eda99cba2bac?w=1200&q=80',
    href: '/what-we-offer/academics',
  },
  {
    title: 'Extracurricular',
    tagline: 'Discovery, leadership, and lasting friendships',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=1200&q=80',
    href: '/what-we-offer/extracurricular',
  },
  {
    title: 'Personal Formation',
    tagline: 'Character, spirituality, and purpose',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
    href: '/what-we-offer/personal-formation',
  },
  {
    title: 'Facilities',
    tagline: 'Modern spaces built for learning and growth',
    image: 'https://images.unsplash.com/photo-1497633762265-ecc498d78358?w=1200&q=80',
    href: '/what-we-offer/facilities',
  },
];

export default function WhatWeOfferHub() {
  return (
    <main className="pt-25">
      {/* Hero */}
      <section className="bg-deep py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <SectionLabel label="What We Offer" light className="mb-6" />
              <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
                Everything we do<br />is intentional.
              </h1>
              <p className="font-sans text-white/80 text-lg leading-relaxed">
                At Whitesands, education means more than preparing for examinations. We build
                thinkers, leaders, and compassionate people of faith. Every programme, every space,
                every interaction is designed with purpose: to help each student flourish — wholly
                and deeply.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="font-serif italic text-2xl text-deep leading-relaxed">
              "We do not merely offer subjects — we offer an encounter with excellence, faith,
              and one's own potential."
            </p>
            <p className="font-roboto text-xs uppercase tracking-widest text-muted mt-6">
              Whitesands School
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Full-bleed category grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {PILLARS.map((pillar, idx) => (
            <Link key={idx} href={pillar.href}>
              <motion.div
                className="relative h-96 md:h-120 overflow-hidden group cursor-pointer"
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                {/* Background image */}
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${pillar.image})` }}
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-t from-deep via-deep/50 to-transparent"
                  variants={{ rest: { opacity: 0.75 }, hover: { opacity: 0.9 } }}
                  transition={{ duration: 0.3 }}
                />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <motion.div
                        className="h-0.5 bg-lemon mb-4 origin-left"
                        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                        transition={{ duration: 0.25 }}
                        style={{ width: 48 }}
                      />
                      <h2 className="font-roboto font-black text-3xl md:text-4xl text-white mb-2">
                        {pillar.title}
                      </h2>
                      <p className="font-sans text-white/80 text-sm">{pillar.tagline}</p>
                    </div>
                    <motion.div
                      variants={{ rest: { x: 0, opacity: 0.5 }, hover: { x: 6, opacity: 1 } }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <ArrowRight size={32} className="text-lemon" strokeWidth={1.5} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-offwhite py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="font-sans text-muted text-base leading-relaxed mb-6 max-w-2xl mx-auto">
              Every dimension of a Whitesands education is designed to work together — the academic,
              the spiritual, the social, and the physical — forming graduates who are ready to lead.
            </p>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 font-roboto font-medium text-deep border-b-2 border-lemon pb-1 hover:text-bold transition-colors duration-200"
            >
              Begin Your Application →
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
