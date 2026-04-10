'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection, SectionLabel, Button } from '@/components/ui';
import {
  Download,
  BookOpen,
  Microscope,
  MessageSquare,
  Globe,
  Cpu,
  Shield,
} from 'lucide-react';
import Link from 'next/link';

const TABS = ['Curriculum', 'School Timetable', 'Subject Offerings', 'Reading List'];

const FRAMEWORK = [
  {
    icon: BookOpen,
    label: 'Literacy & Numeracy',
    desc: 'The bedrock of every subject — we ensure every student reads with fluency and reasons with precision before they leave primary school.',
  },
  {
    icon: Microscope,
    label: 'STEM',
    desc: 'Science, Technology, Engineering, and Mathematics taught with rigour, imagination, and real-world application from JSS1 through SS3.',
  },
  {
    icon: MessageSquare,
    label: 'Communication',
    desc: 'Written, spoken, and digital expression across all disciplines and all year groups. Debate, essay-writing, and public speaking are built into the timetable.',
  },
  {
    icon: Globe,
    label: 'Global Citizenship',
    desc: 'History, Geography, and Social Studies situate every student within Nigeria and the wider world — and teach them why they have a responsibility to both.',
  },
  {
    icon: Cpu,
    label: 'Digital Literacy',
    desc: 'Coding, data fluency, and the ethical use of technology woven through the curriculum. Students graduate able to build, analyse, and think critically about the digital world.',
  },
  {
    icon: Shield,
    label: 'Character',
    desc: 'Moral formation is not separate from academic formation — at Whitesands they are the same endeavour. Our Catholic intellectual tradition insists that knowledge without virtue is incomplete.',
  },
];

const TIMETABLE = [
  { time: '7:50 – 8:00',  mon: 'Assembly',          tue: 'Assembly',          wed: 'Assembly',          thu: 'Assembly',          fri: 'Assembly' },
  { time: '8:00 – 8:45',  mon: 'English',            tue: 'Mathematics',       wed: 'Integrated Science',thu: 'English',            fri: 'Social Studies' },
  { time: '8:45 – 9:30',  mon: 'Mathematics',        tue: 'English',           wed: 'French',            thu: 'Social Studies',     fri: 'Physical Education' },
  { time: '9:30 – 10:15', mon: 'Integrated Science', tue: 'Yoruba',            wed: 'Mathematics',       thu: 'ICT',                fri: 'Visual Arts' },
  { time: '10:15 – 10:45',mon: 'Break',              tue: 'Break',             wed: 'Break',             thu: 'Break',              fri: 'Break' },
  { time: '10:45 – 11:30',mon: 'French',             tue: 'ICT',               wed: 'Religion & Ethics', thu: 'Integrated Science', fri: 'Music' },
  { time: '11:30 – 12:15',mon: 'Social Studies',     tue: 'Integrated Science',wed: 'Yoruba',            thu: 'Mathematics',        fri: 'English' },
  { time: '12:15 – 13:00',mon: 'Yoruba',             tue: 'Visual Arts',       wed: 'Physical Education',thu: 'Religion & Ethics',  fri: 'Mathematics' },
  { time: '13:00 – 14:00',mon: 'Lunch',              tue: 'Lunch',             wed: 'Lunch',             thu: 'Lunch',              fri: 'Lunch' },
  { time: '14:00 – 14:45',mon: 'Religion & Ethics',  tue: 'French',            wed: 'English',           thu: 'French',             fri: 'Integrated Science' },
];

const SUBJECTS = [
  {
    stage: 'Primary School',
    color: 'bg-deep',
    subjects: [
      'English Language', 'Mathematics', 'Basic Science', 'Social Studies',
      'Yoruba Language', 'French', 'ICT', 'Physical Education',
      'Religion & Ethics', 'Creative Arts',
    ],
  },
  {
    stage: 'Junior Secondary',
    color: 'bg-bold',
    subjects: [
      'English Language', 'Mathematics', 'Integrated Science', 'Social Studies',
      'Yoruba Language', 'French', 'ICT', 'Physical Education',
      'Religion & Ethics', 'Visual Arts', 'Music',
    ],
  },
  {
    stage: 'Senior Secondary',
    color: 'bg-deep',
    subjects: [
      'English Language', 'Mathematics', 'Literature in English', 'Economics',
      'Government', 'Biology', 'Chemistry', 'Physics',
      'History', 'Geography', 'French', 'ICT', 'Visual Arts',
    ],
  },
];

const BOOKS: Record<string, { title: string; author: string }[]> = {
  'Primary School': [
    { title: 'Things Fall Apart', author: 'Chinua Achebe' },
    { title: 'The Boy Who Harnessed the Wind', author: 'William Kamkwamba & Bryan Mealer' },
    { title: 'A Child of the Nile', author: 'Noni Lichuma' },
    { title: 'Animal Farm', author: 'George Orwell' },
  ],
  'Junior Secondary': [
    { title: 'Half of a Yellow Sun', author: 'Chimamanda Ngozi Adichie' },
    { title: 'The Joys of Motherhood', author: 'Buchi Emecheta' },
    { title: 'Arrow of God', author: 'Chinua Achebe' },
    { title: 'A Man of the People', author: 'Chinua Achebe' },
  ],
  'Senior Secondary': [
    { title: 'Purple Hibiscus', author: 'Chimamanda Ngozi Adichie' },
    { title: "One Day in the Life of Ivan Denisovich", author: 'Aleksandr Solzhenitsyn' },
    { title: 'The Complete Works of Shakespeare', author: 'William Shakespeare' },
    { title: 'Weep Not, Child', author: 'Ngũgĩ wa Thiong\'o' },
  ],
};

export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="pt-25">
      {/* Hero */}
      <section className="bg-deep py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <SectionLabel label="What We Offer" light className="mb-6" />
              <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
                Academics
              </h1>
              <p className="font-sans text-white/80 text-lg leading-relaxed">
                We teach to the Nigerian National Curriculum and WAEC syllabus, rooted in critical
                thinking and Catholic values. Our aim is not merely examination passes — it is the
                formation of minds that love to learn. Our most recent WAEC cohort achieved a{' '}
                <strong className="text-lemon">89% pass rate at grades A1–C4</strong> across all
                subjects.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-lemon py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '89%', label: 'WAEC Pass Rate' },
              { stat: '24', label: 'Subjects Offered' },
              { stat: '15:1', label: 'Student–Teacher Ratio' },
              { stat: '100%', label: 'University Placement' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <p className="font-roboto font-black text-4xl text-deep">{item.stat}</p>
                <p className="font-sans text-sm text-dark/70 mt-2">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky tabs */}
      <div className="sticky top-25 z-30 bg-white border-b border-deep/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex overflow-x-auto">
          {TABS.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={[
                'shrink-0 px-5 py-4 font-roboto font-medium text-sm whitespace-nowrap border-b-2 transition-colors duration-200',
                activeTab === idx
                  ? 'text-deep border-lemon'
                  : 'text-muted border-transparent hover:text-deep',
              ].join(' ')}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="py-20">
        <AnimatePresence mode="wait">

          {/* ── Curriculum ── */}
          {activeTab === 0 && (
            <motion.div
              key="curriculum"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="max-w-7xl mx-auto px-6 md:px-8">
                <AnimatedSection className="mb-16">
                  <SectionLabel label="Our Curriculum" className="mb-4" />
                  <h2 className="font-serif text-5xl font-bold text-dark mt-2 max-w-2xl">
                    Deep Learning, Not Surface Coverage
                  </h2>
                </AnimatedSection>

                <AnimatedSection>
                  <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div>
                      <p className="font-sans text-lg text-dark leading-relaxed mb-6">
                        We integrate the best of Nigerian and international pedagogy. Every lesson is
                        designed to build genuine understanding, not rote recall. Students at
                        Whitesands are taught to question, connect, and apply — not merely to remember.
                      </p>
                      <p className="font-sans text-base text-muted leading-relaxed mb-6">
                        Our curriculum is project-based and interdisciplinary. Literature connects to
                        History; Science connects to Environmental Ethics; Mathematics connects to
                        Economics. Students come to see knowledge not as isolated subjects, but as
                        facets of a single, coherent reality.
                      </p>
                      <p className="font-sans text-base text-muted leading-relaxed">
                        Assessment is continuous and formative. Teachers provide feedback that moves
                        learning forward — not just marks that label progress. Every student receives
                        detailed written feedback at each assessment point.
                      </p>
                    </div>
                    <div>
                      <p className="font-sans text-base text-muted leading-relaxed mb-6">
                        Catholic Social Teaching is woven through the curriculum at every level. In
                        Economics, students examine questions of justice and redistribution. In History,
                        they encounter human dignity and its violations. In Science, they reflect on
                        stewardship of creation. Learning at Whitesands always has a moral dimension.
                      </p>
                      <blockquote className="border-l-4 border-lemon bg-lemon/10 py-4 pl-8 pr-4">
                        <p className="font-serif italic text-xl text-deep leading-snug">
                          "We teach students not what to think, but how to think — and why it matters."
                        </p>
                        <cite className="block mt-3 font-roboto text-xs uppercase tracking-widest text-muted not-italic">
                          — Head of Academics, Whitesands School
                        </cite>
                      </blockquote>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Framework */}
              <div className="bg-offwhite py-16">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <AnimatedSection className="mb-10">
                    <SectionLabel label="Our Framework" className="mb-4" />
                    <h3 className="font-serif text-4xl font-bold text-dark mt-2">
                      Six Dimensions of Learning
                    </h3>
                  </AnimatedSection>
                  <AnimatedSection>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {FRAMEWORK.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={idx}
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="bg-white p-6 rounded-sm shadow-sm border border-deep/5 border-t-4 border-t-white hover:border-t-lemon hover:shadow-md transition-shadow duration-200"
                          >
                            <div className="w-10 h-10 rounded-full bg-deep/10 flex items-center justify-center mb-4">
                              <Icon size={20} className="text-deep" />
                            </div>
                            <h4 className="font-roboto font-bold text-dark mb-2">{item.label}</h4>
                            <p className="font-sans text-sm text-muted leading-relaxed">{item.desc}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Timetable ── */}
          {activeTab === 1 && (
            <motion.div
              key="timetable"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="max-w-7xl mx-auto px-6 md:px-8">
                <AnimatedSection>
                  <SectionLabel label="School Timetable" className="mb-4" />
                  <h2 className="font-serif text-5xl font-bold text-dark mt-2 mb-3">
                    A Structured, Purposeful Day
                  </h2>
                  <p className="font-sans text-muted text-base mb-10 max-w-2xl">
                    Sample JSS1 timetable. Full schedules vary by class and term. Download links below.
                  </p>

                  <div className="overflow-x-auto rounded-sm shadow-sm border border-deep/10">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-deep text-white">
                          <th className="px-5 py-3 text-left font-roboto font-bold whitespace-nowrap">Time</th>
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((d) => (
                            <th key={d} className="px-5 py-3 text-left font-roboto font-bold">{d}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {TIMETABLE.map((row, idx) => {
                          const isBreak = row.mon === 'Break' || row.mon === 'Lunch';
                          return (
                            <tr
                              key={idx}
                              className={[
                                idx % 2 === 0 ? 'bg-white' : 'bg-offwhite',
                                isBreak ? 'opacity-60' : '',
                              ].join(' ')}
                            >
                              <td className="px-5 py-3 font-roboto font-semibold text-deep whitespace-nowrap">
                                {row.time}
                              </td>
                              {[row.mon, row.tue, row.wed, row.thu, row.fri].map((cell, ci) => (
                                <td key={ci} className={`px-5 py-3 font-sans text-dark ${isBreak ? 'italic' : ''}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    <Button variant="primary" rightIcon={<Download size={16} />}>
                      Download Full Timetable
                    </Button>
                    <Button variant="outline" rightIcon={<Download size={16} />}>
                      Download School Calendar
                    </Button>
                  </div>
                </AnimatedSection>
              </div>
            </motion.div>
          )}

          {/* ── Subjects ── */}
          {activeTab === 2 && (
            <motion.div
              key="subjects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="max-w-7xl mx-auto px-6 md:px-8">
                <AnimatedSection>
                  <SectionLabel label="Subject Offerings" className="mb-4" />
                  <h2 className="font-serif text-5xl font-bold text-dark mt-2 mb-10">
                    24 Subjects Across All Stages
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {SUBJECTS.map((group, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="rounded-sm overflow-hidden shadow-sm"
                      >
                        <div className={`${group.color} px-6 py-4`}>
                          <p className="font-roboto font-black text-white text-lg">{group.stage}</p>
                        </div>
                        <div className="bg-white border border-deep/10 border-t-0 px-6 py-5">
                          <ul className="space-y-2">
                            {group.subjects.map((s, si) => (
                              <li key={si} className="flex items-center gap-3 font-sans text-sm text-dark">
                                <span className="w-1.5 h-1.5 rounded-full bg-lemon shrink-0" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            </motion.div>
          )}

          {/* ── Reading List ── */}
          {activeTab === 3 && (
            <motion.div
              key="reading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="max-w-7xl mx-auto px-6 md:px-8">
                <AnimatedSection>
                  <SectionLabel label="Reading List" className="mb-4" />
                  <h2 className="font-serif text-5xl font-bold text-dark mt-2 mb-4">
                    Recommended Reading
                  </h2>
                  <p className="font-sans text-muted text-base mb-12 max-w-2xl">
                    We curate titles that balance African literature, world classics, and contemporary
                    voices — books that challenge, inspire, and form the imagination.
                  </p>
                  <div className="grid md:grid-cols-3 gap-10">
                    {Object.entries(BOOKS).map(([level, bookList], lidx) => (
                      <motion.div
                        key={level}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: lidx * 0.1 }}
                      >
                        <h3 className="font-roboto font-black text-xl text-deep mb-6 pb-3 border-b-2 border-lemon">
                          {level}
                        </h3>
                        <div className="space-y-4">
                          {bookList.map((book, bidx) => (
                            <div
                              key={bidx}
                              className="flex items-start gap-3 pb-4 border-b border-deep/10 last:border-b-0"
                            >
                              <span className="font-roboto font-black text-lemon text-lg leading-none mt-0.5 shrink-0">
                                {bidx + 1}
                              </span>
                              <div>
                                <p className="font-roboto font-semibold text-dark text-sm">{book.title}</p>
                                <p className="font-sans text-muted text-xs mt-0.5">{book.author}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <section className="bg-deep py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="font-serif italic text-3xl text-white mb-8 leading-snug">
              "The goal of a Whitesands education is not the transmission of information,
              but the transformation of the person."
            </p>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 font-roboto font-medium text-lemon border-b border-lemon/50 pb-0.5 hover:border-lemon transition-colors duration-200"
            >
              Apply for Admission →
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
