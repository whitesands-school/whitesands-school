import announcementsFallback from '@/content/announcements.json'
import galleryFallback from '@/content/gallery.json'
import inboxFallback from '@/content/inbox.json'
import newsFallback from '@/content/news.json'
import popoverFallback from '@/content/popover.json'
import staffFallback from '@/content/staff.json'
import testimonialsFallback from '@/content/testimonials.json'
import virtueFallback from '@/content/virtue.json'

/**
 * Server-only content persistence.
 *
 * The site's editable content lives as JSON objects in the private
 * `site-content` bucket on Supabase Storage — NOT on the local filesystem.
 * Vercel's filesystem is read-only and reset on every deploy, so fs-backed
 * writes 500 in production and silently lose data. Storage writes survive
 * deploys and show up on the live site immediately (every page renders
 * dynamically).
 *
 * Reads fall back to the JSON bundled from `src/content/` when storage is
 * unreachable or the object is missing, so a fresh environment still renders.
 *
 * NEVER import this from a Client Component — it uses the service-role key.
 */

export type ContentName =
  | 'announcements'
  | 'gallery'
  | 'inbox'
  | 'news'
  | 'popover'
  | 'staff'
  | 'testimonials'
  | 'virtue'

const BUCKET = 'site-content'

const FALLBACKS: Record<ContentName, unknown> = {
  announcements: announcementsFallback,
  gallery: galleryFallback,
  inbox: inboxFallback,
  news: newsFallback,
  popover: popoverFallback,
  staff: staffFallback,
  testimonials: testimonialsFallback,
  virtue: virtueFallback,
}

// Per-instance cache so public pages don't pay a storage round-trip on every
// render. Writes bust it; other instances converge within the TTL.
const TTL_MS = 15_000
const cache = new Map<ContentName, { data: unknown; at: number }>()

function storageUrl(name: ContentName): string | null {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!base || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null
  return `${base}/storage/v1/object/${BUCKET}/${name}.json`
}

function authHeaders(): Record<string, string> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return { apikey: key, Authorization: `Bearer ${key}` }
}

export async function readContent<T>(name: ContentName): Promise<T> {
  const hit = cache.get(name)
  if (hit && Date.now() - hit.at < TTL_MS) return hit.data as T

  const url = storageUrl(name)
  if (url) {
    try {
      const res = await fetch(url, { headers: authHeaders(), cache: 'no-store' })
      if (res.ok) {
        const data = (await res.json()) as T
        cache.set(name, { data, at: Date.now() })
        return data
      }
    } catch {
      // fall through to bundled content
    }
  }
  return FALLBACKS[name] as T
}

export async function writeContent<T>(name: ContentName, data: T): Promise<void> {
  const url = storageUrl(name)
  if (!url) {
    throw new Error(
      'Cannot save: SUPABASE_SERVICE_ROLE_KEY / NEXT_PUBLIC_SUPABASE_URL are not configured in this environment.'
    )
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
      'x-upsert': 'true',
    },
    body: JSON.stringify(data, null, 2),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Saving ${name} failed (${res.status}): ${detail.slice(0, 200)}`)
  }
  cache.set(name, { data, at: Date.now() })
}
