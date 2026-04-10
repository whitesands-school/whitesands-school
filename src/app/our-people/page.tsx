'use client';

import { useEffect, useMemo, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import { Button, AnimatedSection, SectionLabel, Divider } from '@/components/ui';
import { getAllStaff } from '@/lib/content';
import type { StaffMember } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterGroup = 'All' | 'Leadership' | 'Teaching' | 'Pastoral & Sport';
type TabValue = 'staff' | 'students' | 'parents' | 'alumni';

// ─── Static data ─────────────────────────────────────────────────────────────

const STAFF_PHOTOS: Record<string, string> = {
  'staff-001': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  'staff-002': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  'staff-003': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80',
  'staff-004': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
  'staff-005': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
  'staff-006': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'staff-007': 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80',
  'staff-008': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
  'staff-009': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  'staff-010': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  'staff-011': 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=800&q=80',
};

const FILTER_GROUPS: Record<FilterGroup, string[]> = {
  All: [],
  Leadership: ['Leadership'],
  Teaching: ['Mathematics', 'Science', 'Humanities', 'Technology', 'Creative Arts'],
  'Pastoral & Sport': ['Pastoral', 'Sports'],
};

const DEPT_BADGE: Record<string, string> = {
  Leadership: 'bg-deep text-white',
  Mathematics: 'bg-deep/10 text-deep',
  Science: 'bg-deep/10 text-deep',
  Humanities: 'bg-deep/10 text-deep',
  Technology: 'bg-deep/10 text-deep',
  'Creative Arts': 'bg-deep/10 text-deep',
  Sports: 'bg-bold/10 text-bold',
  Pastoral: 'bg-lemon text-dark',
};

const STUDENT_COUNCIL = [
  {
    name: 'Damilola Adebayo',
    role: 'Head Girl · Council President',
    year: 'SS3',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    quote: 'Leadership here is real. You don\'t carry a title — you carry people.',
  },
  {
    name: 'Chukwudi Nnaji',
    role: 'Head Boy · Deputy President',
    year: 'SS3',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    quote: 'Whitesands showed me that excellence and kindness aren\'t opposites.',
  },
  {
    name: 'Amina Yusuf',
    role: 'Council Secretary',
    year: 'SS2',
    photo: 'https://images.unsplash.com/photo-1520810627419-35e6bae99049?auto=format&fit=crop&w=800&q=80',
    quote: 'Every student voice matters here. We just need people to document and follow through.',
  },
];

const SCHOOL_HOUSES = [
  {
    name: 'Aquinas House',
    patron: 'St. Thomas Aquinas',
    colour: 'bg-deep',
    text: 'text-white',
    dot: 'bg-lemon',
    description:
      'The house of intellectual courage — named for the scholar-saint who showed that faith and reason strengthen each other.',
  },
  {
    name: 'Patrick House',
    patron: 'St. Patrick',
    colour: 'bg-emerald-700',
    text: 'text-white',
    dot: 'bg-emerald-300',
    description:
      'Bearing the fire of mission and service, Patrick House fosters fearless courage and a heart for community.',
  },
  {
    name: 'Josephine House',
    patron: 'St. Josephine Bakhita',
    colour: 'bg-bold',
    text: 'text-white',
    dot: 'bg-lemon',
    description:
      'Honouring Africa\'s beloved saint, Josephine House stands for resilience, compassion, and freedom from fear.',
  },
  {
    name: 'Cecilia House',
    patron: 'St. Cecilia',
    colour: 'bg-amber-600',
    text: 'text-white',
    dot: 'bg-amber-200',
    description:
      'Named for the patron of music, Cecilia House celebrates creativity, beauty, and the pursuit of excellence in the arts.',
  },
];

const STUDENT_VOICES = [
  {
    quote: 'Whitesands taught me that leadership is service first. The confidence I built here still shapes everything I do.',
    name: 'Damilola Adebayo',
    year: 'SS3',
  },
  {
    quote: 'The teachers knew how to challenge us without losing us. That balance — demanding and safe — is rare.',
    name: 'Chukwudi Nnaji',
    year: 'SS3',
  },
  {
    quote: 'Fr. Patrick\'s retreats changed how I think about character. It was practised, not just preached.',
    name: 'Amina Yusuf',
    year: 'SS2',
  },
  {
    quote: 'I didn\'t realise how rigorous the academics were until I sat in a university lecture and found myself ahead.',
    name: 'Obinna Achebe',
    year: 'SS2',
  },
];

const PTA_PILLARS = [
  {
    title: 'Termly Briefings',
    body: 'Regular open forums between parents, class teachers, and the Principal — genuine strategic conversations, not just report days.',
  },
  {
    title: 'School Events',
    body: 'Parents are active at Sports Day, the Arts Festival, Founder\'s Day, and the annual retreat — part of school life, not its audience.',
  },
  {
    title: 'Parent Portal',
    body: 'A dedicated portal gives parents real-time access to attendance records, report cards, and announcements from any device.',
  },
];

const ALUMNI = [
  {
    name: 'Tosin Arinze',
    classYear: 'Class of 2012',
    career: 'Civil engineer shaping infrastructure projects across West Africa.',
    photo: 'https://images.unsplash.com/photo-1542178243-bc20204b769f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Nneka Okafor',
    classYear: 'Class of 2016',
    career: 'Product manager building edtech tools for secondary schools in Nigeria.',
    photo: 'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Femi Adewale',
    classYear: 'Class of 2008',
    career: 'General practitioner and founder of a community health clinic in Ogun State.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ngozi Okereke',
    classYear: 'Class of 2020',
    career: 'Law student and youth advocate focused on public policy reform.',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function photoFor(member: StaffMember): string {
  return STAFF_PHOTOS[member.id] ?? STAFF_PHOTOS['staff-001'];
}

function applyFilter(group: FilterGroup, query: string): StaffMember[] {
  const all = getAllStaff();
  const pool =
    group === 'All'
      ? all
      : all.filter((m) => FILTER_GROUPS[group].includes(m.department));

  const q = query.trim().toLowerCase();
  if (!q) return pool;

  return pool.filter((m) =>
    [m.name, m.title, m.department, m.bio, ...m.qualifications]
      .join(' ')
      .toLowerCase()
      .includes(q)
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function DeptBadge({ department }: { department: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-roboto font-medium uppercase tracking-widest ${
        DEPT_BADGE[department] ?? 'bg-gray-100 text-dark'
      }`}
    >
      {department}
    </span>
  );
}

function StaffCard({
  member,
  large = false,
  onClick,
}: {
  member: StaffMember;
  large?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group w-full text-left rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      <div className={`relative ${large ? 'aspect-4/3' : 'aspect-square'}`}>
        <Image
          src={photoFor(member)}
          alt={member.name}
          fill
          sizes={large ? '(min-width: 1024px) 33vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-deep/40 via-transparent to-transparent" />
      </div>
      <div className={large ? 'p-7' : 'p-5'}>
        <DeptBadge department={member.department} />
        <h3
          className={`mt-4 font-roboto font-bold text-dark ${large ? 'text-2xl' : 'text-lg'}`}
        >
          {member.name}
        </h3>
        <p className="mt-1.5 font-sans text-sm text-muted leading-snug">{member.title}</p>
      </div>
    </motion.button>
  );
}

function StaffDrawer({
  member,
  onClose,
}: {
  member: StaffMember;
  onClose: () => void;
}) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-dark/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <Dialog.Content
        forceMount
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-white shadow-2xl outline-none"
        onEscapeKeyDown={onClose}
        onPointerDownOutside={onClose}
      >
        <motion.div
          className="flex h-full flex-col"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="relative aspect-video w-full shrink-0 bg-offwhite">
            <Image
              src={photoFor(member)}
              alt={member.name}
              fill
              sizes="32rem"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-deep/30 via-transparent to-transparent" />
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close profile"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-dark shadow-sm transition-colors hover:bg-white hover:text-deep"
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 md:px-8 space-y-8">
            <div>
              <Dialog.Title className="font-roboto text-3xl font-black text-dark">
                {member.name}
              </Dialog.Title>
              <Dialog.Description className="mt-2 font-sans text-base text-muted">
                {member.title}
              </Dialog.Description>
              <div className="mt-4">
                <DeptBadge department={member.department} />
              </div>
            </div>

            <Divider color="#E6E3EE" />

            <section>
              <h3 className="font-roboto font-semibold text-dark mb-3">About</h3>
              <p className="font-sans text-base leading-relaxed text-dark/80">{member.bio}</p>
            </section>

            <section>
              <h3 className="font-roboto font-semibold text-dark mb-4">Qualifications</h3>
              <ul className="space-y-3">
                {member.qualifications.map((q) => (
                  <li key={q} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lemon">
                      <Check size={12} strokeWidth={3} className="text-dark" />
                    </span>
                    <span className="font-sans text-sm leading-relaxed text-dark/80">{q}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="rounded-2xl bg-offwhite p-5">
              <p className="font-roboto text-xs uppercase tracking-widest text-muted">
                Years at Whitesands
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className="font-roboto text-5xl font-black text-bold leading-none">
                  {member.yearsAtSchool}
                </span>
                <span className="pb-1 font-sans text-sm text-dark/60">years of service</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Dialog.Content>
    </>
  );
}

function VoiceCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % STUDENT_VOICES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const current = STUDENT_VOICES[idx];

  return (
    <div className="rounded-3xl bg-deep px-8 py-12 md:px-12">
      <SectionLabel label="STUDENT VOICES" light />
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mt-6 font-serif italic text-2xl md:text-3xl text-white leading-snug max-w-3xl"
        >
          &ldquo;{current.quote}&rdquo;
        </motion.blockquote>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div>
          <p className="font-roboto font-semibold text-white">{current.name}</p>
          <p className="font-sans text-sm text-white/60">{current.year}</p>
        </div>
        <div className="flex items-center gap-2">
          {STUDENT_VOICES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Go to quote ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === idx ? 'w-7 bg-lemon' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OurPeoplePage() {
  const [tab, setTab] = useState<TabValue>('staff');
  const [filter, setFilter] = useState<FilterGroup>('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<StaffMember | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const visible = useMemo(() => applyFilter(filter, query), [filter, query]);
  const leadership = visible.filter((m) => m.isLeadership);
  const teachers = visible.filter((m) => !m.isLeadership);

  function openDrawer(member: StaffMember) {
    setSelected(member);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <Dialog.Root open={drawerOpen} onOpenChange={(open) => { if (!open) closeDrawer(); }}>
      <Tabs.Root
        value={tab}
        onValueChange={(v) => {
          setTab(v as TabValue);
          closeDrawer();
        }}
      >
        {/* ── Hero ── */}
        <section className="bg-deep pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <AnimatedSection className="max-w-3xl space-y-6">
              <SectionLabel label="OUR PEOPLE" light />
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
                The people who make Whitesands,{' '}
                <span className="italic">Whitesands.</span>
              </h1>
              <p className="font-sans text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
                Leaders, teachers, students, parents, and alumni — each one part of a
                community that has been shaping lives since 1999.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ── Sticky tabs ── */}
        <div className="sticky top-25 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <Tabs.List className="flex gap-1 overflow-x-auto py-3">
              {(
                [
                  { value: 'staff', label: 'Staff' },
                  { value: 'students', label: 'Students' },
                  { value: 'parents', label: 'Parents' },
                  { value: 'alumni', label: 'Alumni' },
                ] as const
              ).map(({ value, label }) => (
                <Tabs.Trigger
                  key={value}
                  value={value}
                  className={`shrink-0 rounded-full px-5 py-2.5 font-roboto text-sm font-medium transition-colors duration-200 ${
                    tab === value
                      ? 'bg-deep text-white'
                      : 'text-muted hover:bg-deep/5 hover:text-deep'
                  }`}
                >
                  {label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════ */}
        {/* ── Staff tab ── */}
        {/* ══════════════════════════════════════════════════ */}
        <Tabs.Content value="staff" className="outline-none">
          <section className="bg-white py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 space-y-12">

              <div>
                <h2 className="font-serif text-4xl md:text-5xl text-dark">The staff directory</h2>
                <p className="mt-4 max-w-2xl font-sans text-lg text-muted leading-relaxed">
                  Search by name, title, or subject — or filter by group to find the right person.
                </p>
              </div>

              {/* Filter controls */}
              <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-offwhite p-4 sm:flex-row sm:items-end sm:p-5">
                <label className="flex-1">
                  <span className="mb-2 block font-roboto text-xs uppercase tracking-widest text-muted">
                    Search
                  </span>
                  <div className="relative">
                    <Search
                      size={16}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                    />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Name, title, or subject…"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 font-sans text-sm text-dark outline-none placeholder:text-muted/60 focus:border-deep transition-colors"
                    />
                  </div>
                </label>

                <label className="sm:w-52">
                  <span className="mb-2 block font-roboto text-xs uppercase tracking-widest text-muted">
                    Filter
                  </span>
                  <div className="relative">
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value as FilterGroup)}
                      className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-9 font-sans text-sm text-dark outline-none focus:border-deep transition-colors"
                    >
                      {(
                        ['All', 'Leadership', 'Teaching', 'Pastoral & Sport'] as FilterGroup[]
                      ).map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                    />
                  </div>
                </label>
              </div>

              {/* Leadership */}
              {leadership.length > 0 && (
                <div className="space-y-6">
                  <SectionLabel label="LEADERSHIP TEAM" />
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {leadership.map((m) => (
                      <StaffCard key={m.id} member={m} large onClick={() => openDrawer(m)} />
                    ))}
                  </div>
                </div>
              )}

              {/* Teaching & support staff */}
              {teachers.length > 0 ? (
                <div className="space-y-6">
                  <SectionLabel label="TEACHING & SUPPORT STAFF" />
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {teachers.map((m) => (
                      <StaffCard key={m.id} member={m} onClick={() => openDrawer(m)} />
                    ))}
                  </div>
                </div>
              ) : visible.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-offwhite p-10 text-center">
                  <p className="font-roboto font-bold text-dark">No staff match your search.</p>
                  <p className="mt-2 font-sans text-sm text-muted">
                    Try clearing the search or choosing a different filter.
                  </p>
                </div>
              ) : null}

            </div>
          </section>
        </Tabs.Content>

        {/* ══════════════════════════════════════════════════ */}
        {/* ── Students tab ── */}
        {/* ══════════════════════════════════════════════════ */}
        <Tabs.Content value="students" className="outline-none">

          {/* Student Council */}
          <section className="bg-offwhite py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 space-y-12">
              <AnimatedSection className="max-w-3xl space-y-4">
                <SectionLabel label="STUDENT LEADERSHIP" />
                <h2 className="font-serif text-4xl md:text-5xl text-dark leading-tight">
                  Students who model the culture we want to grow.
                </h2>
                <p className="font-sans text-lg text-muted leading-relaxed">
                  The Student Council bridges students and school leadership. They lead
                  assemblies, represent peers in decision-making, and shape the character of
                  daily school life.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {STUDENT_COUNCIL.map((s) => (
                  <motion.div
                    key={s.name}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
                  >
                    <div className="relative aspect-3/2">
                      <Image
                        src={s.photo}
                        alt={s.name}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-deep/40 to-transparent" />
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <span className="inline-flex items-center rounded-full bg-lemon px-3 py-1 text-xs font-roboto font-medium uppercase tracking-widest text-dark">
                          {s.year}
                        </span>
                        <h3 className="mt-3 font-roboto font-bold text-xl text-dark">{s.name}</h3>
                        <p className="mt-1 font-sans text-sm text-muted">{s.role}</p>
                      </div>
                      <blockquote className="border-l-2 border-deep pl-4 font-serif italic text-base text-dark/80 leading-snug">
                        &ldquo;{s.quote}&rdquo;
                      </blockquote>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* School Houses */}
          <section className="bg-white py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 space-y-10">
              <AnimatedSection className="max-w-3xl space-y-4">
                <SectionLabel label="SCHOOL HOUSES" />
                <h2 className="font-serif text-4xl text-dark leading-tight">
                  Four houses. One community.
                </h2>
                <p className="font-sans text-lg text-muted leading-relaxed">
                  Every Whitesands student joins a house from Year 7. Houses compete in
                  sports, arts, and academics — and they build the bonds that last longest.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {SCHOOL_HOUSES.map((house) => (
                  <motion.div
                    key={house.name}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className={`rounded-2xl p-7 ${house.colour} ${house.text} shadow-sm`}
                  >
                    <div className={`h-3 w-3 rounded-full ${house.dot} mb-5`} />
                    <h3 className="font-roboto font-bold text-xl">{house.name}</h3>
                    <p className="mt-1 font-sans text-xs uppercase tracking-widest opacity-60">
                      {house.patron}
                    </p>
                    <p className="mt-4 font-sans text-sm leading-relaxed opacity-80">
                      {house.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Student Voices */}
          <section className="bg-offwhite py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
              <VoiceCarousel />
            </div>
          </section>

        </Tabs.Content>

        {/* ══════════════════════════════════════════════════ */}
        {/* ── Parents tab ── */}
        {/* ══════════════════════════════════════════════════ */}
        <Tabs.Content value="parents" className="outline-none">
          <section className="bg-white py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 space-y-16">

              {/* Heading + PTA Chair */}
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
                <AnimatedSection className="space-y-6 max-w-xl">
                  <SectionLabel label="PARENTS PARTNERSHIP" />
                  <h2 className="font-serif text-4xl md:text-5xl text-dark leading-tight">
                    Parents remain central to the Whitesands experience.
                  </h2>
                  <p className="font-sans text-lg text-muted leading-relaxed">
                    Families help shape how students show up each day. Through the PTA, termly
                    briefings, and a shared commitment to formation, parents are active partners
                    in the school&rsquo;s mission — not its audience.
                  </p>
                  <p className="font-sans text-base text-dark/75 leading-relaxed">
                    Our parent community supports student wellbeing, enrichment events, and the
                    practical work of keeping school and home connected. That partnership is one
                    of the strongest reasons families stay with Whitesands for years.
                  </p>
                  <Button variant="secondary">Access Parent Portal →</Button>
                </AnimatedSection>

                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
                >
                  <div className="relative aspect-4/3">
                    <Image
                      src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80"
                      alt="Mrs. Aisha Balogun"
                      fill
                      sizes="380px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-deep/40 to-transparent" />
                  </div>
                  <div className="p-6">
                    <span className="inline-flex items-center rounded-full bg-lemon px-3 py-1 text-xs font-roboto font-medium uppercase tracking-widest text-dark">
                      PTA Chair
                    </span>
                    <h3 className="mt-3 font-roboto font-bold text-xl text-dark">Mrs. Aisha Balogun</h3>
                    <p className="mt-1 font-sans text-sm text-muted">Parents–Teachers Association</p>
                    <p className="mt-4 font-sans text-sm text-dark/75 leading-relaxed">
                      Mrs. Balogun coordinates parent engagement, champions family voices in school
                      decisions, and keeps the partnership between home and school open,
                      disciplined, and respectful.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* How parents engage */}
              <div>
                <SectionLabel label="HOW PARENTS ENGAGE" />
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                  {PTA_PILLARS.map((pillar) => (
                    <div
                      key={pillar.title}
                      className="rounded-2xl border border-gray-100 bg-offwhite p-7"
                    >
                      <div className="h-1 w-10 rounded-full bg-lemon mb-5" />
                      <h3 className="font-roboto font-bold text-lg text-dark">{pillar.title}</h3>
                      <p className="mt-3 font-sans text-sm text-muted leading-relaxed">
                        {pillar.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        </Tabs.Content>

        {/* ══════════════════════════════════════════════════ */}
        {/* ── Alumni tab ── */}
        {/* ══════════════════════════════════════════════════ */}
        <Tabs.Content value="alumni" className="outline-none">

          {/* Spotlight grid */}
          <section className="bg-offwhite py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 space-y-12">
              <AnimatedSection className="max-w-4xl space-y-4">
                <SectionLabel label="ALUMNI" />
                <h2 className="font-serif italic text-5xl md:text-6xl text-dark leading-tight">
                  Once a Whitesandian, always a Whitesandian.
                </h2>
                <p className="font-sans text-lg text-muted leading-relaxed">
                  Alumni return as mentors, guest speakers, and donors — living proof that
                  what begins at Whitesands carries on long after the final bell.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {ALUMNI.map((alumnus) => (
                  <motion.article
                    key={alumnus.name}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={alumnus.photo}
                        alt={alumnus.name}
                        fill
                        sizes="(min-width: 1280px) 25vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <span className="inline-flex items-center rounded-full bg-deep/10 px-3 py-1 text-xs font-roboto font-medium text-deep">
                        {alumnus.classYear}
                      </span>
                      <h3 className="mt-3 font-roboto font-bold text-lg text-dark">
                        {alumnus.name}
                      </h3>
                      <p className="mt-2 font-sans text-sm text-muted leading-relaxed">
                        {alumnus.career}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* Alumni CTA */}
          <section className="bg-deep py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="space-y-5 max-w-2xl">
                  <span className="inline-flex rounded-full border border-lemon/30 bg-white/5 px-4 py-1.5 font-roboto text-xs font-medium uppercase tracking-widest text-lemon">
                    Alumni Network
                  </span>
                  <h3 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                    Stay connected. Stay Whitesands.
                  </h3>
                  <p className="font-sans text-lg text-white/70 leading-relaxed">
                    Join the network for reunions, mentorship opportunities, and updates from the
                    school. The community you built here doesn&rsquo;t close when the gates do.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['Reunions', 'Mentorship', 'News & events', 'Giving back'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-roboto text-xs text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Button variant="primary" size="lg" className="shrink-0">
                  Register as an alumnus →
                </Button>
              </div>
            </div>
          </section>

        </Tabs.Content>
      </Tabs.Root>

      {/* Staff profile drawer portal */}
      <Dialog.Portal>
        <AnimatePresence onExitComplete={() => setSelected(null)}>
          {drawerOpen && selected ? (
            <StaffDrawer key={selected.id} member={selected} onClose={closeDrawer} />
          ) : null}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
