import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// ---------------------------------------------------------------------------
// proxy.ts (Next.js 16, formerly middleware.ts)
//
// Two responsibilities:
//
// 1. Forward the incoming pathname to Server Components via the `x-pathname`
//    header so the root layout can decide whether to render the public chrome.
//
// 2. Gate /admin and /super-admin (and their API routes) behind Supabase Auth.
//    The role is read from `user_metadata.role` which is set by the service
//    role when the user is created, so we don't need to round-trip the DB.
//      - super_admin  → can reach /super-admin AND /admin
//      - admin        → can reach /admin only
// ---------------------------------------------------------------------------

const ADMIN_ROOT = '/admin'
const SUPER_ADMIN_ROOT = '/super-admin'
const API_ADMIN_ROOT = '/api/admin'
const API_SUPER_ADMIN_ROOT = '/api/super-admin'

const PUBLIC_ADMIN_PATHS = new Set([
  '/admin/login',
  '/admin/forgot-password',
  '/admin/reset-password',
])
const PUBLIC_ADMIN_APIS = new Set(['/api/admin/logout'])

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  const isAdminPage = pathname.startsWith(ADMIN_ROOT)
  const isSuperAdminPage = pathname.startsWith(SUPER_ADMIN_ROOT)
  const isAdminApi = pathname.startsWith(API_ADMIN_ROOT)
  const isSuperAdminApi = pathname.startsWith(API_SUPER_ADMIN_ROOT)

  const needsAuth =
    (isAdminPage && !PUBLIC_ADMIN_PATHS.has(pathname)) ||
    isSuperAdminPage ||
    (isAdminApi && !PUBLIC_ADMIN_APIS.has(pathname)) ||
    isSuperAdminApi

  if (!needsAuth) {
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  // Build a response we can mutate (Supabase needs to write refreshed cookies
  // back onto it during getUser()).
  const response = NextResponse.next({ request: { headers: requestHeaders } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options)
          }
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const role = user?.user_metadata?.role as
    | 'super_admin'
    | 'admin'
    | undefined

  const isApi = isAdminApi || isSuperAdminApi

  // No session → bounce to login (or 401 for APIs)
  if (!user || !role) {
    if (isApi) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      })
    }
    const loginUrl = new URL('/admin/login', request.url)
    if (pathname !== '/admin') loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Super-admin-only zones
  if ((isSuperAdminPage || isSuperAdminApi) && role !== 'super_admin') {
    if (isApi) {
      return new NextResponse(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'content-type': 'application/json' },
      })
    }
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return response
}

export const config = {
  // Skip Next internals + the favicon so we don't pay the Supabase
  // round-trip on every static asset request. Site media lives on ImageKit,
  // so there are no /images, /videos, or /documents requests to exclude.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
