'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'
import type { SitePopover } from '@/types'

// Shown once per session — dismissed state lives in sessionStorage
const SESSION_KEY = 'ws_popover_dismissed'

export function PopoverModal({ popover }: { popover: SitePopover }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === popover.id) return
    // Small delay so the page paints first
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [popover.id])

  function dismiss() {
    sessionStorage.setItem(SESSION_KEY, popover.id)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={dismiss}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Card */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute top-4 right-4 p-1.5 rounded-full text-muted hover:text-dark hover:bg-gray-100 transition z-10"
        >
          <X size={16} />
        </button>

        {/* Optional image */}
        {popover.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={popover.imageUrl}
            alt={popover.title}
            className="w-full h-44 object-cover"
          />
        )}

        <div className="p-7">
          {/* Accent line */}
          <div className="w-8 h-1 bg-lemon rounded mb-4" />

          <h2 className="font-roboto font-bold text-xl text-dark mb-3">
            {popover.title}
          </h2>
          <p className="font-sans text-sm text-muted leading-relaxed mb-6">
            {popover.body}
          </p>

          <div className="flex items-center gap-3">
            {popover.ctaUrl && popover.ctaLabel && (
              <Link
                href={popover.ctaUrl}
                onClick={dismiss}
                className="px-5 py-2.5 bg-deep text-white font-roboto font-semibold text-sm rounded-lg hover:bg-deep/90 transition"
              >
                {popover.ctaLabel}
              </Link>
            )}
            <button
              onClick={dismiss}
              className="px-5 py-2.5 text-sm font-roboto text-muted hover:text-dark transition"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
