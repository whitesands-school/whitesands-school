import type { ImageLoaderProps } from 'next/image';

/**
 * Global next/image loader (wired via `images.loaderFile` in next.config.ts).
 *
 * ImageKit URLs are transformed on the CDN itself — width, quality, and
 * f-auto (AVIF/WebP per Accept header) — so the multi-megabyte camera
 * originals never reach the browser and Next's own optimizer (which had to
 * download the full original first) is bypassed entirely.
 *
 * URLs that already carry a `?tr=` transform (e.g. a baked-in crop) get the
 * resize chained after it with ImageKit's `:` syntax.
 *
 * Anything not on ImageKit (Supabase Storage uploads, external URLs) is
 * served as-is.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (src.startsWith('https://ik.imagekit.io/')) {
    // Staff portraits etc. have literal spaces in their filenames. A raw
    // space breaks `srcset` parsing (space is the URL/descriptor delimiter),
    // so the image silently fails to load. Encode them.
    const encoded = src.replace(/ /g, '%20');
    const resize = `w-${width},q-${quality ?? 75},f-auto,c-at_max`;
    if (encoded.includes('?tr=')) {
      // Chain after the existing transform: ?tr=<existing>:<resize>
      return `${encoded}:${resize}`;
    }
    const sep = encoded.includes('?') ? '&' : '?';
    return `${encoded}${sep}tr=${resize}`;
  }
  return src;
}
