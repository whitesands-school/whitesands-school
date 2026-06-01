'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { SITE } from '@/lib/site';
import { media } from '@/lib/media';

// ---------------------------------------------------------------------------
// Form schema (mirrors /api/contact-message)
// ---------------------------------------------------------------------------

const ContactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.email('Please enter a valid email'),
  subject: z.string().min(2, 'Please enter a subject'),
  message: z.string().min(10, 'Your message must be at least 10 characters'),
});
type ContactValues = z.infer<typeof ContactSchema>;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <PageHero
        size="short"
        image={media('/images/students/student-walking-outside-school.JPG')}
        imageAlt="A Whitesands student walking outside the school"
        overlay={0.65}
        eyebrow="Contact"
        title={
          <>
            Get in{' '}
            <span className="italic text-lemon">touch.</span>
          </>
        }
        subtitle="Admissions, alumni, parents, press. Reach us by phone, email, or in person."
      />

      {/* ── Details + Form ─────────────────────────────────── */}
      <section className="bg-white py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left — details */}
            <div className="lg:col-span-5">
              <Eyebrow>The school</Eyebrow>
              <h2
                className="mt-5 font-serif text-deep"
                style={{
                  fontSize: 'clamp(1.875rem, 3.6vw, 2.75rem)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.02em',
                }}
              >
                We answer within one working{' '}
                <span className="italic">day.</span>
              </h2>

              <dl className="mt-12 divide-y divide-deep/10 border-y border-deep/10">
                <DetailRow label="Address">
                  <p className="font-serif text-lg text-deep leading-snug">
                    {SITE.address.street}
                    <br />
                    {SITE.address.locality}, {SITE.address.region}
                    <br />
                    Nigeria
                  </p>
                </DetailRow>

                <DetailRow label="Phone">
                  <a
                    href={`tel:${SITE.phoneTel}`}
                    className="font-serif text-lg text-deep hover:text-bold transition-colors"
                  >
                    {SITE.phone}
                  </a>
                </DetailRow>

                <DetailRow label="Email — General">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="font-serif text-lg text-deep hover:text-bold transition-colors break-all"
                  >
                    {SITE.email}
                  </a>
                </DetailRow>

                <DetailRow label="Email — Admissions">
                  <a
                    href={`mailto:${SITE.admissionsEmail}`}
                    className="font-serif text-lg text-deep hover:text-bold transition-colors break-all"
                  >
                    {SITE.admissionsEmail}
                  </a>
                </DetailRow>

                <DetailRow label="Office hours">
                  <p className="font-serif text-lg text-deep leading-snug">
                    Monday to Friday
                    <br />
                    8:00am to 4:00pm
                  </p>
                </DetailRow>
              </dl>

              {/* Social row */}
              <div className="mt-10">
                <p
                  className="font-roboto text-[11px] uppercase text-muted"
                  style={{ letterSpacing: '0.28em' }}
                >
                  Follow
                </p>
                <ul className="mt-5 flex items-center gap-5">
                  {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Whitesands School on ${label}`}
                        className="text-deep hover:text-bold transition-colors"
                      >
                        <Icon size={20} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <Eyebrow>Find us</Eyebrow>
              <h2
                className="mt-5 font-serif text-deep"
                style={{
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                }}
              >
                Block 140, Whitesands Street,{' '}
                <span className="italic">Lekki Phase 1.</span>
              </h2>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-roboto uppercase text-xs text-deep hover:text-bold transition-colors inline-flex items-center gap-2 group"
              style={{ letterSpacing: '0.22em' }}
            >
              Open in Google Maps
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          <div className="relative aspect-video lg:aspect-21/9 overflow-hidden rounded-md border border-deep/10 bg-deep/5">
            <iframe
              title={`Map showing ${SITE.address.full}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Form
// ---------------------------------------------------------------------------

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(values: ContactValues) {
    setServerError(null);
    try {
      const res = await fetch('/api/contact-message', {
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="border border-deep/15 rounded-md p-10 lg:p-12 text-center bg-offwhite/40"
        >
          <CheckCircle
            className="mx-auto w-10 h-10 text-deep"
            strokeWidth={1.25}
          />
          <h3 className="mt-5 font-serif text-2xl text-deep">
            Message received.
          </h3>
          <p className="mt-3 font-sans text-base text-dark/70 max-w-md mx-auto">
            Thank you. The school will reply within one working day at the
            email address you provided.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="border border-deep/15 rounded-md p-6 sm:p-10"
        >
          <p
            className="font-roboto text-[11px] uppercase text-deep"
            style={{ letterSpacing: '0.28em' }}
          >
            Send a message
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field
              label="Name"
              error={errors.name?.message}
              input={
                <input
                  type="text"
                  autoComplete="name"
                  {...register('name')}
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
            <div className="sm:col-span-2">
              <Field
                label="Subject"
                error={errors.subject?.message}
                input={
                  <input
                    type="text"
                    {...register('subject')}
                    className={inputClass}
                  />
                }
              />
            </div>
            <div className="sm:col-span-2">
              <Field
                label="Message"
                error={errors.message?.message}
                input={
                  <textarea
                    rows={5}
                    {...register('message')}
                    className={`${inputClass} resize-none`}
                  />
                }
              />
            </div>
          </div>

          {serverError && (
            <p className="mt-6 font-sans text-sm text-bold">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full sm:w-auto inline-flex items-center justify-center bg-deep text-white font-roboto uppercase text-sm px-10 py-4 hover:bg-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ letterSpacing: '0.18em' }}
          >
            {isSubmitting ? 'Sending…' : 'Send message'}
          </button>

          <p className="mt-5 font-sans text-xs text-muted leading-relaxed">
            For urgent matters, please call{' '}
            <a
              href={`tel:${SITE.phoneTel}`}
              className="text-deep hover:text-bold transition-colors"
            >
              {SITE.phone}
            </a>
            .
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Field + helpers
// ---------------------------------------------------------------------------

const inputClass =
  'w-full bg-transparent border-b border-deep/20 focus:border-deep focus:outline-none py-2.5 font-sans text-base text-deep placeholder:text-muted/40 transition-colors';

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
        className="font-roboto text-[11px] uppercase text-muted"
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

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 gap-4 py-5 lg:py-6">
      <dt
        className="col-span-12 sm:col-span-4 font-roboto text-[11px] uppercase text-muted self-start sm:self-center"
        style={{ letterSpacing: '0.22em' }}
      >
        {label}
      </dt>
      <dd className="col-span-12 sm:col-span-8">{children}</dd>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Social icons — inline SVG. lucide-react has no brand marks; these mirror
// the icons used in the footer so the visual language stays consistent.
// ---------------------------------------------------------------------------

const SOCIAL_LINKS = [
  { label: 'Instagram', href: SITE.sameAs[0], Icon: IconInstagram },
  { label: 'Facebook', href: SITE.sameAs[1], Icon: IconFacebook },
  { label: 'LinkedIn', href: SITE.sameAs[2], Icon: IconLinkedin },
  { label: 'YouTube', href: SITE.sameAs[3], Icon: IconYoutube },
];

function IconInstagram({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconLinkedin({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconYoutube({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}
