import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword || password !== adminPassword) {
    return Response.json({ error: 'Invalid password' }, { status: 401 })
  }

  const response = Response.json({ ok: true })
  const headers = new Headers(response.headers)
  headers.append(
    'Set-Cookie',
    `admin_auth=${adminPassword}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 8}`
  )

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers,
  })
}
