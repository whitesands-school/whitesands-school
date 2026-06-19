import { readContent } from '@/lib/content-store';
import type { BookList } from '@/types';
import { PageHero } from '@/components/sections/PageHero';
import { BookListSubNav } from '@/components/sections/BookListSubNav';
import { media } from '@/lib/media';

export const dynamic = 'force-dynamic';

const SERIF_H: React.CSSProperties = {
  fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)',
  lineHeight: 1.12,
  letterSpacing: '-0.02em',
};

export default async function BookListPage() {
  const data = await readContent<BookList>('booklist');
  const categories = (data.categories ?? []).filter((c) => c.name.trim());

  return (
    <>
      <PageHero
        size="medium"
        image={media('/images/students/student-drawing.JPG')}
        imageAlt="A Whitesands student at work in the library"
        overlay={0.6}
        eyebrow="Admissions"
        title={
          <>
            The <span className="italic text-lemon">book list.</span>
          </>
        }
        subtitle="Textbooks for the coming session, grouped by class."
      />

      {categories.length > 1 && (
        <BookListSubNav
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        />
      )}

      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
          {data.intro && (
            <p className="font-serif text-lg text-dark/85 leading-[1.65]">
              {data.intro}
            </p>
          )}

          {categories.length === 0 ? (
            <p className="font-sans text-base text-muted">
              The book list for the coming session will be published here
              shortly. Please check back soon.
            </p>
          ) : (
            <div className={data.intro ? 'mt-20 space-y-20 lg:space-y-24' : 'space-y-20 lg:space-y-24'}>
              {categories.map((cat) => (
                <div key={cat.id} id={cat.id} className="scroll-mt-40">
                  <div className="flex items-baseline gap-4 border-b border-deep/15 pb-5">
                    <h2 className="font-serif text-deep" style={SERIF_H}>
                      {cat.name}
                    </h2>
                    {cat.description && (
                      <p
                        className="font-roboto text-[11px] uppercase text-muted"
                        style={{ letterSpacing: '0.22em' }}
                      >
                        {cat.description}
                      </p>
                    )}
                  </div>

                  {cat.books.length === 0 ? (
                    <p className="mt-6 font-sans text-sm text-muted">
                      No titles listed for this class yet.
                    </p>
                  ) : (
                    <ul>
                      {cat.books.map((book) => (
                        <li
                          key={book.id}
                          className="flex flex-col gap-1.5 border-b border-deep/10 py-6 sm:flex-row sm:items-baseline sm:gap-8"
                        >
                          <div className="sm:w-44 sm:shrink-0">
                            {book.subject && (
                              <p
                                className="font-roboto text-[11px] uppercase text-muted"
                                style={{ letterSpacing: '0.22em' }}
                              >
                                {book.subject}
                              </p>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-serif text-lg text-deep leading-snug">
                              {book.title}
                            </p>
                            {book.author && (
                              <p className="mt-1 font-sans text-sm text-dark/65">
                                {book.author}
                              </p>
                            )}
                          </div>
                          {book.note && (
                            <span
                              className="self-start sm:self-center font-roboto text-[10px] uppercase text-deep bg-lemon/40 rounded-sm px-2.5 py-1"
                              style={{ letterSpacing: '0.18em' }}
                            >
                              {book.note}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
