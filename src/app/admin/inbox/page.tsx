'use client';

import { useEffect, useMemo, useState } from 'react';
import { Mail, CalendarCheck, Trash2, Phone, Copy, Check } from 'lucide-react';
import {
  PageHeader,
  Card,
  Button,
  Toast,
  useToast,
  ConfirmInline,
  LoadingState,
  EmptyState,
} from '@/components/admin/ui';
import type { InboxEntry } from '@/lib/inbox';

type Filter = 'all' | 'visit' | 'contact';

export default function AdminInboxPage() {
  const [entries, setEntries] = useState<InboxEntry[] | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [deleting, setDeleting] = useState<InboxEntry | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toast, setToast] = useToast();

  useEffect(() => {
    fetch('/api/admin/inbox')
      .then((r) => r.json())
      .then(setEntries)
      .catch(() =>
        setToast({ kind: 'error', message: 'Could not load the inbox.' })
      );
  }, [setToast]);

  const visible = useMemo(() => {
    if (!entries) return [];
    return filter === 'all' ? entries : entries.filter((e) => e.type === filter);
  }, [entries, filter]);

  const counts = useMemo(
    () => ({
      all: entries?.length ?? 0,
      visit: entries?.filter((e) => e.type === 'visit').length ?? 0,
      contact: entries?.filter((e) => e.type === 'contact').length ?? 0,
    }),
    [entries]
  );

  async function remove(entry: InboxEntry) {
    setDeleting(null);
    const prev = entries;
    setEntries((es) => (es ? es.filter((e) => e.id !== entry.id) : es));
    try {
      const res = await fetch(`/api/admin/inbox?id=${entry.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      setToast({ kind: 'saved', message: 'Removed' });
    } catch {
      setEntries(prev);
      setToast({ kind: 'error', message: 'Could not delete. Try again.' });
    }
  }

  async function copyEmail(entry: InboxEntry) {
    try {
      await navigator.clipboard.writeText(entry.email);
      setCopiedId(entry.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // Clipboard unavailable — the address is visible either way.
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Enquiries"
        title="Inbox"
        description="Visit requests and contact messages submitted through the website, newest first."
      />

      {/* Filter pills */}
      <div className="flex items-center gap-2 mb-8">
        {(
          [
            { value: 'all', label: 'All' },
            { value: 'visit', label: 'Visit requests' },
            { value: 'contact', label: 'Messages' },
          ] as { value: Filter; label: string }[]
        ).map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={[
              'px-4 py-2 rounded-full font-roboto text-[11px] uppercase transition-colors cursor-pointer',
              filter === value
                ? 'bg-deep text-white'
                : 'bg-white border border-deep/15 text-muted hover:text-deep hover:border-deep/40',
            ].join(' ')}
            style={{ letterSpacing: '0.14em' }}
          >
            {label}
            <span className="ml-2 opacity-60">{counts[value]}</span>
          </button>
        ))}
      </div>

      {entries === null ? (
        <LoadingState />
      ) : visible.length === 0 ? (
        <EmptyState
          title="Nothing here yet"
          description="When a parent books a visit or sends a message through the website, it appears here."
        />
      ) : (
        <ul className="space-y-4">
          {visible.map((entry) => (
            <li key={entry.id}>
              <Card className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={[
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-roboto text-[10px] uppercase',
                          entry.type === 'visit'
                            ? 'bg-lemon/30 text-deep'
                            : 'bg-deep/8 text-deep',
                        ].join(' ')}
                        style={{ letterSpacing: '0.14em' }}
                      >
                        {entry.type === 'visit' ? (
                          <CalendarCheck size={11} />
                        ) : (
                          <Mail size={11} />
                        )}
                        {entry.type === 'visit' ? 'Visit request' : 'Message'}
                      </span>
                      <p className="font-roboto text-sm font-semibold text-deep">
                        {entry.name}
                      </p>
                      <time
                        dateTime={entry.receivedAt}
                        className="font-sans text-xs text-muted"
                      >
                        {new Date(entry.receivedAt).toLocaleString('en-NG', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </time>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-sans text-sm text-dark/80">
                      <button
                        type="button"
                        onClick={() => copyEmail(entry)}
                        className="inline-flex items-center gap-1.5 hover:text-deep transition-colors cursor-pointer"
                        title="Copy email address"
                      >
                        {copiedId === entry.id ? (
                          <Check size={13} className="text-deep" />
                        ) : (
                          <Copy size={13} className="text-muted" />
                        )}
                        {entry.email}
                      </button>
                      {entry.phone && (
                        <a
                          href={`tel:${entry.phone.replace(/[^+\d]/g, '')}`}
                          className="inline-flex items-center gap-1.5 hover:text-deep transition-colors"
                        >
                          <Phone size={13} className="text-muted" />
                          {entry.phone}
                        </a>
                      )}
                      {entry.sonClass && (
                        <span className="text-muted">
                          Class: <span className="text-dark/80">{entry.sonClass}</span>
                        </span>
                      )}
                      {entry.preferredWeek && (
                        <span className="text-muted">
                          Week: <span className="text-dark/80">{entry.preferredWeek}</span>
                        </span>
                      )}
                    </div>

                    {(entry.subject || entry.message) && (
                      <div className="mt-4 border-l-2 border-deep/15 pl-4">
                        {entry.subject && (
                          <p className="font-roboto text-xs font-semibold text-deep mb-1">
                            {entry.subject}
                          </p>
                        )}
                        {entry.message && (
                          <p className="font-sans text-sm text-dark/75 leading-relaxed whitespace-pre-line">
                            {entry.message}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`mailto:${entry.email}`}
                      className="inline-flex items-center gap-2 border border-deep/20 text-deep hover:border-deep hover:bg-deep/5 rounded-sm px-3.5 py-2 font-roboto uppercase text-[10px] transition-colors"
                      style={{ letterSpacing: '0.16em' }}
                    >
                      Reply
                    </a>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setDeleting(entry)}
                      aria-label={`Delete entry from ${entry.name}`}
                    >
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <ConfirmInline
        open={!!deleting}
        message={`Delete the ${deleting?.type === 'visit' ? 'visit request' : 'message'} from ${deleting?.name}? This cannot be undone.`}
        onConfirm={() => deleting && remove(deleting)}
        onCancel={() => setDeleting(null)}
      />

      <Toast state={toast} />
    </>
  );
}
