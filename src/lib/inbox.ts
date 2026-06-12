import { randomUUID } from 'crypto';
import { readContent, writeContent } from '@/lib/content-store';

/**
 * Website form submissions (contact messages + visit requests) are persisted
 * in the `site-content` storage bucket so nothing is lost even when outbound
 * email isn't configured — and so they survive serverless deploys, where the
 * filesystem is read-only. The admin reads them at /admin/inbox.
 */

export type InboxEntryType = 'contact' | 'visit';

export interface InboxEntry {
  id: string;
  type: InboxEntryType;
  receivedAt: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  sonClass?: string;
  preferredWeek?: string;
}

export async function readInbox(): Promise<InboxEntry[]> {
  try {
    return await readContent<InboxEntry[]>('inbox');
  } catch {
    return [];
  }
}

export async function writeInbox(entries: InboxEntry[]): Promise<void> {
  await writeContent('inbox', entries);
}

export async function appendInboxEntry(
  entry: Omit<InboxEntry, 'id' | 'receivedAt'>
): Promise<InboxEntry> {
  const full: InboxEntry = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    ...entry,
  };
  // Newest first — that's the order the admin reads them in.
  await writeInbox([full, ...(await readInbox())]);
  return full;
}
