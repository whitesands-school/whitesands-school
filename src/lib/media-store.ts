import { createSupabaseAdminClient } from '@/lib/supabase/admin'

/**
 * Cleanup for admin-uploaded images.
 *
 * Uploads land in the public `media` bucket (see /api/admin/upload) and the
 * content JSON stores the returned public URL. When a photo is replaced or its
 * record deleted, the old file would otherwise linger in the bucket forever —
 * dead weight that grows with every edit. These helpers remove it.
 *
 * Only files that actually live in our `media` bucket are touched. External
 * URLs (ImageKit assets, pasted links, the bundled /images defaults) are left
 * alone, so deleting a record that points at a shared asset can't wipe it.
 *
 * Server-only — uses the service-role key. Never import into a Client Component.
 */

const MEDIA_BUCKET = 'media'

/**
 * The in-bucket path for a Supabase `media` public URL, or null when the URL
 * isn't one of our uploads.
 */
export function mediaPathFromUrl(url: string | null | undefined): string | null {
  if (!url) return null
  const marker = `/storage/v1/object/public/${MEDIA_BUCKET}/`
  const i = url.indexOf(marker)
  if (i === -1) return null
  return decodeURIComponent(url.slice(i + marker.length).split('?')[0])
}

/**
 * Best-effort delete of one or more uploaded images by their public URL.
 * Silently ignores external URLs and never throws — cleanup must never fail
 * the content operation that triggered it.
 */
export async function deleteUploadedImages(
  urls: (string | null | undefined)[]
): Promise<void> {
  const paths = urls
    .map(mediaPathFromUrl)
    .filter((p): p is string => p !== null)
  if (paths.length === 0) return
  try {
    const admin = createSupabaseAdminClient()
    await admin.storage.from(MEDIA_BUCKET).remove(paths)
  } catch {
    // best-effort
  }
}
