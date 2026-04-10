'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Tabs from '@radix-ui/react-tabs';
import { Building2, CreditCard, UserRound, Eye, EyeOff } from 'lucide-react';
import { AnimatedSection, SectionLabel, Button } from '@/components/ui';

// ---------------------------------------------------------------------------
// Fee data
// ---------------------------------------------------------------------------

type TermRow = { term: string; tuition: string; levies: string; total: string };

const FEE_DATA: Record<string, TermRow[]> = {
  primary: [
    { term: 'First Term',  tuition: '₦380,000', levies: '₦45,000', total: '₦425,000' },
    { term: 'Second Term', tuition: '₦380,000', levies: '₦38,000', total: '₦418,000' },
    { term: 'Third Term',  tuition: '₦380,000', levies: '₦32,000', total: '₦412,000' },
  ],
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

const TAB_LABELS: { value: string; label: string }[] = [
  { value: 'primary', label: 'Primary School' },
  { value: 'jss',     label: 'Junior Secondary' },
  { value: 'sss',     label: 'Senior Secondary' },
];

// ---------------------------------------------------------------------------
// Payment options
// ---------------------------------------------------------------------------

const PAYMENT_OPTIONS = [
  {
    Icon: Building2,
    method: 'Bank Transfer',
    instructions: 'Transfer directly to our dedicated school account. Use your ward\'s full name and admission number as the payment reference.',
    detail: 'First Bank of Nigeria — Account No: 3012345678 — Whitesands School Ltd',
  },
  {
    Icon: CreditCard,
    method: 'Online Payment',
    instructions: 'Pay securely via card, bank transfer, or USSD through our Remita-powered portal. A receipt is generated instantly.',
    detail: 'Visit: portal.whitesandsschool.edu.ng/pay',
  },
  {
    Icon: UserRound,
    method: 'Visit the Bursar',
    instructions: 'Cash and cheque payments are accepted at the Bursary office during school hours. Please collect an official receipt.',
    detail: 'Bursary Office — Main Admin Block, Ground Floor. Mon–Fri, 8:00 am – 3:00 pm',
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function FeesPortalPage() {
  const [activeTab, setActiveTab] = useState('primary');
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginState, setLoginState] = useState<'idle' | 'loading'>('idle');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginState('loading');
    setTimeout(() => setLoginState('idle'), 1500);
  }

  const fieldClass =
    'w-full bg-transparent border-b border-gray-300 focus:border-deep outline-none py-3 font-sans text-dark placeholder:text-muted text-base transition-colors duration-200';

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-deep py-28 text-white text-center">
        <AnimatedSection>
          <SectionLabel label="Fees Portal" light className="justify-center mb-6" />
          <h1 className="font-serif font-bold text-white" style={{ fontSize: '58px', lineHeight: 1.1 }}>
            Fees &amp; Payments
          </h1>
          <div className="w-16 h-[3px] bg-lemon mx-auto mt-6" />
          <p className="font-sans text-white/60 text-lg mt-6 max-w-xl mx-auto">
            Transparent fee schedules and multiple convenient payment options for Whitesands families.
          </p>
        </AnimatedSection>
      </section>

      {/* ── FEE SCHEDULE TABLE ───────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="mb-10">
            <SectionLabel label="Fee Schedule 2024/2025" className="mb-4" />
            <h2 className="font-serif text-3xl font-bold text-dark mt-2">Annual Fee Breakdown</h2>
            <p className="font-sans text-muted text-base mt-3 max-w-2xl">
              All fees are quoted in Nigerian Naira and are payable per term. Levies cover learning materials, sport, and co-curricular activities.
            </p>
          </AnimatedSection>

          <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
            {/* Tab list */}
            <Tabs.List className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-8 w-full">
              {TAB_LABELS.map(({ value, label }) => (
                <Tabs.Trigger
                  key={value}
                  value={value}
                  className={[
                    'flex-1 py-2.5 px-4 rounded-md font-roboto font-medium text-sm transition-all duration-200 cursor-pointer',
                    'data-[state=active]:bg-deep data-[state=active]:text-white',
                    'data-[state=inactive]:text-muted data-[state=inactive]:hover:text-dark',
                  ].join(' ')}
                >
                  {label}
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
                      <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                        <table className="w-full">
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

      {/* ── PAYMENT OPTIONS ──────────────────────────────────── */}
      <section className="bg-offwhite py-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-10">
            <SectionLabel label="How to Pay" className="mb-4" />
            <h2 className="font-serif text-3xl font-bold text-dark mt-2">Payment Methods</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {PAYMENT_OPTIONS.map(({ Icon, method, instructions, detail }) => (
              <motion.div
                key={method}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 border-t-4 border-t-white hover:border-t-deep hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-11 h-11 bg-deep/8 rounded-lg flex items-center justify-center mb-5">
                  <Icon size={22} className="text-deep" />
                </div>
                <h3 className="font-roboto font-bold text-dark text-lg mb-3">{method}</h3>
                <p className="font-sans text-muted text-sm leading-relaxed mb-4">{instructions}</p>
                <p className="font-roboto text-xs text-deep bg-deep/5 rounded px-3 py-2 leading-relaxed">{detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAKE A PAYMENT CTA ───────────────────────────────── */}
      <section className="bg-bold py-12 text-white text-center">
        <AnimatedSection>
          <h2 className="font-serif font-bold text-white mb-6" style={{ fontSize: '40px', lineHeight: 1.15 }}>
            Ready to Make a Payment?
          </h2>
          <p className="font-sans text-white/80 text-base mb-8 max-w-md mx-auto">
            Our secure online portal accepts all major cards and bank transfers — available 24 hours a day.
          </p>
          <Button variant="secondary" size="lg">
            Make a Payment Online →
          </Button>
        </AnimatedSection>
      </section>

      {/* ── PARENT LOGIN ─────────────────────────────────────── */}
      <section className="bg-offwhite py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-sm mx-auto">
            <AnimatedSection className="mb-8 text-center">
              <SectionLabel label="Parent Portal" className="justify-center mb-4" />
              <h2 className="font-serif text-2xl font-bold text-dark mt-2">Login to Your Account</h2>
              <p className="font-sans text-muted text-sm mt-2">
                Access fee statements, receipts, and payment history.
              </p>
            </AnimatedSection>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <form onSubmit={handleLogin} className="space-y-7">
                {/* Email */}
                <div>
                  <label className="block font-roboto font-bold text-xs text-dark uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="parent@example.com"
                    className={fieldClass}
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block font-roboto font-bold text-xs text-dark uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData((p) => ({ ...p, password: e.target.value }))}
                      placeholder="••••••••"
                      className={[fieldClass, 'pr-10'].join(' ')}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-muted hover:text-dark transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  disabled={loginState === 'loading'}
                >
                  {loginState === 'loading' ? 'Signing in…' : 'Login to Parent Account'}
                </Button>
              </form>

              <div className="text-center mt-5">
                <a
                  href="#"
                  className="font-sans text-sm text-muted hover:text-deep underline underline-offset-4 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT STRIP ────────────────────────────────────── */}
      <section className="bg-deep py-8 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
          <p className="font-sans text-white/70 text-sm">
            <span className="font-roboto font-bold text-white">Payment Enquiries:</span>{' '}
            <a href="mailto:accounts@whitesandsschool.edu.ng" className="hover:text-lemon transition-colors underline underline-offset-2">
              accounts@whitesandsschool.edu.ng
            </a>
          </p>
          <span className="hidden sm:block w-px h-5 bg-white/20" />
          <p className="font-sans text-white/70 text-sm">
            <a href="tel:+2348030000003" className="hover:text-lemon transition-colors">
              +234 (0) 803 000 0003
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
