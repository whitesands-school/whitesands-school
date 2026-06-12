'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/sections/PageHero';
import { HouseTeamsScroll } from '@/components/sections/HouseTeamsScroll';
import { media } from '@/lib/media';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const SPORTS = [
  {
    src: '/images/students/high-jump-purple-house.jpg',
    alt: 'High jump on the school field',
    caption: 'Athletics',
  },
  {
    src: '/images/students/high-jump-yellow-house.jpg',
    alt: 'High jump at the inter-house championships',
    caption: 'Track & Field',
  },
  {
    src: '/images/students/awarding-medals.jpg',
    alt: 'A boy receiving a medal after competition',
    caption: 'Inter-house Competition',
  },
];

const CLUBS = [
  'Chess Club',
  'Debate Society',
  'Robotics',
  'Coding Club',
  'Public Speaking',
  'Drama',
  'Choir',
  'Orchestra',
  'Visual Arts',
  'Photography',
  'Press Club',
  'Quiz & Mathematics',
  'Science Society',
  'Geography Society',
  'Literary Society',
  'French Club',
  'Catholic Action',
  'Altar Servers Guild',
  'Boy Scouts',
  'Red Cross',
  'Junior Engineers',
  'Entrepreneurs Club',
  'Environmental Club',
  'Sports Captains Forum',
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ExtracurricularPage() {
  return (
    <>
      <PageHero
        size="medium"
        image={media('/images/students/orchestra-at-ceremony.jpg')}
        imageAlt="The school orchestra performing at a ceremony"
        overlay={0.6}
        eyebrow="Extracurricular"
        title={
          <>
            Beyond the{' '}
            <span className="italic text-lemon">classroom.</span>
          </>
        }
        subtitle="Twenty-four clubs and societies. Six houses. One field. The boys find what they love."
      />

      {/* INTRO */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
          <Eyebrow>The wider programme</Eyebrow>
          <h2 className="mt-5 font-serif text-deep" style={H2}>
            Boys grow up in the things they choose to{' '}
            <span className="italic">do.</span>
          </h2>
          <div className="mt-8 space-y-5 font-serif text-lg text-dark/85 leading-[1.65]">
            <p>
              Whitesands runs twenty-four clubs and societies that meet
              weekly during the after-school slot. The list spans sport,
              music, debate, science, faith, and service. Every boy is
              expected to take part in at least one.
            </p>
            <p>
              The clubs are run by staff who care about them and by senior
              boys who lead them. The school believes that what happens
              between 3:30pm and 5:30pm shapes a boy as much as what happens
              before lunch.
            </p>
          </div>
        </div>
      </section>

      {/* SPORTS */}
      <section className="bg-offwhite py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl mb-12">
            <Eyebrow>Sports</Eyebrow>
            <h2 className="mt-5 font-serif text-deep" style={H2}>
              On the field, every{' '}
              <span className="italic">week.</span>
            </h2>
            <p className="mt-5 font-sans text-base text-dark/70 leading-relaxed">
              Football, athletics, basketball, table tennis, swimming and
              chess are part of the regular calendar. The inter-house
              competitions run across the year and crown an overall
              champion at the end.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
            {SPORTS.map((s, i) => (
              <motion.figure
                key={s.src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-deep/5">
                  <Image
                    src={media(s.src)}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption
                  className="mt-3 font-roboto text-[11px] uppercase text-muted"
                  style={{ letterSpacing: '0.22em' }}
                >
                  {s.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* CLUBS & SOCIETIES */}
      <section className="bg-white py-24 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl">
            <Eyebrow>Clubs & societies</Eyebrow>
            <h2 className="mt-5 font-serif text-deep" style={H2}>
              Twenty-four ways to spend an{' '}
              <span className="italic">afternoon.</span>
            </h2>
          </div>

          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {CLUBS.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(i * 0.02, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-serif text-base lg:text-lg text-dark/85 border-b border-deep/10 py-3"
              >
                {c}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOUSE TEAMS */}
      <section id="houses">
        <div className="bg-offwhite pt-24 lg:pt-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="max-w-3xl">
              <Eyebrow>House teams</Eyebrow>
              <h2 className="mt-5 font-serif text-deep" style={H2}>
                Six houses. One{' '}
                <span className="italic">trophy.</span>
              </h2>
              <p className="mt-5 font-sans text-base text-dark/70 leading-relaxed">
                Every boy belongs to a house from the day he arrives.
                The houses compete across sport, debate, music, and academic
                quizzes through the year.
              </p>
            </div>
          </div>
        </div>
        <HouseTeamsScroll />
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const H2: React.CSSProperties = {
  fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
  lineHeight: 1.12,
  letterSpacing: '-0.02em',
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-roboto text-xs uppercase text-deep"
      style={{ letterSpacing: '0.28em' }}
    >
      {children}
    </p>
  );
}
