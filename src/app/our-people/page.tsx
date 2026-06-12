import { readContent } from '@/lib/content-store';
import { OurPeopleClient } from './our-people-client';
import type { StaffMember } from '@/types';

export const dynamic = 'force-dynamic';

export default async function OurPeoplePage() {
  const staff = (await readContent<StaffMember[]>('staff')).sort(
    (a, b) => a.order - b.order
  );
  return <OurPeopleClient staff={staff} />;
}
