'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { media } from '@/lib/media';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError || !data.user) {
        setError('Incorrect email or password.');
        setLoading(false);
        return;
      }

      const role = data.user.user_metadata?.role as
        | 'super_admin'
        | 'admin'
        | undefined;

      if (!role) {
        await supabase.auth.signOut();
        setError('Your account has no role assigned. Please contact a super-admin.');
        setLoading(false);
        return;
      }

      const next = searchParams.get('next');
      router.push(next || (role === 'super_admin' ? '/super-admin' : '/admin'));
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
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
            Admin
          </p>
          <h1
            className="mt-3 font-serif text-deep text-center"
            style={{
              fontSize: 'clamp(1.5rem, 2.6vw, 1.875rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            Sign in to manage{' '}
            <span className="italic">Whitesands.</span>
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-deep/10 rounded-md p-7 sm:p-8 space-y-6"
        >
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

          <label className="block">
            <span
              className="font-roboto text-[11px] uppercase text-muted"
              style={{ letterSpacing: '0.22em' }}
            >
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-2 w-full bg-white border-b border-deep/20 focus:border-deep focus:outline-none py-2.5 font-sans text-base text-deep transition-colors"
            />
          </label>

          {error && (
            <p className="font-sans text-sm text-bold">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-deep text-white font-roboto uppercase text-sm px-6 py-3.5 hover:bg-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ letterSpacing: '0.18em' }}
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {loading ? 'Signing in' : 'Sign in'}
          </button>
        </form>

        <p className="mt-8 text-center">
          <Link
            href="/"
            className="font-roboto text-[11px] uppercase text-muted hover:text-deep transition-colors inline-flex items-center gap-1.5"
            style={{ letterSpacing: '0.22em' }}
          >
            ← Back to site
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
