# Admin authentication — setup & operation

Whitesands has two staff roles:

- **Super-admin** — manages who has access. Lives at `/super-admin`. Can create, demote, promote, reset passwords for, and remove admins (and other super-admins).
- **Admin** — manages content (news, staff, testimonials, gallery, virtue, announcements, popovers). Lives at `/admin`.

Both sign in at `/admin/login`. Authentication runs on Supabase Auth; the role is stored on `auth.users.user_metadata.role` and mirrored in `public.profiles.role`.

---

## One-time setup

You only have to do this once, when you first deploy the new auth system.

### 1. Add the service-role key to `.env.local`

From Supabase → Settings → API, copy the **service_role** secret. Add it to `.env.local`:

```
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
```

Do not commit this key. Do not ever expose it to the browser. It bypasses every Row-Level-Security policy.

### 2. Create the `profiles` table

Open Supabase → SQL editor → paste the contents of [`scripts/setup-auth.sql`](../scripts/setup-auth.sql) and run it. Idempotent — safe to re-run.

### 3. Seed the first super-admin

From the repo root:

```
node scripts/seed-first-super-admin.mjs
```

This creates `ofoma.chudi@gmail.com` with password `chudi` and the `super_admin` role. Re-running just resets that password back to `chudi`, which is useful as a break-glass.

### 4. Remove the legacy single-password gate

The old `ADMIN_PASSWORD=...` line in `.env.local` is no longer used. Delete it.

---

## First sign-in

1. Restart the dev server (`npm run dev`) so it picks up the new env var.
2. Visit `/admin/login`.
3. Sign in with `ofoma.chudi@gmail.com` / `chudi`.
4. You'll land on `/super-admin`.
5. Go to **My account** → change your password to something only you know.
6. Go to **Users & roles** → add the other admins (and super-admins, if any).

---

## How it works

| Concern | Where it lives |
| --- | --- |
| Session cookie | Supabase Auth (httpOnly, via `@supabase/ssr`) |
| Route gating | [`src/proxy.ts`](../src/proxy.ts) — reads the session, checks `role` |
| Server-side role lookup | [`src/lib/auth.ts`](../src/lib/auth.ts) — `getSessionUser()`, `requireRole()` |
| User CRUD | [`src/app/api/super-admin/`](../src/app/api/super-admin/) — uses the service-role client |
| Service-role client | [`src/lib/supabase/admin.ts`](../src/lib/supabase/admin.ts) — server-only |

### Why `user_metadata.role`?

Storing the role on the auth user means we can check it from the proxy with a single `supabase.auth.getUser()` call — no extra DB round-trip per request. The `profiles` table mirrors it so super-admins can see and edit it without service-role.

If you ever change a user's role, **both** are updated atomically by `PATCH /api/super-admin/users/[id]`.

---

## Day-to-day

- **Add an admin** — Super-admin → Users & roles → Add user.
- **Reset a forgotten password** — Super-admin → Users & roles → Reset. Share the new password securely; the admin can change it themselves once they sign in.
- **Demote a super-admin to admin** — Toggle the role on their row. (You cannot demote yourself; another super-admin has to do it.)
- **Remove access** — Trash icon on the user row. The auth account and the `profiles` row are both removed.
- **Forgot your own super-admin password** — Ask another super-admin to reset it. If you are the only super-admin, re-run `node scripts/seed-first-super-admin.mjs` to reset `ofoma.chudi@gmail.com` back to `chudi`.

---

## Things deliberately not built

- **Self-service password reset by email.** Requires Supabase to send mail, which means configuring SMTP. Add later via `supabase.auth.resetPasswordForEmail()`.
- **Audit log.** Not in scope. If the school later wants "who created this user, when?" the `auth.audit_log_entries` table in Supabase already captures it.
- **Per-content-type permissions.** Admins can edit everything under `/admin`. If you ever need finer granularity (e.g. someone who can only edit news), add a `permissions: text[]` column on `profiles` and check it in the API routes.
