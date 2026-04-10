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
