'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, MailCheck } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { media } from '@/lib/media';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        { redirectTo: `${window.location.origin}/admin/reset-password` }
      );
      if (resetError) throw resetError;
      setSent(true);
    } catch {
      setError('Could not send the reset email. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-offwhite px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-10">
          <Image
            src={media('/images/logos/whitesands-school-logo.png')}
            alt="Whitesands School"
            width={600}
            height={189}
            sizes="220px"
            style={{ width: 'auto' }}
            className="h-14 w-auto"
          />
          <p
            className="mt-7 font-roboto text-[11px] uppercase text-deep"
            style={{ letterSpacing: '0.32em' }}
          >
            Reset Password
          </p>
          <h1
            className="mt-3 font-serif text-deep text-center"
            style={{
              fontSize: 'clamp(1.5rem, 2.6vw, 1.875rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            Locked out? <span className="italic">It happens.</span>
          </h1>
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-deep/10 rounded-md p-7 sm:p-8 text-center"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-deep/5 text-deep mb-4">
                <MailCheck size={22} strokeWidth={1.75} />
              </span>
              <p className="font-serif text-lg text-deep">Check your inbox.</p>
              <p className="mt-3 font-sans text-sm text-muted leading-relaxed">
                If an admin account exists for{' '}
                <span className="text-deep font-medium break-all">{email}</span>, a
                reset link is on its way. The link is valid for one hour.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-5 font-roboto text-[11px] uppercase text-muted hover:text-deep transition-colors"
                style={{ letterSpacing: '0.22em' }}
              >
                Use a different email
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-white border border-deep/10 rounded-md p-7 sm:p-8 space-y-6"
            >
              <p className="font-sans text-sm text-muted leading-relaxed">
                Enter the email you sign in with and we&apos;ll send you a secure
                link to choose a new password.
              </p>

              <label className="block">
                <span
                  className="font-roboto text-[11px] uppercase text-muted"
                  style={{ letterSpacing: '0.22em' }}
                >
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  required
                  autoComplete="email"
                  className="mt-2 w-full bg-white border-b border-deep/20 focus:border-deep focus:outline-none py-2.5 font-sans text-base text-deep transition-colors"
                />
              </label>

              {error && <p className="font-sans text-sm text-bold">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-deep text-white font-roboto uppercase text-sm px-6 py-3.5 hover:bg-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ letterSpacing: '0.18em' }}
              >
                {loading && <Loader2 size={14} className="animate-spin" />}
                {loading ? 'Sending link' : 'Send reset link'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="mt-8 text-center">
          <Link
            href="/admin/login"
            className="font-roboto text-[11px] uppercase text-muted hover:text-deep transition-colors inline-flex items-center gap-1.5"
            style={{ letterSpacing: '0.22em' }}
          >
            ← Back to sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
