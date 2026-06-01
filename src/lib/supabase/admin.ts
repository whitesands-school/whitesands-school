import { createClient } from '@supabase/supabase-js'

/**
 * Service-role Supabase client. Bypasses Row-Level Security and exposes the
 * `auth.admin` namespace for creating/deleting users, resetting passwords, etc.
 *
 * NEVER import this from a Client Component. It MUST stay server-only — the
 * service-role key is a master key for the database.
 */
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error(
      'Supabase admin client missing env vars (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).'
    )
  }

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
