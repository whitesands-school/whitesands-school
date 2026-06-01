import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { getSessionUser } from '@/lib/auth'

// PATCH /api/super-admin/account — change your own password.
// Verifies the current password by re-signing-in, then updates via the
// admin client so we don't have to round-trip through the user's session.
export async function PATCH(request: Request) {
  const me = await getSessionUser()
  if (!me || me.role !== 'super_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let body: { currentPassword?: string; newPassword?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const currentPassword = body.currentPassword
  const newPassword = body.newPassword

  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { error: 'Both current and new passwords are required.' },
      { status: 400 }
    )
  }
  if (newPassword.length < 6) {
    return NextResponse.json(
      { error: 'New password must be at least 6 characters.' },
      { status: 400 }
    )
  }

  // Verify the current password by attempting a server-side sign-in.
  // Note: this temporarily rotates the cookie session, but we re-establish
  // it with the same call (it stays signed in to the same identity).
  const supabase = await createSupabaseServerClient()
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: me.email,
    password: currentPassword,
  })

  if (verifyError) {
    return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 400 })
  }

  const admin = createSupabaseAdminClient()
  const { error: updateError } = await admin.auth.admin.updateUserById(me.id, {
    password: newPassword,
  })

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
