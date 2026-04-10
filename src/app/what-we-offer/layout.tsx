import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What We Offer',
  description: 'Explore the full range of academics, extracurricular activities, personal formation programmes, and world-class facilities at Whitesands School.',
};

export default function WhatWeOfferLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
