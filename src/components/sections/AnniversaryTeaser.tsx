import Link from 'next/link';
import { AnimatedSection, Button } from '@/components/ui';

export function AnniversaryTeaser() {
  return (
    <section className="bg-lemon py-14">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="flex flex-col md:flex-row items-center gap-12">
          {/* Anniversary badge */}
          <div className="shrink-0">
            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="25th Anniversary badge — 1999 to 2024"
            >
              <circle cx="80" cy="80" r="72" stroke="#1A1530" strokeWidth="2" strokeDasharray="4 3" />
              <circle cx="80" cy="80" r="65" stroke="#1A1530" strokeWidth="1" opacity="0.3" />
              <circle cx="80" cy="80" r="58" fill="#2C246B" />
              <text
                x="80"
                y="86"
                textAnchor="middle"
                fontFamily="Roboto, sans-serif"
                fontWeight="900"
                fontSize="44"
                fill="#FFF700"
              >
                25
              </text>
              <text
                x="80"
                y="104"
                textAnchor="middle"
                fontFamily="Roboto, sans-serif"
                fontWeight="600"
                fontSize="10"
                fill="white"
                letterSpacing="3"
              >
                YEARS
              </text>
              <text
                x="80"
                y="128"
                textAnchor="middle"
                fontFamily="Roboto, sans-serif"
                fontWeight="500"
                fontSize="10"
                fill="#1A1530"
              >
                1999 – 2024
              </text>
            </svg>
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-4">
            <h2 className="font-roboto font-black text-4xl text-dark">
              Celebrating 25 Years of Excellence
            </h2>
            <p className="font-serif italic text-xl text-dark/70">
              Duc in Altum — a quarter century of forming hearts and minds.
            </p>
            <div>
              <Link href="/25th-anniversary">
                <Button variant="primary" size="lg">
                  See the Anniversary Page →
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
