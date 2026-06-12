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
- **Forgot password (self-service)** — On `/admin/login`, click **Forgot password?**. A reset link is emailed via Supabase Auth; it lands on `/admin/reset-password` where the user picks a new password and is signed straight in.
- **Reset someone else's password** — Super-admin → Users & roles → Reset. Share the new password securely; the admin can change it themselves from **My account**.
- **Change your own password while signed in** — `/admin/account` (all roles) or `/super-admin/account` (super-admins). Both verify the current password first.
- **Demote a super-admin to admin** — Toggle the role on their row. (You cannot demote yourself; another super-admin has to do it.)
- **Remove access** — Trash icon on the user row. The auth account and the `profiles` row are both removed.
- **Break-glass** — If every super-admin is locked out, re-run `node scripts/seed-first-super-admin.mjs` to reset `ofoma.chudi@gmail.com` back to `chudi`. (Requires Node 22+, or run the equivalent curl calls against the auth admin API.)

---

## Reset-link email — two production checkboxes

The forgot-password flow works out of the box in development, but check these before go-live (both in the Supabase Dashboard):

1. **Authentication → URL Configuration** — set the Site URL to the production domain and add `https://<your-domain>/**` (and `http://localhost:3000/**` for dev) to the Redirect URLs allow-list, so the link may land on `/admin/reset-password`.
2. **Project Settings → Auth → SMTP** — Supabase's built-in email service is rate-limited and, on newer projects, may only deliver to project team members. Plug in any SMTP provider (Resend has a free tier and a guided Supabase integration) so resets reach all admin inboxes reliably.

---

## Image uploads

Admins upload images directly from any image field in the admin (staff photos, news covers, gallery, testimonial posters, popovers). Files go through `POST /api/admin/upload` into the public **`media`** bucket on Supabase Storage (10 MB max, images only), and the resulting public URL is stored in the content JSON. Pasting an external URL or an ImageKit path still works.

---

## Things deliberately not built

- **Audit log.** Not in scope. If the school later wants "who created this user, when?" the `auth.audit_log_entries` table in Supabase already captures it.
- **Per-content-type permissions.** Admins can edit everything under `/admin`. If you ever need finer granularity (e.g. someone who can only edit news), add a `permissions: text[]` column on `profiles` and check it in the API routes.
