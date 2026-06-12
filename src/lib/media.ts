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

/**
 * Video delivery runs on Cloudinary, not ImageKit — ImageKit ignores HTTP
 * range requests, which breaks seeking everywhere and playback entirely on
 * Safari. Cloudinary also transcodes to H.264 on the fly (`vc_h264`), so
 * HEVC phone footage plays in every browser.
 */
export const CLOUDINARY_VIDEO_BASE =
  'https://res.cloudinary.com/dud5owpai/video/upload'

export function video(publicId: string): string {
  return `${CLOUDINARY_VIDEO_BASE}/q_auto,vc_h264/${publicId}.mp4`
}
