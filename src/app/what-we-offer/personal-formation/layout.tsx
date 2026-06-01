import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Formation',
  description:
    'Eleven virtues across the year, one personal mentor for every boy, and character formed through daily life at Whitesands School.',
};

export default function PersonalFormationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
