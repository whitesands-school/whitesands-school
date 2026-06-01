'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Compass, Cross, Users } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { media } from '@/lib/media';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const APPLICATIONS_URL = 'https://applications.whitesands.org.ng/';
const APPLICATION_CLOSE_DATE = '9 May 2026';

const FIT_BULLETS = [
  {
    icon: Users,
    title: 'Parents who believe they are the first educators',
    body: 'We work in partnership with families. Mentoring conversations, regular tutorials, and a shared formation programme keep the school and the home pulling in the same direction.',
  },
  {
    icon: Cross,
    title: 'Families who want Christian values actively pursued at school',
    body: 'Daily prayer, weekly Mass, and a serious formation in virtue are not extras here — they sit at the centre of the school day, woven into how we teach and how the boys are mentored.',
  },
  {
    icon: Compass,
    title: 'Boys ready to launch into the deep',
    body: 'Whitesands is for boys who are willing to be stretched — academically, personally and spiritually — and for families who want them to grow into men of conviction.',
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Start Online Submission',
    body: 'Begin the application at applications.whitesands.org.ng. Fill in the candidate and family details.',
  },
  {
    n: '02',
    title: 'Application Fee',
    body: 'Pay the non-refundable application fee to confirm your submission.',
  },
  {
    n: '03',
    title: 'Examination',
    body: 'Your son sits the Whitesands entrance examination on the scheduled date.',
  },
  {
    n: '04',
    title: 'Further Testing',
    body: 'Shortlisted candidates may be invited for additional subject-specific assessments.',
  },
  {
    n: '05',
    title: 'Interviewing',
    body: 'Parents and candidate meet with the admissions team and a member of the leadership.',
  },
  {
    n: '06',
    title: 'Levy Payment',
    body: 'On offer, the development levy secures your son’s place for the new academic year.',
  },
  {
    n: '07',
    title: 'Family Participation',
    body: 'Parents complete the family formation sessions before the school year begins.',
  },
  {
    n: '08',
    title: 'School Fees',
    body: 'First-term school fees are due before the start of the academic session.',
  },
];

const SCHEDULE = [
  { category: 'JS1', opens: '1 October 2025', exam: '9 May 2026' },
  { category: 'Transfer', opens: '1 October 2025', exam: '9 May 2026' },
];

const SON_CLASSES = [
  'Primary 4',
  'Primary 5',
  'Primary 6',
  'JS1',
  'JS2',
  'JS3',
  'SS1',
];

// ---------------------------------------------------------------------------
// Form schema (mirrors /api/visit-inquiry's server schema)
// ---------------------------------------------------------------------------

const VisitFormSchema = z.object({
  parentName: z.string().min(2, 'Please enter your full name'),
  email: z.email('Please enter a valid email'),
  phone: z
    .string()
    .min(7, 'Phone number is required')
    .regex(/^\+?[\d\s()-]+$/, 'Use digits only, e.g. +234 802 000 0000'),
  sonClass: z.string().min(1, 'Please select a class'),
  preferredWeek: z.string().min(1, 'Please pick a week'),
  message: z.string().max(2000).optional(),
});

type VisitFormValues = z.infer<typeof VisitFormSchema>;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AdmissionsPage() {
  return (
    <>
      {/* 1 ── PAGE HERO ─────────────────────────────────────── */}
      <PageHero
        size="tall"
        image={media('/images/students/graduands-walking.jpg')}
        imageAlt="Whitesands graduands walking in procession"
        overlay={0.6}
        eyebrow="Admissions"
        title={<>Apply to <span className="italic text-lemon">Whitesands.</span></>}
        subtitle={`Open for 2026/2027. Applications close ${APPLICATION_CLOSE_DATE}. Limited slots.`}
        ctas={
          <Link
            href="#visit"
            className="inline-flex items-center justify-center bg-lemon text-deep font-roboto uppercase text-sm px-8 py-3.5 hover:bg-white transition-colors"
            style={{ letterSpacing: '0.18em' }}
          >
            Book a Visit
          </Link>
        }
      />

      {/* 3 ── WHO WHITESANDS IS FOR ─────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12">
          <p
            className="font-roboto text-xs uppercase text-deep"
            style={{ letterSpacing: '0.28em' }}
          >
            Before you apply
          </p>
          <h2
            className="mt-5 font-serif text-deep"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
            }}
          >
            Whitesands is the right fit for a particular kind of{' '}
            <span className="italic">family.</span>
          </h2>

          <ul className="mt-14 flex flex-col gap-10">
            {FIT_BULLETS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-5 sm:gap-7">
                <span
                  aria-hidden
                  className="shrink-0 mt-1 w-11 h-11 rounded-sm bg-deep/[0.06] flex items-center justify-center"
                >
                  <Icon className="w-5 h-5 text-deep" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-serif text-xl lg:text-2xl text-deep leading-snug">
                    {title}
                  </h3>
                  <p className="mt-3 font-sans text-base text-dark/75 leading-relaxed">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 ── ADMISSION PROCESS ─────────────────────────────── */}
      <section className="bg-offwhite py-28 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 lg:mb-20">
            <div className="lg:col-span-7">
              <p
                className="font-roboto text-xs uppercase text-deep"
                style={{ letterSpacing: '0.28em' }}
              >
                How it works
              </p>
              <h2
                className="mt-5 font-serif text-deep"
                style={{
                  fontSize: 'clamp(2rem, 4.4vw, 3.25rem)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                }}
              >
                Eight steps from interest to{' '}
                <span className="italic">first day.</span>
              </h2>
            </div>
            <p className="lg:col-span-5 font-sans text-base text-dark/65 leading-relaxed lg:max-w-sm lg:ml-auto">
              The process is deliberate. We are looking for boys and families
              who are a real fit for the school — and we want you to find that
              out about us too.
            </p>
          </div>

          {/* Steps — editorial rows with massive numerals */}
          <ol>
            {STEPS.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group grid grid-cols-12 gap-x-6 sm:gap-x-10 lg:gap-x-16 gap-y-3 py-10 lg:py-12 border-t border-deep/15 first:border-t-0 first:pt-0 last:pb-0"
              >
                {/* Massive serif numeral */}
                <div className="col-span-3 sm:col-span-2">
                  <span
                    aria-hidden
                    className="block font-serif text-deep tabular-nums leading-none transition-colors duration-300 group-hover:text-bold"
                    style={{
                      fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {step.n}
                  </span>
                </div>

                {/* Title + body */}
                <div className="col-span-9 sm:col-span-7 lg:col-span-6">
                  <h3
                    className="font-serif text-deep leading-tight"
                    style={{
                      fontSize: 'clamp(1.375rem, 1.8vw, 1.75rem)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {step.title}
                  </h3>
                </div>
                <div className="col-span-12 sm:col-start-3 sm:col-span-7 lg:col-start-9 lg:col-span-4">
                  <p className="font-sans text-base text-dark/70 leading-relaxed lg:mt-1">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 ── WHEN TO APPLY ─────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12">
          <p
            className="font-roboto text-xs uppercase text-deep"
            style={{ letterSpacing: '0.28em' }}
          >
            When to apply
          </p>
          <h2
            className="mt-5 font-serif text-deep"
            style={{
              fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
            }}
          >
            Key dates for 2026/2027.
          </h2>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-deep/15">
                  {['Category', 'Applications Open', 'Exam Date'].map((h) => (
                    <th
                      key={h}
                      className="py-4 pr-6 font-roboto text-[11px] uppercase text-muted"
                      style={{ letterSpacing: '0.22em' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((row) => (
                  <tr key={row.category} className="border-b border-deep/10">
                    <td className="py-5 pr-6 font-serif text-lg text-deep">
                      {row.category}
                    </td>
                    <td className="py-5 pr-6 font-sans text-base text-dark/80">
                      {row.opens}
                    </td>
                    <td className="py-5 pr-6 font-sans text-base text-dark/80">
                      {row.exam}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p
            className="mt-5 font-roboto text-[11px] uppercase text-muted"
            style={{ letterSpacing: '0.22em' }}
          >
            Admission is on a first-come, first-served basis.
          </p>
        </div>
      </section>

      {/* 6 ── VISIT FORM ────────────────────────────────────── */}
      <VisitSection />

      {/* 7 ── FINAL APPLY NOW CTA ───────────────────────────── */}
      <section className="bg-white py-20 border-t border-deep/10">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
          <p
            className="font-roboto text-xs uppercase text-deep"
            style={{ letterSpacing: '0.28em' }}
          >
            Ready
          </p>
          <h2
            className="mt-5 font-serif text-deep"
            style={{
              fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Begin your application{' '}
            <span className="italic">today.</span>
          </h2>
          <a
            href={APPLICATIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center bg-deep text-white font-roboto uppercase text-sm px-10 py-4 hover:bg-bold transition-colors"
            style={{ letterSpacing: '0.2em' }}
          >
            Apply Now
          </a>
          <p className="mt-4 font-sans text-sm text-muted break-all">
            applications.whitesands.org.ng
          </p>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Visit section — id="visit" anchor target for BookVisitTab and the hero CTA.
// ---------------------------------------------------------------------------

function VisitSection() {
  return (
    <section
      id="visit"
      className="bg-deep py-32 scroll-mt-28"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="text-center">
          <p
            className="font-roboto text-xs uppercase text-lemon"
            style={{ letterSpacing: '0.28em' }}
          >
            Book a visit
          </p>
          <h2
            className="mt-5 font-serif text-offwhite"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
            }}
          >
            Book a parent{' '}
            <span className="italic">visit.</span>
          </h2>
          <p className="mt-5 font-sans text-base sm:text-lg text-offwhite/75 leading-relaxed max-w-xl mx-auto">
            Pick a week, we will reach out within 48 hours to confirm a date.
          </p>
        </div>

        <div className="mt-12">
          <VisitForm />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Visit form — react-hook-form + zod, POST to /api/visit-inquiry
// ---------------------------------------------------------------------------

function VisitForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<VisitFormValues>({
    resolver: zodResolver(VisitFormSchema),
    defaultValues: {
      parentName: '',
      email: '',
      phone: '',
      sonClass: '',
      preferredWeek: '',
      message: '',
    },
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Weeks are computed client-side to avoid SSR/CSR date mismatch. The select
  // is rendered with a placeholder option until weeks populate.
  const weekOptions = useNextWeeks(4);

  async function onSubmit(values: VisitFormValues) {
    setServerError(null);
    try {
      const res = await fetch('/api/visit-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? 'Something went wrong. Please try again.');
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Network error');
    }
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="thanks"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/5 border border-white/15 rounded-md p-10 text-center"
        >
          <CheckCircle
            className="mx-auto w-10 h-10 text-lemon"
            strokeWidth={1.25}
          />
          <h3 className="mt-5 font-serif text-2xl text-offwhite">
            Thank you — request received.
          </h3>
          <p className="mt-3 font-sans text-base text-offwhite/75 max-w-md mx-auto">
            Admissions will reach out within 48 hours to confirm a date for your
            visit.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="bg-white/4 border border-white/10 rounded-md p-6 sm:p-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field
              label="Parent name"
              error={errors.parentName?.message}
              input={
                <input
                  type="text"
                  autoComplete="name"
                  {...register('parentName')}
                  className={inputClass}
                />
              }
            />
            <Field
              label="Email"
              error={errors.email?.message}
              input={
                <input
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className={inputClass}
                />
              }
            />
            <Field
              label="Phone (+234 …)"
              error={errors.phone?.message}
              input={
                <input
                  type="tel"
                  autoComplete="tel"
                  placeholder="+234 802 000 0000"
                  {...register('phone')}
                  className={inputClass}
                />
              }
            />
            <Field
              label="Son's current class"
              error={errors.sonClass?.message}
              input={
                <select {...register('sonClass')} className={inputClass}>
                  <option value="">Select…</option>
                  {SON_CLASSES.map((c) => (
                    <option key={c} value={c} className="text-dark">
                      {c}
                    </option>
                  ))}
                </select>
              }
            />
            <div className="sm:col-span-2">
              <Field
                label="Preferred week"
                error={errors.preferredWeek?.message}
                input={
                  <select
                    {...register('preferredWeek')}
                    className={inputClass}
                  >
                    <option value="">Select…</option>
                    {weekOptions.map((w) => (
                      <option key={w} value={w} className="text-dark">
                        {w}
                      </option>
                    ))}
                  </select>
                }
              />
            </div>
            <div className="sm:col-span-2">
              <Field
                label="A short message (optional)"
                error={errors.message?.message}
                input={
                  <textarea
                    rows={3}
                    {...register('message')}
                    className={`${inputClass} resize-none`}
                  />
                }
              />
            </div>
          </div>

          {serverError && (
            <p className="mt-6 font-sans text-sm text-bold">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full sm:w-auto inline-flex items-center justify-center bg-lemon text-deep font-roboto uppercase text-sm px-10 py-4 hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ letterSpacing: '0.18em' }}
          >
            {isSubmitting ? 'Sending…' : 'Request my visit'}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const inputClass =
  'w-full bg-transparent border-b border-white/20 focus:border-lemon focus:outline-none py-2.5 font-sans text-base text-offwhite placeholder:text-offwhite/40 transition-colors';

function Field({
  label,
  input,
  error,
}: {
  label: string;
  input: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="font-roboto text-[11px] uppercase text-lemon/80"
        style={{ letterSpacing: '0.22em' }}
      >
        {label}
      </span>
      {input}
      {error && (
        <span className="font-sans text-xs text-bold mt-1">{error}</span>
      )}
    </label>
  );
}

/**
 * Returns labels for the next N Mondays as strings like "Week of 26 May 2026".
 * Empty on first render (server) and populates after mount to avoid SSR
 * hydration mismatch from Date().
 */
function useNextWeeks(count: number): string[] {
  const [weeks, setWeeks] = useState<string[]>([]);
  useEffect(() => {
    setWeeks(computeNextMondays(count));
  }, [count]);
  return useMemo(() => weeks, [weeks]);
}

function computeNextMondays(count: number): string[] {
  const out: string[] = [];
  const now = new Date();
  const day = now.getDay(); // 0 Sun … 6 Sat
  const daysUntilMonday = ((8 - day) % 7) || 7;
  const firstMonday = new Date(now);
  firstMonday.setDate(now.getDate() + daysUntilMonday);
  firstMonday.setHours(0, 0, 0, 0);

  for (let i = 0; i < count; i++) {
    const d = new Date(firstMonday);
    d.setDate(firstMonday.getDate() + i * 7);
    out.push(
      `Week of ${d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}`
    );
  }
  return out;
}
