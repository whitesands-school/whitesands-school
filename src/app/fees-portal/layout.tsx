import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fees Portal',
  description: 'Pay Whitesands School fees securely online with PixPay. Contact the school office for the current termly fee schedule.',
};

export default function FeesPortalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
