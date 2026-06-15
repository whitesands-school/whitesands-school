import { readContent } from '@/lib/content-store';
import { toParentVideos } from '@/lib/testimonials';
import { OurPeopleClient } from './our-people-client';
import type { StaffMember, Testimonial } from '@/types';

export const dynamic = 'force-dynamic';

export default async function OurPeoplePage() {
  const [staff, testimonials] = await Promise.all([
    readContent<StaffMember[]>('staff'),
    readContent<Testimonial[]>('testimonials'),
  ]);

  return (
    <OurPeopleClient
      staff={staff.sort((a, b) => a.order - b.order)}
      parentVideos={toParentVideos(testimonials)}
      alumniQuotes={testimonials.filter((t) => t.type === 'student')}
      staffQuotes={testimonials.filter((t) => t.type === 'staff')}
    />
  );
}
