import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alumni Prizes',
  description:
    'Whitesands School alumni sponsor annual prizes in Film, Coding, Visual Art, Music, Mathematics and Sports — fostering excellence and creativity in the boys who follow them. See the prizes, rules, and how to enter.',
};

export default function AlumniPrizesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
