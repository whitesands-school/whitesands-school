import { readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import {
  FileText,
  Users,
  Megaphone,
  Image as ImageIcon,
  Star,
  Quote,
  Bell,
  Plus,
  ArrowRight,
  Inbox,
} from 'lucide-react';
import { readInbox } from '@/lib/inbox';
import type {
  NewsPost,
  StaffMember,
  Announcement,
  GalleryImage,
  VirtueOfMonth,
  Testimonial,
  SitePopover,
} from '@/types';

export const dynamic = 'force-dynamic';

function readJson<T>(filename: string): T[] {
  try {
    return JSON.parse(
      readFileSync(join(process.cwd(), `src/content/${filename}`), 'utf-8')
    );
  } catch {
    return [];
  }
}

export default function AdminDashboard() {
  const news = readJson<NewsPost>('news.json');
  const staff = readJson<StaffMember>('staff.json');
  const announcements = readJson<Announcement>('announcements.json');
  const gallery = readJson<GalleryImage>('gallery.json');
  const virtues = readJson<VirtueOfMonth>('virtue.json');
  const testimonials = readJson<Testimonial>('testimonials.json');
  const popovers = readJson<SitePopover>('popover.json');

  const inbox = readInbox();
  const activeAnnouncement = announcements.find((a) => a.active);
  const activePopover = popovers.find((p) => p.active);
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
  const currentVirtue = virtues.find(
    (v) => v.month.toLowerCase() === currentMonth.toLowerCase()
  );

  const stats: StatTileProps[] = [
    {
      label: 'News posts',
      value: String(news.length),
      sub: `${news.filter((n) => n.published).length} published`,
      href: '/admin/news',
      icon: FileText,
    },
    {
      label: 'Staff',
      value: String(staff.length),
      sub: `${staff.filter((s) => s.isLeadership).length} in leadership`,
      href: '/admin/staff',
      icon: Users,
    },
    {
      label: 'Testimonials',
      value: String(testimonials.length),
      sub: `${testimonials.filter((t) => !!t.videoUrl).length} with video`,
      href: '/admin/testimonials',
      icon: Quote,
    },
    {
      label: 'Gallery images',
      value: String(gallery.length),
      sub: `${new Set(gallery.map((g) => g.category)).size} categories`,
      href: '/admin/gallery',
      icon: ImageIcon,
    },
  ];

  const liveTiles: LiveTileProps[] = [
    {
      eyebrow: 'Inbox',
      title:
        inbox.length === 0
          ? 'No new enquiries'
          : `${inbox.length} enquir${inbox.length === 1 ? 'y' : 'ies'} waiting`,
      meta: inbox.length
        ? `Latest from ${inbox[0].name}`
        : 'Visit requests and messages land here',
      isOn: inbox.length > 0,
      href: '/admin/inbox',
      icon: Inbox,
    },
    {
      eyebrow: 'Announcement bar',
      title: activeAnnouncement
        ? activeAnnouncement.message
        : 'No banner is live',
      meta: activeAnnouncement
        ? `${activeAnnouncement.color} variant`
        : 'None active',
      isOn: !!activeAnnouncement,
      href: '/admin/announcement',
      icon: Megaphone,
    },
    {
      eyebrow: 'Site popover',
      title: activePopover ? activePopover.title : 'No popover is live',
      meta: activePopover
        ? activePopover.expiresAt
          ? `Expires ${new Date(activePopover.expiresAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
          : 'No expiry'
        : 'None active',
      isOn: !!activePopover,
      href: '/admin/popover',
      icon: Bell,
    },
    {
      eyebrow: `Virtue · ${currentMonth}`,
      title: currentVirtue ? currentVirtue.virtue : 'Not yet set',
      meta: currentVirtue
        ? currentVirtue.definition.slice(0, 90) +
          (currentVirtue.definition.length > 90 ? '…' : '')
        : 'Set the virtue for this month',
      isOn: !!currentVirtue,
      href: '/admin/virtue',
      icon: Star,
    },
  ];

  return (
    <>
      <header className="pb-10 mb-12 border-b border-deep/10">
        <p
          className="font-roboto text-[11px] uppercase text-deep"
          style={{ letterSpacing: '0.28em' }}
        >
          Overview
        </p>
        <h1
          className="mt-3 font-serif text-deep leading-tight"
          style={{
            fontSize: 'clamp(2rem, 3.6vw, 2.75rem)',
            letterSpacing: '-0.02em',
          }}
        >
          Welcome back.
        </h1>
        <p className="mt-3 font-sans text-base text-dark/65 leading-relaxed max-w-xl">
          A quick look at what is live on the site, and a place to update
          anything that needs attention.
        </p>
      </header>

      {/* Live across the site */}
      <section className="mb-14">
        <h2
          className="mb-6 font-roboto text-[11px] uppercase text-muted"
          style={{ letterSpacing: '0.28em' }}
        >
          Live across the site
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {liveTiles.map((t) => (
            <LiveTile key={t.eyebrow} {...t} />
          ))}
        </div>
      </section>

      {/* Counts */}
      <section className="mb-14">
        <h2
          className="mb-6 font-roboto text-[11px] uppercase text-muted"
          style={{ letterSpacing: '0.28em' }}
        >
          Content
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatTile key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2
          className="mb-6 font-roboto text-[11px] uppercase text-muted"
          style={{ letterSpacing: '0.28em' }}
        >
          Quick actions
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Write a news post', href: '/admin/news/new', icon: Plus },
            { label: 'Edit the announcement bar', href: '/admin/announcement', icon: Megaphone },
            { label: 'Set this month’s virtue', href: '/admin/virtue', icon: Star },
            { label: 'Manage testimonials', href: '/admin/testimonials', icon: Quote },
          ].map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex items-center justify-between gap-4 bg-white border border-deep/10 rounded-md px-5 py-4 hover:border-deep/30 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Icon size={16} className="text-deep" strokeWidth={1.75} />
                  <span className="font-sans text-sm text-deep">{label}</span>
                </span>
                <ArrowRight
                  size={14}
                  className="text-muted group-hover:text-deep group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface StatTileProps {
  label: string;
  value: string;
  sub: string;
  href: string;
  icon: typeof FileText;
}

function StatTile({ label, value, sub, href, icon: Icon }: StatTileProps) {
  return (
    <Link
      href={href}
      className="group block bg-white border border-deep/10 rounded-md p-5 hover:border-deep/30 transition-colors"
    >
      <div className="flex items-center justify-between">
        <p
          className="font-roboto text-[10px] uppercase text-muted"
          style={{ letterSpacing: '0.24em' }}
        >
          {label}
        </p>
        <Icon size={14} className="text-muted" strokeWidth={1.75} />
      </div>
      <p
        className="mt-3 font-serif text-deep tabular-nums leading-none"
        style={{
          fontSize: 'clamp(1.75rem, 2.6vw, 2.25rem)',
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </p>
      <p className="mt-2 font-sans text-xs text-muted leading-relaxed">{sub}</p>
    </Link>
  );
}

interface LiveTileProps {
  eyebrow: string;
  title: string;
  meta: string;
  isOn: boolean;
  href: string;
  icon: typeof Megaphone;
}

function LiveTile({ eyebrow, title, meta, isOn, href, icon: Icon }: LiveTileProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col bg-white border border-deep/10 rounded-md p-6 hover:border-deep/30 transition-colors min-h-42.5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-deep" strokeWidth={1.75} />
          <p
            className="font-roboto text-[10px] uppercase text-deep"
            style={{ letterSpacing: '0.24em' }}
          >
            {eyebrow}
          </p>
        </div>
        <span
          className={[
            'inline-flex items-center gap-1.5 font-roboto text-[10px] uppercase',
            isOn ? 'text-deep' : 'text-muted',
          ].join(' ')}
          style={{ letterSpacing: '0.22em' }}
        >
          <span
            aria-hidden
            className={[
              'block w-1.5 h-1.5 rounded-full',
              isOn ? 'bg-deep' : 'bg-muted/40',
            ].join(' ')}
          />
          {isOn ? 'Live' : 'Off'}
        </span>
      </div>
      <p className="mt-4 font-serif text-lg text-deep leading-snug line-clamp-2">
        {title}
      </p>
      <p className="mt-auto pt-5 font-sans text-xs text-muted leading-relaxed">
        {meta}
      </p>
    </Link>
  );
}
