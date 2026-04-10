'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection, SectionLabel } from '@/components/ui';
import { Trophy, Palette, Users, Heart, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CATEGORIES = [
  {
    id: 'sports',
    name: 'Sports',
    icon: Trophy,
    tagline: 'Discipline, teamwork, and the will to compete.',
    body: 'Sport at Whitesands is serious. We compete at inter-school, state, and national levels across seven disciplines. Coaching is provided by qualified specialists who develop both skill and character. We believe the habits forged on the pitch — perseverance, sacrifice, teamwork — are the same habits that define a life well lived.',
    programs: ['Football', 'Volleyball', 'Basketball', 'Tennis', 'Badminton', 'Athletics', 'Swimming'],
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=80',
  },
  {
    id: 'arts',
    name: 'Arts & Music',
    icon: Palette,
    tagline: 'Expression, creativity, and artistic excellence.',
    body: 'Our Arts Centre hosts drama productions, choral concerts, and exhibitions that draw audiences from across Lagos. Students who find their voice through art discover something powerful about themselves. Our school choir has performed at the National Theatre; our Visual Arts programme has produced alumni who exhibit internationally.',
    programs: ['Drama & Theatre', 'Visual Arts', 'School Choir', 'Traditional Drumming', 'Film Club', 'Photography'],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80',
  },
  {
    id: 'clubs',
    name: 'Clubs & Societies',
    icon: Users,
    tagline: 'Intellectual passion meets community.',
    body: 'Whitesands clubs are student-led and faculty-supported. They are places where the curious, the ambitious, and the passionate find each other. The Model UN team has represented Nigeria at international conferences; the Robotics Club has placed first at the Lagos State Science Fair three years running.',
    programs: ['Debate Society', 'Model UN', 'Robotics Club', 'Entrepreneurship Society', 'Tech Club', 'Science Club'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80',
  },
  {
    id: 'service',
    name: 'Leadership & Service',
    icon: Heart,
    tagline: 'Character built through responsibility.',
    body: 'Service is not a peripheral activity at Whitesands — it is core to who we are. Students give thousands of hours annually to community outreach, environmental projects, and peer mentoring. Student Government elections are among the most anticipated events on the school calendar; the experience of governing, negotiating, and leading is formative in the deepest sense.',
    programs: ['Student Government', 'Community Outreach', 'Environmental Club', 'Peer Mentoring', 'School Chaplaincy Team'],
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&q=80',
  },
];

const WHY_PARTICIPATE = [
  {
    title: 'Build Confidence',
    desc: "Discovering a talent you didn't know you had changes how you see yourself. Extracurricular activities are where that discovery happens.",
  },
  {
    title: 'Forge Real Friendships',
    desc: 'The deepest friendships in school are not made in classrooms. They are made on pitches, in rehearsal rooms, and at competitions.',
  },
  {
    title: 'Develop Leadership',
    desc: 'Running a club, captaining a team, or leading a service project teaches lessons that no textbook can teach.',
  },
  {
    title: 'Compete and Excel',
    desc: 'Whitesands students compete at state and national level. Learning to win graciously and lose courageously is formation in itself.',
  },
  {
    title: 'Express Yourself',
    desc: 'Sport, art, music, and drama give students a language beyond words — a way of saying who they are and what they care about.',
  },
  {
    title: 'Serve the Community',
    desc: 'Giving back transforms the giver. Our service programmes connect students to a Nigeria beyond the school gates and to a purpose beyond themselves.',
  },
];

export default function ExtracurricularPage() {
  const [active, setActive] = useState(0);

  return (
    <main className="pt-25">
      {/* Hero */}
      <section className="bg-deep py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <SectionLabel label="What We Offer" light className="mb-6" />
              <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
                Extracurricular
              </h1>
              <p className="font-sans text-white/80 text-lg leading-relaxed">
                The full measure of a person cannot be taken in a classroom. At Whitesands, our
                extracurricular programmes are where students discover who they are — and who they
                can become. Every student is encouraged to go deep into at least one.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-lemon py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '40+', label: 'Clubs & Teams' },
              { stat: '7', label: 'Sports Disciplines' },
              { stat: '85%', label: 'Student Participation' },
              { stat: '3×', label: 'Lagos State Champions' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <p className="font-roboto font-black text-4xl text-deep">{item.stat}</p>
                <p className="font-sans text-sm text-dark/70 mt-2">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category filter + panel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection className="mb-12">
            <SectionLabel label="Our Programmes" className="mb-4" />
            <h2 className="font-serif text-5xl font-bold text-dark mt-2">
              Four Pillars of Life Beyond the Classroom
            </h2>
          </AnimatedSection>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-3 mb-12">
            {CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.button
                  key={idx}
                  onClick={() => setActive(idx)}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.15 }}
                  className={[
                    'flex items-center gap-2 px-5 py-3 font-roboto font-semibold text-sm border-2 transition-all duration-200',
                    active === idx
                      ? 'bg-deep text-white border-deep'
                      : 'bg-white text-deep border-deep/20 hover:border-deep',
                  ].join(' ')}
                >
                  <Icon size={16} />
                  {cat.name}
                </motion.button>
              );
            })}
          </div>

          {/* Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              {/* Text */}
              <div>
                <h3 className="font-roboto font-black text-3xl text-deep mb-2">
                  {CATEGORIES[active].name}
                </h3>
                <p className="font-serif italic text-lg text-muted mb-6">
                  {CATEGORIES[active].tagline}
                </p>
                <p className="font-sans text-base text-dark leading-relaxed mb-8">
                  {CATEGORIES[active].body}
                </p>
                <div>
                  <p className="font-roboto font-bold text-xs uppercase tracking-widest text-muted mb-3">
                    Available Programmes
                  </p>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {CATEGORIES[active].programs.map((p, pi) => (
                      <motion.li
                        key={pi}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: pi * 0.04 }}
                        className="flex items-center gap-2 font-sans text-sm text-dark"
                      >
                        <ChevronRight size={14} className="text-lemon shrink-0" strokeWidth={2.5} />
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Image */}
              <div className="relative rounded-sm overflow-hidden shadow-xl aspect-4/3">
                <Image
                  src={CATEGORIES[active].image}
                  alt={CATEGORIES[active].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-deep/30 to-transparent" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-deep py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="font-serif italic text-3xl md:text-4xl text-white leading-snug mb-8">
              "Every student at Whitesands is an athlete, an artist, a leader — or all three.
              We make sure they find out."
            </p>
            <p className="font-roboto text-xs uppercase tracking-widest text-white/50">
              Whitesands School — Extracurricular
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-offwhite py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection className="mb-12">
            <SectionLabel label="Why It Matters" className="mb-4" />
            <h2 className="font-serif text-4xl font-bold text-dark mt-2">
              Beyond the Certificate
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_PARTICIPATE.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="bg-white p-6 rounded-sm border border-deep/5 border-t-4 border-t-white hover:border-t-lemon shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="font-roboto font-bold text-dark mb-2">{item.title}</h3>
                  <p className="font-sans text-sm text-muted leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <div className="mt-12 text-center">
            <AnimatedSection>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 font-roboto font-medium text-deep border-b-2 border-lemon pb-1 hover:text-bold transition-colors duration-200"
              >
                Join the Whitesands Community →
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
