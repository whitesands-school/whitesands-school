'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Megaphone,
  FileText,
  Bell,
  Image as ImageIcon,
  Star,
  Users,
  LogOut,
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/announcement', label: 'Announcement Banner', icon: Megaphone },
  { href: '/admin/news', label: 'News & Blog', icon: FileText },
  { href: '/admin/popover', label: 'Popover Manager', icon: Bell },
  { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/admin/virtue', label: 'Virtue of Month', icon: Star },
  { href: '/admin/staff', label: 'Staff Directory', icon: Users },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-deep flex flex-col">
        {/* Logo */}
        <div className="px-5 py-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/images/logos/whitesands-school-logo.svg"
              alt="Whitesands School"
              width={36}
              height={36}
            />
            <div>
              <p className="font-roboto font-bold text-white text-sm leading-tight">
                Whitesands
              </p>
              <p className="font-roboto text-white/50 text-xs leading-tight">
                Admin Panel
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = isActive(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm font-roboto transition-colors relative ${
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-lemon" />
                )}
                <Icon size={16} className={active ? 'text-lemon' : ''} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-roboto text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-h-screen p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
