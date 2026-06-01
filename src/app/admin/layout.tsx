import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { requireRole } from '@/lib/auth';
import { AdminShell } from './shell';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // /admin/login renders standalone (no sidebar, no auth gate).
  const pathname = (await headers()).get('x-pathname') ?? '';
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const user = await requireRole(['super_admin', 'admin']);
  return (
    <AdminShell email={user.email} role={user.role}>
      {children}
    </AdminShell>
  );
}
