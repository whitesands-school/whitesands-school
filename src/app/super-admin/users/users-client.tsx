'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2, KeyRound, ShieldCheck, Search } from 'lucide-react';
import {
  PageHeader,
  Card,
  Button,
  Field,
  Toast,
  useToast,
  ConfirmInline,
  LoadingState,
  EmptyState,
  inputClass,
} from '@/components/admin/ui';

type Role = 'super_admin' | 'admin';
type UserRow = {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
};

const ROLE_LABEL: Record<Role, string> = {
  super_admin: 'Super-admin',
  admin: 'Admin',
};

const ROLE_BADGE: Record<Role, string> = {
  super_admin: 'bg-lemon/30 text-deep',
  admin: 'bg-deep/[0.06] text-deep',
};

export function UsersClient({ currentUserId }: { currentUserId: string }) {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useToast();
  const [creating, setCreating] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState<UserRow | null>(null);
  const [resetTarget, setResetTarget] = useState<UserRow | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/super-admin/users');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUsers(data);
    } catch {
      setToast({ kind: 'error', message: 'Could not load users.' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) => u.email.toLowerCase().includes(q) || ROLE_LABEL[u.role].toLowerCase().includes(q)
    );
  }, [users, query]);

  async function changeRole(user: UserRow, role: Role) {
    setToast({ kind: 'saving' });
    try {
      const res = await fetch(`/api/super-admin/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed.');
      }
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, role } : u)));
      setToast({ kind: 'saved' });
    } catch (err) {
      setToast({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Failed to change role.',
      });
    }
  }

  async function removeUser(user: UserRow) {
    setConfirmRemove(null);
    setToast({ kind: 'saving' });
    try {
      const res = await fetch(`/api/super-admin/users/${user.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed.');
      }
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      setToast({ kind: 'saved' });
    } catch (err) {
      setToast({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Failed to remove user.',
      });
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Governance"
        title="Users & roles"
        description="Anyone listed here can sign in to the Whitesands admin tools."
        actions={
          <Button onClick={() => setCreating(true)}>
            <Plus size={14} strokeWidth={2} />
            Add user
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="relative flex-1 sm:max-w-sm">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by email or role"
            className={`${inputClass} pl-9`}
          />
        </div>
      </div>

      {loading ? (
        <LoadingState />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={query ? 'Nothing matched.' : 'No users yet.'}
          description={
            query ? 'Try a different search.' : 'Invite your first admin to get started.'
          }
          action={
            !query && (
              <Button size="sm" onClick={() => setCreating(true)}>
                <Plus size={14} strokeWidth={2} />
                Add user
              </Button>
            )
          }
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((u) => {
            const isMe = u.id === currentUserId;
            return (
              <li key={u.id}>
                <Card className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <p className="font-roboto text-sm font-semibold text-deep truncate">
                          {u.email}
                        </p>
                        {isMe && (
                          <span
                            className="font-roboto text-[10px] uppercase text-muted"
                            style={{ letterSpacing: '0.22em' }}
                          >
                            (you)
                          </span>
                        )}
                      </div>
                      <p className="mt-1 font-sans text-xs text-muted">
                        Added {new Date(u.createdAt).toLocaleDateString('en-NG', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <RoleSelect
                        value={u.role}
                        disabled={isMe}
                        onChange={(role) => changeRole(u, role)}
                      />
                      <button
                        type="button"
                        onClick={() => setResetTarget(u)}
                        className="inline-flex items-center gap-1.5 font-roboto text-[11px] uppercase text-muted hover:text-deep px-2.5 py-1.5 cursor-pointer"
                        style={{ letterSpacing: '0.18em' }}
                        aria-label="Reset password"
                      >
                        <KeyRound size={12} strokeWidth={1.75} />
                        Reset
                      </button>
                      {!isMe && (
                        <button
                          type="button"
                          onClick={() => setConfirmRemove(u)}
                          className="text-muted hover:text-bold p-1.5 cursor-pointer"
                          aria-label="Remove user"
                        >
                          <Trash2 size={14} strokeWidth={1.75} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-sm font-roboto text-[10px] uppercase ${ROLE_BADGE[u.role]}`}
                      style={{ letterSpacing: '0.22em' }}
                    >
                      {u.role === 'super_admin' && (
                        <ShieldCheck size={11} strokeWidth={2} />
                      )}
                      {ROLE_LABEL[u.role]}
                    </span>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      {creating && (
        <CreateUserModal
          onClose={() => setCreating(false)}
          onCreated={(user) => {
            setUsers((prev) => [user, ...prev]);
            setCreating(false);
            setToast({ kind: 'saved' });
          }}
          onError={(message) => setToast({ kind: 'error', message })}
        />
      )}

      {resetTarget && (
        <ResetPasswordModal
          user={resetTarget}
          onClose={() => setResetTarget(null)}
          onDone={() => {
            setResetTarget(null);
            setToast({ kind: 'saved' });
          }}
          onError={(message) => setToast({ kind: 'error', message })}
        />
      )}

      <ConfirmInline
        open={!!confirmRemove}
        message={
          confirmRemove
            ? `Remove ${confirmRemove.email}? They will lose access immediately.`
            : ''
        }
        confirmLabel="Remove"
        onConfirm={() => confirmRemove && removeUser(confirmRemove)}
        onCancel={() => setConfirmRemove(null)}
      />

      <Toast state={toast} />
    </>
  );
}

function RoleSelect({
  value,
  disabled,
  onChange,
}: {
  value: Role;
  disabled?: boolean;
  onChange: (role: Role) => void;
}) {
  return (
    <div className="inline-flex items-center bg-deep/[0.04] border border-deep/10 rounded-sm overflow-hidden">
      {(['admin', 'super_admin'] as Role[]).map((r) => {
        const active = value === r;
        return (
          <button
            key={r}
            type="button"
            disabled={disabled}
            onClick={() => !active && onChange(r)}
            className={[
              'px-3 py-1.5 font-roboto text-[10px] uppercase transition-colors',
              active
                ? 'bg-deep text-white'
                : disabled
                ? 'text-muted/40'
                : 'text-muted hover:text-deep cursor-pointer',
            ].join(' ')}
            style={{ letterSpacing: '0.22em' }}
          >
            {ROLE_LABEL[r]}
          </button>
        );
      })}
    </div>
  );
}

function CreateUserModal({
  onClose,
  onCreated,
  onError,
}: {
  onClose: () => void;
  onCreated: (user: UserRow) => void;
  onError: (message: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('admin');
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/super-admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password, role }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'Failed to create user.');
      onCreated(body);
    } catch (err) {
      setSubmitting(false);
      onError(err instanceof Error ? err.message : 'Failed to create user.');
    }
  }

  return (
    <ModalShell onClose={onClose} title="Add a new user">
      <form onSubmit={submit} className="space-y-5">
        <Field label="Email" required>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            placeholder="name@whitesands.org.ng"
            className={inputClass}
          />
        </Field>
        <Field
          label="Temporary password"
          hint="Minimum 6 characters. The user can change it after signing in."
          required
        >
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className={`${inputClass} font-mono`}
          />
        </Field>
        <Field label="Role" required>
          <RoleSelect value={role} onChange={setRole} />
        </Field>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Creating' : 'Create user'}
          </Button>
        </div>
      </form>
    </ModalShell>
  );
}

function ResetPasswordModal({
  user,
  onClose,
  onDone,
  onError,
}: {
  user: UserRow;
  onClose: () => void;
  onDone: () => void;
  onError: (message: string) => void;
}) {
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/super-admin/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed to reset password.');
      }
      onDone();
    } catch (err) {
      setSubmitting(false);
      onError(err instanceof Error ? err.message : 'Failed to reset password.');
    }
  }

  return (
    <ModalShell onClose={onClose} title={`Reset password for ${user.email}`}>
      <form onSubmit={submit} className="space-y-5">
        <Field
          label="New password"
          hint="Minimum 6 characters. Share it with the user securely."
          required
        >
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoFocus
            className={`${inputClass} font-mono`}
          />
        </Field>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Resetting' : 'Reset password'}
          </Button>
        </div>
      </form>
    </ModalShell>
  );
}

function ModalShell({
  onClose,
  title,
  children,
}: {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-deep/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-sm shadow-2xl max-w-md w-full p-6 sm:p-8">
        <p
          className="font-roboto text-[11px] uppercase text-deep mb-5"
          style={{ letterSpacing: '0.28em' }}
        >
          {title}
        </p>
        {children}
      </div>
    </div>
  );
}
