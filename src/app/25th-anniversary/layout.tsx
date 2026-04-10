import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '25th Anniversary',
  description: 'Celebrating 25 years of excellence at Whitesands School — 1999 to 2024. Join us for a year of events, tributes, and thanksgiving.',
};

export default function AnniversaryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
