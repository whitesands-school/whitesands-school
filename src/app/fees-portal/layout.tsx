import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fees Portal',
  description: 'View tuition fees for Primary, Junior Secondary, and Senior Secondary levels, and access the parent payment portal.',
};

export default function FeesPortalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
