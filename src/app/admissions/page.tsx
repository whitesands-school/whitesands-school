'use client';

import { useEffect, useRef, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Heart, Users, ChevronDown, CheckCircle } from 'lucide-react';
import { AnimatedSection, SectionLabel, Button } from '@/components/ui';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const BENEFITS = [
  {
    icon: Award,
    title: 'Academic Excellence',
    body: 'Consistently high WAEC pass rates, a rigorous curriculum, and dedicated teachers who treat every student as an individual learner capable of reaching their full potential.',
  },
  {
    icon: Heart,
    title: 'Faith & Character',
    body: 'Rooted in the Catholic tradition, our school forms young people of deep conscience, moral courage, and genuine compassion — virtues that outlast any examination result.',
  },
  {
    icon: Users,
    title: 'Holistic Formation',
    body: 'Sport, music, drama, service learning, and leadership programmes ensure that every student discovers and develops their unique gifts beyond the walls of the classroom.',
  },
];

const STEPS = [
  { number: 1, label: 'Submit Application', description: 'Complete the online form below or collect a physical form at our admissions office.' },
  { number: 2, label: 'Documents', description: 'Submit birth certificate, last school report cards, passport photographs, and health records.' },
  { number: 3, label: 'Assessment', description: 'Sit our entrance assessment in English, Mathematics, and General Knowledge.' },
  { number: 4, label: 'Interview', description: 'Shortlisted candidates and a parent or guardian attend a brief interview with the Principal.' },
  { number: 5, label: 'Offer', description: 'Successful candidates receive an offer letter within five working days of the interview.' },
];

const KEY_DATES = [
  { date: 'September 1, 2025', event: 'Applications Open — 2026 Academic Year', notes: 'Forms available online and at the admissions office' },
  { date: 'November 28, 2025', event: 'Application Deadline', notes: 'Late applications considered only if spaces remain' },
  { date: 'December 6–7, 2025', event: 'Entrance Assessments', notes: 'Venue: Main Campus, Lagos. 9:00 a.m. – 12:00 noon' },
  { date: 'December 15–19, 2025', event: 'Candidate Interviews', notes: 'By appointment — confirmed via email after assessment' },
  { date: 'January 9, 2026', event: 'Offer Letters Issued', notes: 'Acceptance fee due within 14 days of offer' },
  { date: 'January 30, 2026', event: 'New Student Orientation', notes: 'Mandatory for all newly admitted students and parents' },
];

const REQUIREMENTS = [
  {
    trigger: 'Age Requirements',
    content: 'Junior Secondary One (JSS 1): Applicant must be between 10 and 13 years old at the start of the academic year. Senior Secondary One (SSS 1): Applicant must have completed JSS 3 or its equivalent and be between 14 and 17 years old. We do not make exceptions outside these age brackets.',
  },
  {
    trigger: 'Documents Required',
    content: 'Two recent passport photographs; original and photocopy of birth certificate or declaration of age; last two years of school report cards (originals); immunisation/medical record from a registered health practitioner; letter of good conduct from most recent school; completed admission form (signed by parent or guardian).',
  },
  {
    trigger: 'Entrance Exam Details',
    content: 'The entrance assessment tests competency in English Language, Mathematics, and a General Knowledge paper. It is a two-hour, paper-based examination administered at our main campus. No special materials are required beyond a pen and pencil. Results are not disclosed individually — shortlisted candidates are contacted directly.',
  },
  {
    trigger: 'Interview Process',
    content: 'Shortlisted candidates will be invited for a 20-minute interview with a member of the senior leadership team. The interview is informal and developmental in nature: we look for curiosity, self-awareness, and good character. Parents or guardians must accompany the candidate. It is not necessary to prepare formal answers — we simply want to know the child.',
  },
  {
    trigger: 'Acceptance & Enrolment Process',
    content: 'Successful candidates receive an offer letter via email and post. Acceptance must be confirmed within 14 calendar days by paying the non-refundable acceptance fee and returning the signed acceptance form. Full fees for the first term are due by the date specified in the offer letter. Failure to meet either deadline may result in the place being offered to a waitlisted candidate.',
  },
];

const FAQS = [
  {
    trigger: 'Is Whitesands a boarding school?',
    content: 'No, Whitesands School is a day school. We operate Monday to Friday. Students are expected to be on campus by 7:30 a.m. and formal school hours end at 3:30 p.m. After-school clubs and supervised study run until 5:30 p.m.',
  },
  {
    trigger: 'Do you accept students mid-year?',
    content: 'Mid-year admissions are considered on a case-by-case basis and are subject to space availability. Families who need to transfer their child outside the regular admissions cycle should contact our admissions office directly.',
  },
  {
    trigger: "What is the school's policy on scholarship and bursaries?",
    content: 'Whitesands operates a merit-based scholarship programme for exceptional candidates who demonstrate outstanding academic ability combined with financial need. Details are available from the admissions office and applications are considered alongside the general admissions process.',
  },
  {
    trigger: 'Is prior Catholic schooling a requirement for admission?',
    content: 'No. While we are a Catholic school and our ethos is explicitly faith-based, we welcome families of all Christian backgrounds and those who respect and embrace our values. We ask all families to read and agree to our ethos statement as part of the admissions process.',
  },
  {
    trigger: 'Can my child retake the entrance assessment if unsuccessful?',
    content: 'Candidates who are unsuccessful may reapply in a subsequent admissions cycle. We encourage families to request informal feedback from the admissions office to help with preparation for a future application.',
  },
  {
    trigger: 'What are the school fees and how are they structured?',
    content: "Fees are published annually and are structured as three equal termly payments. A fee schedule is available on our Fees Portal. We do not publish fees publicly to allow for annual review. Please contact the admissions office or visit the Fees Portal for the current year's schedule.",
  },
];

const CLASS_OPTIONS = [
  'JSS 1 (Year 7)',
  'JSS 2 (Year 8)',
  'JSS 3 (Year 9)',
  'SSS 1 (Year 10)',
  'SSS 2 (Year 11)',
  'SSS 3 (Year 12)',
];

const REFERRAL_OPTIONS = [
  'A current Whitesands parent',
  'Online search',
  'Social media',
  'Newspaper / magazine',
  'Open Day or school event',
  'Other',
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function BenefitCard({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="bg-white rounded-sm p-8 shadow-sm border border-gray-100 border-t-4 border-t-white hover:border-t-bold hover:shadow-md transition-shadow duration-200"
    >
      <Icon size={28} className="text-bold mb-5" />
      <h3 className="font-roboto font-bold text-xl text-dark mb-3">{title}</h3>
      <p className="font-sans text-base text-muted leading-relaxed">{body}</p>
    </motion.div>
  );
}

function AdmissionsAccordion({
  items,
  id,
}: {
  items: { trigger: string; content: string }[];
  id: string;
}) {
  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-gray-200">
      {items.map((item, i) => (
        <Accordion.Item key={`${id}-${i}`} value={`${id}-${i}`}>
          <Accordion.Trigger asChild>
            <button className="w-full flex items-center justify-between py-5 text-left group">
              <span className="font-roboto font-bold text-dark text-base pr-4">{item.trigger}</span>
              <motion.span
                className="shrink-0 text-muted group-data-[state=open]:text-deep transition-colors"
                initial={false}
                animate={{ rotate: 0 }}
              >
                <ChevronDownIcon />
              </motion.span>
            </button>
          </Accordion.Trigger>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <p className="font-sans text-base text-muted leading-relaxed pb-6 pr-4">{item.content}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-200 group-data-[state=open]:rotate-180"
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AdmissionsPage() {
  const [formState, setFormState] = useState<'idle' | 'success'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    classApplying: '',
    referral: '',
    message: '',
  });
  const formSectionRef = useRef<HTMLDivElement>(null);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const el = formSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState('success');
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-deep py-32 text-white text-center">
        <AnimatedSection>
          <h1 className="font-serif font-bold text-white" style={{ fontSize: '64px', lineHeight: 1.1 }}>
            Begin the Journey.
          </h1>
          <div className="w-16 h-[3px] bg-lemon mx-auto mt-6" />
          <p className="font-sans text-white/70 text-lg mt-8 max-w-2xl mx-auto">
            We welcome families who share our vision of integral education.
          </p>
        </AnimatedSection>
      </section>

      {/* ── BENEFIT CARDS ────────────────────────────────────── */}
      <section className="bg-offwhite py-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-10">
            <SectionLabel label="Why Whitesands" className="mb-4" />
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <BenefitCard key={b.title} {...b} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ADMISSIONS STEPS ─────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-14">
            <SectionLabel label="How to Apply" className="mb-4" />
            <h2 className="font-serif text-4xl font-bold text-dark mt-2">Five Steps to Joining Us</h2>
          </AnimatedSection>

          {/* Desktop: horizontal stepper */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0" />
              <div className="relative z-10 flex justify-between">
                {STEPS.map((step, i) => (
                  <div key={step.number} className="flex flex-col items-center text-center w-1/5 px-2">
                    <div
                      className={[
                        'w-12 h-12 rounded-full flex items-center justify-center font-roboto font-bold text-base mb-4 shrink-0',
                        i === 0
                          ? 'bg-bold text-white'
                          : i < 3
                          ? 'bg-deep text-white'
                          : 'border-2 border-gray-200 text-muted bg-white',
                      ].join(' ')}
                    >
                      {step.number}
                    </div>
                    <p className="font-roboto font-bold text-sm text-dark mb-1">{step.label}</p>
                    <p className="font-sans text-xs text-muted leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: vertical stepper */}
          <div className="md:hidden flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <div key={step.number} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div
                    className={[
                      'w-10 h-10 rounded-full flex items-center justify-center font-roboto font-bold text-sm shrink-0',
                      i === 0
                        ? 'bg-bold text-white'
                        : i < 3
                        ? 'bg-deep text-white'
                        : 'border-2 border-gray-200 text-muted bg-white',
                    ].join(' ')}
                  >
                    {step.number}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gray-200 my-1" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="font-roboto font-bold text-sm text-dark mb-1 mt-2.5">{step.label}</p>
                  <p className="font-sans text-sm text-muted leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY DATES TABLE ───────────────────────────────────── */}
      <section className="bg-offwhite py-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-10">
            <SectionLabel label="Important Dates" className="mb-4" />
            <h2 className="font-serif text-4xl font-bold text-dark mt-2">Admissions Calendar</h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="overflow-x-auto rounded-sm shadow-sm border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-deep text-white">
                    <th className="text-left font-roboto font-bold px-6 py-4 whitespace-nowrap">Date</th>
                    <th className="text-left font-roboto font-bold px-6 py-4">Event</th>
                    <th className="text-left font-roboto font-bold px-6 py-4 hidden sm:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {KEY_DATES.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-offwhite'}
                    >
                      <td className="px-6 py-4 font-roboto font-medium text-dark whitespace-nowrap align-top">
                        {row.date}
                      </td>
                      <td className="px-6 py-4 font-sans text-dark align-top">{row.event}</td>
                      <td className="px-6 py-4 font-sans text-muted hidden sm:table-cell align-top">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <Button variant="outline" size="md">
                Download Calendar
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── REQUIREMENTS ACCORDION ───────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-10">
            <SectionLabel label="Admissions Requirements" className="mb-4" />
            <h2 className="font-serif text-4xl font-bold text-dark mt-2">What You Need to Know</h2>
          </AnimatedSection>

          <div className="max-w-3xl">
            <AdmissionsAccordion items={REQUIREMENTS} id="requirements" />
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ─────────────────────────────────── */}
      <section ref={formSectionRef} id="application-form" className="bg-deep py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <SectionLabel label="Apply Now" light className="justify-center mb-4" />
            <h2 className="font-serif text-4xl font-bold text-white mt-2">Ready to Take the First Step?</h2>
            <p className="font-sans text-white/70 mt-4 max-w-xl mx-auto">
              Fill in the form below and our admissions team will be in touch within two working days.
            </p>
          </AnimatedSection>

          <div className="max-w-2xl mx-auto bg-white rounded-xl p-10 shadow-2xl">
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <CheckCircle size={56} className="text-green-500 mb-5" />
                  <h3 className="font-serif text-2xl font-bold text-dark mb-3">
                    Thank you!
                  </h3>
                  <p className="font-sans text-muted">
                    We&apos;ll be in touch within 48 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      label="First Name"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    <FormField
                      label="Last Name"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <FormField
                      label="Phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-roboto text-xs uppercase tracking-widest text-muted">
                      Class Applying For
                    </label>
                    <select
                      name="classApplying"
                      value={formData.classApplying}
                      onChange={handleChange}
                      required
                      className="border-b-2 border-gray-200 focus:border-deep focus:outline-none py-2 font-sans text-base text-dark bg-transparent transition-colors duration-200"
                    >
                      <option value="" disabled>Select a class…</option>
                      {CLASS_OPTIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-roboto text-xs uppercase tracking-widest text-muted">
                      How Did You Hear About Us?
                    </label>
                    <select
                      name="referral"
                      value={formData.referral}
                      onChange={handleChange}
                      className="border-b-2 border-gray-200 focus:border-deep focus:outline-none py-2 font-sans text-base text-dark bg-transparent transition-colors duration-200"
                    >
                      <option value="" disabled>Select an option…</option>
                      {REFERRAL_OPTIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-roboto text-xs uppercase tracking-widest text-muted">
                      Message (optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Any additional context or questions…"
                      className="border-b-2 border-gray-200 focus:border-deep focus:outline-none py-2 font-sans text-base text-dark bg-transparent resize-none transition-colors duration-200 placeholder:text-gray-300"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    Send Application →
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ────────────────────────────────────── */}
      <section className="bg-offwhite py-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-10">
            <SectionLabel label="FAQs" className="mb-4" />
            <h2 className="font-serif text-4xl font-bold text-dark mt-2">Common Questions</h2>
          </AnimatedSection>

          <div className="max-w-3xl">
            <AdmissionsAccordion items={FAQS} id="faqs" />
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ────────────────────────────────── */}
      <AnimatePresence>
        {!formInView && (
          <motion.div
            initial={{ y: 56 }}
            animate={{ y: 0 }}
            exit={{ y: 56 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50"
          >
            <a
              href="#application-form"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('application-form');
                if (!el) return;
                const top = el.getBoundingClientRect().top + window.scrollY - 88;
                window.scrollTo({ top, behavior: 'smooth' });
              }}
              className="flex items-center justify-center bg-bold text-white font-roboto font-medium text-base h-14 w-full"
            >
              Apply for Admission →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ---------------------------------------------------------------------------
// FormField helper
// ---------------------------------------------------------------------------

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-roboto text-xs uppercase tracking-widest text-muted">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="border-b-2 border-gray-200 focus:border-deep focus:outline-none py-2 font-sans text-base text-dark bg-transparent transition-colors duration-200"
      />
    </div>
  );
}
