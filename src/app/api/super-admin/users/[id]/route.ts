import { NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { getSessionUser } from '@/lib/auth'

type Role = 'super_admin' | 'admin'

type Params = { params: Promise<{ id: string }> }

// PATCH — change role and/or reset password
export async function PATCH(request: Request, { params }: Params) {
  const me = await getSessionUser()
  if (!me || me.role !== 'super_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params

  let body: { role?: Role; password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const supabase = createSupabaseAdminClient()

  // Role change
  if (body.role) {
    if (body.role !== 'super_admin' && body.role !== 'admin') {
      return NextResponse.json({ error: 'Invalid role.' }, { status: 400 })
    }

    if (id === me.id && body.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'You cannot demote yourself.' },
        { status: 400 }
      )
    }

    // Fetch existing user_metadata so we don't clobber other keys
    const { data: existing, error: fetchError } = await supabase.auth.admin.getUserById(id)
    if (fetchError || !existing.user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 })
    }

    const { error: updateError } = await supabase.auth.admin.updateUserById(id, {
      user_metadata: { ...existing.user.user_metadata, role: body.role },
    })
    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .update({ role: body.role })
      .eq('id', id)
    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 })
    }
  }

  // Password reset
  if (body.password) {
    if (body.password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      )
    }

    const { error: passwordError } = await supabase.auth.admin.updateUserById(id, {
      password: body.password,
    })
    if (passwordError) {
      return NextResponse.json({ error: passwordError.message }, { status: 500 })
    }
  }

  return NextResponse.json({ ok: true })
}

// DELETE — remove a user
export async function DELETE(_request: Request, { params }: Params) {
  const me = await getSessionUser()
  if (!me || me.role !== 'super_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params

  if (id === me.id) {
    return NextResponse.json(
      { error: 'You cannot remove your own account.' },
      { status: 400 }
    )
  }

  const supabase = createSupabaseAdminClient()
  const { error } = await supabase.auth.admin.deleteUser(id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  // profiles row is removed via ON DELETE CASCADE on the FK

  return NextResponse.json({ ok: true })
}
