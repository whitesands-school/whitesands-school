'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/sections/PageHero';
import { media } from '@/lib/media';

interface Tile {
  n: string;
  title: string;
  excerpt: string;
  href: string;
  image: string;
  alt: string;
  position?: string;
}

const TILES: Tile[] = [
  {
    n: '01',
    title: 'Academics',
    excerpt:
      'The Nigerian National Curriculum taught with rigour, alongside international qualifications.',
    href: '/what-we-offer/academics',
    image: '/images/students/students-in-computer-lab.JPG',
    alt: 'Students working in the computer lab',
  },
  {
    n: '02',
    title: 'Extracurricular',
    excerpt:
      'Sport, music, debate, chess, robotics. Twenty-four clubs that meet weekly.',
    href: '/what-we-offer/extracurricular',
    image: '/images/students/orchestra-at-ceremony.jpg',
    alt: 'School orchestra performing at ceremony',
  },
  {
    n: '03',
    title: 'Personal Formation',
    excerpt:
      'The virtue of the month, one-on-one mentoring, character formed through daily life.',
    href: '/what-we-offer/personal-formation',
    image: '/images/students/priest-preaching.JPG',
    alt: 'Chaplain leading a service',
  },
  {
    n: '04',
    title: 'Facilities',
    excerpt:
      'Two hectares in Lekki. Chapel, library, science labs, athletics field, dining hall.',
    href: '/what-we-offer/facilities',
    image: '/images/students/choir-in-chapel.jpg',
    alt: 'The school chapel during a service',
  },
];

export default function WhatWeOfferPage() {
  return (
    <>
      <PageHero
        size="medium"
        image={media('/images/students/student-walking-outside-school.JPG')}
        imageAlt="A Whitesands student walking outside the school"
        overlay={0.6}
        eyebrow="What we offer"
        title={
          <>
            What we{' '}
            <span className="italic text-lemon">offer.</span>
          </>
        }
        subtitle="Four areas that shape a Whitesands education."
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {TILES.map((tile, i) => (
              <motion.li
                key={tile.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={tile.href}
                  className="group block relative overflow-hidden rounded-sm bg-deep aspect-4/3 lg:aspect-3/2"
                >
                  <Image
                    src={tile.image}
                    alt={tile.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    style={{ objectPosition: tile.position ?? 'center' }}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-deep/95 via-deep/55 to-deep/15 group-hover:via-deep/65 transition-colors duration-500" />

                  <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9 lg:p-10">
                    <p
                      className="font-roboto text-[11px] uppercase text-lemon"
                      style={{ letterSpacing: '0.28em' }}
                    >
                      {tile.n}
                    </p>
                    <h3
                      className="mt-3 font-serif text-offwhite leading-tight"
                      style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {tile.title}
                    </h3>
                    <p className="mt-3 font-sans text-base text-offwhite/80 leading-relaxed max-w-md">
                      {tile.excerpt}
                    </p>
                    <span
                      className="mt-5 inline-flex items-center gap-2 font-roboto uppercase text-xs text-lemon group-hover:text-white transition-colors"
                      style={{ letterSpacing: '0.22em' }}
                    >
                      Read more
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
