'use client';

import { useEffect, useState } from 'react';

/**
 * Sticky category rail for the Book List page — mirrors the About page's
 * sub-nav: scroll-spy highlights the category in view, and clicks smooth-scroll
 * with an offset that clears the heritage strip, main nav, and this bar.
 */
export function BookListSubNav({
  categories,
}: {
  categories: { id: string; name: string }[];
}) {
  const [active, setActive] = useState<string>(categories[0]?.id ?? '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    categories.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [categories]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 168;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-[calc(7rem+var(--ws-banner-h,0px))] z-30 bg-white/85 backdrop-blur supports-backdrop-filter:bg-white/70 border-b border-deep/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map(({ id, name }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            className={[
              'shrink-0 px-5 py-4 font-roboto text-[11px] uppercase border-b-2 transition-colors duration-200',
              active === id
                ? 'text-deep border-lemon'
                : 'text-muted border-transparent hover:text-deep',
            ].join(' ')}
            style={{ letterSpacing: '0.22em' }}
          >
            {name}
          </a>
        ))}
      </div>
    </nav>
  );
}
