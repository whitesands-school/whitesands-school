'use client';

import { motion } from 'framer-motion';
import { PageHero } from '@/components/sections/PageHero';
import { media } from '@/lib/media';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const QUALIFICATIONS = [
  {
    code: 'BECE',
    name: 'Basic Education Certificate Examination',
    note: 'Sat at the end of Junior Secondary (JS3). The national gateway between junior and senior school.',
  },
  {
    code: 'SSCE',
    name: 'Senior School Certificate Examination',
    note: 'The WAEC and NECO papers sat in Senior Secondary (SS3). The standard Nigerian school-leaving qualification.',
  },
  {
    code: 'IGCSE',
    name: 'International General Certificate of Secondary Education',
    note: 'The Cambridge qualification sat alongside SSCE. Recognised globally and required by many international universities.',
  },
  {
    code: 'GCE',
    name: 'General Certificate of Education',
    note: 'The West African GCE papers sat by senior boys preparing for university entry in Nigeria and abroad.',
  },
  {
    code: 'SAT',
    name: 'Scholastic Assessment Test',
    note: 'Prepared for and sat at the school for boys applying to universities in the United States.',
  },
];

const JUNIOR_SUBJECTS = [
  'English Language',
  'Mathematics',
  'Basic Science',
  'Basic Technology',
  'Computer Studies',
  'French',
  'Christian Religious Studies',
  'Civic Education',
  'Social Studies',
  'Yoruba',
  'Physical & Health Education',
  'Music',
  'Creative Arts',
  'Cultural & Creative Arts',
  'Business Studies',
  'Agricultural Science',
];

const SENIOR_SUBJECTS = [
  'English Language',
  'Mathematics',
  'Further Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Geography',
  'Economics',
  'Government',
  'Literature in English',
  'History',
  'Christian Religious Studies',
  'Computer Studies',
  'French',
  'Accounting',
  'Commerce',
  'Agricultural Science',
  'Technical Drawing',
  'Visual Arts',
  'Music',
];

const TIMETABLE = [
  { label: 'Term length', value: 'Three terms a year' },
  { label: 'School day', value: 'Monday to Friday, 7:30am to 3:30pm' },
  { label: 'Clubs and prep', value: 'After school until 5:30pm' },
  { label: 'Mass', value: 'Weekly, with the whole school' },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        size="medium"
        image={media('/images/students/students-in-computer-lab.JPG')}
        imageAlt="Students working in the Whitesands computer lab"
        overlay={0.6}
        eyebrow="Academics"
        title={
          <>
            The work of the{' '}
            <span className="italic text-lemon">classroom.</span>
          </>
        }
        subtitle="A Nigerian curriculum taught with rigour, taken further by international qualifications."
      />

      {/* INTRO */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
          <Eyebrow>The approach</Eyebrow>
          <h2
            className="mt-5 font-serif text-deep"
            style={H2}
          >
            We teach the boys to think for{' '}
            <span className="italic">themselves.</span>
          </h2>
          <div className="mt-8 space-y-5 font-serif text-lg text-dark/85 leading-[1.65]">
            <p>
              The classroom at Whitesands is not a place to memorise. It is a
              place to argue, to question, to test ideas, and to be tested.
              The boys are expected to do the work, and the staff are
              expected to make that work matter.
            </p>
            <p>
              We follow the Nigerian National Curriculum across all year
              groups. From SS1 onward we add Cambridge IGCSE papers for the
              boys who will sit them, and we prepare interested seniors for
              GCE and SAT in parallel. The same teachers carry the boys
              through both.
            </p>
          </div>
        </div>
      </section>

      {/* CURRICULUM / QUALIFICATIONS */}
      <section className="bg-offwhite py-24 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl">
            <Eyebrow>The curriculum</Eyebrow>
            <h2 className="mt-5 font-serif text-deep" style={H2}>
              Five qualifications. One{' '}
              <span className="italic">syllabus.</span>
            </h2>
            <p className="mt-5 font-sans text-base text-dark/70 leading-relaxed">
              The core programme is the Nigerian National Curriculum. The
              international papers are added on top for the boys who will use
              them.
            </p>
          </div>

          <ul className="mt-14">
            {QUALIFICATIONS.map((q, i) => (
              <motion.li
                key={q.code}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid grid-cols-12 gap-x-6 sm:gap-x-10 lg:gap-x-12 gap-y-3 py-8 lg:py-10 border-t border-deep/15 first:border-t-0 first:pt-0"
              >
                <div className="col-span-3 sm:col-span-2">
                  <p
                    className="font-roboto text-xs uppercase text-deep"
                    style={{ letterSpacing: '0.28em' }}
                  >
                    {q.code}
                  </p>
                </div>
                <div className="col-span-9 sm:col-span-5 lg:col-span-4">
                  <h3 className="font-serif text-lg lg:text-xl text-deep leading-snug">
                    {q.name}
                  </h3>
                </div>
                <p className="col-span-12 sm:col-start-3 sm:col-span-7 lg:col-start-7 lg:col-span-6 font-sans text-base text-dark/70 leading-relaxed">
                  {q.note}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* SUBJECTS OFFERED */}
      <section className="bg-white py-24 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl">
            <Eyebrow>Subjects offered</Eyebrow>
            <h2 className="mt-5 font-serif text-deep" style={H2}>
              From basic science to{' '}
              <span className="italic">further maths.</span>
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <SubjectColumn
              label="Junior School (JS1 – JS3)"
              subjects={JUNIOR_SUBJECTS}
            />
            <SubjectColumn
              label="Senior School (SS1 – SS3)"
              subjects={SENIOR_SUBJECTS}
            />
          </div>

          {/* Philosophical Anthropology callout */}
          <div className="mt-16 border-l-2 border-lemon pl-6 py-2 max-w-3xl">
            <p
              className="font-roboto text-xs uppercase text-deep"
              style={{ letterSpacing: '0.28em' }}
            >
              Senior elective
            </p>
            <h3 className="mt-3 font-serif text-2xl text-deep leading-snug">
              Philosophical Anthropology.
            </h3>
            <p className="mt-3 font-sans text-base text-dark/75 leading-relaxed">
              A senior elective on the nature of the human person, drawing on
              the Catholic intellectual tradition. The course gives the boys
              a vocabulary for the formation they have already been living
              through, and a serious framework for the questions that will
              meet them at university.
            </p>
          </div>
        </div>
      </section>

      {/* TIMETABLE & CALENDAR */}
      <section className="bg-offwhite py-24 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <Eyebrow>Timetable and calendar</Eyebrow>
              <h2 className="mt-5 font-serif text-deep" style={H2}>
                A day, a term, a{' '}
                <span className="italic">year.</span>
              </h2>
              <p className="mt-5 font-sans text-base text-dark/70 leading-relaxed">
                The rhythm of the year is steady on purpose. Boys, parents,
                and staff know what to expect, and when.
              </p>
            </div>

            <dl className="lg:col-span-7 divide-y divide-deep/15 border-y border-deep/15">
              {TIMETABLE.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-12 gap-6 py-5"
                >
                  <dt
                    className="col-span-5 font-roboto text-[11px] uppercase text-muted self-center"
                    style={{ letterSpacing: '0.22em' }}
                  >
                    {row.label}
                  </dt>
                  <dd className="col-span-7 font-serif text-lg text-deep">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const H2: React.CSSProperties = {
  fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
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

function SubjectColumn({
  label,
  subjects,
}: {
  label: string;
  subjects: string[];
}) {
  return (
    <div>
      <p
        className="font-roboto text-xs uppercase text-deep"
        style={{ letterSpacing: '0.28em' }}
      >
        {label}
      </p>
      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
        {subjects.map((s) => (
          <li
            key={s}
            className="font-serif text-base text-dark/85 leading-snug border-b border-deep/10 pb-2"
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
