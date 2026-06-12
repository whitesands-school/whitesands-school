import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Admissions',
  description: 'Apply to Whitesands School, an all-boys Catholic secondary school in Lekki, Lagos. Entry into JS1 with limited transfer places — see the process, dates, and how to book a visit.',
};

// FAQPage structured data — answers the questions parents actually search,
// and makes the admissions page eligible for rich results.
const FAQ = [
  {
    q: 'Is Whitesands School a boys-only school?',
    a: 'Yes. Whitesands School is an all-boys Catholic secondary school in Lekki Phase 1, Lagos, running Junior Secondary (JS1–JS3) and Senior Secondary (SS1–SS3).',
  },
  {
    q: 'Which classes does Whitesands School admit into?',
    a: 'The main entry point is JS1. A limited number of transfer places are available into JS2, JS3 and SS1, subject to assessment.',
  },
  {
    q: 'Where is Whitesands School located?',
    a: `Whitesands School is at ${SITE.address.full}.`,
  },
  {
    q: 'How do I apply to Whitesands School?',
    a: 'Start the application online at applications.whitesands.org.ng, pay the application fee, and your son sits the entrance examination. Shortlisted families are invited for an interview.',
  },
  {
    q: 'Can we visit the school before applying?',
    a: 'Yes — families are encouraged to book a visit and walk the campus during a school day. Use the Book a Visit form on the admissions page and the team will confirm a date within 48 hours.',
  },
];

function FaqJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function AdmissionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FaqJsonLd />
      {children}
    </>
  );
}
