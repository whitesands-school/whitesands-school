'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { media } from '@/lib/media';

interface Tile {
  src: string;
  alt: string;
  caption: string;
  area: 'hero' | 'sec1' | 'sec2' | 'sec3' | 'tall1' | 'tall2';
  /** Override default object-position so the subject survives the crop. */
  position?: string;
}

/**
 * Slots are sized to roughly match the source aspect of each image, so the
 * crops feel intentional rather than letterboxed:
 *
 *   hero  ~3:4 portrait  → 2:3 portrait source (slight top/bottom)
 *   sec1  ~3:2 landscape → 3:2 source (perfect)
 *   tall1 ~1:2 tall      → 2:3 portrait source (slight side crop)
 *   tall2 ~1:2 tall      → 3:2 landscape, subject-centred (intentional)
 *   sec2  ~1:1 square    → 3:2 landscape, centre crop
 *   sec3  ~1:1 square    → 3:2 landscape, centre crop
 */
const tiles: Tile[] = [
  {
    src: '/images/students/student-laughing.JPG',
    alt: 'A Whitesands student laughing between classes',
    caption: 'Between Classes',
    area: 'hero',
    position: 'center',
  },
  {
    src: '/images/students/orchestra-at-ceremony.jpg',
    alt: 'Whitesands student orchestra performing at ceremony',
    caption: 'Orchestra Recital',
    area: 'sec1',
  },
  {
    src: '/images/students/student-in-traditional.JPG',
    alt: 'Student in traditional Nigerian attire on Cultural Day',
    caption: 'Cultural Day',
    area: 'tall1',
    position: 'center',
  },
  {
    src: '/images/students/priest-preaching.JPG',
    alt: 'School chaplain at daily Mass',
    caption: 'Daily Mass',
    area: 'tall2',
    position: 'center',
  },
  {
    src: '/images/students/cultural-dance.JPG',
    alt: 'Students performing a cultural dance',
    caption: 'Dance Troupe',
    area: 'sec2',
    position: 'center',
  },
  {
    src: '/images/students/students-in-computer-lab.JPG',
    alt: 'Students working in the Whitesands computer lab',
    caption: 'Computer Lab',
    area: 'sec3',
    position: 'center',
  },
];

export function LifeAtSchool() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <p
            className="font-roboto text-xs uppercase text-deep"
            style={{ letterSpacing: '0.28em' }}
          >
            Life at Whitesands
          </p>
          <h2
            className="mt-5 font-serif text-deep"
            style={{
              fontSize: 'clamp(2.25rem, 4.4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            A day at school looks something like{' '}
            <span className="italic">this.</span>
          </h2>
        </div>

        {/* Magazine grid — 12 col × 4 row on lg, premium asymmetry */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[190px] lg:auto-rows-[200px]">
          {tiles.map((tile, i) => (
            <motion.figure
              key={tile.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={[
                'relative overflow-hidden rounded-sm group',
                gridClassFor(tile.area),
              ].join(' ')}
            >
              <Image
                src={media(tile.src)}
                alt={tile.alt}
                fill
                sizes={sizesFor(tile.area)}
                style={{ objectPosition: tile.position ?? 'center' }}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-deep/15 lg:bg-transparent lg:group-hover:bg-deep/30 transition-colors duration-500" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-deep/85 to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />
              <figcaption className="absolute left-4 right-4 bottom-4 flex items-center gap-3 lg:opacity-0 lg:translate-y-1 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500">
                <span className="block h-px w-6 bg-lemon" />
                <span
                  className="font-roboto text-[11px] uppercase text-white"
                  style={{ letterSpacing: '0.22em' }}
                >
                  {tile.caption}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function gridClassFor(area: Tile['area']): string {
  switch (area) {
    case 'hero':
      // Big portrait — 6 cols × 4 rows = 600×800 ≈ 3:4, fits 2:3 source nicely
      return 'col-span-2 row-span-2 lg:col-span-6 lg:row-span-4';
    case 'sec1':
      // Wide landscape top-right — 6 cols × 2 rows = 600×400 = 3:2 (perfect)
      return 'col-span-2 row-span-1 lg:col-span-6 lg:col-start-7 lg:row-span-2';
    case 'tall1':
      // Tall thin — 2 cols × 2 rows = 200×400 = 1:2 portrait
      return 'col-span-1 row-span-2 lg:col-span-2 lg:col-start-7 lg:row-start-3 lg:row-span-2';
    case 'tall2':
      // Tall thin — 2 cols × 2 rows = 200×400 = 1:2 portrait
      return 'col-span-1 row-span-2 lg:col-span-2 lg:col-start-9 lg:row-start-3 lg:row-span-2';
    case 'sec2':
      // Square — 2 cols × 1 row = 200×200
      return 'col-span-1 row-span-1 lg:col-span-2 lg:col-start-11 lg:row-start-3 lg:row-span-1';
    case 'sec3':
      // Square — 2 cols × 1 row = 200×200
      return 'col-span-1 row-span-1 lg:col-span-2 lg:col-start-11 lg:row-start-4 lg:row-span-1';
  }
}

function sizesFor(area: Tile['area']): string {
  // Helps next/image pick the right rendition. Hero is largest, then sec1.
  switch (area) {
    case 'hero':
      return '(max-width: 1024px) 100vw, 50vw';
    case 'sec1':
      return '(max-width: 1024px) 100vw, 50vw';
    case 'tall1':
    case 'tall2':
      return '(max-width: 1024px) 50vw, 17vw';
    case 'sec2':
    case 'sec3':
      return '(max-width: 1024px) 50vw, 17vw';
  }
}
