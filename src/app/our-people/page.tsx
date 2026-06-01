'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Tabs from '@radix-ui/react-tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { PlayCircle, X } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { getAllStaff } from '@/lib/content';
import { media } from '@/lib/media';
import type { StaffMember } from '@/types';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

type TabValue = 'parents' | 'staff' | 'students' | 'alumni';

interface TabConfig {
  value: TabValue;
  label: string;
  borderClass: string;   // bottom-border colour for active state
  eyebrowClass: string;  // matching eyebrow accent for the panel
}

const TABS: TabConfig[] = [
  { value: 'parents', label: 'Parents', borderClass: 'bg-lemon', eyebrowClass: 'text-deep' },
  { value: 'staff', label: 'Staff', borderClass: 'bg-bold', eyebrowClass: 'text-bold' },
  { value: 'students', label: 'Students', borderClass: 'bg-deep', eyebrowClass: 'text-deep' },
  { value: 'alumni', label: 'Alumni', borderClass: 'bg-deep/40', eyebrowClass: 'text-muted' },
];

interface ParentVideo {
  id: string;
  name: string;
  role: string;
  poster: string;
  video: string;
}

const PARENT_VIDEOS: ParentVideo[] = [
  {
    id: 'abu',
    name: 'Mr. & Mrs. Abu',
    role: 'Parents · Year 12',
    poster: '/videos/web/poster-mr-mrs-abu-parents-review.jpg',
    video: '/videos/Mr. & Mrs. Abu Parents Review.mp4',
  },
  {
    id: 'shok',
    name: 'Engineer Shok Julius',
    role: 'Parent · Year 10',
    poster: '/videos/web/poster-engineer-shok-julius-parents-review.jpg',
    video: '/videos/Engineer Shok Julius Parents Review.mp4',
  },
  {
    id: 'amos-penda',
    name: 'Mrs. Amos-Penda',
    role: 'Parent · Year 8',
    poster: '/videos/web/poster-mrs-amos-penda-parents-review.jpg',
    video: '/videos/Mrs. Amos-Penda Parents Review.mp4',
  },
  {
    id: 'first-educators',
    name: 'Whitesands Parents',
    role: 'Parents as the First Educators',
    poster: '/videos/web/poster-parents-as-the-1st-educators.jpg',
    video: '/videos/Parents as the 1st Educators.mp4',
  },
];

interface Destination {
  university: string;
  city: string;
}

const DESTINATIONS: Destination[] = [
  { university: 'Harvard University', city: 'Cambridge, MA' },
  { university: 'University of Oxford', city: 'Oxford, UK' },
  { university: 'Imperial College London', city: 'London, UK' },
  { university: 'London School of Economics', city: 'London, UK' },
  { university: 'MIT', city: 'Cambridge, MA' },
  { university: 'University of Toronto', city: 'Toronto, ON' },
];

interface AlumniStat {
  value: string;
  label: string;
}

const ALUMNI_STATS: AlumniStat[] = [
  { value: '1,000+', label: 'Alumni' },
  { value: '18', label: 'Graduating Classes' },
  { value: '70%', label: 'Studied Abroad' },
  { value: '25', label: 'Years' },
];

const STUDENT_COLLAGE = [
  { src: '/images/students/student-laughing.JPG', alt: 'A student laughing between classes' },
  { src: '/images/students/orchestra-at-ceremony.jpg', alt: 'School orchestra performing at a ceremony' },
  { src: '/images/students/student-in-traditional.JPG', alt: 'A student in traditional Nigerian attire on Cultural Day' },
  { src: '/images/students/students-playing-chess.JPG', alt: 'Students playing chess after school' },
  { src: '/images/students/cultural-dance.JPG', alt: 'Students performing a cultural dance' },
  { src: '/images/students/student-drawing.JPG', alt: 'A student at work in the art block' },
];

type StaffFilter = 'all' | 'leadership' | 'faculty';

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function OurPeoplePage() {
  const [active, setActive] = useState<TabValue>('parents');

  return (
    <>
      <PageHero
        size="medium"
        image={media('/images/students/orchestra-at-ceremony.jpg')}
        imageAlt="The Whitesands community at a school ceremony"
        overlay={0.6}
        eyebrow="Our People"
        title={
          <>
            Our{' '}
            <span className="italic text-lemon">People.</span>
          </>
        }
        subtitle="Three protagonists. One educational project."
      />

      <Tabs.Root
        value={active}
        onValueChange={(v) => setActive(v as TabValue)}
      >
        <TabBar active={active} />

        <Tabs.Content value="parents" forceMount hidden={active !== 'parents'}>
          <ParentsPanel />
        </Tabs.Content>
        <Tabs.Content value="staff" forceMount hidden={active !== 'staff'}>
          <StaffPanel />
        </Tabs.Content>
        <Tabs.Content value="students" forceMount hidden={active !== 'students'}>
          <StudentsPanel />
        </Tabs.Content>
        <Tabs.Content value="alumni" forceMount hidden={active !== 'alumni'}>
          <AlumniPanel />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}

// ---------------------------------------------------------------------------
// Tab bar
// ---------------------------------------------------------------------------

function TabBar({ active }: { active: TabValue }) {
  return (
    <Tabs.List
      aria-label="Our people"
      className="sticky top-28 z-30 bg-white/85 backdrop-blur supports-backdrop-filter:bg-white/70 border-b border-deep/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((tab) => {
          const isActive = active === tab.value;
          return (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className={[
                'relative shrink-0 px-5 sm:px-7 py-5 font-roboto text-[11px] uppercase transition-colors duration-200 cursor-pointer',
                isActive ? 'text-deep' : 'text-muted hover:text-deep',
              ].join(' ')}
              style={{ letterSpacing: '0.22em' }}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="people-tab-underline"
                  className={`absolute left-3 right-3 -bottom-px h-1 ${tab.borderClass}`}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </Tabs.Trigger>
          );
        })}
      </div>
    </Tabs.List>
  );
}

// ---------------------------------------------------------------------------
// PARENTS
// ---------------------------------------------------------------------------

function ParentsPanel() {
  const [active, setActive] = useState<ParentVideo | null>(null);

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
    <>
      {/* Intro + body */}
      <section className="bg-white py-24 lg:py-28 scroll-mt-40">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
          <Eyebrow className="text-deep">The first educators</Eyebrow>
          <h2 className="mt-5 font-serif text-deep" style={H2}>
            Parents are not customers. They are{' '}
            <span className="italic">colleagues.</span>
          </h2>
          <Prose>
            <p>
              The conviction that founded Whitesands was that parents are the
              first and primary educators of their children. The school
              exists to extend that work, not to replace it.
            </p>
            <p>
              In practice this means an ongoing conversation. Parents meet
              with their son's mentor twice a term. They are invited to
              monthly formation sessions on the topics the boys are studying
              in their personal formation. They sit on committees that shape
              the life of the school.
            </p>
            <p>
              Whitesands parents tend to know one another. The community is
              deliberate. Friendships formed in the school car park last
              decades.
            </p>
          </Prose>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-offwhite py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
          <p
            className="font-serif italic text-deep"
            style={{
              fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
            }}
          >
            The school genuinely treats parents as the first educators of our
            children. That partnership is what makes Whitesands different.
          </p>
          <p
            className="mt-8 font-roboto text-[11px] uppercase text-muted"
            style={{ letterSpacing: '0.28em' }}
          >
            Whitesands Parents
          </p>
        </div>
      </section>

      {/* Video testimonials */}
      <section className="bg-white py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl mb-14">
            <Eyebrow className="text-deep">In their own words</Eyebrow>
            <h2 className="mt-5 font-serif text-deep" style={H2}>
              Four families on the{' '}
              <span className="italic">partnership.</span>
            </h2>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {PARENT_VIDEOS.map((p) => (
              <li key={p.id}>
                <article className="group flex flex-col h-full">
                  <button
                    type="button"
                    onClick={() => setActive(p)}
                    aria-label={`Play testimonial from ${p.name}`}
                    className="relative block aspect-video w-full overflow-hidden rounded-sm cursor-pointer bg-deep/5"
                  >
                    <Image
                      src={media(p.poster)}
                      alt={`${p.name} — parent testimonial`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-deep/25 group-hover:bg-deep/40 transition-colors duration-300" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle
                        strokeWidth={1.25}
                        className="w-16 h-16 text-lemon drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                      />
                    </span>
                  </button>
                  <div className="mt-5">
                    <p className="font-serif text-lg text-deep leading-tight">
                      {p.name}
                    </p>
                    <p
                      className="mt-1 font-roboto text-[10px] uppercase text-muted"
                      style={{ letterSpacing: '0.22em' }}
                    >
                      {p.role}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
              className="relative w-full max-w-4xl"
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
                className="w-full aspect-video bg-black rounded-sm shadow-2xl"
              />
              <div className="mt-4 text-white">
                <p className="font-serif text-lg">{active.name}</p>
                <p
                  className="mt-1 font-roboto text-xs uppercase text-white/60"
                  style={{ letterSpacing: '0.22em' }}
                >
                  {active.role}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ---------------------------------------------------------------------------
// STAFF
// ---------------------------------------------------------------------------

function StaffPanel() {
  const allStaff = useMemo(() => getAllStaff(), []);
  const [filter, setFilter] = useState<StaffFilter>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return allStaff;
    if (filter === 'leadership') {
      return allStaff.filter((s) => s.isLeadership);
    }
    return allStaff.filter((s) => !s.isLeadership);
  }, [allStaff, filter]);

  const counts = useMemo(
    () => ({
      all: allStaff.length,
      leadership: allStaff.filter((s) => s.isLeadership).length,
      faculty: allStaff.filter((s) => !s.isLeadership).length,
    }),
    [allStaff]
  );

  return (
    <section className="bg-white py-24 lg:py-28 scroll-mt-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl">
          <Eyebrow className="text-bold">The educators</Eyebrow>
          <h2 className="mt-5 font-serif text-deep" style={H2}>
            One hundred staff. Every one of them an{' '}
            <span className="italic">educator.</span>
          </h2>
          <p className="mt-5 font-sans text-base text-dark/70 leading-relaxed">
            The men who teach at Whitesands are chosen for
            character as much as for credentials. A teacher who lives what
            he teaches is the most important resource the school has.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap items-center gap-x-1 gap-y-3 border-b border-deep/10 pb-1">
          <FilterButton
            label="All"
            count={counts.all}
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          <FilterButton
            label="Leadership"
            count={counts.leadership}
            active={filter === 'leadership'}
            onClick={() => setFilter('leadership')}
          />
          <FilterButton
            label="Faculty"
            count={counts.faculty}
            active={filter === 'faculty'}
            onClick={() => setFilter('faculty')}
          />
        </div>

        {/* Grid */}
        <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-10">
          {filtered.map((staff) => (
            <li key={staff.id}>
              <StaffCard staff={staff} />
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="mt-12 font-sans text-base text-muted text-center">
            No staff to show in this group.
          </p>
        )}
      </div>
    </section>
  );
}

function FilterButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'relative px-4 py-3 font-roboto text-[11px] uppercase transition-colors duration-200',
        active ? 'text-deep' : 'text-muted hover:text-deep',
      ].join(' ')}
      style={{ letterSpacing: '0.22em' }}
    >
      {label}
      <span
        className={[
          'ml-2 tabular-nums normal-case',
          active ? 'text-deep/60' : 'text-muted/60',
        ].join(' ')}
        style={{ letterSpacing: '0.06em' }}
      >
        {count}
      </span>
      {active && (
        <motion.span
          layoutId="staff-filter-underline"
          className="absolute left-2 right-2 -bottom-px h-0.5 bg-bold"
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </button>
  );
}

function StaffCard({ staff }: { staff: StaffMember }) {
  const hasPhoto = !!staff.photo;
  return (
    <article className="group">
      <div className="relative aspect-3/4 overflow-hidden rounded-sm bg-deep/5">
        {hasPhoto ? (
          <Image
            src={media(staff.photo)}
            alt={staff.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-deep/40 font-serif text-3xl">
            {initials(staff.name)}
          </div>
        )}
      </div>
      <h3 className="mt-4 font-serif text-base lg:text-lg text-deep leading-snug">
        {staff.name}
      </h3>
      <p
        className="mt-1 font-roboto text-[10px] uppercase text-muted leading-snug"
        style={{ letterSpacing: '0.2em' }}
      >
        {staff.title}
      </p>
    </article>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

// ---------------------------------------------------------------------------
// STUDENTS
// ---------------------------------------------------------------------------

function StudentsPanel() {
  return (
    <>
      <section className="bg-white py-24 lg:py-28 scroll-mt-40">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
          <Eyebrow className="text-deep">The Whitesands boy</Eyebrow>
          <h2 className="mt-5 font-serif text-deep" style={H2}>
            Diverse backgrounds. Unique talents.{' '}
            <span className="italic">Boundless dreams.</span>
          </h2>
          <Prose>
            <p>
              The boys at Whitesands come from across Lagos and from across
              Nigeria. Some have been here since JS1. Some joined for senior
              school. Each carries the school in his own way.
            </p>
            <p>
              They are quiet readers and they are loud captains. They are
              science prefects who play in the orchestra. They are sprinters
              who serve at the altar. The school is large enough to hold all
              of it and small enough to know each of them by name.
            </p>
            <p>
              What they share is not a type. It is a formation. By the time
              they leave they have been mentored, challenged, prayed with
              and prayed for. They have been given things to carry and they
              have carried them.
            </p>
          </Prose>
        </div>
      </section>

      {/* Collage */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5">
            {STUDENT_COLLAGE.map((s, i) => (
              <motion.figure
                key={s.src}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={[
                  'relative overflow-hidden rounded-sm bg-deep/5',
                  // varied vertical sizes for an editorial collage rhythm
                  i === 0 && 'lg:row-span-2 aspect-4/5 lg:aspect-3/4 lg:col-span-2',
                  i === 1 && 'aspect-square lg:col-span-2',
                  i === 2 && 'aspect-square lg:col-span-2',
                  i === 3 && 'aspect-square lg:col-span-2',
                  i === 4 && 'aspect-square lg:col-span-2',
                  i === 5 && 'aspect-square lg:col-span-2',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <Image
                  src={media(s.src)}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// ALUMNI
// ---------------------------------------------------------------------------

function AlumniPanel() {
  return (
    <>
      <section className="bg-white py-24 lg:py-28 scroll-mt-40">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
          <Eyebrow className="text-muted">1,000+ graduates and counting</Eyebrow>
          <h2 className="mt-5 font-serif text-deep" style={H2}>
            Where they went. What they&apos;re{' '}
            <span className="italic">doing.</span>
          </h2>
          <Prose>
            <p>
              Eighteen graduating classes have come through the gates of the
              school. More than one thousand alumni are now doctors,
              engineers, lawyers, founders, fathers and priests, in Lagos
              and across the world.
            </p>
            <p>
              Over seventy percent of Whitesands boys continue their studies
              abroad. Many return to Nigeria after, to build careers and
              raise families. A growing number send their own sons back to
              the school that formed them.
            </p>
          </Prose>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-offwhite py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:divide-x lg:divide-deep/15">
            {ALUMNI_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col items-center text-center px-4 lg:px-8"
              >
                <span
                  className="font-serif text-deep tabular-nums leading-none"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.value}
                </span>
                <span
                  className="mt-4 font-roboto text-xs uppercase text-muted max-w-[16ch]"
                  style={{ letterSpacing: '0.22em' }}
                >
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable destinations */}
      <section className="bg-white py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl mb-14">
            <Eyebrow className="text-muted">Notable destinations</Eyebrow>
            <h2 className="mt-5 font-serif text-deep" style={H2}>
              A handful of the universities our boys have{' '}
              <span className="italic">attended.</span>
            </h2>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
            {DESTINATIONS.map((d, i) => (
              <motion.li
                key={d.university}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-t border-deep/15 py-6 last:border-b lg:nth-[-n+3]:border-t lg:nth-[n+4]:border-t-0"
              >
                <h3 className="font-serif text-xl lg:text-2xl text-deep leading-tight">
                  {d.university}
                </h3>
                <p
                  className="mt-2 font-roboto text-[11px] uppercase text-muted"
                  style={{ letterSpacing: '0.22em' }}
                >
                  {d.city}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Alumni CTA */}
      <section className="bg-offwhite py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
          <p
            className="font-roboto text-xs uppercase text-muted"
            style={{ letterSpacing: '0.28em' }}
          >
            For alumni
          </p>
          <h3
            className="mt-5 font-serif text-deep"
            style={{
              fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            Are you a Whitesands alumnus?{' '}
            <span className="italic">Join the alumni association.</span>
          </h3>
          <Link
            href="mailto:alumni@whitesandsschool.edu.ng"
            className="mt-8 inline-flex items-center gap-2 font-roboto uppercase text-sm text-deep hover:text-bold transition-colors"
            style={{ letterSpacing: '0.18em' }}
          >
            alumni@whitesandsschool.edu.ng
            <span className="inline-block transition-transform duration-200 hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const H2: React.CSSProperties = {
  fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
  lineHeight: 1.12,
  letterSpacing: '-0.02em',
};

function Eyebrow({
  children,
  className = 'text-deep',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-roboto text-xs uppercase ${className}`}
      style={{ letterSpacing: '0.28em' }}
    >
      {children}
    </p>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 space-y-5 font-serif text-lg text-dark/85 leading-[1.65]">
      {children}
    </div>
  );
}
