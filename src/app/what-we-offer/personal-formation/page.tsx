'use client';

import { motion } from 'framer-motion';
import { PageHero } from '@/components/sections/PageHero';
import { media } from '@/lib/media';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

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

const JOBS = [
  {
    title: 'Class Captain',
    body: 'Each class elects a captain who keeps the room ordered, leads opening and closing prayer, and represents the class at student leadership meetings.',
  },
  {
    title: 'Chapel Sacristan',
    body: 'A senior boy who prepares the chapel for daily Mass: vestments, lectionary, candles. Quiet, regular, and important.',
  },
  {
    title: 'House Prefect',
    body: 'Selected senior boys lead each house through the year, organising the inter-house competitions and looking out for the younger members.',
  },
  {
    title: 'Library and Lab Monitors',
    body: 'Boys keep their own learning spaces in order. The library and laboratories are run with their help, not in spite of them.',
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PersonalFormationPage() {
  return (
    <>
      <PageHero
        size="medium"
        image={media('/images/students/priest-preaching.JPG')}
        imageAlt="School chaplain during a service"
        overlay={0.6}
        eyebrow="Personal Formation"
        title={
          <>
            Forming the whole{' '}
            <span className="italic text-lemon">person.</span>
          </>
        }
        subtitle="Eleven virtues across the year. One mentor for each boy. Character shaped by daily life."
      />

      {/* INTRO */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
          <Eyebrow>The work of formation</Eyebrow>
          <h2 className="mt-5 font-serif text-deep" style={H2}>
            Formation is the work the rest of the day{' '}
            <span className="italic">protects.</span>
          </h2>
          <div className="mt-8 space-y-5 font-serif text-lg text-dark/85 leading-[1.65]">
            <p>
              A Whitesands boy is formed by what he does, who watches him do
              it, and what he is asked to think about while he does. The
              virtue of the month, the conversation with his advisor, the
              job he carries on the schedule. None of it is incidental.
            </p>
            <p>
              The school does not teach character as a separate subject.
              Character is the medium in which everything else happens.
            </p>
          </div>
        </div>
      </section>

      {/* VIRTUES GRID */}
      <section className="bg-offwhite py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl">
            <Eyebrow>Virtue of the month</Eyebrow>
            <h2 className="mt-5 font-serif text-deep" style={H2}>
              Eleven virtues. One{' '}
              <span className="italic">year.</span>
            </h2>
            <p className="mt-5 font-sans text-base text-dark/70 leading-relaxed">
              Each month of the academic year carries a virtue. The boys
              hear it in assembly, see it in their mentor conversations, and
              read it on the chapel notice board.
            </p>
          </div>

          <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {VIRTUES.map((v, i) => (
              <motion.li
                key={v.month}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <article className="h-full bg-white p-7 rounded-sm border-t-2 border-lemon">
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
      </section>

      {/* ADVISOR SYSTEM */}
      <section className="bg-white py-24 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <Eyebrow>The Advisor system</Eyebrow>
              <h2 className="mt-5 font-serif text-deep" style={H2}>
                One adult who knows your{' '}
                <span className="italic">son.</span>
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-5 font-serif text-lg text-dark/85 leading-[1.65]">
              <p>
                Every boy at Whitesands is assigned a personal advisor when
                he joins the school. The advisor stays with him through his
                years here, often through the full progression from JS1 to
                SS3.
              </p>
              <p>
                Once a fortnight the boy meets his advisor one-on-one.
                Twenty minutes, regular, deliberate. They talk about how
                school is going, what is hard, what virtues he is working
                on, what to read, what to pray about. The conversation is
                confidential.
              </p>
              <p>
                Twice a term the advisor meets with the boy&rsquo;s parents to
                share what he is seeing, hear what they are seeing, and
                close the loop between home and school.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JOBS */}
      <section className="bg-offwhite py-24 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl">
            <Eyebrow>Character through job assignments</Eyebrow>
            <h2 className="mt-5 font-serif text-deep" style={H2}>
              Boys are given things to{' '}
              <span className="italic">carry.</span>
            </h2>
            <p className="mt-5 font-sans text-base text-dark/70 leading-relaxed">
              Every boy holds a real responsibility in the running of the
              school. The jobs are rotated each term so that every boy is
              both led and asked to lead.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12">
            {JOBS.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h3 className="font-serif text-xl lg:text-2xl text-deep leading-snug">
                  {job.title}
                </h3>
                <p className="mt-3 font-sans text-base text-dark/75 leading-relaxed">
                  {job.body}
                </p>
              </motion.div>
            ))}
          </div>
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
