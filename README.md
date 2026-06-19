# Whitesands School

Marketing and content site for Whitesands School — an all-boys secondary school (JS1–SS3) in Lekki, Lagos. Public pages present the school; a built-in admin panel lets non-technical staff edit most of the content without a deploy.

- **Framework:** Next.js 16 (App Router) · React 19 · TypeScript
- **Styling:** Tailwind CSS v4 · Framer Motion · Radix UI · Lucide icons
- **Data & auth:** Supabase (Auth + Storage)
- **Media:** ImageKit (images) · Cloudinary (video)
- **Email:** Resend

---

## Quick start

```bash
# 1. Install (Node 20+)
npm install

# 2. Configure environment
cp .env.example .env.local   # then fill in the values — see "Environment" below

# 3. Run
npm run dev                  # http://localhost:3000
```

The site renders without any environment variables — it falls back to the JSON seed data in `src/content/` and serves media from the default ImageKit/Cloudinary endpoints. The **admin panel and forms require Supabase**; without it, `/admin` returns a 503 with an explanatory message.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next`) |

---

## Environment

All variables live in `.env.local` (git-ignored). The `NEXT_PUBLIC_` prefix exposes a value to the browser; everything else is server-only.

| Variable | Required for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Admin, content persistence | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Admin auth | Anon/publishable key — safe in the browser |
| `SUPABASE_SERVICE_ROLE_KEY` | Content writes, uploads, user mgmt | **Server-only master key.** Never expose it |
| `NEXT_PUBLIC_SITE_URL` | SEO, email links | e.g. `https://www.whitesands.org.ng`. Defaults to the production URL |
| `NEXT_PUBLIC_IMAGEKIT_URL` | Images | ImageKit endpoint. Falls back to the default in `imagekit.ts` |
| `RESEND_API_KEY` | Outbound email | Without it, form submissions are still saved to the inbox; email is skipped |
| `CONTACT_MESSAGE_TO` / `CONTACT_MESSAGE_FROM` | Contact form email | Default to `SITE.email` / `noreply@whitesands.org.ng` |
| `VISIT_INQUIRY_TO` / `VISIT_INQUIRY_FROM` | Visit-request email | As above |

The three Supabase variables are the only ones that gate core functionality. The rest degrade gracefully.

---

## Architecture

### Rendering

The root layout sets `export const dynamic = 'force-dynamic'`, so every page renders per-request. This is deliberate: content is read live from Supabase Storage, so an admin edit appears on the public site immediately rather than waiting for a rebuild. There is no static export or ISR step to manage.

### Content model

Editable content is stored as JSON objects in a **private Supabase Storage bucket (`site-content`)** — one object per content type (`news.json`, `staff.json`, and so on). The filesystem is not used for persistence; Vercel's filesystem is read-only and resets on deploy.

`src/lib/content-store.ts` is the single gateway:

- `readContent(name)` — fetches from Storage, with a 15-second per-instance cache. **Falls back to the bundled JSON in `src/content/`** when Storage is unreachable or the object is missing, so a fresh or offline environment still renders.
- `writeContent(name, data)` — upserts the object back to Storage and busts the cache. Throws if the service-role key isn't configured.

This module is **server-only** (it uses the service-role key). It is reached from the public side in two controlled ways:

- **Server Components** call `readContent` directly during render.
- **Client Components** fetch `GET /api/content/[name]`, a public, read-only endpoint allow-listed to non-sensitive types only (`virtue`, `testimonials`, `gallery`). The inbox and other types are never exposed here.

The JSON files in `src/content/` are both the seed for a new Supabase bucket and the offline fallback. Once Storage holds an object, it wins — edit live content through the admin panel, not by hand-editing these files.

### Media pipeline

Media does not live in `/public` in production — it is served from CDNs and resized at the edge.

- **Images → ImageKit.** A custom `next/image` loader (`src/lib/image-loader.ts`, wired via `images.loaderFile` in `next.config.ts`) rewrites every image URL into an ImageKit transform (`w-…,q-…,f-auto`). Camera originals never reach the browser. Use the `media('/images/…')` helper (`src/lib/media.ts`) for all asset paths — it maps a `/public`-style path to the CDN and passes absolute URLs (such as Supabase uploads) through untouched. `src/lib/imagekit.ts` provides `getImageKitUrl()` for non-`<Image>` cases (CSS backgrounds, plain `<img>`).
- **Video → Cloudinary.** ImageKit ignores HTTP range requests, which breaks seeking and Safari playback, so video uses Cloudinary. Build URLs with `video(publicId)` (`src/lib/media.ts`), which applies `q_auto,vc_h264` for cross-browser H.264. Pass `{ silent: true }` to strip the audio track (`ac_none`) — used by the hero video for copyright reasons.
- **Admin uploads → Supabase `media` bucket.** `POST /api/admin/upload` accepts a multipart image (≤10 MB; JPEG, PNG, WebP, AVIF, GIF), writes it to the public `media` bucket, and returns its public URL, which is stored verbatim in the content JSON. The image loader routes those Supabase URLs through Supabase's own image-transform endpoint.

**Filename note:** some legacy asset filenames contain literal spaces. The loader URL-encodes them (`%20`) because a raw space breaks `srcset` parsing. Prefer space-free filenames for new uploads.

### Authentication & roles

Auth is Supabase Auth (email + password). There are two roles, stored in the user's `user_metadata.role` so the check needs no database round-trip:

- `admin` — the content panel at `/admin`.
- `super_admin` — everything `admin` can do, **plus** `/super-admin`, where they create and manage other users.

`src/proxy.ts` (Next.js 16's renamed `middleware.ts`) gates access:

- Adds an `x-pathname` header so the root layout can decide whether to render public chrome (nav/footer) or none for admin routes.
- Protects `/admin`, `/super-admin`, and their API namespaces. Public exceptions: `/admin/login`, `/admin/forgot-password`, `/admin/reset-password`, and `POST /api/admin/logout`.
- Unauthenticated page requests redirect to `/admin/login?next=…`; API requests get a `401`. A `super_admin`-only route hit by an `admin` gets a redirect (or `403` for APIs).

On the server, `src/lib/auth.ts` exposes `getSessionUser()` and `requireRole([...])` for Server Components and route handlers. New users are created by a super-admin through `supabase.auth.admin.createUser` and mirrored into a `profiles` table (`id`, `email`, `role`, `created_at`).

### Forms & email

The public contact and visit-request forms post to `/api/contact-message` and `/api/visit-inquiry`. Each one:

1. Validates input with Zod.
2. **Appends the submission to the `inbox` content object** (`src/lib/inbox.ts`) so nothing is ever lost, even with email unconfigured. Staff read these at `/admin/inbox`.
3. Best-effort sends notification and confirmation emails through Resend, if `RESEND_API_KEY` is set. Email failure never fails the request.

---

## Project structure

```
src/
├── app/                      # App Router — routes, layouts, API
│   ├── layout.tsx            # Root layout: fonts, SEO, chrome, force-dynamic
│   ├── page.tsx              # Homepage
│   ├── (public pages)/       # about, admissions, what-we-offer, our-people,
│   │                         # news, gallery, fees-portal, contact,
│   │                         # 25th-anniversary, alumni-prizes
│   ├── admin/                # Content panel (role: admin)
│   ├── super-admin/          # User management (role: super_admin)
│   └── api/
│       ├── content/[name]/   # Public read-only content (allow-listed)
│       ├── admin/            # Authenticated content CRUD + upload + logout
│       ├── super-admin/      # User CRUD, account
│       ├── contact-message/  # Contact form intake
│       └── visit-inquiry/    # Visit-request intake
├── components/
│   ├── layout/               # Navbar, Footer, AnnouncementBanner, PopoverModal, …
│   ├── sections/             # Page sections (HeroVideo, PillarsStrip, LatestNews, …)
│   ├── ui/                   # Primitives (Button, Badge, SectionLabel, …)
│   ├── admin/                # Admin UI kit (ui.tsx) + NewsForm
│   └── seo/                  # SchoolJsonLd, ArticleJsonLd structured data
├── content/                  # JSON seed + offline fallback (see content model)
├── lib/
│   ├── content-store.ts      # Supabase Storage read/write + JSON fallback
│   ├── media.ts              # media() + video() URL helpers
│   ├── image-loader.ts       # next/image custom loader (ImageKit/Supabase)
│   ├── imagekit.ts           # ImageKit URL builder
│   ├── auth.ts               # getSessionUser / requireRole
│   ├── supabase/             # browser / server / admin clients
│   ├── inbox.ts              # form-submission persistence
│   ├── testimonials.ts       # testimonial → video view-model
│   ├── staff-categories.ts   # canonical staff department list
│   ├── site.ts               # SITE constants (name, contact, address, socials)
│   └── tokens.ts             # brand colour hex values
├── types/index.ts            # Content type interfaces
└── proxy.ts                  # Auth gate + x-pathname (formerly middleware.ts)
```

---

## The admin panel

All editors share the UI kit in `src/components/admin/ui.tsx`. Each writes through an authenticated `PUT`/`POST` to `/api/admin/*`, which persists via `writeContent`.

| Route | Manages |
| --- | --- |
| `/admin` | Dashboard with content counts |
| `/admin/news` · `/news/new` · `/news/[id]` | News posts (publish/draft, auto-slug) |
| `/admin/staff` | Staff directory (drawer form, photo upload, qualifications) |
| `/admin/gallery` | Photo gallery |
| `/admin/virtue` | Virtue of the month (per-month) |
| `/admin/testimonials` | Parent / student / staff quotes and video reviews |
| `/admin/announcement` | The site-wide banner (one active at a time) |
| `/admin/popover` | The homepage modal (with optional expiry) |
| `/admin/inbox` | Read contact and visit submissions |
| `/admin/account` | Change your own email / password |
| `/super-admin/users` | Create, re-role, and remove admin accounts (super-admin only) |

Content shapes are defined in `src/types/index.ts`: `NewsPost`, `StaffMember`, `Announcement`, `VirtueOfMonth`, `GalleryImage`, `Testimonial`, `SitePopover`.

Staff photos: the upload field carries guidance to use head-and-shoulders portraits cropped to a consistent face size (the school's yearbook routine) so the Our People grid stays even.

---

## Design system

- **Colours** (Tailwind utilities, defined in `src/app/globals.css` `@theme`, mirrored in `src/lib/tokens.ts`):
  `deep` `#2C246B` (nav, dark sections), `lemon` `#FFF700` (accent), `bold` `#DD251D` (CTAs), `offwhite` `#F8F8F4`, `dark` `#1A1530` (body text), `muted` `#6B6490`. The brand reads the three colours as Students (blue/purple), Teachers (red), Parents (yellow).
- **Fonts** (`next/font/google`, exposed as CSS variables): `font-serif` PT Serif (display), `font-sans` PT Sans (body), `font-roboto` Roboto (UI/labels).
- **Motion:** Framer Motion scroll-triggered fade-ups, roughly 80ms stagger, cards lift on hover. Respects `prefers-reduced-motion`.

**Tailwind v4 note:** there is no `@tailwind` directive, and the v3-style `tailwind.config.ts` is not auto-loaded. Custom colours and fonts are declared in the `@theme` block of `globals.css`. Add new design tokens there.

---

## External services

A full environment needs accounts for:

1. **Supabase** — Auth plus two Storage buckets:
   - `site-content` (**private**) — the editable JSON objects.
   - `media` (**public**) — admin image uploads.
   - A `profiles` table (`id`, `email`, `role`, `created_at`) mirroring auth users.
2. **ImageKit** — image CDN. The asset folder structure mirrors the old `/public` layout.
3. **Cloudinary** — video delivery (account `dud5owpai` in the current code; change the base in `src/lib/media.ts` if you migrate).
4. **Resend** — transactional email (optional but recommended).

---

## Deployment

Built for **Vercel**. Set every environment variable from the table above in the Vercel project (production and preview), then deploy on push.

### Production checklist

- [ ] All three Supabase variables set, plus `NEXT_PUBLIC_SITE_URL`.
- [ ] Storage buckets `site-content` (private) and `media` (public) created; seed the content objects from `src/content/` on first run.
- [ ] At least one `super_admin` seeded — create the first one directly in Supabase Auth with `user_metadata.role = "super_admin"` and a matching `profiles` row; thereafter use `/super-admin/users`.
- [ ] Supabase **Auth redirect URLs** include the production domain — otherwise password-reset links point at the wrong host.
- [ ] Supabase **SMTP** configured — the default Supabase mailer is rate-limited and won't reliably deliver forgot-password email in production.
- [ ] `RESEND_API_KEY` set if you want contact/visit email (submissions are saved to the inbox regardless).
- [ ] Fees payments route through the school's **PixPay** portal — there is no in-app payment processing to configure.

---

## Conventions & gotchas

- **`src/proxy.ts`, not `middleware.ts`.** Next.js 16 renamed it; the role is the same.
- **Always use `media()` / `video()`** for asset URLs. Don't hard-code CDN hosts — only those helpers change if a CDN is swapped.
- **Never import `content-store.ts`, `supabase/admin.ts`, or anything using the service-role key into a Client Component.** They are server-only by design.
- **Edit live content through `/admin`**, not the JSON in `src/content/` — those files are only the seed and offline fallback once Storage is populated.
- **This is not the Next.js in older docs.** Per `AGENTS.md`, this is Next.js 16 with breaking changes; check `node_modules/next/dist/docs/` before relying on older API behaviour.
- **`CLAUDE.md` is intentionally git-ignored** — it holds local notes and is not part of the codebase.
- The footer credit line ("Greyform") is intentional.

---

## Common tasks

**Add a news post** — `/admin/news → New Post`. The title auto-generates the slug; toggle Published when ready.

**Add a staff member** — `/admin/staff → Add staff`. Upload a consistent head-and-shoulders portrait; set the department and display order.

**Create an admin** — sign in as a super-admin, then `/super-admin/users → add`. Choose `admin` or `super_admin`.

**Change a brand colour** — edit the `@theme` block in `src/app/globals.css` (and `src/lib/tokens.ts` if the value is referenced from JS).

**Swap the hero video** — change the Cloudinary public ID passed to `video(...)` in `src/components/sections/HeroVideo.tsx`.
