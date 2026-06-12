'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlayCircle, X } from 'lucide-react';
import { media, video } from '@/lib/media';

interface ParentTestimonial {
  id: string;
  name: string;
  sonYear: string;
  quote: string;
  poster: string;
  video: string;
}

const parents: ParentTestimonial[] = [
  {
    id: 'abu',
    name: 'Mr. & Mrs. Abu',
    sonYear: 'SS3',
    quote:
      'What surprised us was how well the teachers know our son — not just his grades, but his temperament.',
    poster: '/videos/web/poster-mr-mrs-abu-parents-review.jpg',
    video: video('parent-review-abu'),
  },
  {
    id: 'shok',
    name: 'Engineer Shok Julius',
    sonYear: 'SS1',
    quote:
      'The formation is serious. Our son comes home with conviction, not just homework.',
    poster: '/videos/web/poster-engineer-shok-julius-parents-review.jpg?tr=cm-extract,x-0,y-50,w-800,h-1374',
    video: video('parent-review-shok-julius'),
  },
  {
    id: 'amos-penda',
    name: 'Mrs. Amos-Penda',
    sonYear: 'JS2',
    quote:
      'The school treats parents like partners. We are consulted, kept close, and respected.',
    poster: '/videos/web/poster-mrs-amos-penda-parents-review.jpg',
    video: video('parent-review-amos-penda'),
  },
];

export function CommunityTestimonials() {
  const [active, setActive] = useState<ParentTestimonial | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <p
            className="font-roboto text-xs uppercase text-deep"
            style={{ letterSpacing: '0.28em' }}
          >
            Parents on Whitesands
          </p>
          <h2
            className="mt-5 font-serif text-deep"
            style={{
              fontSize: 'clamp(2.25rem, 4.4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            What families say after a few{' '}
            <span className="italic">years.</span>
          </h2>
        </div>

        {/* Cards — vertical 9:16 posters (source is 800×1420 phone videos).
            Constrained to max-w-5xl so the row reads cinematic, not oversized. */}
        <ul className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {parents.map((p, i) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto w-full max-w-[320px] sm:max-w-none"
            >
              <article className="group flex flex-col">
                <button
                  type="button"
                  onClick={() => setActive(p)}
                  aria-label={`Play testimonial from ${p.name}`}
                  className="relative block aspect-9/16 w-full overflow-hidden rounded-md cursor-pointer bg-deep/5 shadow-[0_18px_40px_-22px_rgba(44,36,107,0.45)]"
                >
                  <Image
                    src={media(p.poster)}
                    alt={`${p.name} — parent testimonial`}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 28vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Soft top-to-bottom darken so the play icon and bottom name area stay legible */}
                  <div className="absolute inset-0 bg-linear-to-t from-deep/55 via-deep/10 to-deep/25 group-hover:from-deep/65 group-hover:via-deep/15 group-hover:to-deep/35 transition-colors duration-500" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle
                      strokeWidth={1.25}
                      className="w-16 h-16 lg:w-20 lg:h-20 text-lemon drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110"
                    />
                  </span>
                </button>

                <div className="mt-5">
                  <p className="font-serif text-lg lg:text-xl text-deep leading-tight">
                    {p.name}
                  </p>
                  <p
                    className="mt-1 font-roboto text-[11px] uppercase text-muted"
                    style={{ letterSpacing: '0.22em' }}
                  >
                    Parent of {p.sonYear}
                  </p>
                  <blockquote className="mt-3 font-sans italic text-sm lg:text-base text-dark/75 leading-relaxed line-clamp-2">
                    &ldquo;{p.quote}&rdquo;
                  </blockquote>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              // Vertical 9:16 player capped to viewport so the entire frame is
              // visible on phones and laptops alike.
              className="relative flex flex-col items-center w-auto max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close video"
                className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 inline-flex items-center gap-2 font-roboto text-sm"
              >
                Close <X size={20} />
              </button>
              <video
                src={media(active.video)}
                poster={media(active.poster)}
                controls
                autoPlay
                playsInline
                className="h-[80vh] max-h-180 w-auto aspect-9/16 bg-black rounded-md shadow-2xl"
              />
              <div className="mt-4 text-white text-center">
                <p className="font-serif text-lg">{active.name}</p>
                <p
                  className="mt-1 font-roboto text-xs uppercase text-white/60"
                  style={{ letterSpacing: '0.22em' }}
                >
                  Parent of {active.sonYear}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
