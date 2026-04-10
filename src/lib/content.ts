import type {
  NewsPost,
  StaffMember,
  Announcement,
  VirtueOfMonth,
  GalleryImage,
  Testimonial,
  SitePopover,
} from '@/types'

import newsData from '@/content/news.json'
import staffData from '@/content/staff.json'
import announcementsData from '@/content/announcements.json'
import virtueData from '@/content/virtue.json'
import galleryData from '@/content/gallery.json'
import testimonialsData from '@/content/testimonials.json'
import popoverData from '@/content/popover.json'

// ─── News ────────────────────────────────────────────────────────────────────

export function getNews(): NewsPost[] {
  return (newsData as NewsPost[]).filter((p) => p.published)
}

export function getAllNews(): NewsPost[] {
  return newsData as NewsPost[]
}

export function getNewsBySlug(slug: string): NewsPost | undefined {
  return getNews().find((p) => p.slug === slug)
}

export function getNewsByCategory(category: string): NewsPost[] {
  return getNews().filter((p) => p.category === category)
}

export function getFeaturedPost(): NewsPost | undefined {
  return getNews()[0]
}

export function getRecentNews(count = 3): NewsPost[] {
  return getNews().slice(0, count)
}

// ─── Staff ───────────────────────────────────────────────────────────────────

export function getAllStaff(): StaffMember[] {
  return (staffData as StaffMember[]).sort((a, b) => a.order - b.order)
}

export function getLeadership(): StaffMember[] {
  return getAllStaff().filter((s) => s.isLeadership)
}

export function getStaffByDepartment(department: string): StaffMember[] {
  return getAllStaff().filter(
    (s) => s.department.toLowerCase() === department.toLowerCase()
  )
}

export function getStaffById(id: string): StaffMember | undefined {
  return getAllStaff().find((s) => s.id === id)
}

// ─── Announcements ───────────────────────────────────────────────────────────

export function getAnnouncements(): Announcement[] {
  return announcementsData as Announcement[]
}

export function getActiveAnnouncement(): Announcement | undefined {
  return getAnnouncements().find((a) => a.active)
}

// ─── Virtue of the Month ─────────────────────────────────────────────────────

export function getVirtues(): VirtueOfMonth[] {
  return virtueData as VirtueOfMonth[]
}

export function getVirtueByMonth(month: string): VirtueOfMonth | undefined {
  return getVirtues().find(
    (v) => v.month.toLowerCase() === month.toLowerCase()
  )
}

export function getCurrentVirtue(): VirtueOfMonth | undefined {
  const month = new Date().toLocaleString('en-US', { month: 'long' })
  return getVirtueByMonth(month)
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

export function getGalleryImages(): GalleryImage[] {
  return galleryData as GalleryImage[]
}

export function getGalleryByCategory(category: string): GalleryImage[] {
  return getGalleryImages().filter(
    (img) => img.category.toLowerCase() === category.toLowerCase()
  )
}

export function getGalleryCategories(): string[] {
  return [...new Set(getGalleryImages().map((img) => img.category))]
}

// ─── Testimonials ────────────────────────────────────────────────────────────

export function getTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[]
}

export function getTestimonialsByType(
  type: Testimonial['type']
): Testimonial[] {
  return getTestimonials().filter((t) => t.type === type)
}

export function getVideoTestimonials(): Testimonial[] {
  return getTestimonials().filter((t) => Boolean(t.videoUrl))
}

// ─── Popovers ────────────────────────────────────────────────────────────────

export function getPopovers(): SitePopover[] {
  return popoverData as SitePopover[]
}

export function getActivePopover(): SitePopover | undefined {
  const now = new Date()
  return getPopovers().find((p) => {
    if (!p.active) return false
    if (p.expiresAt && new Date(p.expiresAt) < now) return false
    return true
  })
}
