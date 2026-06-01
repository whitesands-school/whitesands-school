import { NextResponse } from 'next/server';
import { z } from 'zod';
import { SITE } from '@/lib/site';

const InquirySchema = z.object({
  parentName: z.string().min(2).max(120),
  email: z.email(),
  phone: z
    .string()
    .min(7)
    .max(24)
    .regex(/^\+?[\d\s()-]+$/, 'Invalid phone'),
  sonClass: z.string().min(1),
  preferredWeek: z.string().min(1),
  message: z.string().max(2000).optional().default(''),
});

export type VisitInquiry = z.infer<typeof InquirySchema>;

const TO_ADDRESS = process.env.VISIT_INQUIRY_TO ?? SITE.admissionsEmail;
const FROM_ADDRESS =
  process.env.VISIT_INQUIRY_FROM ??
  `Whitesands Admissions <noreply@whitesands.org.ng>`;

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = InquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const inquiry = parsed.data;

  // Always log — gives the team a paper trail even when email isn't wired.
  console.info('[visit-inquiry]', {
    receivedAt: new Date().toISOString(),
    ...inquiry,
  });

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);

      // 1. Notify admissions
      const adminSend = resend.emails.send({
        from: FROM_ADDRESS,
        to: TO_ADDRESS,
        replyTo: inquiry.email,
        subject: `New visit request — ${inquiry.parentName}`,
        text: formatAdminBody(inquiry),
      });

      // 2. Confirm to the parent — gives them something to keep and
      //    reassures them the request was received.
      const confirmSend = resend.emails.send({
        from: FROM_ADDRESS,
        to: inquiry.email,
        replyTo: TO_ADDRESS,
        subject: 'We received your visit request — Whitesands School',
        text: formatConfirmBody(inquiry),
      });

      // Run in parallel; either failing is non-fatal for the inquiry record.
      await Promise.allSettled([adminSend, confirmSend]);
    } catch (err) {
      console.error('[visit-inquiry] Resend send failed', err);
      // Don't fail the request — the inquiry is already logged.
    }
  }

  return NextResponse.json({ ok: true });
}

function formatAdminBody(i: VisitInquiry): string {
  return [
    `Parent: ${i.parentName}`,
    `Email:  ${i.email}`,
    `Phone:  ${i.phone}`,
    `Son's class: ${i.sonClass}`,
    `Preferred week: ${i.preferredWeek}`,
    '',
    'Message:',
    i.message?.trim() || '(none)',
  ].join('\n');
}

function formatConfirmBody(i: VisitInquiry): string {
  return [
    `Dear ${i.parentName.split(/\s+/)[0]},`,
    '',
    'Thank you for your interest in Whitesands School.',
    '',
    'We have received your request for a visit during the week you indicated.',
    'A member of the admissions team will be in touch within 48 hours to',
    'confirm a date and time that works for your family.',
    '',
    'A copy of your request:',
    `  Preferred week: ${i.preferredWeek}`,
    `  Son's class:    ${i.sonClass}`,
    `  Phone:          ${i.phone}`,
    '',
    'If you need to reach us before then, you can reply to this email or',
    `call us on ${SITE.phone}.`,
    '',
    'Duc in Altum.',
    '',
    '— The Admissions Office, Whitesands School',
    `${SITE.address.full}`,
    `${SITE.url}`,
  ].join('\n');
}
