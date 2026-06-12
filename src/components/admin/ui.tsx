'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Loader2, UploadCloud } from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { media } from '@/lib/media';

// ---------------------------------------------------------------------------
// Page header — eyebrow + title + actions row
// ---------------------------------------------------------------------------

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 pb-10 mb-10 border-b border-deep/10">
      <div className="min-w-0">
        <p
          className="font-roboto text-[11px] uppercase text-deep"
          style={{ letterSpacing: '0.28em' }}
        >
          {eyebrow}
        </p>
        <h1
          className="mt-3 font-serif text-deep leading-tight"
          style={{
            fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-2 font-sans text-sm text-muted leading-relaxed max-w-xl">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>
      )}
    </header>
  );
}

// ---------------------------------------------------------------------------
// Section — visually distinct content block with optional title
// ---------------------------------------------------------------------------

export function Section({
  title,
  description,
  children,
  actions,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="mb-12 last:mb-0">
      {(title || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          {title && (
            <div>
              <p
                className="font-roboto text-[11px] uppercase text-muted"
                style={{ letterSpacing: '0.28em' }}
              >
                {title}
              </p>
              {description && (
                <p className="mt-1.5 font-sans text-sm text-dark/65 leading-relaxed max-w-xl">
                  {description}
                </p>
              )}
            </div>
          )}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Card — quiet hairline panel
// ---------------------------------------------------------------------------

export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border border-deep/10 rounded-md ${className}`}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Button — primary / secondary / danger / ghost variants
// ---------------------------------------------------------------------------

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const buttonBase =
  'inline-flex items-center justify-center gap-2 font-roboto uppercase transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

const buttonStyles: Record<ButtonVariant, string> = {
  primary: 'bg-deep text-white hover:bg-bold',
  secondary: 'border border-deep/20 text-deep hover:border-deep hover:bg-deep/5',
  danger: 'text-bold hover:bg-bold/5 border border-transparent hover:border-bold/20',
  ghost: 'text-muted hover:text-deep',
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'text-[10px] px-3.5 py-2',
  md: 'text-xs px-5 py-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  style,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      style={{ letterSpacing: '0.18em', ...style }}
      className={`${buttonBase} ${buttonStyles[variant]} ${buttonSizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

// Link styled to match Button — for navigation actions
export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{ letterSpacing: '0.18em' }}
      className={`${buttonBase} ${buttonStyles[variant]} ${buttonSizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Field — label + input wrapper
// ---------------------------------------------------------------------------

export function FieldLabel({
  children,
  hint,
  required,
}: {
  children: ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-2 mb-2">
      <span
        className="font-roboto text-[11px] uppercase text-muted"
        style={{ letterSpacing: '0.22em' }}
      >
        {children}
        {required && <span className="text-bold ml-1" aria-hidden>·</span>}
      </span>
      {hint && (
        <span className="font-sans text-xs text-muted/70 normal-case lowercase first-letter:uppercase">
          {hint}
        </span>
      )}
    </div>
  );
}

export const inputClass =
  'w-full bg-white border border-deep/15 rounded-sm focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/15 px-3.5 py-2.5 font-sans text-sm text-deep placeholder:text-muted/50 transition-colors';

export const textareaClass = `${inputClass} resize-y min-h-24`;

export function Field({
  label,
  hint,
  required,
  error,
  children,
  className = '',
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col ${className}`}>
      <FieldLabel hint={hint} required={required}>{label}</FieldLabel>
      {children}
      {error && (
        <span className="mt-1.5 font-sans text-xs text-bold">{error}</span>
      )}
    </label>
  );
}

// ---------------------------------------------------------------------------
// ImageUploadField — path/URL input + direct upload + live preview
// ---------------------------------------------------------------------------

/**
 * One field for every image in the admin: paste a path/URL, or click Upload
 * (or drop a file) to push it to storage and have the URL filled in for you.
 */
export function ImageUploadField({
  label,
  value,
  onChange,
  folder = 'uploads',
  hint,
  required,
  previewAspect = 'aspect-video',
  showPreview = true,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  /** Storage folder the upload lands in, e.g. 'staff', 'news', 'gallery'. */
  folder?: string;
  hint?: string;
  required?: boolean;
  previewAspect?: string;
  /** Set false when the form already renders its own preview. */
  showPreview?: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  async function upload(file: File) {
    setError('');
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('folder', folder);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Upload failed.');
      onChange(body.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <div className="flex flex-col">
      <FieldLabel hint={hint} required={required}>{label}</FieldLabel>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) upload(file);
        }}
        className={`rounded-sm transition-colors ${
          dragOver ? 'outline-2 outline-dashed outline-deep/40 bg-deep/3' : ''
        }`}
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste a URL, or upload →"
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="shrink-0 inline-flex items-center gap-2 border border-deep/20 text-deep hover:border-deep hover:bg-deep/5 rounded-sm px-3.5 font-roboto uppercase text-[10px] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ letterSpacing: '0.16em' }}
          >
            {uploading ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <UploadCloud size={13} strokeWidth={1.75} />
            )}
            {uploading ? 'Uploading' : 'Upload'}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload(file);
            }}
          />
        </div>

        {error && (
          <p className="mt-1.5 font-sans text-xs text-bold">{error}</p>
        )}

        {showPreview && value && (
          <div
            className={`relative mt-3 ${previewAspect} max-w-60 overflow-hidden rounded-sm border border-deep/10 bg-deep/5`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary
                admin-pasted URLs can't be whitelisted for next/image */}
            <img
              src={previewUrl(media(value))}
              alt="Preview"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * ImageKit originals are multi-megabyte camera files; ask the CDN for a small
 * preview rendition instead. Non-ImageKit URLs are returned untouched.
 */
function previewUrl(url: string): string {
  if (!url.startsWith('https://ik.imagekit.io/')) return url;
  if (url.includes('?tr=')) return `${url}:w-480,q-70,f-auto`;
  return `${url}${url.includes('?') ? '&' : '?'}tr=w-480,q-70,f-auto`;
}

// ---------------------------------------------------------------------------
// Toggle — accessible on/off switch
// ---------------------------------------------------------------------------

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative shrink-0 mt-0.5 w-10 h-6 rounded-full transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
          checked ? 'bg-deep' : 'bg-deep/15'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
      {(label || description) && (
        <div className="min-w-0 flex-1">
          {label && (
            <p className="font-sans text-sm text-deep leading-tight">{label}</p>
          )}
          {description && (
            <p className="mt-0.5 font-sans text-xs text-muted leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toast — temporary saved/error feedback
// ---------------------------------------------------------------------------

export type ToastState =
  | { kind: 'idle' }
  | { kind: 'saving' }
  | { kind: 'saved'; message?: string }
  | { kind: 'error'; message: string };

export function Toast({ state }: { state: ToastState }) {
  return (
    <AnimatePresence>
      {state.kind !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div
            className={[
              'flex items-center gap-3 px-4 py-3 rounded-md shadow-lg border font-sans text-sm',
              state.kind === 'saved' && 'bg-white border-deep/15 text-deep',
              state.kind === 'saving' && 'bg-white border-deep/15 text-muted',
              state.kind === 'error' && 'bg-white border-bold/30 text-bold',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {state.kind === 'saving' && (
              <Loader2 size={16} className="animate-spin text-muted" />
            )}
            {state.kind === 'saved' && (
              <Check size={16} className="text-deep" strokeWidth={2.25} />
            )}
            {state.kind === 'error' && (
              <AlertCircle size={16} className="text-bold" />
            )}
            <span>
              {state.kind === 'saving' && 'Saving…'}
              {state.kind === 'saved' && (state.message ?? 'Saved')}
              {state.kind === 'error' && state.message}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook for managing toast state with auto-dismiss for saved/error states.
 */
export function useToast() {
  const [state, setState] = useState<ToastState>({ kind: 'idle' });

  useEffect(() => {
    if (state.kind === 'saved' || state.kind === 'error') {
      const t = setTimeout(() => setState({ kind: 'idle' }), 2400);
      return () => clearTimeout(t);
    }
  }, [state]);

  return [state, setState] as const;
}

// ---------------------------------------------------------------------------
// Confirm — inline destructive confirmation in place of window.confirm
// ---------------------------------------------------------------------------

export function ConfirmInline({
  open,
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}: {
  open: boolean;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-100 bg-deep/40 flex items-center justify-center p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-deep/15 rounded-md max-w-sm w-full p-7"
          >
            <p
              className="font-roboto text-[11px] uppercase text-deep"
              style={{ letterSpacing: '0.28em' }}
            >
              Confirm
            </p>
            <p className="mt-3 font-sans text-sm text-deep leading-relaxed">
              {message}
            </p>
            <div className="mt-7 flex items-center justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={onCancel}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Empty + Loading states
// ---------------------------------------------------------------------------

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="bg-white border border-dashed border-deep/15 rounded-md py-16 px-6 text-center">
      <p className="font-serif text-lg text-deep">{title}</p>
      {description && (
        <p className="mt-2 font-sans text-sm text-muted max-w-sm mx-auto">
          {description}
        </p>
      )}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="py-20 text-center">
      <Loader2
        size={20}
        className="inline-block animate-spin text-muted/50"
      />
    </div>
  );
}
