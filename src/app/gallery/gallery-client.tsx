'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { media } from '@/lib/media';
import type { GalleryImage } from '@/types';

const EASE = [0.22, 1, 0.36, 1] as const;

export function GalleryClient({ images }: { images: GalleryImage[] }) {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(images.map((i) => i.category)))],
    [images]
  );
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const shown = useMemo(
    () =>
      filter === 'All'
        ? images
        : images.filter((i) => i.category === filter),
    [images, filter]
  );

  // Keep the lightbox in range when the filter changes underneath it.
  const open = lightbox !== null && lightbox < shown.length;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight')
        setLightbox((n) => (n === null ? n : (n + 1) % shown.length));
      if (e.key === 'ArrowLeft')
        setLightbox((n) =>
          n === null ? n : (n - 1 + shown.length) % shown.length
        );
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, shown.length]);

  if (images.length === 0) {
    return (
      <p className="font-sans text-dark/60">
        Photos will appear here soon.
      </p>
    );
  }

  return (
    <>
      {/* Filter pills */}
      {categories.length > 2 && (
        <div className="flex flex-wrap gap-2.5 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setFilter(c);
                setLightbox(null);
              }}
              className={`px-4 py-2 rounded-full font-roboto text-xs uppercase tracking-wider transition-colors ${
                filter === c
                  ? 'bg-deep text-white'
                  : 'border border-deep/20 text-deep hover:border-deep'
              }`}
              style={{ letterSpacing: '0.12em' }}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {/* Masonry */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
        {shown.map((img, i) => (
          <motion.button
            key={img.id}
            type="button"
            onClick={() => setLightbox(i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.04, ease: EASE }}
            className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-sm bg-deep/5 cursor-pointer"
            aria-label={`View: ${img.alt}`}
          >
            <Image
              src={media(img.src)}
              alt={img.alt}
              width={800}
              height={600}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              // Prioritise the first row so the above-the-fold gallery image
              // isn't an un-prioritised LCP candidate on taller viewports.
              priority={i < 3}
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2"
            >
              <X size={28} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((n) =>
                  n === null ? n : (n - 1 + shown.length) % shown.length
                );
              }}
              aria-label="Previous"
              className="absolute left-4 sm:left-8 text-white/70 hover:text-white p-2"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((n) => (n === null ? n : (n + 1) % shown.length));
              }}
              aria-label="Next"
              className="absolute right-4 sm:right-8 text-white/70 hover:text-white p-2"
            >
              <ChevronRight size={40} />
            </button>

            <motion.figure
              key={shown[lightbox!].id}
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={media(shown[lightbox!].src)}
                alt={shown[lightbox!].alt}
                width={1600}
                height={1200}
                sizes="90vw"
                className="w-full h-auto max-h-[82vh] object-contain rounded-sm"
              />
              <figcaption className="mt-4 text-center font-sans text-sm text-white/70">
                {shown[lightbox!].alt}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
