import Link from 'next/link';
import { PageHero } from '@/components/sections/PageHero';
import { media } from '@/lib/media';
import { SITE } from '@/lib/site';

// The appeal text and account details are kept here so they are easy to find
// and update. If these need to change often, they can later be moved into the
// admin content store like the rest of the editable content.
const GOAL = '₦500,000,000';
const GOAL_WORDS = 'Five hundred million naira';
const HORIZON = 'over a five-year period';

const APPEAL: string[] = [
  'The Whitesands School Endowment Fund is a project that is very close to our hearts. Your generosity is crucial. Our desire is to provide scholarships to deserving, yet financially disadvantaged, students which in turn will significantly improve the educational atmosphere for all students at Whitesands School.',
  'Since its inception, Whitesands School has been committed to providing an exceptional educational experience that empowers students to become leaders, innovators, and change-makers. However, the rising cost of education has placed a significant financial burden on families, denying many talented students access to the transformative opportunities our institution offers.',
  'To address this challenge, we have established the Whitesands School Alumni Endowment Fund, with the dual aim of providing scholarships to meritorious students facing financial hardships, and enhancing the overall student experience at our school.',
  'Your contribution to the endowment fund will directly impact the lives of many children, empowering them to reach their full potential. By supporting the next generation of leaders, you are ensuring that Whitesands School continues to inspire academic excellence for generations to come.',
  'We understand that you have many options when it comes to philanthropy and charitable giving and are sincerely grateful for your consideration.',
];

interface DonationAccount {
  currency: string;
  bank: string;
  number: string;
  name: string;
}

const ACCOUNTS: DonationAccount[] = [
  {
    currency: 'Naira account',
    bank: 'Globus Bank',
    number: '1000199932',
    name: 'IEF/Whitesands School Alumni Fund',
  },
  {
    currency: 'Dollar account',
    bank: 'Guaranty Trust Bank',
    number: '0725187487',
    name: 'Whitesands School USD fee collection account',
  },
];

const SERIF_H: React.CSSProperties = {
  fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)',
  lineHeight: 1.12,
  letterSpacing: '-0.02em',
};

export default function EndowmentPage() {
  return (
    <>
      <PageHero
        size="medium"
        image={media('/images/students/graduands-in-a-file-walking.jpg')}
        imageAlt="Whitesands graduands in procession"
        overlay={0.62}
        eyebrow="Alumni · Giving"
        title={
          <>
            The Endowment <span className="italic text-lemon">Fund.</span>
          </>
        }
        subtitle="An appeal to the alumni of Whitesands School — building scholarships and opportunity that last in perpetuity."
      />

      {/* Appeal */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
          <p className="font-serif text-2xl text-deep">Dear Friends,</p>

          <div className="mt-8 space-y-6 font-serif text-lg text-dark/85 leading-[1.65]">
            {APPEAL.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Goal callout */}
          <div className="my-14 border-y border-deep/15 py-12 text-center">
            <p
              className="font-roboto text-[11px] uppercase text-muted"
              style={{ letterSpacing: '0.28em' }}
            >
              Our five-year goal
            </p>
            <p className="mt-4 font-serif text-deep" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1 }}>
              {GOAL}
            </p>
            <p className="mt-4 font-sans text-base text-dark/70 max-w-xl mx-auto leading-relaxed">
              {GOAL_WORDS}, raised {HORIZON}, to support initiatives, projects
              and services that enhance learning at Whitesands School in
              perpetuity.
            </p>
          </div>
        </div>
      </section>

      {/* How to give */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl">
            <p
              className="font-roboto text-xs uppercase text-deep"
              style={{ letterSpacing: '0.28em' }}
            >
              How to give
            </p>
            <h2 className="mt-5 font-serif text-deep" style={SERIF_H}>
              Make your contribution{' '}
              <span className="italic">directly.</span>
            </h2>
            <p className="mt-5 font-sans text-base text-dark/70 leading-relaxed">
              Donations can be made to either of the designated accounts below.
              For pledges, gift documentation, or any questions, the school
              would be glad to hear from you.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ACCOUNTS.map((acct) => (
              <div
                key={acct.number}
                className="bg-white border-t-2 border-lemon rounded-sm p-7 lg:p-8 shadow-[0_12px_32px_-20px_rgba(44,36,107,0.25)]"
              >
                <p
                  className="font-roboto text-[11px] uppercase text-muted"
                  style={{ letterSpacing: '0.24em' }}
                >
                  {acct.currency}
                </p>
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="font-roboto text-[10px] uppercase text-muted" style={{ letterSpacing: '0.2em' }}>
                      Bank
                    </dt>
                    <dd className="mt-1 font-serif text-xl text-deep">{acct.bank}</dd>
                  </div>
                  <div>
                    <dt className="font-roboto text-[10px] uppercase text-muted" style={{ letterSpacing: '0.2em' }}>
                      Account number
                    </dt>
                    <dd className="mt-1 font-sans text-xl text-deep tabular-nums tracking-wide">
                      {acct.number}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-roboto text-[10px] uppercase text-muted" style={{ letterSpacing: '0.2em' }}>
                      Account name
                    </dt>
                    <dd className="mt-1 font-sans text-base text-dark/80 leading-snug">
                      {acct.name}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          <p className="mt-10 font-sans text-sm text-muted leading-relaxed max-w-2xl">
            Already given, or planning a larger gift? Please{' '}
            <Link href="/contact" className="text-deep underline underline-offset-2 hover:text-bold transition-colors">
              get in touch
            </Link>{' '}
            so the school can acknowledge your contribution and keep you updated
            on the fund&apos;s impact. You can also reach the Alumni Office at{' '}
            <a href={`mailto:${SITE.alumniEmail}`} className="text-deep underline underline-offset-2 hover:text-bold transition-colors">
              {SITE.alumniEmail}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
