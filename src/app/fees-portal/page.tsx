'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Tabs from '@radix-ui/react-tabs';
import { Smartphone, Receipt, BadgeCheck, ArrowUpRight } from 'lucide-react';
import { AnimatedSection, SectionLabel } from '@/components/ui';
import { PageHero } from '@/components/sections/PageHero';
import { media } from '@/lib/media';
import { SITE } from '@/lib/site';

// ---------------------------------------------------------------------------
// Fee data
// ---------------------------------------------------------------------------

type TermRow = { term: string; tuition: string; levies: string; total: string };

const FEE_DATA: Record<string, TermRow[]> = {
  jss: [
    { term: 'First Term',  tuition: '₦480,000', levies: '₦55,000', total: '₦535,000' },
    { term: 'Second Term', tuition: '₦480,000', levies: '₦48,000', total: '₦528,000' },
    { term: 'Third Term',  tuition: '₦480,000', levies: '₦40,000', total: '₦520,000' },
  ],
  sss: [
    { term: 'First Term',  tuition: '₦560,000', levies: '₦65,000', total: '₦625,000' },
    { term: 'Second Term', tuition: '₦560,000', levies: '₦58,000', total: '₦618,000' },
    { term: 'Third Term',  tuition: '₦560,000', levies: '₦48,000', total: '₦608,000' },
  ],
};

const TAB_LABELS: { value: string; label: string; sub: string }[] = [
  { value: 'jss', label: 'Junior Secondary', sub: 'JS1 – JS3' },
  { value: 'sss', label: 'Senior Secondary', sub: 'SS1 – SS3' },
];

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
  const [activeTab, setActiveTab] = useState('jss');

  return (
    <>
      <PageHero
        eyebrow="School Fees"
        title={<>Honest fees, <span className="italic text-lemon">clearly published</span>.</>}
        subtitle="Termly fee schedules for Junior and Senior Secondary, payable securely online through PixPay."
        image={media('/images/students/students-in-computer-lab.JPG')}
        size="short"
      />

      {/* ── FEE SCHEDULE TABLE ───────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
          <AnimatedSection className="mb-10">
            <SectionLabel label="Fee Schedule · 2026/2027 Session" className="mb-4" />
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-dark mt-2">Annual Fee Breakdown</h2>
            <p className="font-sans text-muted text-base mt-3 max-w-2xl">
              All fees are quoted in Nigerian Naira and are payable per term. Levies cover learning materials, sport, and co-curricular activities.
            </p>
          </AnimatedSection>

          <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
            {/* Tab list */}
            <Tabs.List className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-8 w-full max-w-xl">
              {TAB_LABELS.map(({ value, label, sub }) => (
                <Tabs.Trigger
                  key={value}
                  value={value}
                  className={[
                    'flex-1 py-3 px-4 rounded-md font-roboto font-medium text-sm transition-all duration-200 cursor-pointer',
                    'data-[state=active]:bg-deep data-[state=active]:text-white data-[state=active]:shadow-sm',
                    'data-[state=inactive]:text-muted data-[state=inactive]:hover:text-dark',
                  ].join(' ')}
                >
                  <span className="block">{label}</span>
                  <span className="mt-0.5 block text-[11px] font-normal opacity-70">{sub}</span>
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {/* Tab panels */}
            {TAB_LABELS.map(({ value }) => (
              <Tabs.Content key={value} value={value}>
                <AnimatePresence mode="wait">
                  {activeTab === value && (
                    <motion.div
                      key={value}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="rounded-xl overflow-x-auto border border-gray-100 shadow-sm">
                        <table className="w-full min-w-140">
                          <thead>
                            <tr className="bg-deep text-white">
                              {['Term', 'Tuition', 'Levies', 'Total'].map((h) => (
                                <th
                                  key={h}
                                  className="py-4 px-6 font-roboto font-bold text-sm text-left first:rounded-tl-xl last:rounded-tr-xl"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {FEE_DATA[value].map((row, i) => (
                              <tr
                                key={row.term}
                                className={i % 2 === 0 ? 'bg-white' : 'bg-offwhite'}
                              >
                                <td className="py-4 px-6 font-sans text-sm text-dark">{row.term}</td>
                                <td className="py-4 px-6 font-roboto text-sm text-dark">{row.tuition}</td>
                                <td className="py-4 px-6 font-roboto text-sm text-muted">{row.levies}</td>
                                <td className="py-4 px-6 font-roboto font-bold text-sm text-deep">{row.total}</td>
                              </tr>
                            ))}
                            {/* Annual total row */}
                            <tr className="bg-lemon/20 border-t-2 border-lemon/40">
                              <td className="py-4 px-6 font-roboto font-bold text-sm text-dark">Annual Total</td>
                              <td className="py-4 px-6 font-roboto font-bold text-sm text-dark">
                                {`₦${(
                                  parseInt(FEE_DATA[value][0].tuition.replace(/[₦,]/g, '')) * 3
                                ).toLocaleString('en-NG')}`}
                              </td>
                              <td className="py-4 px-6 font-roboto text-sm text-muted">
                                {`₦${FEE_DATA[value]
                                  .reduce((s, r) => s + parseInt(r.levies.replace(/[₦,]/g, '')), 0)
                                  .toLocaleString('en-NG')}`}
                              </td>
                              <td className="py-4 px-6 font-roboto font-black text-sm text-deep">
                                {`₦${FEE_DATA[value]
                                  .reduce((s, r) => s + parseInt(r.total.replace(/[₦,]/g, '')), 0)
                                  .toLocaleString('en-NG')}`}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>
      </section>

      {/* ── HOW TO PAY — PIXPAY ──────────────────────────────── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <AnimatedSection className="mb-12 max-w-2xl">
            <SectionLabel label="How to Pay" className="mb-4" />
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-dark mt-2">
              All fees are paid through <span className="italic text-deep">PixPay</span>
            </h2>
            <p className="font-sans text-muted text-base mt-3">
              PixPay is the school&apos;s official payment partner. Every payment is matched to your son&apos;s record automatically and receipted instantly — no transfers, no queues.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {PIXPAY_STEPS.map(({ Icon, title, body }, i) => (
              <motion.div
                key={title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="relative bg-white rounded-xl p-8 shadow-sm border border-gray-100 border-t-4 border-t-white hover:border-t-deep hover:shadow-md transition-shadow duration-200"
              >
                <span
                  className="absolute top-6 right-7 font-serif text-4xl text-deep/10 select-none"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div className="w-11 h-11 bg-deep/8 rounded-lg flex items-center justify-center mb-5">
                  <Icon size={22} className="text-deep" />
                </div>
                <h3 className="font-roboto font-bold text-dark text-lg mb-3">{title}</h3>
                <p className="font-sans text-muted text-sm leading-relaxed">{body}</p>
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
      <section className="bg-bold py-14 text-white text-center">
        <AnimatedSection>
          <h2 className="font-serif font-bold text-white mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', lineHeight: 1.15 }}>
            Ready to make a payment?
          </h2>
          <p className="font-sans text-white/85 text-base mb-8 max-w-md mx-auto">
            PixPay is secure, instant, and available 24 hours a day — on the web or in the app.
          </p>
          <a
            href={PIXPAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-bold font-roboto uppercase text-sm px-8 py-3.5 rounded-sm hover:bg-lemon hover:text-deep transition-colors duration-200"
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
