import { media } from './media'
import type { Testimonial } from '@/types'

/**
 * A parent testimonial that has a video, mapped to CDN URLs and ready to
 * render. Shared by the homepage and the Our People page so both stay in sync
 * with the admin Testimonials editor.
 */
export interface ParentVideoTestimonial {
  id: string
  name: string
  role: string
  quote: string
  poster: string
  video: string
}

export function toParentVideos(
  testimonials: Testimonial[]
): ParentVideoTestimonial[] {
  return testimonials
    .filter((t) => t.type === 'parent' && t.videoUrl)
    .map((t) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      quote: t.quote,
      poster: media(t.posterUrl ?? ''),
      video: media(t.videoUrl ?? ''),
    }))
}
