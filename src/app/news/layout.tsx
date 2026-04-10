import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News & Stories',
  description: 'Stay up to date with the latest news, events, and stories from the Whitesands School community.',
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
