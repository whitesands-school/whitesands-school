import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Whitesands School, a Catholic secondary school for boys in Lekki, Lagos — our story since 2000, our houses, and an educational philosophy rooted in the motto Duc in Altum.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
