import { UsersClient } from './users-client';
import { getSessionUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const me = await getSessionUser();
  return <UsersClient currentUserId={me!.id} />;
}
