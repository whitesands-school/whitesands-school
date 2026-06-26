/**
 * Basic in-memory rate limiter. Fixed-window, per-instance — it resets on cold
 * start and is independent per serverless instance, so treat it as a cheap
 * first line of defence against bursts and form spam, not a hard guarantee.
 * (A distributed limiter would need Redis/Upstash; that is out of scope here.)
 */

interface Bucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

export interface RateLimitResult {
  ok: boolean
  /** Seconds until the window resets (for a Retry-After header). */
  retryAfter: number
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now()

  // Opportunistic cleanup so the map can't grow without bound.
  if (buckets.size > 10_000) {
    for (const [k, b] of buckets) if (now >= b.resetAt) buckets.delete(k)
  }

  const bucket = buckets.get(key)
  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, retryAfter: 0 }
  }
  if (bucket.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
  }
  bucket.count++
  return { ok: true, retryAfter: 0 }
}

/** Best-effort client IP from common proxy headers. */
export function clientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0]!.trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}
