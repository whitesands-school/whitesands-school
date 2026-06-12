'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/sections/PageHero';
import { HouseTeamsScroll } from '@/components/sections/HouseTeamsScroll';
import { media } from '@/lib/media';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const SUB_NAV = [
  { label: 'Story', id: 'story' },
  { label: 'Who we are', id: 'who-we-are' },
  { label: 'Philosophy', id: 'philosophy' },
  { label: 'Houses', id: 'houses' },
  { label: 'Virtues', id: 'virtues' },
  { label: 'Campus', id: 'campus' },
];

interface PhilosophyBlock {
  label: string;
  body: string[];
}

const PHILOSOPHY: PhilosophyBlock[] = [
  {
    label: 'Integral Education',
    body: [
      'We educate the whole person, not isolated faculties. Intellect, character and faith are formed together, in the same school day, by the same staff.',
      'Academic excellence and a serious life of virtue belong together. Either one without the other is incomplete.',
    ],
  },
  {
    label: 'Personalised Attention',
    body: [
      'Every boy meets one-on-one with a personal mentor throughout his time at the school. Class sizes are kept small. Teachers know each child by name and follow his growth closely.',
      'Formation is never a one-size-fits-all programme. It is tailored to the boy in front of us.',
    ],
  },
  {
    label: 'Parental Involvement',
    body: [
      'Parents are the first and primary educators of their children. The school complements that work, it does not replace it.',
      'We work in close partnership with families through regular tutorials, mentoring conversations, and a shared formation programme. The home and the school pull in the same direction.',
    ],
  },
  {
    label: 'School Personnel',
    body: [
      'Our staff are chosen for character as much as for credentials. The men who teach here are themselves committed to the formation we offer the boys.',
      'A teacher who lives what he teaches is the most important resource the school has.',
    ],
  },
];

interface Virtue {
  month: string;
  name: string;
  line: string;
}

const VIRTUES: Virtue[] = [
  { month: 'September', name: 'Integrity', line: 'Doing what is right even when no one is watching.' },
  { month: 'October', name: 'Gratitude', line: 'Recognising the goodness already in your life.' },
  { month: 'November', name: 'Courage', line: 'Acting rightly in the face of fear or difficulty.' },
  { month: 'December', name: 'Generosity', line: 'Freely giving your time, talents, and resources.' },
  { month: 'January', name: 'Discipline', line: 'Consistent self-control in service of a higher end.' },
  { month: 'February', name: 'Kindness', line: 'Choosing warmth and concern for those around you.' },
  { month: 'March', name: 'Perseverance', line: 'Continuing steadfastly despite difficulty.' },
  { month: 'April', name: 'Humility', line: 'An honest, accurate view of yourself before God and others.' },
  { month: 'May', name: 'Hope', line: 'Trusting that the work of formation will bear fruit.' },
  { month: 'June', name: 'Wisdom', line: 'Knowing how to apply knowledge well, in the moment.' },
  { month: 'July', name: 'Magnanimity', line: 'The greatness of soul to launch into the deep.' },
];

interface CampusTile {
  src: string;
  alt: string;
  caption: string;
}

const CAMPUS: CampusTile[] = [
  {
    src: '/images/students/choir-in-chapel.jpg',
    alt: 'The school chapel during a service',
    caption: 'The Chapel · Seats 300',
  },
  {
    src: '/images/students/students-in-computer-lab.JPG',
    alt: 'Students in the computer lab',
    caption: 'Science & Tech Building · 4 Dedicated Suites',
  },
  {
    src: '/images/students/high-jump-purple-house.jpg',
    alt: 'Inter-house athletics on the school field',
    caption: 'Athletics Field · Full-Size Pitch',
  },
  {
    src: '/images/students/student-drawing.JPG',
    alt: 'A student in the library',
    caption: 'Library & Arts Block · 2,000+ Volumes',
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AboutPage() {
  const [active, setActive] = useState<string>('story');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SUB_NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <PageHero
        size="medium"
        image={media('/images/students/graduands-in-a-file-walking.jpg')}
        imageAlt="Whitesands graduands in procession across the campus"
        overlay={0.55}
        eyebrow="About"
        title={
          <>
            Twenty-five years of{' '}
            <span className="italic text-lemon">one idea.</span>
          </>
        }
        subtitle="Parents first, teachers second, students in the third place."
      />

      {/* Sticky sub-nav */}
      <SubNav active={active} />

      {/* 1 ── THE STORY ─────────────────────────────────────── */}
      <section
        id="story"
        className="bg-white pt-24 lg:pt-32 pb-0 scroll-mt-40"
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
          <Eyebrow>How it started</Eyebrow>
          <h2 className="mt-5 font-serif text-deep" style={SERIF_H}>
            Lagos in the late 1990s had no school{' '}
            <span className="italic">like this.</span>
          </h2>

          <Prose>
            <p>
              The Ikota Educational Foundation was set up by a group of
              Catholic parents in Lagos who wanted a school where the
              formation of their sons in the faith would be a serious
              enterprise, not a token assembly on Monday mornings.
            </p>
            <p>
              They found a two-hectare plot of land in Lekki and acquired it
              in 1996, before the area became what it is today. At the time
              the road outside was untarred. The site sat quietly among palm
              trees, waiting.
            </p>
          </Prose>
        </div>

        {/* Full-bleed photo 1 */}
        <Figure
          src={media('/images/students/graduands-walking.jpg')}
          alt="Class of 2024 in procession on graduation day"
          caption="The Class of 2024 in procession on graduation day."
          className="mt-16 lg:mt-20"
        />

        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 mt-16 lg:mt-20">
          <Prose>
            <p>
              The first building opened in 2000 and welcomed a pioneer cohort
              of seventy-five boys. The plan was deliberate. The school would
              grow slowly, one year group at a time, so the formation could
              not be diluted by speed.
            </p>
            <p>
              Twenty-five years later, eighteen graduating classes have come
              through the gates. More than one thousand alumni are now
              doctors, engineers, lawyers, founders, fathers and priests, in
              Lagos and across the world. The conviction that founded the
              school has not changed.
            </p>
          </Prose>
        </div>

        {/* Full-bleed photo 2 */}
        <Figure
          src={media('/images/students/choir-in-chapel.jpg')}
          alt="The chapel choir during a service"
          caption="The chapel choir at the centre of the school day."
          className="mt-16 lg:mt-20 mb-24 lg:mb-32"
        />
      </section>

      {/* 2 ── WHO WE ARE ────────────────────────────────────── */}
      <section
        id="who-we-are"
        className="bg-offwhite py-24 lg:py-32 scroll-mt-40"
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="mt-5 font-serif text-deep" style={SERIF_H}>
            A Catholic school in{' '}
            <span className="italic">Lekki.</span>
          </h2>

          <Prose>
            <p>
              Whitesands is a Catholic school for boys in Lekki, Lagos. It
              exists to form young men who are intellectually capable,
              morally grounded and prepared to lead, in that order.
            </p>
            <p>
              Faith and reason belong together here. The classrooms are
              spaces of serious academic work. The chapel sits at the centre
              of the campus and at the centre of the school day. Together
              they form the complete education the school has stood for
              since the first cohort.
            </p>
          </Prose>

          {/* Pull quote */}
          <blockquote className="my-16 border-y border-deep/20 py-12 lg:py-14">
            <p
              className="font-serif italic text-deep text-center"
              style={{
                fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
              }}
            >
              The school is, first, a community of parents, teachers and
              students working towards the same end.
            </p>
          </blockquote>

          <Prose>
            <p>
              Guided by the motto Duc in Altum, drawn from Luke 5:4, the
              school invites every boy to leave the safety of the shore and
              venture into deeper waters. Deeper knowledge, deeper faith,
              deeper service.
            </p>
          </Prose>
        </div>
      </section>

      {/* 3 ── PHILOSOPHY ────────────────────────────────────── */}
      <section
        id="philosophy"
        className="bg-white py-24 lg:py-32 scroll-mt-40"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl">
            <Eyebrow>Educational philosophy</Eyebrow>
            <h2 className="mt-5 font-serif text-deep" style={SERIF_H}>
              Four convictions hold the philosophy{' '}
              <span className="italic">together.</span>
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-14">
            {PHILOSOPHY.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p
                  className="font-roboto text-xs uppercase text-deep"
                  style={{ letterSpacing: '0.28em' }}
                >
                  {p.label}
                </p>
                <div className="mt-5 space-y-4 font-sans text-base text-dark/75 leading-relaxed max-w-md">
                  {p.body.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 ── HOUSES ────────────────────────────────────────── */}
      <section id="houses" className="scroll-mt-40">
        <div className="bg-offwhite pt-24 lg:pt-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <p className="font-sans text-base sm:text-lg text-dark/70 leading-relaxed max-w-2xl">
              The six houses are named after mountain ranges. The colours are
              primary and their first derivatives. The mascots are animals
              that signify strength.
            </p>
          </div>
        </div>
        <HouseTeamsScroll />
      </section>

      {/* 5 ── VIRTUES ───────────────────────────────────────── */}
      <section
        id="virtues"
        className="bg-white py-24 lg:py-32 scroll-mt-40"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl">
            <Eyebrow>Virtues of the month</Eyebrow>
            <h2 className="mt-5 font-serif text-deep" style={SERIF_H}>
              Eleven virtues. One{' '}
              <span className="italic">year.</span>
            </h2>
            <p className="mt-5 font-sans text-base text-dark/70 leading-relaxed">
              Each month of the academic year carries a virtue. The boys
              hear it in assembly, see it in their mentor conversations,
              and read it on the chapel notice board.
            </p>
          </div>

          {/* Horizontal scroll on small/tablet, 4-col grid on lg */}
          <div className="mt-14 -mx-6 sm:-mx-10 lg:mx-0 overflow-x-auto lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul
              className="flex lg:grid lg:grid-cols-4 gap-4 lg:gap-5 px-6 sm:px-10 lg:px-0"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {VIRTUES.map((v, i) => (
                <motion.li
                  key={v.month}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ scrollSnapAlign: 'start' }}
                  className="shrink-0 w-[72vw] max-w-75 lg:w-auto lg:max-w-none"
                >
                  <article className="h-full bg-offwhite p-6 lg:p-7 rounded-sm border-t-2 border-lemon">
                    <p
                      className="font-roboto text-[10px] uppercase text-muted"
                      style={{ letterSpacing: '0.28em' }}
                    >
                      {v.month}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl text-deep leading-tight">
                      {v.name}
                    </h3>
                    <p className="mt-3 font-sans text-sm text-dark/75 leading-relaxed">
                      {v.line}
                    </p>
                  </article>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6 ── CAMPUS ────────────────────────────────────────── */}
      <section
        id="campus"
        className="bg-offwhite py-24 lg:py-32 scroll-mt-40"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl">
            <Eyebrow>Campus</Eyebrow>
            <h2 className="mt-5 font-serif text-deep" style={SERIF_H}>
              Two hectares in{' '}
              <span className="italic">Lekki.</span>
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {CAMPUS.map((c, i) => (
              <motion.figure
                key={c.src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="relative aspect-3/2 overflow-hidden rounded-sm bg-deep/5">
                  <Image
                    src={media(c.src)}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption
                  className="mt-4 font-roboto text-[11px] uppercase text-muted"
                  style={{ letterSpacing: '0.22em' }}
                >
                  {c.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/*
        Closing CTA intentionally omitted — the global Footer's first row
        (bg-deep "Come and see · Book a visit") already serves this purpose
        on every page, so adding one here stacked two deep-purple blocks
        with the same message.
      */}
    </>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const SERIF_H: React.CSSProperties = {
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

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 space-y-6 font-serif text-lg text-dark/85 leading-[1.65]">
      {children}
    </div>
  );
}

function Figure({
  src,
  alt,
  caption,
  className = '',
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="relative aspect-video lg:aspect-21/9">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      </div>
      <figcaption className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 mt-3 font-roboto text-[11px] uppercase text-muted" style={{ letterSpacing: '0.22em' }}>
        {caption}
      </figcaption>
    </figure>
  );
}

function SubNav({ active }: { active: string }) {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    // Heritage strip + main nav (~108px) + sub-nav (~50px) + a touch of breathing room
    const offset = 168;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-[calc(7rem+var(--ws-banner-h,0px))] z-30 bg-white/85 backdrop-blur supports-backdrop-filter:bg-white/70 border-b border-deep/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SUB_NAV.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            className={[
              'shrink-0 px-5 py-4 font-roboto text-[11px] uppercase border-b-2 transition-colors duration-200',
              active === id
                ? 'text-deep border-lemon'
                : 'text-muted border-transparent hover:text-deep',
            ].join(' ')}
            style={{ letterSpacing: '0.22em' }}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
