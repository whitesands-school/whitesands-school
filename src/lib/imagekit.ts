/**
 * ImageKit helper — single source of truth for asset URL generation.
 *
 * Prod endpoint pattern: https://ik.imagekit.io/whitesands/
 * The endpoint is read from NEXT_PUBLIC_IMAGEKIT_URL (no trailing slash needed),
 * falling back to the production URL above so local code still builds without
 * the env var set.
 *
 * Use one of:
 *   - <Image loader={imageKitLoader} src="path/to/file.jpg" .../> for next/image
 *   - getImageKitUrl('path/to/file.jpg', { w: 1600, q: 80 }) for plain <img>
 *     or for backdrop-image style="..." cases.
 */

import type { ImageLoader, ImageLoaderProps } from 'next/image';

const RAW_ENDPOINT =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL ?? 'https://ik.imagekit.io/whitesands';

/** Endpoint with no trailing slash. */
export const IMAGEKIT_ENDPOINT = RAW_ENDPOINT.replace(/\/+$/, '');

/** True only when the deployment has explicitly wired up ImageKit. */
export const IMAGEKIT_ENABLED = !!process.env.NEXT_PUBLIC_IMAGEKIT_URL;

/**
 * Subset of ImageKit transformations we use day-to-day. The library accepts
 * far more; extend as needed. Each entry becomes a `key-value` segment in the
 * `tr:` parameter (e.g. w-1600,q-80,f-auto).
 *
 * Reference: https://imagekit.io/docs/image-transformation
 */
export interface ImageKitTransforms {
  /** Width in px. */
  w?: number;
  /** Height in px. */
  h?: number;
  /** Quality 1–100. Defaults to 80 when omitted. */
  q?: number;
  /** Output format. 'auto' lets ImageKit pick WebP/AVIF based on Accept header. */
  f?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  /** Crop mode. 'maintain_ratio' is usually what you want with both w and h set. */
  c?: 'maintain_ratio' | 'force' | 'at_least' | 'at_max';
  /** Focus point for cropping. */
  fo?: 'auto' | 'face' | 'center' | 'top' | 'bottom' | 'left' | 'right';
  /** DPR multiplier (e.g. 2 for retina). */
  dpr?: number;
  /** Blur radius. */
  bl?: number;
  /** Progressive JPEG/PNG. */
  pr?: boolean;
}

function buildTransformSegment(t: ImageKitTransforms): string {
  const parts: string[] = [];
  if (t.w != null) parts.push(`w-${t.w}`);
  if (t.h != null) parts.push(`h-${t.h}`);
  if (t.q != null) parts.push(`q-${t.q}`);
  if (t.f) parts.push(`f-${t.f}`);
  if (t.c) parts.push(`c-${t.c}`);
  if (t.fo) parts.push(`fo-${t.fo}`);
  if (t.dpr != null) parts.push(`dpr-${t.dpr}`);
  if (t.bl != null) parts.push(`bl-${t.bl}`);
  if (t.pr) parts.push('pr-true');
  return parts.join(',');
}

/**
 * Build a fully-qualified ImageKit URL for an asset path.
 *
 * - Absolute URLs (http/https) are returned untouched, so you can pass
 *   already-hosted assets through without surprise rewrites.
 * - Leading slashes are normalised.
 * - When no transforms are provided, the bare CDN URL is returned.
 */
export function getImageKitUrl(
  path: string,
  transforms?: ImageKitTransforms
): string {
  if (/^https?:\/\//i.test(path)) return path;
  const cleanPath = path.replace(/^\/+/, '');
  const segment = transforms ? buildTransformSegment(transforms) : '';
  return segment
    ? `${IMAGEKIT_ENDPOINT}/${cleanPath}?tr=${segment}`
    : `${IMAGEKIT_ENDPOINT}/${cleanPath}`;
}

/**
 * next/image loader. Pass as the `loader` prop on <Image>; the `width` and
 * `quality` next/image passes us are mapped onto ImageKit transforms, with
 * f-auto so the CDN serves AVIF/WebP where supported.
 */
function imageKitLoader({ src, width, quality }: ImageLoaderProps): string {
  return getImageKitUrl(src, {
    w: width,
    q: quality ?? 80,
    f: 'auto',
  });
}

/**
 * Use this when you want ImageKit if configured, otherwise the built-in
 * Next.js optimizer (which serves files from /public). Returning `undefined`
 * for the `loader` prop is equivalent to omitting it.
 */
export const optionalImageKitLoader: ImageLoader | undefined = IMAGEKIT_ENABLED
  ? imageKitLoader
  : undefined;

export default imageKitLoader;
