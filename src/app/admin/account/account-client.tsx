'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  PageHeader,
  Card,
  Button,
  Field,
  Toast,
  useToast,
  inputClass,
} from '@/components/admin/ui';

export function AccountClient({ email }: { email: string }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useToast();

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (next.length < 6) {
      setToast({ kind: 'error', message: 'New password must be at least 6 characters.' });
      return;
    }
    if (next !== confirm) {
      setToast({ kind: 'error', message: 'New password and confirmation do not match.' });
      return;
    }

    setSubmitting(true);
    setToast({ kind: 'saving' });
    try {
      const res = await fetch('/api/admin/account', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Failed to change password.');
      setCurrent('');
      setNext('');
      setConfirm('');
      setToast({ kind: 'saved' });
    } catch (err) {
      setToast({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Failed to change password.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="My account"
        description="Change the password you use to sign in to Whitesands admin."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <form onSubmit={submit} className="space-y-5">
            <Field label="Current password" required>
              <input
                type="password"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                required
                autoComplete="current-password"
                className={inputClass}
              />
            </Field>
            <Field
              label="New password"
              hint="Minimum 6 characters."
              required
            >
              <input
                type="password"
                value={next}
                onChange={(e) => setNext(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                className={inputClass}
              />
            </Field>
            <Field label="Confirm new password" required>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                className={inputClass}
              />
            </Field>

            <div className="flex items-center justify-end pt-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Updating' : 'Update password'}
              </Button>
            </div>
          </form>
        </Card>

        <Card className="p-6">
          <p
            className="font-roboto text-[10px] uppercase text-muted"
            style={{ letterSpacing: '0.28em' }}
          >
            Signed in as
          </p>
          <p className="mt-2 font-roboto text-sm font-semibold text-deep break-all">
            {email}
          </p>
          <hr className="my-5 border-deep/10" />
          <p className="font-sans text-xs text-muted leading-relaxed">
            Forgot your current password? Sign out and use{' '}
            <Link href="/admin/forgot-password" className="text-deep underline underline-offset-2">
              Forgot password
            </Link>{' '}
            on the sign-in page — a reset link will be emailed to you.
          </p>
        </Card>
      </div>

      <Toast state={toast} />
    </>
  );
}
