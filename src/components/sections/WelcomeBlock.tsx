import Link from 'next/link';
import { AnimatedSection } from '@/components/ui';

export function WelcomeBlock() {
  return (
    <section id="welcome" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — eyebrow + serif headline */}
          <AnimatedSection className="lg:col-span-5">
            <p
              className="font-roboto text-xs uppercase text-deep"
              style={{ letterSpacing: '0.28em' }}
            >
              Welcome
            </p>
            <h2
              className="mt-5 font-serif text-dark"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              Welcome to{' '}
              <span className="italic text-deep">Whitesands.</span>
            </h2>
          </AnimatedSection>

          {/* Right — body copy + link */}
          <AnimatedSection delay={0.12} className="lg:col-span-7">
            <div className="space-y-6 font-sans text-lg text-dark/80 leading-relaxed max-w-2xl">
              <p>
                Whitesands opened its doors in October 2000, with a small intake
                of boys and a single conviction — that a school is, first, a
                community of parents, teachers and students working towards the
                same end.
              </p>
              <p>
                Twenty-five years later, we have grown into one of the most
                respected schools in Lagos. Our classrooms are full, our
                academic results consistently rank among the strongest in the
                country, and our chapel still sits at the centre of the
                campus.
              </p>
              <p>
                More than a thousand boys have graduated from Whitesands. They
                are doctors, engineers, lawyers, founders and fathers. What
                they share is a formation — intellectual, moral and
                spiritual — that began here.
              </p>
            </div>

            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-2 font-roboto uppercase text-sm text-deep hover:text-bold transition-colors"
              style={{ letterSpacing: '0.2em' }}
            >
              Read our story
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
