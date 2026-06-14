import { PageHero } from '@/components/sections/PageHero';
import { media } from '@/lib/media';
import { readContent } from '@/lib/content-store';
import type { VirtueOfMonth } from '@/types';
import { VirtueGrid, JobsGrid, type VirtueCard } from './grids';

// ---------------------------------------------------------------------------
// Virtue ordering — academic year (September first), then calendar tail.
// ---------------------------------------------------------------------------

const MONTH_ORDER = [
  'September',
  'October',
  'November',
  'December',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
];

function orderVirtues(virtues: VirtueOfMonth[]): VirtueCard[] {
  return [...virtues]
    .sort(
      (a, b) =>
        MONTH_ORDER.indexOf(a.month) - MONTH_ORDER.indexOf(b.month)
    )
    .map((v) => ({
      month: v.month,
      name: v.virtue,
      line: v.definition,
    }));
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function PersonalFormationPage() {
  const virtues = orderVirtues(await readContent<VirtueOfMonth[]>('virtue'));

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

          <VirtueGrid virtues={virtues} />
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

          <JobsGrid />
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
