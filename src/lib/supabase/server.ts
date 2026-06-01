import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

/**
 * Supabase client for use inside Server Components, Route Handlers, and
 * Server Actions. Bridges Next.js's cookie store so the session can be read
 * from incoming requests.
 *
 * Use this whenever you need to query Supabase on the server.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Server Components can't set cookies; this is expected when the
            // helper is used outside a Server Action or Route Handler.
          }
        },
      },
    }
  );
}
