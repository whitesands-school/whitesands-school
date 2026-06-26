# Whitesands School

Website for Whitesands School (Lekki, Lagos) with a built-in admin panel for non-technical staff. This README covers local setup, configuration, and deployment.

- **Framework:** Next.js 16 (App Router) · React 19 · TypeScript
- **Styling:** Tailwind CSS v4 · Framer Motion
- **Data & auth:** Supabase (Auth + Storage)
- **Media:** ImageKit (images) · Cloudinary (video)
- **Email:** Resend

## Prerequisites

- **Node.js 20+** and npm
- A **Supabase** project (for the admin panel, content persistence, and uploads)

The site will run with no environment variables at all — it falls back to the seed JSON in `src/content/` and default CDN endpoints. Supabase is only required for the admin panel and the contact/visit forms.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in the values (see below)
npm run dev                  # http://localhost:3000
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Environment variables

Set these in `.env.local` (and in your host's dashboard for deploys). `NEXT_PUBLIC_*` values are exposed to the browser; the rest are server-only.

| Variable | Required? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (admin) | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes (admin) | Anon/publishable key — safe in the browser |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (admin) | **Server-only master key.** Never expose it |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Absolute base URL for SEO/email links |
| `NEXT_PUBLIC_IMAGEKIT_URL` | Optional | ImageKit endpoint; falls back to a default |
| `RESEND_API_KEY` | Optional | Outbound email; without it, forms still save to the inbox |
| `CONTACT_MESSAGE_TO` / `CONTACT_MESSAGE_FROM` | Optional | Contact-form email addresses |
| `VISIT_INQUIRY_TO` / `VISIT_INQUIRY_FROM` | Optional | Visit-request email addresses |

## Supabase setup

The admin panel needs:

1. Two **Storage buckets**: `site-content` (private — editable JSON) and `media` (public — uploaded images).
2. A **`profiles`** table: `id` (uuid), `email` (text), `role` (text), `created_at` (timestamp).
3. At least one **super-admin** user: create it in Supabase Auth with `user_metadata.role = "super_admin"`, add a matching `profiles` row, then manage further users from `/super-admin/users`.
4. For password-reset email to work in production: configure **SMTP** in Supabase and add your domain to the **Auth redirect URLs**.

On first run the content buckets can be empty — pages fall back to the seed JSON in `src/content/`. Editing anything in `/admin` writes the live object to Storage.

## Project structure

```
src/
├── app/              # Routes, layouts, API (App Router)
│   ├── admin/        # Content panel (role: admin)
│   ├── super-admin/  # User management (role: super_admin)
│   └── api/          # content/[name] (public read), admin/*, forms
├── components/       # layout/, sections/, ui/, admin/, seo/
├── content/          # Seed + offline-fallback JSON (live data lives in Supabase)
├── lib/              # content-store, media/imagekit helpers, supabase clients, auth
├── types/index.ts    # Content type interfaces
└── proxy.ts          # Auth gate + pathname header (Next.js 16's middleware)
```

## Things to know before editing

- **Content lives in Supabase Storage, not the repo.** `src/lib/content-store.ts` reads/writes it; `src/content/*.json` is only the seed and offline fallback. Edit live content in `/admin`, not those files.
- **`content-store.ts` and `supabase/admin.ts` are server-only** (they use the service-role key). Never import them into a Client Component.
- **Use `media()` and `video()`** (`src/lib/media.ts`) for all asset URLs — don't hard-code CDN hosts.
- **Tailwind v4:** brand colours and fonts are defined in the `@theme` block of `src/app/globals.css`, not in `tailwind.config.ts`. Add design tokens there.
- **`src/proxy.ts`** is the auth gate (Next.js 16 renamed `middleware.ts`).

## Deployment

Built for a Node host (e.g. Vercel). Set the environment variables above in the host dashboard for both production and preview, then deploy on push. Every page renders dynamically, so content edits appear without a rebuild.
