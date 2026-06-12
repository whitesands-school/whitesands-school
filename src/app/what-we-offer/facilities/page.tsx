'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/sections/PageHero';
import { media } from '@/lib/media';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: '2', label: 'Hectares of campus in Lekki' },
  { value: '5,000+', label: 'Square metres of built-up space' },
  { value: '2,000+', label: 'Volumes in the library' },
  { value: '4', label: 'Dedicated science suites' },
];

interface Facility {
  title: string;
  body: string;
  image: string;
  alt: string;
  caption: string;
}

const FACILITIES: Facility[] = [
  {
    title: 'The Chapel',
    body: 'A purpose-built Catholic chapel at the centre of the campus, with seating for three hundred. Daily Mass for staff, weekly Mass for the whole school, sacraments through the year.',
    image: '/images/students/choir-in-chapel.jpg',
    alt: 'The school chapel during a service',
    caption: 'The Chapel · Seats 300',
  },
  {
    title: 'Library',
    body: 'Over two thousand titles across fiction, reference, and curriculum support. Quiet study desks for the seniors and a dedicated junior reading section. Librarian on duty all school hours.',
    image: '/images/students/student-drawing.JPG',
    alt: 'A boy at work in the library',
    caption: 'Library · 2,000+ Volumes',
  },
  {
    title: 'Science Laboratories',
    body: 'Four dedicated science suites for Biology, Chemistry, Physics, and the Computer Studies programme. Equipped to deliver both the Nigerian National Curriculum and the Cambridge IGCSE practicals.',
    image: '/images/students/students-in-computer-lab.JPG',
    alt: 'Students working in the science and computer lab',
    caption: 'Science Block · 4 Suites',
  },
  {
    title: 'Athletics Field',
    body: 'A full-size playing field used for football, athletics, and the annual inter-house competitions. The track is marked and lined throughout the year.',
    image: '/images/students/high-jump-purple-house.jpg',
    alt: 'Inter-house athletics on the school field',
    caption: 'Athletics Field · Full Size',
  },
  {
    title: 'Dining Hall',
    body: 'A common dining hall where the whole school eats together. Lunch is prepared on site every school day and served at a single sitting.',
    image: '/images/students/awarding-medals.jpg',
    alt: 'Students gathered together',
    caption: 'Dining Hall',
  },
  {
    title: 'The Penthouse',
    body: 'A multipurpose room on the upper floor used for senior seminars, parent meetings, and the Philosophical Anthropology elective. Quiet, with a view across the campus.',
    image: '/images/students/students-playing-chess.JPG',
    alt: 'Students playing chess in a quiet study room',
    caption: 'The Penthouse',
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        size="medium"
        image={media('/images/students/choir-in-chapel.jpg')}
        imageAlt="The school chapel during a service"
        overlay={0.6}
        eyebrow="Facilities"
        title={
          <>
            Two hectares in{' '}
            <span className="italic text-lemon">Lekki.</span>
          </>
        }
        subtitle="A campus built for the school. Every room used every day."
      />

      {/* INTRO */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
          <Eyebrow>The campus</Eyebrow>
          <h2 className="mt-5 font-serif text-deep" style={H2}>
            The buildings serve the{' '}
            <span className="italic">school.</span>
          </h2>
          <div className="mt-8 space-y-5 font-serif text-lg text-dark/85 leading-[1.65]">
            <p>
              The Whitesands campus sits on a two-hectare plot in Lekki,
              acquired in 1996 before the area became what it is today.
              Construction has been deliberate. Every building was added
              when it was needed and built to last.
            </p>
            <p>
              The campus today carries about five thousand square metres of
              built-up space. The chapel sits at its centre. The library
              and the science block flank the main academic wing. The
              field stretches behind.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-offwhite py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:divide-x lg:divide-deep/15">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col items-center text-center px-4 lg:px-8"
              >
                <span
                  className="font-serif text-deep tabular-nums leading-none"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.value}
                </span>
                <span
                  className="mt-4 font-roboto text-xs uppercase text-muted max-w-[16ch]"
                  style={{ letterSpacing: '0.22em' }}
                >
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITY GRID */}
      <section className="bg-white py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl mb-14">
            <Eyebrow>Facilities</Eyebrow>
            <h2 className="mt-5 font-serif text-deep" style={H2}>
              Six rooms that run the{' '}
              <span className="italic">school.</span>
            </h2>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-14 lg:gap-y-16">
            {FACILITIES.map((f, i) => (
              <motion.li
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <figure>
                  <div className="relative aspect-3/2 overflow-hidden rounded-sm bg-deep/5">
                    <Image
                      src={media(f.image)}
                      alt={f.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption
                    className="mt-4 font-roboto text-[11px] uppercase text-muted"
                    style={{ letterSpacing: '0.22em' }}
                  >
                    {f.caption}
                  </figcaption>
                </figure>
                <h3 className="mt-3 font-serif text-xl lg:text-2xl text-deep leading-snug">
                  {f.title}
                </h3>
                <p className="mt-3 font-sans text-base text-dark/75 leading-relaxed">
                  {f.body}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
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
