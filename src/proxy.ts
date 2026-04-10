import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Forward pathname to server components via a custom header
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  // Public admin routes that don't require authentication
  const isLoginPage = pathname === '/admin/login'
  const isAuthApi = pathname === '/api/admin/auth'

  // Protect all /admin/* and /api/admin/* routes (except login and auth)
  const isAdminRoute =
    pathname.startsWith('/admin') || pathname.startsWith('/api/admin')

  if (isAdminRoute && !isLoginPage && !isAuthApi) {
    const adminCookie = request.cookies.get('admin_auth')
    const validPassword = process.env.ADMIN_PASSWORD

    if (!adminCookie || !validPassword || adminCookie.value !== validPassword) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
