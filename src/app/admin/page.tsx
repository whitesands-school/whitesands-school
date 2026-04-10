import { readFileSync } from 'fs'
import { join } from 'path'
import { FileText, Users, Megaphone, Image, Star } from 'lucide-react'
import type { NewsPost, StaffMember, Announcement, GalleryImage, VirtueOfMonth } from '@/types'

export const dynamic = 'force-dynamic'

function readJson<T>(filename: string): T[] {
  return JSON.parse(
    readFileSync(join(process.cwd(), `src/content/${filename}`), 'utf-8')
  )
}

export default function AdminDashboard() {
  const news = readJson<NewsPost>('news.json')
  const staff = readJson<StaffMember>('staff.json')
  const announcements = readJson<Announcement>('announcements.json')
  const gallery = readJson<GalleryImage>('gallery.json')
  const virtues = readJson<VirtueOfMonth>('virtue.json')

  const activeAnnouncement = announcements.find((a) => a.active)
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' })
  const currentVirtue = virtues.find(
    (v) => v.month.toLowerCase() === currentMonth.toLowerCase()
  )

  const stats = [
    {
      label: 'Total Posts',
      value: news.length,
      sub: `${news.filter((n) => n.published).length} published`,
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Staff Members',
      value: staff.length,
      sub: `${staff.filter((s) => s.isLeadership).length} in leadership`,
      icon: Users,
      color: 'text-deep',
      bg: 'bg-deep/5',
    },
    {
      label: 'Active Announcement',
      value: activeAnnouncement ? '1' : '0',
      sub: activeAnnouncement ? activeAnnouncement.color + ' banner' : 'None active',
      icon: Megaphone,
      color: 'text-bold',
      bg: 'bg-bold/5',
    },
    {
      label: 'Gallery Photos',
      value: gallery.length,
      sub: `${[...new Set(gallery.map((g) => g.category))].length} categories`,
      icon: Image,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Current Virtue',
      value: currentVirtue ? currentVirtue.virtue : '—',
      sub: currentMonth,
      icon: Star,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      wide: true,
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-roboto font-bold text-2xl text-dark">Dashboard</h1>
        <p className="font-sans text-sm text-muted mt-1">
          Overview of Whitesands School content
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, sub, icon: Icon, color, bg, wide }) => (
          <div
            key={label}
            className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${wide ? 'lg:col-span-2' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-2">
                  {label}
                </p>
                <p className={`font-roboto font-black text-3xl text-dark`}>
                  {value}
                </p>
                <p className="font-sans text-xs text-muted mt-1">{sub}</p>
              </div>
              <div className={`${bg} ${color} p-3 rounded-lg`}>
                <Icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="mt-10">
        <h2 className="font-roboto font-semibold text-sm uppercase tracking-wide text-muted mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: '+ New Post', href: '/admin/news/new' },
            { label: '+ Add Staff', href: '/admin/staff' },
            { label: 'Edit Announcement', href: '/admin/announcement' },
            { label: 'Update Gallery', href: '/admin/gallery' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-roboto text-sm text-dark hover:border-deep hover:text-deep transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
