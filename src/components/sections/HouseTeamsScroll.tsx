'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

interface House {
  name: string;
  mascot: string;
  blurb: string;
  barClass: string;
}

const houses: House[] = [
  {
    name: 'Alps',
    mascot: 'Ibex',
    blurb: 'A house known for tenacity.',
    barClass: 'bg-red-600',
  },
  {
    name: 'Appalachians',
    mascot: 'Black Bear',
    blurb: 'A house with deep roots and patient strength.',
    barClass: 'bg-green-600',
  },
  {
    name: 'Andes',
    mascot: 'Condor',
    blurb: 'A house that runs long.',
    barClass: 'bg-orange-500',
  },
  {
    name: 'Atlas',
    mascot: 'Lion',
    blurb: 'A house that carries its weight, quietly.',
    barClass: 'bg-lemon',
  },
  {
    name: 'Himalayas',
    mascot: 'Snow Leopard',
    blurb: 'A house that climbs higher than the rest.',
    barClass: 'bg-blue-700',
  },
  {
    name: 'Pyrenees',
    mascot: 'Golden Eagle',
    blurb: 'A house that holds its line.',
    barClass: 'bg-deep',
  },
];

export function HouseTeamsScroll() {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track which card is centred under the scroll position — drives the dot indicator.
  const updateActive = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.children;
    if (!cards.length) return;
    const scrollCentre = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let closestDelta = Infinity;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const cardCentre = card.offsetLeft + card.offsetWidth / 2;
      const delta = Math.abs(cardCentre - scrollCentre);
      if (delta < closestDelta) {
        closestDelta = delta;
        closest = i;
      }
    }
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateActive();
    el.addEventListener('scroll', updateActive, { passive: true });
    return () => el.removeEventListener('scroll', updateActive);
  }, [updateActive]);

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' });
  };

  return (
    <section className="bg-offwhite py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl">
          <p
            className="font-roboto text-xs uppercase text-deep"
            style={{ letterSpacing: '0.28em' }}
          >
            Six houses, one school
          </p>
          <h2
            className="mt-5 font-serif text-deep"
            style={{
              fontSize: 'clamp(2.25rem, 4.4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            The boys belong to a house. The houses make the school feel{' '}
            <span className="italic">small.</span>
          </h2>
        </div>

        {/* Cards — horizontal scroll on mobile/tablet, grid on lg+ */}
        <div className="relative mt-14 lg:mx-0">
          {/* Edge fade on the right hints at more content (mobile/tablet only) */}
          <div
            aria-hidden
            className="lg:hidden absolute top-0 bottom-0 right-0 w-12 bg-linear-to-l from-offwhite to-transparent pointer-events-none z-10"
          />

          <ul
            ref={scrollRef}
            className="flex lg:grid lg:grid-cols-6 gap-5 lg:gap-5 overflow-x-auto lg:overflow-visible scroll-smooth -mx-6 sm:-mx-10 lg:mx-0 px-6 sm:px-10 lg:px-0 pb-2 lg:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{
              scrollSnapType: 'x mandatory',
              scrollPaddingLeft: '1.5rem',
            }}
          >
            {houses.map((house, i) => (
              <motion.li
                key={house.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ scrollSnapAlign: 'start' }}
                // Mobile: 78vw shows the active card prominently with the next
                // card peeking ~15% on the right. Capped at 320px so on tablets
                // (and small laptops) it never balloons.
                className="shrink-0 w-[78vw] max-w-[320px] sm:w-70 lg:w-auto lg:max-w-none"
              >
                <article className="group bg-white rounded-md overflow-hidden shadow-[0_12px_32px_-18px_rgba(44,36,107,0.22)] aspect-3/4 flex flex-col transition-all duration-300 lg:hover:-translate-y-1 lg:hover:shadow-lg">
                  <div className={`h-2 shrink-0 ${house.barClass}`} />
                  <div className="flex-1 p-7 lg:p-6 flex flex-col">
                    <h3 className="font-serif text-3xl lg:text-2xl text-deep leading-tight">
                      {house.name}
                    </h3>
                    <p
                      className="mt-3 font-roboto text-[10px] uppercase text-muted"
                      style={{ letterSpacing: '0.22em' }}
                    >
                      Mascot — {house.mascot}
                    </p>
                    <p className="mt-6 lg:mt-5 font-sans text-base lg:text-sm text-dark/75 leading-relaxed">
                      {house.blurb}
                    </p>
                  </div>
                </article>
              </motion.li>
            ))}
          </ul>

          {/* Paging dots — mobile/tablet only */}
          <div className="lg:hidden mt-6 flex items-center justify-center gap-2">
            {houses.map((house, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={house.name}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Show ${house.name}`}
                  className="group p-2 -m-2"
                >
                  <span
                    className={[
                      'block h-0.75 rounded-full transition-all duration-300',
                      isActive
                        ? 'w-8 bg-deep'
                        : 'w-3 bg-deep/20 group-hover:bg-deep/40',
                    ].join(' ')}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Footnote */}
        <p className="mt-10 font-sans text-sm text-muted max-w-2xl leading-relaxed">
          House team assignments are made to keep competitions balanced. Every
          boy is in a house for life.
        </p>
      </div>
    </section>
  );
}
