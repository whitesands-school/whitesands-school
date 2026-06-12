'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, ShieldCheck } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { media } from '@/lib/media';

type LinkState = 'checking' | 'ready' | 'invalid';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [linkState, setLinkState] = useState<LinkState>('checking');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // The email link signs the user in with a short-lived recovery session.
  // The browser client exchanges the code in the URL automatically; we just
  // wait for the session to appear (or fail).
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let cancelled = false;

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (cancelled) return;
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setLinkState('ready');
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      if (data.session) {
        setLinkState('ready');
      } else {
        // Give the URL-code exchange a moment before declaring the link dead.
        setTimeout(async () => {
          if (cancelled) return;
          const { data: again } = await supabase.auth.getSession();
          setLinkState(again.session ? 'ready' : 'invalid');
        }, 1500);
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error: updateError } = await supabase.auth.updateUser({
        password,
      });
      if (updateError) throw updateError;

      setDone(true);
      const role = data.user?.user_metadata?.role;
      setTimeout(() => {
        router.push(role === 'super_admin' ? '/super-admin' : '/admin');
        router.refresh();
      }, 1200);
    } catch (err) {
      setError(
        err instanceof Error && err.message.includes('different from the old')
          ? 'New password must be different from your old one.'
          : 'Could not update your password. The link may have expired — request a new one.'
      );
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
            New Password
          </p>
          <h1
            className="mt-3 font-serif text-deep text-center"
            style={{
              fontSize: 'clamp(1.5rem, 2.6vw, 1.875rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            Choose a <span className="italic">new password.</span>
          </h1>
        </div>

        {linkState === 'checking' && (
          <div className="bg-white border border-deep/10 rounded-md p-10 flex items-center justify-center gap-3 text-muted">
            <Loader2 size={16} className="animate-spin" />
            <span className="font-sans text-sm">Verifying your link…</span>
          </div>
        )}

        {linkState === 'invalid' && (
          <div className="bg-white border border-deep/10 rounded-md p-7 sm:p-8 text-center">
            <p className="font-serif text-lg text-deep">
              This link has expired.
            </p>
            <p className="mt-3 font-sans text-sm text-muted leading-relaxed">
              Reset links are valid for one hour and can only be used once.
            </p>
            <Link
              href="/admin/forgot-password"
              className="mt-6 inline-flex items-center justify-center bg-deep text-white font-roboto uppercase text-xs px-6 py-3 hover:bg-bold transition-colors"
              style={{ letterSpacing: '0.18em' }}
            >
              Request a new link
            </Link>
          </div>
        )}

        {linkState === 'ready' && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-deep/10 rounded-md p-7 sm:p-8 space-y-6"
          >
            {done ? (
              <div className="text-center py-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-deep/5 text-deep mb-4">
                  <ShieldCheck size={22} strokeWidth={1.75} />
                </span>
                <p className="font-serif text-lg text-deep">Password updated.</p>
                <p className="mt-2 font-sans text-sm text-muted">
                  Taking you to your dashboard…
                </p>
              </div>
            ) : (
              <>
                <label className="block">
                  <span
                    className="font-roboto text-[11px] uppercase text-muted"
                    style={{ letterSpacing: '0.22em' }}
                  >
                    New password
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="mt-2 w-full bg-white border-b border-deep/20 focus:border-deep focus:outline-none py-2.5 font-sans text-base text-deep transition-colors"
                  />
                </label>

                <label className="block">
                  <span
                    className="font-roboto text-[11px] uppercase text-muted"
                    style={{ letterSpacing: '0.22em' }}
                  >
                    Confirm password
                  </span>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
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
                  {loading ? 'Updating' : 'Set new password'}
                </button>
              </>
            )}
          </form>
        )}

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
