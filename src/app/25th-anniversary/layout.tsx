import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '25th Anniversary',
  description: 'Twenty-five years of Whitesands School, from the first cohort of seventy-five boys in 2000 to more than one thousand alumni today.',
};

export default function AnniversaryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
