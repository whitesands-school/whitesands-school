'use client';

import Link from 'next/link';
import * as Accordion from '@radix-ui/react-accordion';
import { motion } from 'framer-motion';
import {
  Clapperboard,
  Code2,
  Palette,
  Music,
  Sigma,
  Medal,
  Download,
  ChevronDown,
  ArrowRight,
  BadgeCheck,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { media } from '@/lib/media';
import { SITE } from '@/lib/site';

// ---------------------------------------------------------------------------
// Content — sourced from the Alumni Prize document supplied by the school.
// ---------------------------------------------------------------------------

const COVER_BASE = '/alumni/coverpages-for-submission-to-be-downloaded';

interface Prize {
  id: string;
  n: string;
  category: string;
  icon: typeof Clapperboard;
  name: string;
  eligibility: string;
  about: string;
  howToEnter?: string[];
  rules: string[];
  automatic?: string;
  coverPage?: string;
  sponsor: {
    heading: string;
    classOf: string;
    bio: string[];
    quote?: string;
  };
}

const PRIZES: Prize[] = [
  {
    id: 'film',
    n: '01',
    category: 'Film',
    icon: Clapperboard,
    name: 'Hamiid Abaniwonda Prize for Film',
    eligibility: 'Open to all students',
    about:
      'Each student creates a short film or documentary about an interest of his. One submission per student, in .mp4 format. Any genre or theme is welcome, provided the production respects the philosophy and values of Whitesands School.',
    howToEnter: [
      'From the first day of resumption (third term), submit your film on a flash drive to the Alumni coordinator, Mr Ojukwu. Tag the drive with your name and class — it should contain only the competition film.',
      'Include printed documentation (font size 14) describing the plot, context, originality of the idea, and any equipment or software used.',
      'All projects and supporting documents must be approved by the Alumni coordinator before the deadline.',
    ],
    rules: [
      'One submission per student, in .mp4 format.',
      'No restriction on genre or theme — but every production must respect the philosophy and values of the school.',
      'The film must be entirely your own work.',
      'Deadline: the first Friday of third term. Late submissions may be disqualified.',
      'The judges’ decision is final.',
    ],
    coverPage: `${COVER_BASE}/film.docx`,
    sponsor: {
      heading: 'Hamiid Abaniwonda',
      classOf: "Class of '14",
      bio: [
        'Hamiid Abaniwonda — Hamiid Wonda to most — is an entertainment consultant. At Whitesands he acted in school dramas and sang in a four-man junior-school group called LOL.',
        'His break came in his first year of university, when Jinmi Abduls sought him out. He has since managed and worked with Joeboy, Mr Eazi, Mayorkun and others, and today runs Blueprint, a management company, and Bridge Digital, a music distribution company.',
      ],
    },
  },
  {
    id: 'coding',
    n: '02',
    category: 'Programming',
    icon: Code2,
    name: 'Terry Kanu-Iroegbu Prize for Coding',
    eligibility: 'Senior school only',
    about:
      'Build something that runs. Any programming language is allowed, in any theme — the finished project must compile and run on Android or Windows, and respect the philosophy and values of the school.',
    howToEnter: [
      'From the first day of resumption (third term), submit your application on a flash drive to the ICT teacher, Mr Gege. Tag the drive with your name and class — it should contain only the project.',
      'Include printed documentation (font size 14) describing the program structure, the algorithm, and any login details needed to run it.',
      'All projects and supporting documents must be approved by the ICT teacher before the deadline.',
    ],
    rules: [
      'One submission per student.',
      'Any language, any theme — the project must run on Android or Windows.',
      'The project must be entirely your own work. If in doubt, ask the ICT teacher.',
      'Deadline: the first Friday of third term. Late submissions may be disqualified.',
      'The judges’ decision is final.',
    ],
    coverPage: `${COVER_BASE}/coding.docx`,
    sponsor: {
      heading: 'Terry Kanu-Iroegbu',
      classOf: "Class of '08",
      bio: [
        'Terry Kanu-Iroegbu is the Chief of Partnerships at PiggyVest and co-founder of Sharphire Global — a product-focused leader experienced in creating, developing and managing consumer and enterprise products.',
      ],
    },
  },
  {
    id: 'visual-art',
    n: '03',
    category: 'Visual Art',
    icon: Palette,
    name: 'Anthony Azekwoh Prize for Visual Art',
    eligibility: 'Open to all students',
    about:
      'Painting, drawing, digital work or sculpture — any medium, any theme. Works must be at least A3 in size, neatly presented, and respect the philosophy and values of the school.',
    howToEnter: [
      'From the first day of resumption (third term), submit your work to the Visual Arts teacher, Mr Oyinloye, for approval.',
      'Include printed documentation (font size 14) describing the originality of the idea and the medium used.',
    ],
    rules: [
      'One submission per student.',
      'All works must be at least A3 in size; paintings on cardboard or canvas; digital works printed at A3 or larger.',
      'Three-dimensional works (e.g. sculpture) are welcome.',
      'The work must be entirely your own.',
      'Deadline: the first Friday of third term. Late submissions may be disqualified.',
      'The judges’ decision is final.',
    ],
    coverPage: `${COVER_BASE}/art.docx`,
    sponsor: {
      heading: 'Anthony Azekwoh',
      classOf: "Class of '16",
      bio: [
        'Anthony Azekwoh is a digital artist and author whose paintings carry a stunning depth, inviting viewers to unravel their stories. He took up writing at 13 and art at 16 — ink on paper first, then Photoshop.',
        'His artwork has been seen by millions; his writing by thousands. A recipient of the Awele Trust Prize, he has worked with Show Dem Camp, Masego, Adekunle Gold and Blaqbonez, published five books, and set up the Anthony Azekwoh Fund for emerging artists.',
      ],
    },
  },
  {
    id: 'music',
    n: '04',
    category: 'Music',
    icon: Music,
    name: 'Asa Asika Prize for Music',
    eligibility: 'Senior school only',
    about:
      'Write and produce an original song — beats and lyrics, in .mp3 format. Any genre, any theme, provided it respects the philosophy and values of the school. Pro-tip from the judges: clarity wins — keep the recording free of background noise.',
    howToEnter: [
      'From the first day of resumption (third term), submit your song on a flash drive to Mr Simeon Nyam. Tag the drive with your name and class — it should contain only the competition song.',
      'Include printed documentation (font size 14) stating the lyrics, the idea, the genre, the originality of the work, and the equipment or software used.',
      'All projects and supporting documents must be approved by Mr Nyam before the deadline.',
    ],
    rules: [
      'One submission per student, in .mp3 format, with both beats and lyrics.',
      'No restriction on genre or theme — the production must respect the values of the school.',
      'The song must be entirely your own work.',
      'Deadline: the first Friday of third term. Late submissions may be disqualified.',
      'The judges’ decision is final.',
    ],
    coverPage: `${COVER_BASE}/music.docx`,
    sponsor: {
      heading: 'Asa Asika',
      classOf: "Class of '08",
      bio: [
        'Asa Asika is co-founder and Principal of Plug Entertainment, Lagos. In the industry since childhood, he spent a decade in PR and marketing at Storm Records before founding Stargaze, a management company focused on young, upcoming artists.',
        'He manages Afrobeats forerunner Davido — a partnership central to one of the great success stories in African music — and co-founded Plug Entertainment in 2016.',
      ],
    },
  },
  {
    id: 'mathematics',
    n: '05',
    category: 'Mathematics',
    icon: Sigma,
    name: 'Obetta Prize for Mathematics',
    eligibility: 'Final-year students · awarded automatically',
    about:
      'A prize that celebrates consistency and hard work in Mathematics across the whole of senior school. There is nothing to submit — your work over the years is the entry.',
    automatic:
      'The selection is based on each final-year student’s performance from SS1 to SS3. The student with the highest average score in Mathematics over that period is declared the winner.',
    rules: [
      'Open only to final-year students.',
      'Winner: the highest average Mathematics score across SS1–SS3.',
      'The selection process is final.',
    ],
    sponsor: {
      heading: 'Ebube Obetta',
      classOf: "Class of '18",
      bio: [
        'Ebube Obetta read Computer Science at the University of Illinois Urbana-Champaign and is a Software Development Engineer at GoDaddy. He graduated from Whitesands as the best student in Mathematics, English and Technical Drawing.',
      ],
      quote:
        'I think of this prize, first and foremost, as an opportunity to give back to the place and people that helped shape me. I had the privilege of Math and Further Math teachers who pushed me to compete at the very highest level — I am very grateful for this.',
    },
  },
  {
    id: 'sports',
    n: '06',
    category: 'Sports',
    icon: Medal,
    name: 'Lanre Vigo Prize for Sports',
    eligibility: 'Final-year students · awarded automatically',
    about:
      'A prize that celebrates sporting achievement in the final year. There is nothing to submit — every race run and match played for the school counts.',
    automatic:
      'The selection is based on each final-year student’s record in SS3. The student with the most medals wins — and medals earned representing Whitesands in external competitions carry more weight than those won within the school.',
    rules: [
      'Open only to final-year students.',
      'Winner: the most medals earned in SS3.',
      'Extramural (external) medals outweigh intramural ones.',
      'The selection process is final.',
    ],
    sponsor: {
      heading: 'Lanre Vigo',
      classOf: "Class of '08",
      bio: [
        'Lanre Vigo is co-founder of Plug Sports, a sports management company whose clients include Henry Onyekuru, Asisat Oshoala, Tobi Amusan and Uchenna Kanu. At Whitesands he was captain of the football team, Sports Prefect, and best graduating sportsman.',
      ],
      quote:
        'I want to give back to the school that helped me become the man I am today. Hopefully this award can inspire the winners to reach their goals in sports.',
    },
  },
];

// Alumni also endow best-graduating-student prizes announced at the ceremony.
const ACADEMIC_HONOURS = [
  'Best graduating student in Mathematics',
  'Best graduating student in Science',
  'Best graduating student in Economics',
  'Best graduating student in French',
  'Best graduating Sportsman',
];

const FACTS = [
  { value: 'Free', label: 'to enter' },
  { value: '6', label: 'prize categories' },
  { value: '3rd term', label: 'submission window' },
  { value: 'Prize Day', label: 'winners announced' },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AlumniPrizesPage() {
  return (
    <>
      <PageHero
        size="medium"
        image={media('/images/students/awarding-medals.jpg')}
        imageAlt="A Whitesands student receiving a medal"
        overlay={0.6}
        eyebrow="The Alumni Prizes"
        title={
          <>
            From the men who sat in{' '}
            <span className="italic text-lemon">these seats.</span>
          </>
        }
        subtitle="Whitesands alumni sponsor annual prizes that reward excellence and creativity in the boys who follow them."
      />

      {/* ── ABOUT ───────────────────────────────────────────── */}
      <section className="bg-white py-24 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
          <p
            className="font-roboto text-xs uppercase text-deep"
            style={{ letterSpacing: '0.28em' }}
          >
            About the prize
          </p>
          <h2
            className="mt-5 font-serif text-deep"
            style={{
              fontSize: 'clamp(2rem, 4.2vw, 3rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
            }}
          >
            Old boys, investing in{' '}
            <span className="italic">new ones.</span>
          </h2>
          <div className="mt-8 space-y-5 font-sans text-base lg:text-lg text-dark/75 leading-relaxed">
            <p>
              The Alumni Prize is an initiative of Whitesands School alumni in
              collaboration with their alma mater. Our alumni have always
              reached out to maintain strong ties between themselves, the
              students and society — the Prize is a manifestation of that
              constant desire to foster a vibrant, nurturing and strong
              Whitesands community.
            </p>
            <p>
              Each year, alumni sponsor prizes in Film, Programming, Visual
              Art, Music, Academics and Sports. The aim is simple: to foster
              excellence and creativity in our students, especially beyond the
              classroom. Participation is free, open only to students of
              Whitesands School, and winners are announced at the annual
              Speech and Prize-giving Ceremony.
            </p>
          </div>
        </div>

        {/* Quick facts */}
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 mt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:divide-x lg:divide-deep/15 border-y border-deep/10 py-10">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                className="flex flex-col items-center text-center px-4"
              >
                <span
                  className="font-serif text-deep leading-none"
                  style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)', letterSpacing: '-0.02em' }}
                >
                  {f.value}
                </span>
                <span
                  className="mt-3 font-roboto text-[11px] uppercase text-muted"
                  style={{ letterSpacing: '0.22em' }}
                >
                  {f.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Category jump links */}
        <nav
          aria-label="Prize categories"
          className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 mt-12 flex flex-wrap justify-center gap-2"
        >
          {PRIZES.map(({ id, category, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className="inline-flex items-center gap-2 border border-deep/15 rounded-full px-4 py-2 font-roboto text-[11px] uppercase text-deep hover:border-deep hover:bg-deep hover:text-white transition-colors duration-200"
              style={{ letterSpacing: '0.16em' }}
            >
              <Icon size={13} strokeWidth={1.75} />
              {category}
            </a>
          ))}
        </nav>
      </section>

      {/* ── PRIZES ──────────────────────────────────────────── */}
      {PRIZES.map((prize, i) => (
        <PrizeSection key={prize.id} prize={prize} alt={i % 2 === 0} />
      ))}

      {/* ── ACADEMIC HONOURS STRIP ──────────────────────────── */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
          <p
            className="font-roboto text-xs uppercase text-muted"
            style={{ letterSpacing: '0.28em' }}
          >
            And at the ceremony itself
          </p>
          <h2
            className="mt-5 font-serif text-deep"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', lineHeight: 1.15 }}
          >
            Alumni also endow honours for the{' '}
            <span className="italic">best graduating students.</span>
          </h2>
          <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
            {ACADEMIC_HONOURS.map((h) => (
              <li
                key={h}
                className="inline-flex items-center gap-2 bg-offwhite border border-deep/10 rounded-full px-4 py-2 font-sans text-sm text-dark/75"
              >
                <BadgeCheck size={14} className="text-deep" strokeWidth={1.75} />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SPONSOR CTA ─────────────────────────────────────── */}
      <section className="bg-deep py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
          <p
            className="font-roboto text-xs uppercase text-lemon"
            style={{ letterSpacing: '0.28em' }}
          >
            For old boys
          </p>
          <h2
            className="mt-5 font-serif text-white"
            style={{ fontSize: 'clamp(2rem, 4.2vw, 3rem)', lineHeight: 1.12 }}
          >
            Want to put your name on a{' '}
            <span className="italic text-lemon">prize?</span>
          </h2>
          <p className="mt-6 font-sans text-base sm:text-lg text-white/75 leading-relaxed max-w-xl mx-auto">
            The Prize grows when alumni step forward. If you would like to
            sponsor a category — or create a new one — the school would love
            to hear from you.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${SITE.alumniEmail}?subject=Sponsoring an Alumni Prize`}
              className="inline-flex items-center gap-2 bg-lemon text-deep font-roboto uppercase text-sm px-8 py-3.5 hover:bg-white transition-colors duration-200"
              style={{ letterSpacing: '0.14em' }}
            >
              Sponsor a prize
              <ArrowRight size={15} />
            </a>
            <Link
              href="/our-people#alumni"
              className="font-roboto uppercase text-xs text-white/70 hover:text-lemon transition-colors"
              style={{ letterSpacing: '0.22em' }}
            >
              More on our alumni →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Prize block
// ---------------------------------------------------------------------------

function PrizeSection({ prize, alt }: { prize: Prize; alt: boolean }) {
  const Icon = prize.icon;
  return (
    <section
      id={prize.id}
      className={`${alt ? 'bg-offwhite' : 'bg-white'} py-20 lg:py-24 scroll-mt-36`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="font-serif text-deep/15 leading-none select-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', letterSpacing: '-0.04em' }}
            >
              {prize.n}
            </span>
            <div>
              <p
                className="font-roboto text-[11px] uppercase text-deep flex items-center gap-2"
                style={{ letterSpacing: '0.28em' }}
              >
                <Icon size={14} strokeWidth={1.75} />
                {prize.category}
              </p>
              <span
                className="mt-2 inline-block font-roboto text-[10px] uppercase bg-lemon/40 text-deep rounded-full px-3 py-1"
                style={{ letterSpacing: '0.16em' }}
              >
                {prize.eligibility}
              </span>
            </div>
          </div>
          <h2
            className="mt-6 font-serif text-deep"
            style={{
              fontSize: 'clamp(1.75rem, 3.8vw, 2.75rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {prize.name}
          </h2>
          <p className="mt-5 font-sans text-base lg:text-lg text-dark/75 leading-relaxed max-w-3xl">
            {prize.about}
          </p>
        </motion.header>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left — entering + rules */}
          <div className="lg:col-span-7">
            {prize.automatic ? (
              <div className="border-l-2 border-lemon pl-6 py-1">
                <p
                  className="font-roboto text-[11px] uppercase text-muted"
                  style={{ letterSpacing: '0.24em' }}
                >
                  How the winner emerges
                </p>
                <p className="mt-3 font-sans text-base text-dark/75 leading-relaxed">
                  {prize.automatic}
                </p>
              </div>
            ) : (
              <>
                <p
                  className="font-roboto text-[11px] uppercase text-muted mb-5"
                  style={{ letterSpacing: '0.24em' }}
                >
                  How to enter
                </p>
                <ol className="space-y-4">
                  {prize.howToEnter?.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span
                        aria-hidden
                        className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-deep text-white font-roboto text-xs flex items-center justify-center"
                      >
                        {i + 1}
                      </span>
                      <p className="font-sans text-[15px] text-dark/75 leading-relaxed">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </>
            )}

            {/* Rules accordion */}
            <Accordion.Root type="single" collapsible className="mt-8">
              <Accordion.Item
                value="rules"
                className="border border-deep/10 rounded-md overflow-hidden bg-white"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between px-5 py-4 cursor-pointer">
                    <span
                      className="font-roboto text-[11px] uppercase text-deep"
                      style={{ letterSpacing: '0.24em' }}
                    >
                      Rules &amp; regulations
                    </span>
                    <ChevronDown
                      size={16}
                      className="text-muted transition-transform duration-300 group-data-[state=open]:rotate-180"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <ul className="px-5 pb-5 space-y-2.5">
                    {prize.rules.map((rule, i) => (
                      <li
                        key={i}
                        className="flex gap-3 font-sans text-sm text-dark/70 leading-relaxed"
                      >
                        <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-deep/40 shrink-0" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>

            {/* Cover page download */}
            {prize.coverPage && (
              <a
                href={prize.coverPage}
                download
                className="group mt-6 inline-flex items-center gap-3 bg-deep text-white font-roboto uppercase text-xs px-6 py-3.5 rounded-sm hover:bg-bold transition-colors duration-200"
                style={{ letterSpacing: '0.16em' }}
              >
                <Download
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                />
                Download submission cover page
              </a>
            )}
          </div>

          {/* Right — sponsor card */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="lg:col-span-5"
          >
            <div className="bg-deep rounded-md p-7 lg:p-8 h-full flex flex-col">
              <p
                className="font-roboto text-[10px] uppercase text-lemon"
                style={{ letterSpacing: '0.28em' }}
              >
                The alumnus behind it
              </p>
              <p className="mt-4 font-serif text-2xl text-white leading-tight">
                {prize.sponsor.heading}
              </p>
              <p
                className="mt-1.5 font-roboto text-[11px] uppercase text-white/50"
                style={{ letterSpacing: '0.22em' }}
              >
                {prize.sponsor.classOf}
              </p>
              <div className="mt-5 space-y-4">
                {prize.sponsor.bio.map((p, i) => (
                  <p key={i} className="font-sans text-sm text-white/75 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              {prize.sponsor.quote && (
                <blockquote className="mt-6 pt-5 border-t border-white/10 font-serif italic text-base text-lemon/90 leading-relaxed">
                  &ldquo;{prize.sponsor.quote}&rdquo;
                </blockquote>
              )}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
