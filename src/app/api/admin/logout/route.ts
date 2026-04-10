export async function POST() {
  return new Response(null, {
    status: 302,
    headers: {
      'Set-Cookie': 'admin_auth=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
      Location: '/admin/login',
    },
  })
}
