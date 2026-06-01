'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { media } from '@/lib/media';

/**
 * SVG turbulence noise — encoded inline to avoid an extra request. Sits
 * over the hero at low opacity (0.04) with mix-blend-overlay for a soft
 * film-grain feel.
 */
const NOISE_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.85 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const reduceMotion = useReducedMotion();

  // Safari pauses autoplay on bfcache restore; nudge it back on.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) tryPlay();
    };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  return (
    <section className="relative -mt-28 h-screen min-h-[680px] overflow-hidden bg-deep">
      {/* ── Background: video + gradients + grain ───────────────────── */}
      <div className="absolute inset-0">
        {!reduceMotion && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={media('/videos/web/hero-graduation.mp4')}
            poster={media('/videos/web/hero-graduation-poster.jpg')}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
        )}
        {reduceMotion && (
          <picture>
            <img
              src={media('/videos/web/hero-graduation-poster.jpg')}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
        )}

        {/* Global tint — knocks down highlights everywhere so colour holds */}
        <div className="absolute inset-0 bg-deep/25" />

        {/* Top soft fade — keeps the masthead/nav readable */}
        <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-deep/80 via-deep/40 to-transparent" />

        {/* Dominant bottom gradient — guarantees type contrast */}
        <div className="absolute inset-x-0 bottom-0 h-[72%] bg-linear-to-t from-deep/95 via-deep/60 to-transparent" />

        {/* Left-side wash — anchors the bottom-left text block */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[70%] lg:w-[60%] bg-linear-to-r from-deep/80 via-deep/30 to-transparent" />

        {/* Film grain */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04]"
          style={{ backgroundImage: NOISE_SVG, backgroundSize: '200px 200px' }}
        />
      </div>

      {/* ── Content stack — editorial left column, anchored bottom-left ─── */}
      <div className="relative z-10 h-full flex items-end">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-36 pb-36 sm:pb-40 lg:pb-44">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {/* Eyebrow — masthead-style label */}
            <p
              className="font-roboto text-[11px] sm:text-xs uppercase text-lemon"
              style={{ letterSpacing: '0.3em' }}
            >
              Whitesands School &nbsp;·&nbsp; Lekki, Lagos
            </p>

            {/* Serif headline — capped so it always fits the viewport */}
            <h1
              className="mt-5 sm:mt-6 font-serif text-white"
              style={{
                fontSize: 'clamp(2.75rem, 6.4vw, 5.5rem)',
                lineHeight: 0.98,
                letterSpacing: '-0.02em',
              }}
            >
              Duc in Altum<span className="text-lemon">.</span>
            </h1>

            {/* Italic lemon sub */}
            <p
              className="mt-3 sm:mt-4 font-serif italic text-lemon"
              style={{
                fontSize: 'clamp(1.25rem, 2.2vw, 1.875rem)',
                lineHeight: 1.2,
              }}
            >
              Launch into the deep.
            </p>

            {/* Body */}
            <p className="mt-5 sm:mt-6 max-w-xl font-sans text-base sm:text-lg text-white/85 leading-relaxed">
              Twenty-five years of forming boys in Lekki for what comes next.
            </p>

            {/* CTAs — stack on mobile, side-by-side on sm+ */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Link
                href="/admissions#visit"
                className="inline-flex items-center justify-center bg-lemon text-deep font-roboto uppercase text-sm px-8 py-3 hover:bg-white transition-colors duration-200"
                style={{ letterSpacing: '0.12em' }}
              >
                Book a Visit
              </Link>
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center border border-white text-white font-roboto uppercase text-sm px-8 py-3 hover:bg-white/10 transition-colors duration-200"
                style={{ letterSpacing: '0.12em' }}
              >
                See our 2026 admissions
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom-center scroll cue — hairline rail + glowing pearl ── */}
      <motion.a
        href="#welcome"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover="hover"
        className="absolute left-1/2 -translate-x-1/2 bottom-10 sm:bottom-8 hidden sm:flex flex-col items-center gap-4 text-white/55 hover:text-lemon transition-colors duration-300"
        aria-label="Scroll to next section"
      >
        <motion.span
          variants={{ hover: { letterSpacing: '0.42em' } }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-roboto text-[10px] uppercase"
          style={{ letterSpacing: '0.36em' }}
        >
          Scroll
        </motion.span>

        {/* Rail: faint full track + travelling pearl with soft halo */}
        <span className="relative block h-16 w-px">
          {/* full faint track */}
          <span className="absolute inset-0 bg-linear-to-b from-white/5 via-white/25 to-white/5" />

          {/* travelling pearl */}
          <motion.span
            aria-hidden
            animate={
              reduceMotion
                ? { y: '50%', opacity: 0.9 }
                : {
                    y: ['-10%', '110%'],
                    opacity: [0, 1, 1, 0],
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 2.6,
                    repeat: Infinity,
                    ease: [0.45, 0, 0.55, 1],
                    times: [0, 0.18, 0.82, 1],
                  }
            }
            className="absolute left-1/2 top-0 -translate-x-1/2 w-1.25 h-1.25 rounded-full bg-lemon"
            style={{
              boxShadow:
                '0 0 0 1px rgba(255,247,0,0.18), 0 0 12px 2px rgba(255,247,0,0.45)',
            }}
          />
        </span>
      </motion.a>

      {/* ── Mute toggle — bottom-right, ghost background, lemon icon ─ */}
      <motion.button
        type="button"
        onClick={() => {
          const v = videoRef.current;
          if (!v) return;
          v.muted = !v.muted;
          setMuted(v.muted);
          if (!v.muted) v.play().catch(() => {});
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        whileHover={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        aria-label={muted ? 'Unmute hero video' : 'Mute hero video'}
        className="absolute bottom-16 right-4 sm:bottom-6 sm:right-6 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/6 backdrop-blur-sm text-lemon hover:bg-white/12 transition-colors"
      >
        {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </motion.button>
    </section>
  );
}
