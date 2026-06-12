import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fees Portal',
  description: 'View termly tuition fees for Junior and Senior Secondary, and pay securely online with PixPay.',
};

export default function FeesPortalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
