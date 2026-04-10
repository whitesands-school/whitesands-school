'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { AnimatedSection, SectionLabel, Button } from '@/components/ui';

// ---------------------------------------------------------------------------
// Social SVG icons (lucide-react has no brand icons)
// ---------------------------------------------------------------------------

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#', Icon: IconInstagram },
  { label: 'Facebook', href: '#', Icon: IconFacebook },
  { label: 'LinkedIn', href: '#', Icon: IconLinkedIn },
  { label: 'YouTube', href: '#', Icon: IconYouTube },
];

const SUBJECT_OPTIONS = ['General Enquiry', 'Admissions', 'Fees & Payments', 'Feedback', 'Other'];

// ---------------------------------------------------------------------------
// Inline field style (matches Admissions underline style)
// ---------------------------------------------------------------------------

const fieldClass =
  'w-full bg-transparent border-b border-gray-300 focus:border-deep outline-none py-3 font-sans text-dark placeholder:text-muted text-base transition-colors duration-200';

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      setFormState('error');
      return;
    }
    setFormState('success');
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-deep py-28 text-white text-center">
        <AnimatedSection>
          <SectionLabel label="Contact Us" light className="justify-center mb-6" />
          <h1 className="font-serif font-bold text-white" style={{ fontSize: '58px', lineHeight: 1.1 }}>
            We&apos;d Love to Hear From You.
          </h1>
          <div className="w-16 h-0.75 bg-lemon mx-auto mt-6" />
          <p className="font-sans text-white/60 text-lg mt-6 max-w-xl mx-auto">
            Whether you have a question, a comment, or simply want to learn more about Whitesands — we&apos;re here.
          </p>
        </AnimatedSection>
      </section>

      {/* ── INFO STRIP ───────────────────────────────────────── */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Address */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <MapPin size={26} className="text-lemon shrink-0 mt-0.5" />
              <div>
                <p className="font-roboto font-bold text-dark text-sm mb-1">Our Address</p>
                <p className="font-sans text-muted text-sm leading-relaxed">
                  1 Whitesands Close, Lekki Phase 1<br />
                  Lagos, Nigeria
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <Phone size={26} className="text-lemon shrink-0 mt-0.5" />
              <div>
                <p className="font-roboto font-bold text-dark text-sm mb-1">Phone</p>
                <p className="font-sans text-muted text-sm leading-relaxed">
                  +234 (0) 803 000 0001<br />
                  +234 (0) 803 000 0002
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <Mail size={26} className="text-lemon shrink-0 mt-0.5" />
              <div>
                <p className="font-roboto font-bold text-dark text-sm mb-1">Email</p>
                <p className="font-sans text-muted text-sm leading-relaxed">
                  info@whitesandsschool.edu.ng<br />
                  admissions@whitesandsschool.edu.ng
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <section className="bg-offwhite py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 items-start">

            {/* LEFT — Contact Form (60%) */}
            <div className="lg:col-span-3">
              <AnimatedSection className="mb-8">
                <SectionLabel label="Send a Message" className="mb-4" />
                <h2 className="font-serif text-3xl font-bold text-dark">Get in Touch</h2>
              </AnimatedSection>

              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl p-10 flex flex-col items-center text-center shadow-sm"
                  >
                    <CheckCircle size={48} className="text-deep mb-5" />
                    <h3 className="font-serif text-2xl font-bold text-dark mb-3">Message Received</h3>
                    <p className="font-sans text-muted text-base max-w-sm">
                      Thank you for reaching out. A member of our team will get back to you within two working days.
                    </p>
                    <button
                      onClick={() => {
                        setFormState('idle');
                        setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
                      }}
                      className="mt-6 font-roboto font-medium text-sm text-deep underline underline-offset-4 hover:text-bold transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl p-8 shadow-sm space-y-7"
                  >
                    {/* Full Name */}
                    <div>
                      <label className="block font-roboto font-bold text-xs text-dark uppercase tracking-wider mb-2">
                        Full Name <span className="text-bold">*</span>
                      </label>
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Chidera Okonkwo"
                        className={fieldClass}
                        required
                      />
                    </div>

                    {/* Email + Phone */}
                    <div className="grid sm:grid-cols-2 gap-7">
                      <div>
                        <label className="block font-roboto font-bold text-xs text-dark uppercase tracking-wider mb-2">
                          Email Address <span className="text-bold">*</span>
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className={fieldClass}
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-roboto font-bold text-xs text-dark uppercase tracking-wider mb-2">
                          Phone Number
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+234 803 000 0000"
                          className={fieldClass}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block font-roboto font-bold text-xs text-dark uppercase tracking-wider mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={[fieldClass, 'cursor-pointer bg-white'].join(' ')}
                      >
                        <option value="">Select a subject…</option>
                        {SUBJECT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block font-roboto font-bold text-xs text-dark uppercase tracking-wider mb-2">
                        Message <span className="text-bold">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message here…"
                        rows={5}
                        className={[fieldClass, 'resize-none'].join(' ')}
                        required
                      />
                    </div>

                    {/* Error state */}
                    <AnimatePresence>
                      {formState === 'error' && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="font-sans text-sm text-bold"
                        >
                          Please fill in all required fields before submitting.
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <div>
                      <Button type="submit" variant="primary" size="lg">
                        Send Message →
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT — Map + Office Hours (40%) */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection className="mb-0" delay={0.1}>
                {/* Map placeholder */}
                <div className="bg-deep/10 rounded-xl aspect-square flex flex-col items-center justify-center text-center p-8">
                  <MapPin size={40} className="text-deep/40 mb-4" />
                  <p className="font-sans text-muted text-sm">Google Maps embed goes here</p>
                </div>

                {/* Office Hours */}
                <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
                  <h3 className="font-roboto font-bold text-dark text-sm uppercase tracking-wider mb-4">
                    Office Hours
                  </h3>
                  <div className="space-y-2">
                    {[
                      { day: 'Monday – Friday', hours: '7:30 am – 4:30 pm' },
                      { day: 'Saturday', hours: 'By appointment only' },
                      { day: 'Sunday & Public Holidays', hours: 'Closed' },
                    ].map(({ day, hours }) => (
                      <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <span className="font-sans text-sm text-dark">{day}</span>
                        <span className="font-roboto font-medium text-sm text-muted">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* ── SOCIAL STRIP ─────────────────────────────────────── */}
      <section className="bg-offwhite py-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
          <p className="font-roboto font-bold text-dark text-sm uppercase tracking-widest">
            Follow Whitesands
          </p>
          <div className="flex items-center gap-8">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-deep hover:text-bold transition-colors duration-200"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
