import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Whitesands School — our history, vision, mission, and the educational philosophy rooted in the Catholic tradition and the motto Duc in Altum.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
