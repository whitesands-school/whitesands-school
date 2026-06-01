/**
 * All site media (images, videos, documents) is served from ImageKit. The
 * uploaded folder structure mirrors the old `public/` directory exactly, so
 * `media('/images/foo.jpg')` resolves to the CDN copy of what used to live at
 * `public/images/foo.jpg`.
 *
 * Always call this helper instead of hand-writing the prefix — if we ever move
 * to another CDN, only this file changes.
 */
export const MEDIA_BASE =
  'https://ik.imagekit.io/chewdee/greyform/whitesands/public'

export function media(path: string | null | undefined): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (path.startsWith('data:')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${MEDIA_BASE}${normalized}`
}
