'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { media } from '@/lib/media';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface Milestone {
  year: string;
  title: string;
  body: string;
}

const TIMELINE: Milestone[] = [
  {
    year: '1996',
    title: 'A plot in Lekki',
    body: 'The Ikota Educational Foundation acquires a two-hectare site in Lekki, on a road that has yet to be tarred.',
  },
  {
    year: '2000',
    title: 'The first cohort',
    body: 'The first building opens. Seventy-five boys arrive on the first day. The chapel is the first room to be furnished.',
  },
  {
    year: '2003',
    title: 'A pioneer class',
    body: 'The school graduates its first cohort of senior boys. WAEC results match the strongest in the city.',
  },
  {
    year: '2008',
    title: 'A second wing',
    body: 'A second academic wing opens. Class sizes stay small. Personal mentoring becomes part of every boy’s schedule.',
  },
  {
    year: '2014',
    title: 'The library and science block',
    body: 'A dedicated library and four science suites are commissioned. The Cambridge IGCSE programme runs alongside SSCE.',
  },
  {
    year: '2018',
    title: 'A growing community of alumni',
    body: 'More than 750 alumni are now studying or working across Nigeria and abroad. The first alumni return as parents.',
  },
  {
    year: '2024',
    title: 'The Penthouse',
    body: 'The Penthouse opens to host senior seminars and the Philosophical Anthropology elective.',
  },
  {
    year: '2025',
    title: 'Twenty-five years',
    body: 'Eighteen graduating classes, more than one thousand alumni, one quiet conviction that has not changed.',
  },
];

interface Tribute {
  quote: string;
  attribution: string;
}

const TRIBUTES: Tribute[] = [
  {
    quote:
      'Whitesands did not merely teach me subjects. It taught me who to be. Every decision I make is still shaped by those corridors.',
    attribution: 'An alumnus from one of the early graduating classes',
  },
  {
    quote:
      'The motto was never just words. Duc in Altum pushed every one of us to reach further than we thought possible.',
    attribution: 'A senior boy on his last day at the school',
  },
  {
    quote:
      'The teachers treated us like the men we were becoming. That belief, more than anything else, changed me.',
    attribution: 'An alumnus returning to teach',
  },
  {
    quote:
      'My years at Whitesands gave me a family as much as an education. The friendships made here have lasted.',
    attribution: 'A parent who was once a Whitesands boy',
  },
];

const GALLERY = [
  { src: '/images/students/graduands-walking.jpg', alt: 'Graduation procession' },
  { src: '/images/students/awarding-medals.jpg', alt: 'Prize giving' },
  { src: '/images/students/students-in-computer-lab.JPG', alt: 'Students in the computer lab' },
  { src: '/images/students/orchestra-at-ceremony.jpg', alt: 'School orchestra' },
  { src: '/images/students/graduands-in-a-file-walking.jpg', alt: 'Graduands in procession' },
  { src: '/images/students/high-jump-yellow-house.jpg', alt: 'Inter-house athletics' },
  { src: '/images/students/priest-preaching.JPG', alt: 'Chapel service' },
  { src: '/images/students/cultural-dance.JPG', alt: 'Cultural day performance' },
  { src: '/images/students/purple-house-salute.jpg', alt: 'House celebrations' },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AnniversaryPage() {
  return (
    <>
      <Hero />
      <Opening />
      <Timeline />
      <Tributes />
      <Gallery />
      <Closing />
    </>
  );
}

// ---------------------------------------------------------------------------
// Hero — cinematic, restrained
// ---------------------------------------------------------------------------

function Hero() {
  return (
    <section className="relative -mt-28 min-h-screen flex items-center justify-center overflow-hidden bg-deep">
      {/* Backdrop photo */}
      <div className="absolute inset-0">
        <Image
          src={media('/images/students/graduands-walking.jpg')}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-40"
        />
        {/* Smooth gradient stack for legible type */}
        <div className="absolute inset-0 bg-linear-to-b from-deep/70 via-deep/40 to-deep/95" />
        <div className="absolute inset-0 bg-deep/30" />
      </div>

      <div className="relative z-10 text-center px-6 sm:px-10 lg:px-12 pt-28 pb-20 max-w-4xl mx-auto">
        {/* Anniversary seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto"
        >
          <Image
            src={media('/images/anniversary-logo/anniversary-logo-white.png')}
            alt="Whitesands School twenty-five years"
            fill
            sizes="192px"
            className="object-contain"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 font-roboto text-[11px] uppercase text-lemon"
          style={{ letterSpacing: '0.3em' }}
        >
          2000 — 2025
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-serif text-offwhite"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          Twenty-five{' '}
          <span className="italic text-lemon">years.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-serif italic text-offwhite/80 max-w-xl mx-auto"
          style={{ fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)', lineHeight: 1.4 }}
        >
          Duc in Altum.
        </motion.p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Opening narrative
// ---------------------------------------------------------------------------

function Opening() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
        <Eyebrow>How it began</Eyebrow>
        <h2 className="mt-5 font-serif text-deep" style={H2}>
          Twenty-five years ago, seventy-five boys arrived at a building site in{' '}
          <span className="italic">Lekki.</span>
        </h2>
        <div className="mt-10 space-y-6 font-serif text-lg text-dark/85 leading-[1.65]">
          <p>
            The road outside was not yet tarred. The chapel was furnished
            before the offices. A group of parents had spent four
            years preparing this. On the first morning of school in 2000,
            those parents handed over their sons to a small staff who had
            already decided what the school would and would not be.
          </p>
          <p>
            Twenty-five years later the school sits in the same place, on
            the same plot, with the same conviction. Eighteen graduating
            classes have come through the gates. More than one thousand
            alumni are now doctors, engineers, lawyers, founders, fathers
            and priests, in Lagos and across the world.
          </p>
          <p>
            This page is a quiet record of that quarter century. The
            milestones, the faces, the work, and a few words from those who
            were here.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

function Timeline() {
  return (
    <section className="bg-offwhite py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="max-w-3xl mb-16 lg:mb-20">
          <Eyebrow>The quarter century</Eyebrow>
          <h2 className="mt-5 font-serif text-deep" style={H2}>
            Eight moments from{' '}
            <span className="italic">twenty-five years.</span>
          </h2>
        </div>

        <ol>
          {TIMELINE.map((m, i) => (
            <motion.li
              key={m.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group grid grid-cols-12 gap-x-6 sm:gap-x-10 lg:gap-x-16 gap-y-3 py-10 lg:py-12 border-t border-deep/15 first:border-t-0 first:pt-0 last:pb-0"
            >
              <div className="col-span-3 sm:col-span-2">
                <span
                  aria-hidden
                  className="block font-serif text-deep tabular-nums leading-none"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {m.year}
                </span>
              </div>
              <div className="col-span-9 sm:col-span-7 lg:col-span-5">
                <h3
                  className="font-serif text-deep leading-tight"
                  style={{
                    fontSize: 'clamp(1.25rem, 1.8vw, 1.75rem)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {m.title}
                </h3>
              </div>
              <div className="col-span-12 sm:col-start-3 sm:col-span-7 lg:col-start-8 lg:col-span-5">
                <p className="font-sans text-base text-dark/70 leading-relaxed lg:mt-1">
                  {m.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Tributes — auto-advancing carousel, kept simple
// ---------------------------------------------------------------------------

function Tributes() {
  const [active, setActive] = useState(0);
  const tribute = TRIBUTES[active];

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        <Eyebrow>In their own words</Eyebrow>

        <AnimatePresence mode="wait">
          <motion.blockquote
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <p
              className="font-serif italic text-deep"
              style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)',
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
              }}
            >
              “{tribute.quote}”
            </p>
            <footer
              className="mt-8 font-roboto text-[11px] uppercase text-muted"
              style={{ letterSpacing: '0.22em' }}
            >
              {tribute.attribution}
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        {/* Pager dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {TRIBUTES.map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show tribute ${i + 1}`}
                className="group p-2 -m-2"
              >
                <span
                  className={[
                    'block h-0.75 rounded-full transition-all duration-300',
                    isActive
                      ? 'w-8 bg-deep'
                      : 'w-3 bg-deep/20 group-hover:bg-deep/40',
                  ].join(' ')}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Gallery — masonry with lightbox
// ---------------------------------------------------------------------------

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const next = () =>
    setOpen((i) => (i === null ? null : (i + 1) % GALLERY.length));
  const prev = () =>
    setOpen((i) =>
      i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length
    );

  return (
    <section className="bg-offwhite py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="max-w-3xl mb-14">
          <Eyebrow>Twenty-five years in pictures</Eyebrow>
          <h2 className="mt-5 font-serif text-deep" style={H2}>
            A few moments from the{' '}
            <span className="italic">archive.</span>
          </h2>
        </div>

        <ul className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-5 [column-fill:balance]">
          {GALLERY.map((g, i) => (
            <li
              key={g.src}
              className="mb-4 lg:mb-5 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open image: ${g.alt}`}
                className="group block w-full relative overflow-hidden rounded-sm bg-deep/5 cursor-pointer"
              >
                <Image
                  src={media(g.src)}
                  alt={g.alt}
                  width={800}
                  height={i % 3 === 0 ? 1000 : i % 3 === 1 ? 640 : 800}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-4 sm:p-10"
            onClick={() => setOpen(null)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-3"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-3"
            >
              <ChevronRight size={28} />
            </button>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute top-4 right-4 text-white/80 hover:text-white p-3"
            >
              <X size={24} />
            </button>

            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={media(GALLERY[open].src)}
                alt={GALLERY[open].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Closing thank-you
// ---------------------------------------------------------------------------

function Closing() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        <Eyebrow>To everyone who has made the school</Eyebrow>
        <h2 className="mt-5 font-serif text-deep" style={H2}>
          Thank{' '}
          <span className="italic">you.</span>
        </h2>
        <p className="mt-7 font-sans text-base sm:text-lg text-dark/70 leading-relaxed max-w-2xl mx-auto">
          To the families who entrusted their sons to us. To the staff who
          carried the formation through twenty-five years. To the alumni who
          continue to live what they learned. To the priests, the parents,
          the prefects, the cleaners, the cooks, the coaches, and the boys
          themselves. The school is what you have made it.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4">
          <Link
            href="mailto:alumni@whitesands.org.ng?subject=Anniversary"
            className="inline-flex items-center justify-center bg-deep text-white font-roboto uppercase text-sm px-10 py-4 hover:bg-bold transition-colors"
            style={{ letterSpacing: '0.18em' }}
          >
            Alumni · Get in touch
          </Link>
          <Link
            href="/about"
            className="font-roboto uppercase text-xs text-deep hover:text-bold transition-colors inline-flex items-center gap-2 group"
            style={{ letterSpacing: '0.22em' }}
          >
            Read the full story
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const H2: React.CSSProperties = {
  fontSize: 'clamp(2rem, 4.2vw, 3rem)',
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
