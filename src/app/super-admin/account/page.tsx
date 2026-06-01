import { AccountClient } from './account-client';
import { getSessionUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const me = await getSessionUser();
  return <AccountClient email={me!.email} />;
}
