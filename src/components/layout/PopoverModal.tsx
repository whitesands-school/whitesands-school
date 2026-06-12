'use client'

import { useState, useEffect, useRef } from 'react'
import { X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import type { SitePopover } from '@/types'
import { media } from '@/lib/media'

// Shown once per session — dismissed state lives in sessionStorage (survives
// reloads within the tab; resets when the parent comes back another day).
const SESSION_KEY = 'ws_popover_dismissed'

export function PopoverModal({ popover }: { popover: SitePopover }) {
  const [visible, setVisible] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === popover.id) return
    // Let the page paint and settle before interrupting.
    const t = setTimeout(() => setVisible(true), 2200)
    return () => clearTimeout(t)
  }, [popover.id])

  // Scroll lock + Escape + move focus into the dialog while it's open.
  useEffect(() => {
    if (!visible) return
    const prevFocus = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      prevFocus?.focus?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  function dismiss() {
    sessionStorage.setItem(SESSION_KEY, popover.id)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6"
          onClick={dismiss}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-deep/60 backdrop-blur-sm" />

          {/* Card */}
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white rounded-md shadow-[0_32px_80px_-24px_rgba(26,21,48,0.55)] max-w-md w-full overflow-hidden outline-none"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={popover.title}
          >
            {/* Close */}
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className={[
                'absolute top-3 right-3 p-2.5 rounded-full transition-colors z-10 cursor-pointer',
                popover.imageUrl
                  ? 'text-white/90 hover:text-white hover:bg-black/20'
                  : 'text-muted hover:text-dark hover:bg-gray-100',
              ].join(' ')}
            >
              <X size={16} />
            </button>

            {/* Optional image with brand gradient anchoring it to the card */}
            {popover.imageUrl && (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={media(popover.imageUrl)}
                  alt=""
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-deep/50 via-transparent to-deep/20" />
              </div>
            )}

            <div className="p-7 sm:p-8">
              <p
                className="font-roboto text-[10px] uppercase text-deep"
                style={{ letterSpacing: '0.3em' }}
              >
                Whitesands School
              </p>

              <h2
                className="mt-3 font-serif text-deep"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.01em',
                }}
              >
                {popover.title}
              </h2>

              <p className="mt-4 font-sans text-sm text-dark/70 leading-relaxed">
                {popover.body}
              </p>

              <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
                {popover.ctaUrl && popover.ctaLabel && (
                  <Link
                    href={popover.ctaUrl}
                    onClick={dismiss}
                    className="group inline-flex items-center justify-center gap-2 bg-deep text-white font-roboto uppercase text-xs px-7 py-3.5 rounded-sm hover:bg-bold transition-colors duration-200"
                    style={{ letterSpacing: '0.16em' }}
                  >
                    {popover.ctaLabel}
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
                <button
                  onClick={dismiss}
                  className="font-sans text-sm text-muted hover:text-deep underline underline-offset-4 transition-colors cursor-pointer text-center"
                >
                  Maybe later
                </button>
              </div>
            </div>

            {/* Lemon base rule — the brand signature */}
            <div className="h-1 bg-lemon" aria-hidden />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
