import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export type Role = 'super_admin' | 'admin'

export type SessionUser = {
  id: string
  email: string
  role: Role
}

/**
 * Read the current Supabase session and project it into a small typed shape.
 * Returns null when there's no valid session or the role claim is missing.
 *
 * The role is stored in `user_metadata.role` (set by the service role when the
 * user is created), so this never has to round-trip to the database.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !user.email) return null

  const role = user.user_metadata?.role as Role | undefined
  if (role !== 'super_admin' && role !== 'admin') return null

  return { id: user.id, email: user.email, role }
}

/**
 * Server-component helper. Redirects unauthenticated callers to /admin/login
 * and rejects callers whose role isn't in the allow-list.
 */
export async function requireRole(allowed: Role[]): Promise<SessionUser> {
  const user = await getSessionUser()
  if (!user) redirect('/admin/login')
  if (!allowed.includes(user.role)) redirect('/admin')
  return user
}
