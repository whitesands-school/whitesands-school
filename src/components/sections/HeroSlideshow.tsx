'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui';

const slides = [
  {
    id: 0,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80',
    headline: 'Launching Minds Into the Deep.',
    sub: 'Deep learning. Good character. Flourishing lives.',
  },
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80',
    headline: 'Where Faith and Excellence Meet.',
    sub: 'Rooted in Catholic tradition. Reaching for the highest standards.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80',
    headline: 'Forming the Leaders of Tomorrow.',
    sub: 'Holistic formation — mind, body, and spirit.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&q=80',
    headline: 'A Community Built on Character.',
    sub: 'Virtue, service, and belonging — every day.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1920&q=80',
    headline: 'Twenty-Five Years of Duc in Altum.',
    sub: 'A silver jubilee of impact, growth, and grace.',
  },
];

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
};

function AnimatedHeadline({ text }: { text: string }) {
  const controls = useAnimation();
  const words = text.split(' ');

  useEffect(() => {
    controls.set('hidden');
    controls.start('visible');
  }, [text, controls]);

  return (
    <h1 className="font-serif font-bold text-white leading-tight text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
      {words.map((word, i) => (
        <motion.span
          key={`${text}-${i}`}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate={controls}
          className="inline-block mr-[0.3em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent(index);
    },
    []
  );

  const prev = () => {
    const index = (current - 1 + slides.length) % slides.length;
    goTo(index, -1);
  };

  const next = useCallback(() => {
    const index = (current + 1) % slides.length;
    goTo(index, 1);
  }, [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(next, 5000);
    return () => clearTimeout(timer);
  }, [current, paused, next]);

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40, transition: { duration: 0.6, ease: 'easeIn' as const } }),
  };

  return (
    <section
      className="relative -mt-25 h-screen overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Background image */}
          <img
            src={slides[current].image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Top gradient — keeps navbar legible on bright slide images */}
          <div className="absolute inset-0 bg-linear-to-b from-black/55 to-transparent to-38%" />
          {/* Bottom gradient — frames the text block */}
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Text block */}
      <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 lg:px-20 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-2xl">
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <AnimatedHeadline text={slides[current].headline} />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="font-serif italic text-white/80 mt-4 mb-8 text-base sm:text-lg lg:text-xl"
            >
              {slides[current].sub}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex gap-4 flex-wrap"
            >
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Discover Whitesands
              </Button>
              <Button variant="primary" size="lg">
                Apply for Admission
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors duration-200 cursor-pointer"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors duration-200 cursor-pointer"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`Go to slide ${i + 1}`}
            className="cursor-pointer"
          >
            <span
              className={[
                'block rounded-full transition-all duration-300',
                i === current
                  ? 'w-7 h-2.5 bg-lemon'
                  : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80',
              ].join(' ')}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
