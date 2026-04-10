import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our People',
  description: 'Meet the dedicated staff, vibrant students, supportive parents, and accomplished alumni who make Whitesands School a thriving community.',
};

export default function OurPeopleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
