import type { Metadata } from 'next';
import { requireRole } from '@/lib/auth';
import { SuperAdminShell } from './shell';

export const metadata: Metadata = {
  title: 'Super Admin',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireRole(['super_admin']);
  return <SuperAdminShell email={user.email}>{children}</SuperAdminShell>;
}
