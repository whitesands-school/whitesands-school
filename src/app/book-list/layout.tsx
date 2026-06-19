import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book List',
  description:
    'The official Whitesands School textbook list for the coming session, grouped by class — titles, authors, and editions for JS1 through SS3.',
};

export default function BookListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
