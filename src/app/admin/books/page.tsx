'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, BookOpen } from 'lucide-react';
import {
  PageHeader,
  Card,
  Section,
  Button,
  Field,
  Toast,
  useToast,
  ConfirmInline,
  LoadingState,
  EmptyState,
  inputClass,
  textareaClass,
} from '@/components/admin/ui';
import type { BookList, BookListCategory, BookListItem } from '@/types';

const EMPTY_BOOK: Omit<BookListItem, 'id'> = {
  title: '',
  author: '',
  subject: '',
  note: '',
};

type Confirm =
  | { kind: 'category'; id: string }
  | { kind: 'book'; categoryId: string; bookId: string }
  | null;

export default function BooksAdminPage() {
  const [data, setData] = useState<BookList | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useToast();
  const [confirm, setConfirm] = useState<Confirm>(null);

  useEffect(() => {
    fetch('/api/admin/books')
      .then((r) => r.json())
      .then((d: BookList) => {
        setData({ intro: d.intro ?? '', categories: d.categories ?? [] });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setToast({ kind: 'error', message: 'Could not load the book list.' });
      });
  }, [setToast]);

  function patchCategory(id: string, patch: Partial<BookListCategory>) {
    setData((prev) =>
      prev
        ? {
            ...prev,
            categories: prev.categories.map((c) =>
              c.id === id ? { ...c, ...patch } : c
            ),
          }
        : prev
    );
  }

  function addCategory() {
    setData((prev) =>
      prev
        ? {
            ...prev,
            categories: [
              ...prev.categories,
              { id: `cat-${Date.now()}`, name: '', description: '', books: [] },
            ],
          }
        : prev
    );
  }

  function removeCategory(id: string) {
    setData((prev) =>
      prev
        ? { ...prev, categories: prev.categories.filter((c) => c.id !== id) }
        : prev
    );
    setConfirm(null);
  }

  function addBook(categoryId: string) {
    setData((prev) =>
      prev
        ? {
            ...prev,
            categories: prev.categories.map((c) =>
              c.id === categoryId
                ? {
                    ...c,
                    books: [
                      ...c.books,
                      { id: `book-${Date.now()}`, ...EMPTY_BOOK },
                    ],
                  }
                : c
            ),
          }
        : prev
    );
  }

  function patchBook(
    categoryId: string,
    bookId: string,
    patch: Partial<BookListItem>
  ) {
    setData((prev) =>
      prev
        ? {
            ...prev,
            categories: prev.categories.map((c) =>
              c.id === categoryId
                ? {
                    ...c,
                    books: c.books.map((b) =>
                      b.id === bookId ? { ...b, ...patch } : b
                    ),
                  }
                : c
            ),
          }
        : prev
    );
  }

  function removeBook(categoryId: string, bookId: string) {
    setData((prev) =>
      prev
        ? {
            ...prev,
            categories: prev.categories.map((c) =>
              c.id === categoryId
                ? { ...c, books: c.books.filter((b) => b.id !== bookId) }
                : c
            ),
          }
        : prev
    );
    setConfirm(null);
  }

  async function save() {
    if (!data) return;
    setToast({ kind: 'saving' });
    try {
      const res = await fetch('/api/admin/books', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Save failed');
      setToast({ kind: 'saved' });
    } catch {
      setToast({ kind: 'error', message: 'Save failed. Please try again.' });
    }
  }

  const totalBooks =
    data?.categories.reduce((n, c) => n + c.books.length, 0) ?? 0;

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Book list"
        description="The textbook list shown on the public Book List page, grouped into categories such as classes or subjects."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={addCategory}>
              <Plus size={14} strokeWidth={2} />
              Add category
            </Button>
            <Button onClick={save} disabled={loading || !data}>
              Save changes
            </Button>
          </>
        }
      />

      {loading || !data ? (
        <LoadingState />
      ) : (
        <>
          <Section
            title="Intro"
            description="A short note shown above the list — editions, where to buy, and so on. Leave empty to hide it."
          >
            <Card className="p-6 sm:p-7">
              <Field label="Intro text" hint="optional">
                <textarea
                  value={data.intro ?? ''}
                  onChange={(e) =>
                    setData({ ...data, intro: e.target.value })
                  }
                  rows={3}
                  className={textareaClass}
                  placeholder="The official book list for the coming session…"
                />
              </Field>
            </Card>
          </Section>

          <Section
            title={`Categories${
              data.categories.length ? ` · ${data.categories.length}` : ''
            }`}
            description={`${totalBooks} ${
              totalBooks === 1 ? 'book' : 'books'
            } in total.`}
          >
            {data.categories.length === 0 ? (
              <EmptyState
                title="No categories yet."
                description="Add a category — a class like JS1, or a subject group."
                action={
                  <Button size="sm" onClick={addCategory}>
                    <Plus size={14} strokeWidth={2} />
                    Add category
                  </Button>
                }
              />
            ) : (
              <ul className="space-y-6">
                {data.categories.map((cat) => (
                  <li key={cat.id}>
                    <Card className="p-6 sm:p-7">
                      {/* Category header */}
                      <div className="flex items-start justify-between gap-4 pb-5 mb-5 border-b border-deep/10">
                        <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Category name" required>
                            <input
                              type="text"
                              value={cat.name}
                              onChange={(e) =>
                                patchCategory(cat.id, { name: e.target.value })
                              }
                              placeholder="JS1"
                              className={inputClass}
                            />
                          </Field>
                          <Field label="Description" hint="optional">
                            <input
                              type="text"
                              value={cat.description ?? ''}
                              onChange={(e) =>
                                patchCategory(cat.id, {
                                  description: e.target.value,
                                })
                              }
                              placeholder="Junior Secondary, Year 1"
                              className={inputClass}
                            />
                          </Field>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setConfirm({ kind: 'category', id: cat.id })
                          }
                          className="mt-7 text-muted hover:text-bold transition-colors p-1.5 -m-1.5 cursor-pointer"
                          aria-label="Remove category"
                        >
                          <Trash2 size={16} strokeWidth={1.75} />
                        </button>
                      </div>

                      {/* Books */}
                      {cat.books.length === 0 ? (
                        <p className="font-sans text-sm text-muted mb-4">
                          No books in this category yet.
                        </p>
                      ) : (
                        <ul className="space-y-3 mb-4">
                          {cat.books.map((book) => (
                            <li
                              key={book.id}
                              className="flex items-start gap-3 bg-deep/[0.02] border border-deep/10 rounded-sm p-3 sm:p-4"
                            >
                              <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 gap-3">
                                <Field label="Title" required>
                                  <input
                                    type="text"
                                    value={book.title}
                                    onChange={(e) =>
                                      patchBook(cat.id, book.id, {
                                        title: e.target.value,
                                      })
                                    }
                                    placeholder="New General Mathematics, Book 1"
                                    className={inputClass}
                                  />
                                </Field>
                                <Field label="Subject" hint="optional">
                                  <input
                                    type="text"
                                    value={book.subject ?? ''}
                                    onChange={(e) =>
                                      patchBook(cat.id, book.id, {
                                        subject: e.target.value,
                                      })
                                    }
                                    placeholder="Mathematics"
                                    className={inputClass}
                                  />
                                </Field>
                                <Field label="Author / publisher" hint="optional">
                                  <input
                                    type="text"
                                    value={book.author ?? ''}
                                    onChange={(e) =>
                                      patchBook(cat.id, book.id, {
                                        author: e.target.value,
                                      })
                                    }
                                    placeholder="M. F. Macrae et al."
                                    className={inputClass}
                                  />
                                </Field>
                                <Field label="Note" hint="optional, e.g. Set text">
                                  <input
                                    type="text"
                                    value={book.note ?? ''}
                                    onChange={(e) =>
                                      patchBook(cat.id, book.id, {
                                        note: e.target.value,
                                      })
                                    }
                                    placeholder="Compulsory"
                                    className={inputClass}
                                  />
                                </Field>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  setConfirm({
                                    kind: 'book',
                                    categoryId: cat.id,
                                    bookId: book.id,
                                  })
                                }
                                className="mt-7 text-muted hover:text-bold transition-colors p-1.5 -m-1.5 cursor-pointer"
                                aria-label="Remove book"
                              >
                                <Trash2 size={15} strokeWidth={1.75} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => addBook(cat.id)}
                      >
                        <BookOpen size={13} strokeWidth={1.75} />
                        Add book
                      </Button>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </>
      )}

      <ConfirmInline
        open={!!confirm}
        message={
          confirm?.kind === 'category'
            ? 'Remove this category and all its books? This cannot be undone after you save.'
            : 'Remove this book? This cannot be undone after you save.'
        }
        confirmLabel="Remove"
        onConfirm={() => {
          if (confirm?.kind === 'category') removeCategory(confirm.id);
          else if (confirm?.kind === 'book')
            removeBook(confirm.categoryId, confirm.bookId);
        }}
        onCancel={() => setConfirm(null)}
      />

      <Toast state={toast} />
    </>
  );
}
