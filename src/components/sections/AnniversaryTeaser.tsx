import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui';
import { media } from '@/lib/media';

export function AnniversaryTeaser() {
  return (
    <section className="relative bg-deep py-20 overflow-hidden">
      {/* faint backdrop */}
      <div className="absolute inset-0 opacity-[0.15]">
        <Image
          src={media('/images/students/awarding-medals.jpg')}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-deep via-deep/95 to-deep/70" />

      <div className="relative max-w-7xl mx-auto px-6">
        <AnimatedSection className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-10 md:gap-16">
          {/* Real anniversary logo */}
          <div className="relative w-45 h-45 sm:w-55 sm:h-55 mx-auto md:mx-0 shrink-0">
            <Image
              src={media('/images/anniversary-logo/anniversary-logo-white.png')}
              alt="Whitesands 25th Anniversary"
              fill
              sizes="220px"
              className="object-contain drop-shadow-[0_0_30px_rgba(255,247,0,0.18)]"
            />
          </div>

          {/* Text */}
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-3 font-roboto text-xs tracking-[0.28em] uppercase text-lemon">
              <span className="block h-px w-8 bg-lemon" />
              Silver Jubilee · 1999 – 2024
            </span>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl text-white leading-[1.05] tracking-tight">
              Twenty-five years of <span className="italic text-lemon">Duc in Altum</span>.
            </h2>
            <p className="mt-5 font-sans text-lg text-white/75 leading-relaxed max-w-2xl">
              A jubilee year of thanksgiving — for the parents, teachers and
              students who built this community, and for the generations still
              to come.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-3">
              <Link
                href="/25th-anniversary"
                className="group inline-flex items-center gap-2 bg-lemon text-deep font-roboto font-semibold text-base px-7 py-4 rounded-sm hover:bg-white transition-colors"
              >
                Visit the Jubilee page
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/about/history"
                className="font-roboto font-medium text-base text-white/85 hover:text-lemon transition-colors"
              >
                Read the school&apos;s story →
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
