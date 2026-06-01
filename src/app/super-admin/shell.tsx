'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  KeyRound,
  LogOut,
  Menu,
  X,
  Settings,
  ExternalLink,
} from 'lucide-react';
import { media } from '@/lib/media';

const NAV_GROUPS: {
  heading: string;
  items: { href: string; label: string; icon: typeof LayoutDashboard }[];
}[] = [
  {
    heading: 'Overview',
    items: [{ href: '/super-admin', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    heading: 'Governance',
    items: [
      { href: '/super-admin/users', label: 'Users & roles', icon: Users },
      { href: '/super-admin/account', label: 'My account', icon: KeyRound },
    ],
  },
];

export function SuperAdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
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
    if (href === '/super-admin') return pathname === '/super-admin';
    return pathname.startsWith(href);
  }

  return (
    <div className="min-h-screen flex bg-offwhite">
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 bg-white border border-deep/15 rounded-sm p-2 text-deep shadow-sm"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

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
        <div className="px-6 pt-7 pb-6 flex items-start justify-between">
          <Link href="/super-admin" className="flex items-center gap-3 group">
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
                className="font-roboto text-[10px] uppercase text-lemon"
                style={{ letterSpacing: '0.3em' }}
              >
                Whitesands
              </p>
              <p
                className="mt-0.5 font-roboto text-[10px] uppercase text-white/45"
                style={{ letterSpacing: '0.28em' }}
              >
                Super Admin
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

        <div className="px-3 py-4 border-t border-white/10 space-y-px">
          <div className="px-3 pb-2">
            <p
              className="font-roboto text-[9px] uppercase text-white/35"
              style={{ letterSpacing: '0.28em' }}
            >
              Signed in
            </p>
            <p className="mt-1 font-sans text-xs text-white/75 truncate">{email}</p>
          </div>
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-sm font-sans text-sm text-white/65 hover:text-white hover:bg-white/3 transition-colors"
          >
            <Settings size={16} strokeWidth={1.75} />
            Content admin
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

      <main className="flex-1 min-w-0 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 pt-16 pb-20 lg:pt-12">
          {children}
        </div>
      </main>
    </div>
  );
}
