import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Facilities',
  description:
    'Two hectares in Lekki, more than 5,000 square metres of built-up space, a purpose-built chapel, library, science block, and athletics field.',
};

export default function FacilitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
