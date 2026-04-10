'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, SectionLabel } from '@/components/ui';
import { getCurrentVirtue } from '@/lib/content';
import { Heart, Users, Lightbulb, Hand, Star, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { VirtueOfMonth } from '@/types';

const PILLARS = [
  {
    icon: Heart,
    title: 'Character',
    tagline: 'Moral courage, integrity, and compassion',
    desc: 'We believe the formation of character is the highest aim of education. Through the Virtue of the Month programme, pastoral tutorials, and school-wide reflection, we name and practise the virtues that make a person genuinely good.',
  },
  {
    icon: Users,
    title: 'Community',
    tagline: 'Belonging, empathy, and mutual care',
    desc: 'Whitesands is a community before it is a school. House systems, year-group Masses, and cross-age mentoring create the relationships within which formation happens. You cannot form alone.',
  },
  {
    icon: Lightbulb,
    title: 'Wisdom',
    tagline: 'Reflection, deep thinking, and purpose',
    desc: 'Formation requires silence and reflection, not just activity. Philosophy of life discussions, retreat experiences, and journalling practices invite students to ask the deeper questions: Who am I? What is my purpose? What kind of person do I want to become?',
  },
  {
    icon: Hand,
    title: 'Service',
    tagline: 'Transforming our community through action',
    desc: 'Service is the fruit of formation. Students who have genuinely examined their conscience and developed empathy for others naturally want to give. Our service learning programme channels that impulse into meaningful action.',
  },
];

const PASTORAL_SUPPORTS = [
  {
    icon: Shield,
    title: 'Professional Counselling',
    desc: 'Trained counsellors are available throughout the school day for academic, personal, and emotional support. Conversations are confidential and never judgemental.',
  },
  {
    icon: Users,
    title: 'Mentoring',
    desc: 'Every student in JSS1 is assigned a senior student mentor and a form teacher who tracks their wellbeing across the year. No child navigates Whitesands alone.',
  },
  {
    icon: Heart,
    title: 'A Community of Belonging',
    desc: 'Our House system, pastoral tutorials, and whole-school gatherings create a culture where every student belongs — not despite their differences, but because of them.',
  },
];

export default function PersonalFormationPage() {
  const [virtue, setVirtue] = useState<VirtueOfMonth | null>(null);

  useEffect(() => {
    setVirtue(getCurrentVirtue() ?? null);
  }, []);

  return (
    <main className="pt-25">
      {/* Hero */}
      <section className="bg-deep py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <SectionLabel label="What We Offer" light className="mb-6" />
              <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
                Personal Formation
              </h1>
              <p className="font-sans text-white/80 text-lg leading-relaxed">
                Education at Whitesands is not confined to the classroom. We form whole people —
                spiritually, morally, intellectually, and emotionally.{' '}
                <em>Duc in Altum</em> is not merely a motto; it is an invitation into the depths
                of one's own personhood and potential.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Virtue of the Month */}
      {virtue && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <AnimatedSection>
              <div className="bg-deep py-12 px-8 md:px-14">
                <div className="max-w-4xl">
                  <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 mb-8">
                    <Star size={14} className="text-lemon" />
                    <p className="font-roboto font-semibold text-sm text-lemon uppercase tracking-wide">
                      Virtue of the Month — {virtue.month}
                    </p>
                  </div>
                  <h2 className="font-serif italic text-6xl md:text-7xl text-white mb-6 leading-none">
                    {virtue.virtue}
                  </h2>
                  <p className="font-sans text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
                    {virtue.definition}
                  </p>
                  <div className="border-l-4 border-lemon pl-6 pt-2">
                    <p className="font-serif italic text-xl text-white/90 leading-relaxed">
                      "{virtue.reflection}"
                    </p>
                    <p className="font-roboto text-xs uppercase tracking-widest text-white/40 mt-4">
                      Monthly Reflection — Whitesands School
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Four Pillars */}
      <section className="bg-offwhite py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection className="mb-12">
            <SectionLabel label="Formation Pillars" className="mb-4" />
            <h2 className="font-serif text-5xl font-bold text-dark mt-2">
              Four Dimensions of the Whole Person
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-6">
              {PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="bg-white p-8 rounded-sm border border-deep/5 border-t-4 border-t-white hover:border-t-lemon shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-full bg-deep flex items-center justify-center shrink-0 mt-1">
                        <Icon size={22} className="text-lemon" />
                      </div>
                      <div>
                        <h3 className="font-roboto font-black text-xl text-deep mb-1">{pillar.title}</h3>
                        <p className="font-serif italic text-base text-muted mb-4">{pillar.tagline}</p>
                        <p className="font-sans text-sm text-dark leading-relaxed">{pillar.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Spiritual Life */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <SectionLabel label="Spiritual Life" className="mb-6" />
              <h2 className="font-serif text-5xl font-bold text-dark mb-6 leading-tight">
                Faith That Forms
              </h2>
              <p className="font-sans text-lg text-dark leading-relaxed mb-6">
                As a Catholic school, we create spaces where students encounter the sacred — not as
                abstract doctrine, but as a living reality that shapes how they see themselves and
                the world. Our chaplain leads weekly Masses, prayer groups, and spiritual retreats
                across the school year.
              </p>
              <p className="font-sans text-base text-muted leading-relaxed mb-6">
                Whether Catholic or of another faith, every student is invited to explore questions
                of transcendence, meaning, and purpose. Our interdenominational prayer sessions and
                Philosophy of Life classes ensure that no student is excluded from this dimension
                of formation.
              </p>
              <p className="font-sans text-base text-muted leading-relaxed">
                We teach that Catholic values — charity, justice, the dignity of every human person —
                are not the property of Catholics alone. They are the values of a fully human life.
                Faith forms character, and good character changes the world.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="relative rounded-sm overflow-hidden shadow-xl aspect-4/5">
                <Image
                  src="https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=800&auto=format&fit=crop"
                  alt="Spiritual formation at Whitesands"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-deep/50 to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pastoral Care */}
      <section className="bg-offwhite py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection className="mb-12">
            <SectionLabel label="Pastoral Support" className="mb-4" />
            <h2 className="font-serif text-5xl font-bold text-dark mt-2 max-w-2xl">
              Every Student Is Known by Name
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6">
              {PASTORAL_SUPPORTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="bg-white p-6 rounded-sm border border-deep/5 border-t-4 border-t-white hover:border-t-lemon shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="w-10 h-10 rounded-full bg-deep/10 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-deep" />
                    </div>
                    <h3 className="font-roboto font-bold text-dark mb-2">{item.title}</h3>
                    <p className="font-sans text-sm text-muted leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Closing pull quote */}
      <section className="bg-deep py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="font-serif italic text-3xl md:text-4xl text-white leading-snug mb-8">
              "Duc in Altum — Launch into the Deep. We dare our students to dive into
              the depths of who they are, and who they can become."
            </p>
            <p className="font-roboto text-xs uppercase tracking-widest text-white/50 mb-8">
              Whitesands School — Personal Formation
            </p>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 font-roboto font-medium text-lemon border-b border-lemon/50 pb-0.5 hover:border-lemon transition-colors duration-200"
            >
              Join Our Community →
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
