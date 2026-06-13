'use client';

import { motion } from 'framer-motion';
import { Smartphone, Receipt, BadgeCheck, ArrowUpRight } from 'lucide-react';
import { AnimatedSection } from '@/components/ui';
import { PageHero } from '@/components/sections/PageHero';
import { media } from '@/lib/media';
import { SITE } from '@/lib/site';

// ---------------------------------------------------------------------------
// PixPay — the school's only payment channel
// ---------------------------------------------------------------------------

const PIXPAY_URL = 'https://pixpay.africa/pay-school-fees-whitesands-school.html';

const PIXPAY_STEPS = [
  {
    Icon: Smartphone,
    title: 'Open PixPay',
    body: 'Visit the Whitesands payment page on PixPay, or download the PixPay app from the App Store or Google Play.',
  },
  {
    Icon: BadgeCheck,
    title: 'Identify your son',
    body: "Search for Whitesands School and enter your son's full name, class, and admission number so the payment is matched correctly.",
  },
  {
    Icon: Receipt,
    title: 'Pay & get your receipt',
    body: 'Pay securely with your card or bank account. An official receipt is generated instantly and emailed to you.',
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function FeesPortalPage() {
  return (
    <>
      <PageHero
        eyebrow="School Fees"
        title={<>Paying your son&apos;s <span className="italic text-lemon">school fees</span>.</>}
        subtitle="Whitesands school fees are payable securely online through PixPay — instant receipts, no transfers, no queues."
        image={media('/images/students/students-in-computer-lab.JPG')}
        size="short"
      />

      {/* ── FEE SCHEDULE NOTE ────────────────────────────────── */}
      <section className="bg-white py-24 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 sm:px-10 lg:px-12">
          <AnimatedSection>
            <Eyebrow>Fee schedule</Eyebrow>
            <h2 className="mt-5 font-serif text-deep" style={H2}>
              Fee schedules are shared directly with{' '}
              <span className="italic">families.</span>
            </h2>
            <p className="mt-5 font-sans text-base text-dark/70 leading-relaxed">
              For the current termly fees, please contact the school office and our
              accounts team will send you the schedule for your son&apos;s class. When
              you begin a payment on PixPay, the exact amount due is shown before you
              confirm.
            </p>
            <a
              href="mailto:accounts@whitesands.org.ng"
              className="group mt-6 inline-flex items-center gap-2 font-roboto uppercase text-sm text-deep hover:text-bold transition-colors"
              style={{ letterSpacing: '0.12em' }}
            >
              Request the fee schedule
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ── HOW TO PAY — PIXPAY ──────────────────────────────── */}
      <section className="bg-offwhite py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <AnimatedSection className="mb-14 max-w-2xl">
            <Eyebrow>How to pay</Eyebrow>
            <h2 className="mt-5 font-serif text-deep" style={H2}>
              All fees are paid through <span className="italic">PixPay.</span>
            </h2>
            <p className="mt-5 font-sans text-base text-dark/70 leading-relaxed">
              PixPay is the school&apos;s official payment partner. Every payment is matched to your son&apos;s record automatically and receipted instantly — no transfers, no queues.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {PIXPAY_STEPS.map(({ Icon, title, body }, i) => (
              <motion.div
                key={title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="relative bg-white rounded-sm p-8 border border-deep/10 border-t-2 border-t-transparent hover:border-t-lemon transition-colors duration-200"
              >
                <span
                  className="absolute top-6 right-7 font-serif text-5xl text-deep/10 select-none"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div className="w-11 h-11 bg-deep/5 rounded-sm flex items-center justify-center mb-5">
                  <Icon size={22} className="text-deep" />
                </div>
                <h3 className="font-serif text-lg lg:text-xl text-deep leading-snug mb-3">{title}</h3>
                <p className="font-sans text-sm text-dark/70 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>

          <AnimatedSection className="mt-10">
            <a
              href={PIXPAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-deep text-white font-roboto uppercase text-sm px-8 py-3.5 rounded-sm hover:bg-bold transition-colors duration-200"
              style={{ letterSpacing: '0.12em' }}
            >
              Pay School Fees on PixPay
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <p className="mt-4 font-sans text-sm text-muted">
              Prefer your phone? Download the <span className="font-medium text-dark">PixPay app</span> on the App Store or Google Play and search for Whitesands School.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PAYMENT CTA ──────────────────────────────────────── */}
      <section className="bg-deep py-20 lg:py-24 text-center">
        <AnimatedSection>
          <Eyebrow className="text-lemon">Make a payment</Eyebrow>
          <h2 className="mt-5 font-serif text-white" style={H2}>
            Ready to make a{' '}
            <span className="italic text-lemon">payment?</span>
          </h2>
          <p className="mt-5 mb-8 font-sans text-base text-white/75 max-w-md mx-auto leading-relaxed">
            PixPay is secure, instant, and available 24 hours a day — on the web or in the app.
          </p>
          <a
            href={PIXPAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-lemon text-deep font-roboto uppercase text-sm px-8 py-3.5 rounded-sm hover:bg-white transition-colors duration-200"
            style={{ letterSpacing: '0.12em' }}
          >
            Pay with PixPay
            <ArrowUpRight size={16} />
          </a>
        </AnimatedSection>
      </section>

      {/* ── CONTACT STRIP ────────────────────────────────────── */}
      <section className="bg-deep py-8 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
          <p className="font-sans text-white/70 text-sm">
            <span className="font-roboto font-bold text-white">Payment Enquiries:</span>{' '}
            <a
              href="mailto:accounts@whitesands.org.ng"
              className="hover:text-lemon transition-colors underline underline-offset-2"
            >
              accounts@whitesands.org.ng
            </a>
          </p>
          <span className="hidden sm:block w-px h-5 bg-white/20" />
          <p className="font-sans text-white/70 text-sm">
            <a href={`tel:${SITE.phoneTel}`} className="hover:text-lemon transition-colors">
              {SITE.phone}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Helpers (shared house style — see About / Our People / What We Offer)
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
