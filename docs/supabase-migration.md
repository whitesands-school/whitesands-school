# Supabase migration — handoff guide

The admin panel is currently backed by the JSON files under `src/content/`.
Everything works, everything ships. When the school is ready to switch
storage to a real database — or wants multiple staff to edit at once — this
guide is the path forward.

The Supabase clients are already wired:

- `src/lib/supabase/browser.ts` — for Client Components
- `src/lib/supabase/server.ts` — for Server Components, Route Handlers, and
  Server Actions

Both read from the env vars you've already set in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://ffglldzxaxjlaufoaopy.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

You will also want a service-role key for write-side route handlers:

```
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...   # never expose this to the browser
```

---

## 1. Schema (one-time SQL)

Run this in the Supabase SQL editor. It mirrors the JSON content types
1-for-1 so the migration is mechanical.

```sql
-- News
create table public.news (
  id            text primary key,
  title         text not null,
  slug          text not null unique,
  category      text not null,
  excerpt       text not null,
  content       text not null,
  cover_image   text,
  date          date not null,
  published     boolean not null default false,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);
create index news_published_date_idx on public.news (published, date desc);

-- Staff
create table public.staff (
  id              text primary key,
  name            text not null,
  title           text not null,
  department      text not null,
  bio             text,
  qualifications  text[] default '{}',
  years_at_school int default 0,
  photo           text,
  "order"         int default 99,
  is_leadership   boolean not null default false,
  updated_at      timestamptz default now()
);
create index staff_order_idx on public.staff ("order");

-- Testimonials
create table public.testimonials (
  id          text primary key,
  type        text not null check (type in ('parent', 'staff', 'student')),
  name        text not null,
  role        text,
  quote       text not null,
  video_url   text,
  poster_url  text,
  updated_at  timestamptz default now()
);

-- Gallery
create table public.gallery (
  id        text primary key,
  src       text not null,
  alt       text not null,
  category  text not null
);

-- Virtue of the month (one row per month name)
create table public.virtue (
  month       text primary key,
  virtue      text not null,
  definition  text not null,
  reflection  text not null,
  updated_at  timestamptz default now()
);

-- Announcements
create table public.announcements (
  id          text primary key,
  message     text not null,
  color       text not null check (color in ('red', 'yellow', 'blue')),
  link_text   text,
  link_url    text,
  active      boolean not null default false,
  updated_at  timestamptz default now()
);

-- Popovers
create table public.popovers (
  id           text primary key,
  title        text not null,
  body         text not null,
  image_url    text,
  cta_label    text,
  cta_url      text,
  active       boolean not null default false,
  expires_at   date,
  updated_at   timestamptz default now()
);

-- Visit inquiries (so admissions has a record without depending on email)
create table public.visit_inquiries (
  id              uuid primary key default gen_random_uuid(),
  parent_name     text not null,
  email           text not null,
  phone           text not null,
  son_class       text not null,
  preferred_week  text not null,
  message         text,
  received_at     timestamptz default now()
);

-- Contact messages
create table public.contact_messages (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null,
  subject      text not null,
  message      text not null,
  received_at  timestamptz default now()
);
```

---

## 2. Row-Level Security

Public site reads should be open. Writes should require auth.

```sql
alter table public.news           enable row level security;
alter table public.staff          enable row level security;
alter table public.testimonials   enable row level security;
alter table public.gallery        enable row level security;
alter table public.virtue         enable row level security;
alter table public.announcements  enable row level security;
alter table public.popovers       enable row level security;

-- Public read for content the website renders
create policy "public_read_news"          on public.news          for select using (published = true);
create policy "public_read_staff"         on public.staff         for select using (true);
create policy "public_read_testimonials"  on public.testimonials  for select using (true);
create policy "public_read_gallery"       on public.gallery       for select using (true);
create policy "public_read_virtue"        on public.virtue        for select using (true);
create policy "public_read_announcement"  on public.announcements for select using (active = true);
create policy "public_read_popover"       on public.popovers      for select using (active = true);

-- Form-submission inserts (the public site posts to these tables)
alter table public.visit_inquiries enable row level security;
alter table public.contact_messages enable row level security;
create policy "public_insert_visit"   on public.visit_inquiries  for insert with check (true);
create policy "public_insert_contact" on public.contact_messages for insert with check (true);

-- Admin (service-role) writes bypass RLS automatically. No extra policies needed.
```

---

## 3. Storage buckets

For staff portraits, news covers, gallery images, popover graphics:

```
Create bucket: public-images   (public: yes)
Create bucket: video-posters   (public: yes)
```

Set up a CORS rule and you can switch the admin's "image path" inputs to a
proper upload flow using `supabase.storage.from(...).upload(...)`.

---

## 4. Seed the data

```bash
# From the repo root, with service-role key in env
node scripts/seed-from-json.mjs
```

You'll need a small one-shot script like this (drop into
`scripts/seed-from-json.mjs`):

```js
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const tables = [
  { file: 'news.json',          table: 'news' },
  { file: 'staff.json',         table: 'staff' },
  { file: 'testimonials.json',  table: 'testimonials' },
  { file: 'gallery.json',       table: 'gallery' },
  { file: 'virtue.json',        table: 'virtue' },
  { file: 'announcements.json', table: 'announcements' },
  { file: 'popover.json',       table: 'popovers' },
];

for (const { file, table } of tables) {
  const rows = JSON.parse(
    readFileSync(join('src/content', file), 'utf-8')
  );
  // snake-case keys where needed: coverImage -> cover_image, isLeadership -> is_leadership, etc.
  const { error } = await supabase.from(table).upsert(rows);
  if (error) {
    console.error(`Failed to seed ${table}:`, error);
    process.exit(1);
  }
  console.log(`Seeded ${rows.length} rows into ${table}`);
}
```

---

## 5. Switch the read path

Replace the JSON-reading helpers in `src/lib/content.ts` with Supabase
queries:

```ts
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getNews(): Promise<NewsPost[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('news')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false });
  return (data ?? []) as NewsPost[];
}
```

Add `export const revalidate = 60` to public news pages (or use Next's
`unstable_cache`) so reads are still fast.

---

## 6. Switch the admin write path

Each `src/app/api/admin/{thing}/route.ts` currently does
`readFileSync` / `writeFileSync`. Swap those for Supabase calls using the
service-role client. The UI in `src/app/admin/**/page.tsx` does not need to
change — it talks to those route handlers, which is the seam.

---

## 7. Authentication (optional but recommended)

Today, `/admin/login` uses a single shared password env var. To support
multiple admin users:

1. In Supabase Auth, invite users by email
2. Replace the password handler in `src/app/api/admin/auth/route.ts` with a
   Supabase sign-in call
3. The `proxy.ts` already gates `/admin/*` routes. Update it to check for a
   Supabase session cookie instead of `admin_auth`

Until then, the current cookie-based password gate is fine for a single-admin
school workflow.

---

## What lives where, today

| Content        | JSON file                          | Admin route             |
| -------------- | ---------------------------------- | ----------------------- |
| News           | `src/content/news.json`            | `/admin/news`           |
| Staff          | `src/content/staff.json`           | `/admin/staff`          |
| Testimonials   | `src/content/testimonials.json`    | `/admin/testimonials`   |
| Gallery        | `src/content/gallery.json`         | `/admin/gallery`        |
| Virtues        | `src/content/virtue.json`          | `/admin/virtue`         |
| Announcements  | `src/content/announcements.json`   | `/admin/announcement`   |
| Popovers       | `src/content/popover.json`         | `/admin/popover`        |

The school can edit all of the above today, through the admin UI, without
ever touching the JSON files directly.
