import { NextResponse } from 'next/server';
import { z } from 'zod';
import { SITE } from '@/lib/site';
import { appendInboxEntry } from '@/lib/inbox';

const MessageSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.email(),
  subject: z.string().min(2).max(160),
  message: z.string().min(10).max(4000),
});

export type ContactMessage = z.infer<typeof MessageSchema>;

const TO_ADDRESS = process.env.CONTACT_MESSAGE_TO ?? SITE.email;
const FROM_ADDRESS =
  process.env.CONTACT_MESSAGE_FROM ??
  `Whitesands Website <noreply@whitesands.org.ng>`;

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = MessageSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const msg = parsed.data;

  // Persist to the admin inbox first — email is best-effort on top.
  try {
    await appendInboxEntry({
      type: 'contact',
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
    });
  } catch (err) {
    console.error('[contact-message] inbox write failed', err);
  }

  console.info('[contact-message]', {
    receivedAt: new Date().toISOString(),
    ...msg,
  });

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);

      // 1. Notify the school
      const adminSend = resend.emails.send({
        from: FROM_ADDRESS,
        to: TO_ADDRESS,
        replyTo: msg.email,
        subject: `[Website] ${msg.subject}`,
        text: formatAdminBody(msg),
      });

      // 2. Send a confirmation copy back to the sender
      const confirmSend = resend.emails.send({
        from: FROM_ADDRESS,
        to: msg.email,
        replyTo: TO_ADDRESS,
        subject: 'We received your message — Whitesands School',
        text: formatConfirmBody(msg),
      });

      await Promise.allSettled([adminSend, confirmSend]);
    } catch (err) {
      console.error('[contact-message] Resend send failed', err);
      // Don't fail the request — the message is already logged.
    }
  }

  return NextResponse.json({ ok: true });
}

function formatAdminBody(m: ContactMessage): string {
  return [
    `From:    ${m.name}`,
    `Email:   ${m.email}`,
    `Subject: ${m.subject}`,
    '',
    'Message:',
    m.message.trim(),
  ].join('\n');
}

function formatConfirmBody(m: ContactMessage): string {
  return [
    `Dear ${m.name.split(/\s+/)[0]},`,
    '',
    'Thank you for getting in touch with Whitesands School.',
    '',
    'We have received your message and the school will reply within one',
    'working day at this email address.',
    '',
    'A copy of what you sent:',
    `  Subject: ${m.subject}`,
    '',
    m.message.trim(),
    '',
    'If your matter is urgent, please call us on ' + SITE.phone + '.',
    '',
    '— Whitesands School',
    `${SITE.address.full}`,
    `${SITE.url}`,
  ].join('\n');
}
