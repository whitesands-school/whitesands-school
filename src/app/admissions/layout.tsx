import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admissions',
  description: 'Begin your journey at Whitesands School. Explore our admissions process, requirements, and how to apply for a place in our community.',
};

export default function AdmissionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
