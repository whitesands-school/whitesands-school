import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academics',
  description:
    'The Nigerian National Curriculum taught with rigour, alongside Cambridge IGCSE, GCE and SAT preparation. Subjects offered, school timetable, and senior electives at Whitesands.',
};

export default function AcademicsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
