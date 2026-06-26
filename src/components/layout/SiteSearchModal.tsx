'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, FileText, Newspaper, User, BookOpen, Loader2 } from 'lucide-react';

interface SearchResult {
  type: 'Page' | 'News' | 'Person' | 'Book';
  title: string;
  subtitle?: string;
  href: string;
}

const TYPE_ICON = {
  Page: FileText,
  News: Newspaper,
  Person: User,
  Book: BookOpen,
} as const;

export function SiteSearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  // Focus the field when the modal opens; reset once it closes. State updates
  // run inside timeouts (asynchronously), never synchronously in the effect.
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setQuery('');
      setResults([]);
      setTouched(false);
    }, 0);
    return () => clearTimeout(t);
  }, [open]);

  // Esc to close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Debounced query against the search API. All state updates happen inside
  // the timeout (asynchronously), never synchronously in the effect body.
  useEffect(() => {
    const q = query.trim();
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      if (q.length < 2) {
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: ctrl.signal })
        .then((r) => r.json())
        .then((data: { results: SearchResult[] }) => {
          setResults(data.results ?? []);
          setTouched(true);
          setLoading(false);
        })
        .catch((err) => {
          if (err?.name !== 'AbortError') setLoading(false);
        });
    }, 200);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query]);

  function go(href: string) {
    onClose();
    router.push(href);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-200 bg-deep/50 backdrop-blur-sm flex items-start justify-center px-4 pt-24 sm:pt-32"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Search the site"
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-white rounded-md shadow-2xl overflow-hidden"
          >
            {/* Input row */}
            <div className="flex items-center gap-3 px-5 border-b border-deep/10">
              <Search size={18} className="text-muted shrink-0" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, news, people, books…"
                className="flex-1 py-4 bg-transparent font-sans text-base text-deep placeholder:text-muted/60 focus:outline-none"
              />
              {loading && <Loader2 size={16} className="animate-spin text-muted shrink-0" />}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="text-muted hover:text-deep p-1.5 -mr-1.5 shrink-0 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[min(60vh,28rem)] overflow-y-auto">
              {results.length > 0 ? (
                <ul className="py-2">
                  {results.map((r, i) => {
                    const Icon = TYPE_ICON[r.type];
                    return (
                      <li key={`${r.href}-${i}`}>
                        <button
                          type="button"
                          onClick={() => go(r.href)}
                          className="w-full flex items-center gap-3.5 px-5 py-3 text-left hover:bg-offwhite transition-colors cursor-pointer"
                        >
                          <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-sm bg-deep/5 text-deep">
                            <Icon size={16} strokeWidth={1.75} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-sans text-sm text-deep truncate">
                              {r.title}
                            </span>
                            {r.subtitle && (
                              <span className="block font-sans text-xs text-muted truncate">
                                {r.subtitle}
                              </span>
                            )}
                          </span>
                          <span
                            className="shrink-0 font-roboto text-[9px] uppercase text-muted/70"
                            style={{ letterSpacing: '0.18em' }}
                          >
                            {r.type}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="px-5 py-10 text-center">
                  <p className="font-sans text-sm text-muted">
                    {query.trim().length < 2
                      ? 'Type to search across the site.'
                      : touched && !loading
                        ? `No results for “${query.trim()}”.`
                        : 'Searching…'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
