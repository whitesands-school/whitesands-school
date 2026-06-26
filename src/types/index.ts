export interface NewsPost {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  coverImage: string
  date: string
  published: boolean
}

export interface StaffMember {
  id: string
  name: string
  title: string
  department: string
  bio: string
  qualifications: string[]
  yearsAtSchool: number
  photo: string
  order: number
  isLeadership: boolean
}

export interface Announcement {
  id: string
  message: string
  color: 'red' | 'yellow' | 'blue'
  linkText: string
  linkUrl: string
  active: boolean
}

export interface VirtueOfMonth {
  month: string
  virtue: string
  definition: string
  reflection: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  type: 'student' | 'staff' | 'parent'
  videoUrl?: string
  posterUrl?: string
}

export interface SitePopover {
  id: string
  title: string
  body: string
  imageUrl?: string
  ctaLabel?: string
  ctaUrl?: string
  active: boolean
  expiresAt?: string
}

export interface AdmissionsScheduleRow {
  id: string
  category: string
  opens: string
  exam: string
}

export interface AdmissionsInfo {
  academicYear: string
  applicationCloseDate: string
  schedule: AdmissionsScheduleRow[]
}

export interface BookListItem {
  id: string
  title: string
  author?: string
  subject?: string
  note?: string
}

export interface BookListCategory {
  id: string
  name: string
  description?: string
  books: BookListItem[]
}

export interface BookList {
  intro?: string
  categories: BookListCategory[]
}

/**
 * Admin override for a page's hero band. `key` is the page's pathname
 * (e.g. "/about"). Any blank field falls back to the value the page ships
 * with, so an override can change just the image, or just the subtitle.
 */
export interface PageHeaderOverride {
  key: string
  eyebrow?: string
  title?: string
  titleAccent?: string
  subtitle?: string
  image?: string
}
