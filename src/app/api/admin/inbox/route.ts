import { NextResponse } from 'next/server';
import { readInbox, writeInbox } from '@/lib/inbox';

// GET /api/admin/inbox — newest-first list of form submissions.
export async function GET() {
  return NextResponse.json(await readInbox());
}

// DELETE /api/admin/inbox?id=... — remove one entry.
export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  const entries = await readInbox();
  const next = entries.filter((e) => e.id !== id);
  if (next.length === entries.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  await writeInbox(next);
  return NextResponse.json({ ok: true });
}
