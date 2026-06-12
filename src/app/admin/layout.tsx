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
  // Auth pages render standalone (no sidebar, no auth gate). Keep in sync
  // with PUBLIC_ADMIN_PATHS in src/proxy.ts.
  const pathname = (await headers()).get('x-pathname') ?? '';
  const isAuthPage =
    pathname === '/admin/login' ||
    pathname === '/admin/forgot-password' ||
    pathname === '/admin/reset-password';
  if (isAuthPage) {
    return <>{children}</>;
  }

  const user = await requireRole(['super_admin', 'admin']);
  return (
    <AdminShell email={user.email} role={user.role}>
      {children}
    </AdminShell>
  );
}
