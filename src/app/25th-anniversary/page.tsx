'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SectionLabel, AnimatedSection, Button } from '@/components/ui';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const GOLD = '#C9A84C';

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const TIMELINE = [
  { year: '1999', event: 'School Founded',         detail: 'Whitesands opens with 40 pupils in Lagos, Nigeria.' },
  { year: '2002', event: 'First WAEC Class',        detail: '100% pass rate in the debut WASSCE sitting.' },
  { year: '2005', event: 'Chapel Dedicated',        detail: "St. Luke's Chapel consecrated on the main campus." },
  { year: '2007', event: 'Second Campus Opens',     detail: 'New campus commissioned; enrolment doubles overnight.' },
  { year: '2010', event: 'ICT & Science Block',     detail: 'State-of-the-art laboratories and computer suite inaugurated.' },
  { year: '2015', event: 'Centre of Excellence',   detail: 'ACSN formally designates Whitesands a Centre of Excellence.' },
  { year: '2019', event: '20th Anniversary',        detail: 'Pearl jubilee celebrations held across both campuses.' },
  { year: '2024', event: 'Silver Jubilee',          detail: 'Alumni from six countries return for the grand Gala Night.' },
];

const EVENTS = [
  { date: 'Oct 12',  title: 'Thanksgiving Mass',       time: '8:00 AM',  location: "St. Luke's Chapel, Campus 1" },
  { date: 'Oct 18',  title: 'Alumni Reunion Dinner',   time: '7:00 PM',  location: 'The Grand Ballroom, Eko Hotel' },
  { date: 'Oct 25',  title: 'Annual Sports Day',       time: '9:00 AM',  location: 'Main Sports Complex, Campus 2' },
  { date: 'Nov 1',   title: 'Gala Night',              time: '6:30 PM',  location: 'Civic Centre, Victoria Island' },
];

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80', alt: 'Graduation ceremony',   aspect: '66%' },
  { src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80', alt: 'Prize giving day',      aspect: '80%' },
  { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80', alt: 'Science laboratory',    aspect: '55%' },
  { src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80', alt: 'Choir performance',    aspect: '75%' },
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', alt: 'Class of 2015',        aspect: '66%' },
  { src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80', alt: 'Sports day',           aspect: '60%' },
  { src: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80', alt: 'Chapel service',         aspect: '80%' },
  { src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80', alt: 'School assembly hall', aspect: '55%' },
  { src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80', alt: 'Alumni reunion',         aspect: '70%' },
];

const TRIBUTES = [
  {
    quote: 'Whitesands did not merely teach me subjects — it taught me who to be. Twenty years later, every decision I make is still shaped by those corridors.',
    name: 'Adaeze Okonkwo',
    year: "Class of '07",
  },
  {
    quote: 'The motto was never just words. Duc in Altum pushed every one of us to reach further than we thought possible. I am living proof of that.',
    name: 'Emeka Nwachukwu',
    year: "Class of '12",
  },
  {
    quote: 'The teachers here treated us like the future leaders we were destined to become. That belief changed everything for me.',
    name: 'Fatima Aliyu',
    year: "Class of '09",
  },
  {
    quote: 'My years at Whitesands gave me not just an education but a family. The bonds forged here have lasted a lifetime.',
    name: 'Chukwuemeka Dada',
    year: "Class of '15",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

interface ParticleData {
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

function FloatingParticle({ x, y, size, color, duration, delay }: ParticleData) {
  return (
    <motion.span
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        display: 'block',
        pointerEvents: 'none',
      }}
      animate={{ y: [0, -100, 0], opacity: [0.08, 0.35, 0.08] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function AnniversarySeal() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
      aria-label="Whitesands School 25th Anniversary seal"
    >
      {/* Dashed outer ring */}
      <circle cx="100" cy="100" r="95" stroke={GOLD} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
      {/* Solid ring */}
      <circle cx="100" cy="100" r="84" stroke={GOLD} strokeWidth="2" opacity="0.9" />
      {/* Fill */}
      <circle cx="100" cy="100" r="82" fill="#2C246B" />
      {/* "25" numeral */}
      <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fontFamily="PT Serif, Georgia, serif" fontSize="60" fontWeight="700" fill={GOLD}>25</text>
      {/* YEARS */}
      <text x="100" y="143" textAnchor="middle" fontFamily="Roboto, Arial, sans-serif" fontSize="9" fontWeight="700" fill="#FFF700" letterSpacing="5">YEARS</text>
      {/* Date range */}
      <text x="100" y="158" textAnchor="middle" fontFamily="Roboto, Arial, sans-serif" fontSize="8" fill={GOLD} opacity="0.8" letterSpacing="2">1999 – 2024</text>
      {/* Curved text path along top arc */}
      <path id="seal-arc" d="M 18,100 A 82,82 0 0,1 182,100" fill="none" />
      <text fontFamily="Roboto, Arial, sans-serif" fontSize="9" fontWeight="700" fill="#FFF700" letterSpacing="3">
        <textPath href="#seal-arc" startOffset="50%" textAnchor="middle">WHITESANDS SCHOOL</textPath>
      </text>
      {/* Decorative stars */}
      <text x="25" y="104" textAnchor="middle" fontSize="9" fill={GOLD} fontFamily="serif">✦</text>
      <text x="175" y="104" textAnchor="middle" fontSize="9" fill={GOLD} fontFamily="serif">✦</text>
    </svg>
  );
}

function SignatureSVG() {
  return (
    <svg width="160" height="52" viewBox="0 0 160 52" fill="none" aria-hidden="true" className="mt-3 opacity-50">
      <path d="M8,42 C18,18 30,46 52,30 S78,14 98,28 S122,44 145,22 S152,30 158,28"
        stroke="#2C246B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M10,46 L60,46" stroke="#2C246B" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function AnniversaryPage() {
  // Particles — generated client-side to avoid hydration mismatch
  const [particles, setParticles] = useState<ParticleData[]>([]);
  useEffect(() => {
    const colors = ['#FFF700', GOLD, '#FFF700', GOLD, 'rgba(255,255,255,0.8)'];
    setParticles(
      Array.from({ length: 26 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 9 + 8,
        delay: Math.random() * 6,
      }))
    );
  }, []);

  // Lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => (i !== null ? (i - 1 + GALLERY.length) % GALLERY.length : 0));
  const nextImage = () => setLightboxIndex(i => (i !== null ? (i + 1) % GALLERY.length : 0));

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex]);

  // Alumni carousel
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % TRIBUTES.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-screen bg-deep flex items-center justify-center overflow-hidden">

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {particles.map((p, i) => (
            <FloatingParticle key={i} {...p} />
          ))}
        </div>

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)` }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <AnniversarySeal />
          </motion.div>

          <motion.h1
            className="font-serif text-7xl text-white leading-tight mb-4"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            25 Years of
          </motion.h1>

          <motion.p
            className="font-serif text-5xl italic mb-6"
            style={{ color: '#FFF700' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            Duc in Altum
          </motion.p>

          <motion.p
            className="font-sans text-white/60 text-lg max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.85 }}
          >
            A quarter century of forming hearts, minds, and souls.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            aria-hidden="true"
          >
            <motion.span
              style={{
                display: 'block',
                width: 1,
                height: 52,
                background: '#FFF700',
                transformOrigin: 'top',
              }}
              animate={{ scaleY: [1, 0.35, 1], opacity: [0.9, 0.25, 0.9] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── PRINCIPAL'S MESSAGE ──────────────────────────────────────────── */}
      <section className="bg-offwhite py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel label="A Message from the Principal" className="mb-14" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — portrait + name + signature */}
            <div className="flex flex-col items-center text-center">
              {/* Photo placeholder */}
              <div className="w-56 h-64 rounded-xl overflow-hidden border border-deep/10 bg-deep/5 flex items-center justify-center mb-6">
                <span className="font-sans text-deep/30 text-sm">Principal Photo</span>
              </div>

              <p className="font-roboto font-bold text-deep text-lg leading-snug">
                Rev. Sr. Mary Chinyere Okafor
              </p>
              <p className="font-sans text-muted text-sm mt-1">Principal, Whitesands School</p>

              <SignatureSVG />
            </div>

            {/* Right — formal letter */}
            <div className="font-serif text-dark leading-relaxed space-y-5 text-[1.0625rem]">
              <p className="text-right text-sm font-sans text-muted mb-2">October 2024</p>

              <p>Dear Friends of Whitesands,</p>

              <p className="indent-8">
                Twenty-five years ago, a small group of educators gathered with a single conviction: that a school rooted in faith, excellence, and love could transform a community. Today, as we mark our Silver Jubilee, the evidence of that conviction surrounds us — in the doctors, engineers, artists, and faithful citizens whose formation began in these classrooms.
              </p>

              <p className="indent-8">
                The motto <em>Duc in Altum</em> — Launch into the Deep — was not chosen for its beauty alone, though it carries great beauty. It was chosen because it names what education truly demands: the courage to go further, to attempt what seems impossible, to trust that the deep waters hold more than the shallow shore.
              </p>

              <p className="indent-8">
                As we celebrate, we do so with gratitude for every parent who chose us, every teacher who gave their best, and every student who rose to the challenge we set before them. This jubilee belongs to all of you.
              </p>

              <div
                className="pl-6 py-4 my-6 font-serif italic text-xl text-deep"
                style={{ borderLeft: `4px solid ${GOLD}`, background: `rgba(201,168,76,0.07)` }}
              >
                "We do not teach children what to think. We form them into people who know how to live."
              </div>

              <p>In faith and in joy,</p>
              <p className="font-roboto font-bold text-deep">Rev. Sr. Mary Chinyere Okafor</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 25-YEAR TIMELINE ─────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-14">
            <SectionLabel label="25 Years in Review" />
            <h2 className="font-serif text-4xl text-deep mt-4">A Journey Through Time</h2>
          </AnimatedSection>
        </div>

        {/* Horizontal scroll container */}
        <div className="overflow-x-auto pb-8 px-6 lg:px-12">
          <div className="relative flex items-start" style={{ minWidth: 'max-content', gap: 0 }}>
            {/* Gold connecting line — sits behind dots */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 7,
                left: 96,
                right: 96,
                height: 2,
                background: `linear-gradient(to right, transparent, ${GOLD} 8%, ${GOLD} 92%, transparent)`,
                zIndex: 0,
              }}
            />

            {TIMELINE.map((m, i) => (
              <motion.div
                key={m.year}
                className="relative flex flex-col items-center"
                style={{ width: 200, paddingLeft: 12, paddingRight: 12, zIndex: 1 }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                {/* Dot */}
                <div
                  className="rounded-full border-2 border-white shadow-sm mb-5 shrink-0"
                  style={{ width: 16, height: 16, background: GOLD, zIndex: 2 }}
                />

                {/* Card */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm w-full">
                  <p className="font-roboto font-black text-bold text-2xl leading-none">{m.year}</p>
                  <p className="font-roboto font-semibold text-deep text-sm mt-2 leading-snug">{m.event}</p>
                  <p className="font-sans text-muted text-xs mt-2 leading-relaxed">{m.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS SCHEDULE ──────────────────────────────────────────────── */}
      <section className="bg-deep py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel label="Anniversary Events" light className="mb-14" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EVENTS.map((ev, i) => (
              <motion.div
                key={ev.title}
                className="flex flex-col gap-4 rounded-xl p-6 border border-white/10 hover:bg-white/5 transition-colors duration-200"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {/* Date badge */}
                <div className="inline-flex items-center self-start bg-bold text-white font-roboto font-bold text-sm px-3 py-1.5 rounded">
                  {ev.date}
                </div>

                <h3 className="font-roboto font-bold text-white text-lg leading-snug">{ev.title}</h3>

                <div className="font-sans text-white/60 text-sm space-y-0.5">
                  <p>{ev.time}</p>
                  <p>{ev.location}</p>
                </div>

                <a
                  href="#rsvp"
                  className="mt-auto font-roboto font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all duration-150"
                  style={{ color: '#FFF700' }}
                >
                  RSVP →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-12">
            <SectionLabel label="Memories" />
            <h2 className="font-serif text-4xl text-deep mt-4">Through the Years</h2>
          </AnimatedSection>

          {/* CSS masonry via columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {GALLERY.map((img, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="block w-full mb-4 overflow-hidden rounded-xl cursor-pointer group break-inside-avoid"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="relative w-full overflow-hidden" style={{ paddingBottom: img.aspect }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/92"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                className="relative max-w-4xl w-full mx-16"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: '62%' }}>
                  <Image
                    src={GALLERY[lightboxIndex].src}
                    alt={GALLERY[lightboxIndex].alt}
                    fill
                    sizes="90vw"
                    className="object-contain"
                  />
                </div>
                <p className="text-white/50 text-center font-sans text-sm mt-3">
                  {GALLERY[lightboxIndex].alt} — {lightboxIndex + 1} / {GALLERY.length}
                </p>
              </motion.div>

              {/* Prev */}
              <button
                type="button"
                onClick={e => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={e => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>

              {/* Close */}
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── ALUMNI TRIBUTES ──────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection className="mb-14">
            <SectionLabel label="Alumni Tributes" className="justify-center" />
            <h2 className="font-serif text-4xl text-deep mt-4">Words from Our Alumni</h2>
          </AnimatedSection>

          {/* Quote display */}
          <div className="relative min-h-55 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                transition={{ duration: 0.38, ease: 'easeInOut' }}
                className="absolute inset-0 flex flex-col items-center justify-center px-4"
              >
                {/* Decorative quote mark */}
                <span
                  className="font-serif leading-none mb-4 select-none"
                  style={{ fontSize: 80, color: GOLD, opacity: 0.25, lineHeight: 1 }}
                  aria-hidden="true"
                >
                  &#8220;
                </span>

                <p className="font-serif italic text-deep text-2xl md:text-3xl leading-relaxed">
                  {TRIBUTES[slide].quote}
                </p>

                <div className="mt-8">
                  <p className="font-roboto font-bold text-deep">{TRIBUTES[slide].name}</p>
                  <p className="font-sans text-muted text-sm mt-1">{TRIBUTES[slide].year}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2.5 mt-10">
            {TRIBUTES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlide(i)}
                aria-label={`Tribute ${i + 1}`}
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: i === slide ? '#2C246B' : '#6B6490',
                  transform: i === slide ? 'scale(1.35)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────────────── */}
      <section id="rsvp" className="bg-bold py-14 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="font-serif text-white leading-tight mb-4" style={{ fontSize: 48 }}>
              Be Part of the Celebration
            </h2>
            <p className="font-sans text-white/80 text-lg mb-8">
              Join us as we mark 25 extraordinary years.
            </p>
            <Button variant="secondary" size="lg">
              RSVP / Get Tickets →
            </Button>
          </AnimatedSection>
        </div>
      </section>

    </main>
  );
}
