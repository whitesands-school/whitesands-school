'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Megaphone,
  FileText,
  Bell,
  Image as ImageIcon,
  Star,
  Users,
  Quote,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  KeyRound,
  Inbox,
} from 'lucide-react';
import { media } from '@/lib/media';

type Role = 'super_admin' | 'admin';

const NAV_GROUPS: {
  heading: string;
  items: { href: string; label: string; icon: typeof LayoutDashboard }[];
}[] = [
  {
    heading: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/admin/inbox', label: 'Inbox', icon: Inbox },
    ],
  },
  {
    heading: 'Content',
    items: [
      { href: '/admin/news', label: 'News', icon: FileText },
      { href: '/admin/staff', label: 'Staff', icon: Users },
      { href: '/admin/testimonials', label: 'Testimonials', icon: Quote },
      { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
      { href: '/admin/virtue', label: 'Virtue of the Month', icon: Star },
    ],
  },
  {
    heading: 'Promotions',
    items: [
      { href: '/admin/announcement', label: 'Announcement Bar', icon: Megaphone },
      { href: '/admin/popover', label: 'Site Popover', icon: Bell },
    ],
  },
];

export function AdminShell({
  children,
  email,
  role,
}: {
  children: React.ReactNode;
  email: string;
  role: Role;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  return (
    <div className="min-h-screen flex bg-offwhite">
      {/* Mobile menu trigger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 bg-white border border-deep/15 rounded-sm p-2 text-deep shadow-sm"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* Sidebar — mobile overlay + desktop fixed */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-deep/40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={[
          'fixed lg:sticky top-0 inset-y-0 left-0 z-50 lg:z-auto',
          'w-64 shrink-0 bg-deep flex flex-col',
          'h-screen lg:h-screen',
          'transform transition-transform duration-300 lg:transform-none',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        {/* Brand */}
        <div className="px-6 pt-7 pb-6 flex items-start justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <Image
              src={media('/images/logos/whitesands-school-logo.png')}
              alt="Whitesands School"
              width={600}
              height={189}
              sizes="120px"
              style={{ width: 'auto' }}
              className="h-9 w-auto"
            />
            <div>
              <p
                className="mt-0.5 font-roboto text-[10px] uppercase text-white/45"
                style={{ letterSpacing: '0.28em' }}
              >
                Admin
              </p>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-white/60 hover:text-white p-1"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pb-6 overflow-y-auto [scrollbar-width:thin]">
          {NAV_GROUPS.map(({ heading, items }) => (
            <div key={heading} className="mb-7">
              <p
                className="px-3 mb-2 font-roboto text-[10px] uppercase text-white/35"
                style={{ letterSpacing: '0.28em' }}
              >
                {heading}
              </p>
              <ul className="space-y-px">
                {items.map(({ href, label, icon: Icon }) => {
                  const active = isActive(href);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={[
                          'relative flex items-center gap-3 px-3 py-2.5 rounded-sm',
                          'font-sans text-sm transition-colors duration-150',
                          active
                            ? 'bg-white/5 text-white'
                            : 'text-white/65 hover:text-white hover:bg-white/3',
                        ].join(' ')}
                      >
                        {active && (
                          <span
                            aria-hidden
                            className="absolute left-0 top-2 bottom-2 w-0.5 bg-lemon rounded-r"
                          />
                        )}
                        <Icon
                          size={16}
                          strokeWidth={1.75}
                          className={active ? 'text-lemon' : ''}
                        />
                        <span>{label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer actions */}
        <div className="px-3 py-4 border-t border-white/10 space-y-px">
          <div className="px-3 pb-2">
            <p
              className="font-roboto text-[9px] uppercase text-white/35"
              style={{ letterSpacing: '0.28em' }}
            >
              Signed in
            </p>
            <p className="mt-1 font-sans text-xs text-white/75 truncate">{email}</p>
            <p
              className="mt-1 inline-block font-roboto text-[9px] uppercase text-lemon"
              style={{ letterSpacing: '0.22em' }}
            >
              {role === 'super_admin' ? 'Super-admin' : 'Admin'}
            </p>
          </div>
          {role === 'super_admin' && (
            <Link
              href="/super-admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-sm font-sans text-sm text-white/65 hover:text-white hover:bg-white/3 transition-colors"
            >
              <ShieldCheck size={16} strokeWidth={1.75} />
              Super admin
            </Link>
          )}
          <Link
            href="/admin/account"
            className="flex items-center gap-3 px-3 py-2.5 rounded-sm font-sans text-sm text-white/65 hover:text-white hover:bg-white/3 transition-colors"
          >
            <KeyRound size={16} strokeWidth={1.75} />
            My account
          </Link>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-sm font-sans text-sm text-white/65 hover:text-white hover:bg-white/3 transition-colors"
          >
            <ExternalLink size={16} strokeWidth={1.75} />
            View site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-sm font-sans text-sm text-white/65 hover:text-white hover:bg-white/3 transition-colors cursor-pointer"
          >
            <LogOut size={16} strokeWidth={1.75} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 pt-16 pb-20 lg:pt-12">
          {children}
        </div>
      </main>
    </div>
  );
}
