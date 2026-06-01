// Seed the first super-admin into Supabase Auth + the profiles table.
//
//   node scripts/seed-first-super-admin.mjs
//
// Reads from .env.local. Requires SUPABASE_SERVICE_ROLE_KEY.
//
// Safe to re-run: if the user already exists we just (re)set the password and
// upsert the profile row.

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const ENV_FILE = join(process.cwd(), '.env.local')
if (existsSync(ENV_FILE)) {
  for (const line of readFileSync(ENV_FILE, 'utf-8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq)
    const value = trimmed.slice(eq + 1).replace(/^['"]|['"]$/g, '')
    if (!process.env[key]) process.env[key] = value
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local'
  )
  process.exit(1)
}

const FIRST_EMAIL = 'ofoma.chudi@gmail.com'
const FIRST_PASSWORD = 'chudi'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function findExistingUser(email) {
  // listUsers is paginated; 1000 is plenty for our case.
  const { data, error } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  })
  if (error) throw error
  return data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
}

async function run() {
  let user = await findExistingUser(FIRST_EMAIL)

  if (user) {
    console.log(`User ${FIRST_EMAIL} already exists — resetting password.`)
    const { error } = await supabase.auth.admin.updateUserById(user.id, {
      password: FIRST_PASSWORD,
      email_confirm: true,
      user_metadata: { ...user.user_metadata, role: 'super_admin' },
    })
    if (error) throw error
  } else {
    console.log(`Creating ${FIRST_EMAIL} as super_admin.`)
    const { data, error } = await supabase.auth.admin.createUser({
      email: FIRST_EMAIL,
      password: FIRST_PASSWORD,
      email_confirm: true,
      user_metadata: { role: 'super_admin' },
    })
    if (error) throw error
    user = data.user
  }

  const { error: upsertError } = await supabase
    .from('profiles')
    .upsert(
      { id: user.id, email: FIRST_EMAIL, role: 'super_admin' },
      { onConflict: 'id' }
    )
  if (upsertError) throw upsertError

  console.log(`\nDone. You can now sign in at /admin/login with:`)
  console.log(`  Email:    ${FIRST_EMAIL}`)
  console.log(`  Password: ${FIRST_PASSWORD}`)
  console.log(`\nChange this password from /super-admin/account as soon as you sign in.`)
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
