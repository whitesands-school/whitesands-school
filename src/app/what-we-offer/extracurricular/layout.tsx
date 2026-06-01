import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Extracurricular',
  description:
    'Twenty-four clubs and societies, six houses, one field. Sport, music, debate, robotics, faith and service at Whitesands School.',
};

export default function ExtracurricularLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
