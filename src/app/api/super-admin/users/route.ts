import { NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { getSessionUser } from '@/lib/auth'

type Role = 'super_admin' | 'admin'

// GET /api/super-admin/users — list everyone in the profiles table
export async function GET() {
  const me = await getSessionUser()
  if (!me || me.role !== 'super_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, role, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(
    data.map((row) => ({
      id: row.id,
      email: row.email,
      role: row.role,
      createdAt: row.created_at,
    }))
  )
}

// POST /api/super-admin/users — create a new user
export async function POST(request: Request) {
  const me = await getSessionUser()
  if (!me || me.role !== 'super_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let body: { email?: string; password?: string; role?: Role }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const email = body.email?.trim().toLowerCase()
  const password = body.password
  const role = body.role

  if (!email || !password || (role !== 'super_admin' && role !== 'admin')) {
    return NextResponse.json(
      { error: 'Email, password, and role are required.' },
      { status: 400 }
    )
  }
  if (password.length < 6) {
    return NextResponse.json(
      { error: 'Password must be at least 6 characters.' },
      { status: 400 }
    )
  }

  const supabase = createSupabaseAdminClient()

  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role },
  })

  if (createError || !created.user) {
    return NextResponse.json(
      { error: createError?.message || 'Failed to create user.' },
      { status: 400 }
    )
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({ id: created.user.id, email, role }, { onConflict: 'id' })

  if (profileError) {
    // Roll back the auth user so we don't end up with an orphan
    await supabase.auth.admin.deleteUser(created.user.id)
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }

  return NextResponse.json({
    id: created.user.id,
    email,
    role,
    createdAt: created.user.created_at,
  })
}
