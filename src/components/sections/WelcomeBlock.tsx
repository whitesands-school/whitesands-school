import { AnimatedSection, SectionLabel } from '@/components/ui';
import Link from 'next/link';

export function WelcomeBlock() {
  return (
    <section className="bg-white py-24">
      <AnimatedSection className="max-w-3xl mx-auto text-center px-6">
        <div className="flex justify-center mb-5">
          <SectionLabel label="Welcome to Whitesands" />
        </div>
        <h2 className="font-serif text-4xl text-dark leading-snug mb-6">
          A School That Launches You Into the Deep
        </h2>
        <p className="font-sans text-lg text-muted leading-relaxed mb-8">
          Founded on the Catholic conviction that every child is made for greatness, Whitesands
          School has spent twenty-five years nurturing curious minds and faithful hearts in the
          heart of Nigeria. We believe education is never merely academic — it is the whole
          formation of a person: intellect, character, and soul, shaped by a community that
          genuinely cares.
        </p>
        <Link
          href="/about"
          className="font-sans text-base font-medium text-deep underline underline-offset-4 hover:text-bold transition-colors duration-200"
        >
          Find Out More →
        </Link>
      </AnimatedSection>
    </section>
  );
}
