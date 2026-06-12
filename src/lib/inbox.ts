import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';

/**
 * Website form submissions (contact messages + visit requests) are persisted
 * here so nothing is lost even when outbound email isn't configured. The
 * admin reads them at /admin/inbox.
 *
 * Storage matches the rest of the admin content system: a JSON file under
 * src/content/.
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

const INBOX_PATH = join(process.cwd(), 'src/content/inbox.json');

export function readInbox(): InboxEntry[] {
  if (!existsSync(INBOX_PATH)) return [];
  try {
    return JSON.parse(readFileSync(INBOX_PATH, 'utf-8'));
  } catch {
    return [];
  }
}

export function writeInbox(entries: InboxEntry[]): void {
  writeFileSync(INBOX_PATH, JSON.stringify(entries, null, 2) + '\n');
}

export function appendInboxEntry(
  entry: Omit<InboxEntry, 'id' | 'receivedAt'>
): InboxEntry {
  const full: InboxEntry = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    ...entry,
  };
  // Newest first — that's the order the admin reads them in.
  writeInbox([full, ...readInbox()]);
  return full;
}
