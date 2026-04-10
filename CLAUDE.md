@AGENTS.md

# Whitesands School — Project Context

## Stack

- Next.js 14 App Router, TypeScript, Tailwind CSS
- Framer Motion (animations), Radix UI (accessible components), Lucide React (icons)
- Fonts: PT Serif (display), Roboto (headings/UI), PT Sans (body) — via next/font/google

## Brand Colors (already in tailwind.config.ts)

- bg-deep / text-deep = #2C246B (dominant: nav, dark sections, footer)
- bg-lemon / text-lemon = #FFF700 (accent: highlights, hover states)
- bg-bold / text-bold = #DD251D (CTAs, alerts, buttons)
- bg-offwhite = #F8F8F4 (alternating sections)
- text-dark = #1A1530 (body text on light)
- text-muted = #6B6490 (captions, labels)

## Font Classes (already configured)

- font-serif = PT Serif
- font-sans = PT Sans
- font-roboto = Roboto

## Design Reference

- Layout/structure: dubaicollege.org
- Nav: transparent over hero → white + deep border on scroll
- Animations: Framer Motion scroll-triggered fade-up, stagger 80ms between children
- Cards: hover lift (translateY -4px + shadow deepens, 200ms ease-out)
- Sections alternate: white → offwhite → deep (dark) → white

## School Info

- Name: Whitesands School
- Motto: "Duc in Altum" (Latin: Launch into the Deep — Luke 5:4)
- Catholic school, Nigeria
- Colors represent: Yellow = Parents, Red = Teachers, Blue/Purple = Students
- Key pages: Home, About, What We Offer, Admissions, Our People, Fees Portal, 25th Anniversary, Contact, News, Admin

## File Structure Convention

- /src/components/layout/ — Nav, Footer, shared layout pieces
- /src/components/ui/ — Reusable primitives (Button, Card, Badge, etc.)
- /src/components/sections/ — Page-specific section components
- /src/app/[page]/ — Next.js App Router pages
- /src/lib/ — Utilities, types, data fetching
- /src/content/ — JSON content files (news, staff, etc.)
- /src/types/ — TypeScript interfaces

## Conversation Summary

A typed content layer for the Whitesands School site — no UI, just the data foundation everything else will import from.

### Types — [src/types/index.ts](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/types/index.ts)

Six TypeScript interfaces covering every content model the site needs: `NewsPost`, `StaffMember`, `Announcement`, `VirtueOfMonth`, `GalleryImage`, and `Testimonial`.

### Content — [src/content/](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/content/)

Six JSON files with realistic placeholder data rooted in the school's Catholic Nigerian identity:

* [news.json](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/content/news.json) — 7 published posts (academics, events, sports, admissions, etc.)
* [staff.json](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/content/staff.json) — 11 staff members: 3 leadership (Principal + 2 Deputies) and 8 subject teachers, each with bio, qualifications, department, and sort order
* [announcements.json](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/content/announcements.json) — 5 announcements in red/yellow/blue; one currently active
* [virtue.json](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/content/virtue.json) — 8 monthly virtues (Sep–Apr) with definitions and reflections tied to the school's motto *Duc in Altum*
* [gallery.json](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/content/gallery.json) — 12 images across 6 categories
* [testimonials.json](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/content/testimonials.json) — 8 testimonials from alumni, parents, and staff; one with a video URL

### Content library — [src/lib/content.ts](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/lib/content.ts)

Typed functions that import each JSON file and expose filtered/sorted views:

* News: `getNews()`, `getFeaturedPost()`, `getRecentNews()`, `getNewsBySlug()`, `getNewsByCategory()`
* Staff: `getAllStaff()`, `getLeadership()`, `getStaffByDepartment()`, `getStaffById()`
* Announcements: `getAnnouncements()`, `getActiveAnnouncement()`
* Virtue: `getVirtues()`, `getVirtueByMonth()`, `getCurrentVirtue()` (auto-detects from today's date)
* Gallery: `getGalleryImages()`, `getGalleryByCategory()`, `getGalleryCategories()`
* Testimonials: `getTestimonials()`, `getTestimonialsByType()`, `getVideoTestimonials()`

## UI Primitives — Build Summary

**Problem fixed first:** Tailwind v4 ignores `tailwind.config.ts` without an explicit `@config` directive. Added an `@theme` block to [globals.css](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/app/globals.css) so `bg-deep`, `text-bold`, `font-roboto`, etc. generate correctly.

---

### Files created in [src/components/ui/](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/ui/)

| File                                                                                                                            | What it does                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [Button.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/ui/Button.tsx)                   | 4 variants (`primary/secondary/outline/ghost`), 3 sizes, optional `rightIcon`, Framer Motion scale on hover/tap |
| [Badge.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/ui/Badge.tsx)                     | Category label with a color map for Academic/Sport/Events/Community/Spiritual                                       |
| [SectionLabel.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/ui/SectionLabel.tsx)       | Uppercase Roboto label with a 2px `bg-lemon` left bar; `light` prop for dark-section use                        |
| [AnimatedSection.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/ui/AnimatedSection.tsx) | Scroll-triggered fade-up via `useInView`, 80ms stagger between direct children, `delay` prop                    |
| [Divider.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/ui/Divider.tsx)                 | Sine-wave SVG divider with `color` and `flip` props                                                             |
| [index.ts](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/ui/index.ts)                       | Barrel export for all five components                                                                               |

Two files were modified (neither was created new):

**[src/app/layout.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/app/layout.tsx)** — Root layout foundation

* Replaced the Geist placeholder fonts with PT Serif, PT Sans, and Roboto loaded via `next/font/google`
* Each font exposes a CSS variable (`--font-serif`, `--font-sans`, `--font-roboto`) applied to `<html>`
* Body defaults: `font-sans`, `text-dark`, `bg-white`, `antialiased`
* Metadata updated to reflect the school name and motto

**[src/app/globals.css](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/app/globals.css)** — Global styles

* `@theme` block already had brand colors; added font fallback stacks (next/font overrides these at runtime)
* `scroll-behavior: smooth` on `html`
* Thin 6px scrollbar styled in `#2C246B` (deep purple)
* `::selection` highlights in lemon yellow with dark text


The `Navbar` is a fixed, two-tier header:

1. **Utility bar** (`bg-deep`, 36px) — motto in PT Serif italic left; Parent Portal + 25th Anniversary links right, `hover:text-lemon`.
2. **Main nav** (64px) — transparent over the hero, transitions to white with a 2px `border-deep` bottom and subtle shadow once scrolled past 80px. Uses `useScroll` + `useMotionValueEvent` from Framer Motion; all properties animate over 300ms.
3. **Logo** — inline shield SVG placeholder (deep + lemon coloring) + "Whitesands / School" wordmark. Colors invert with the scroll state.
4. **Mega dropdown** — hover-triggered on About, What We Offer, and Our People. Full-width white panel, `opacity 0→1 + y -8→0` in 150ms. Each link has a lemon left-border that scales in on hover. A 120ms close timer prevents the panel from snapping shut when the cursor moves between the trigger and the panel.
5. **Mobile menu** — hamburger (Menu/X icons, animated swap) opens a full-screen `bg-deep` overlay. Nav items with dropdowns expand accordion-style with animated chevrons and lemon dot bullets. Body scroll locks while open; menu closes automatically on route change.


### Footer — [src/components/layout/Footer.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/layout/Footer.tsx) *(created)*

A three-row footer:

* **Row 1** (`bg-dark`) — 4-column grid: logo + motto + contact info, then About / Learn / Connect link columns with lemon headings and white/70 links
* **Row 2** (`bg-deep`) — Social strip with inline SVG icons for Instagram, Facebook, LinkedIn, and YouTube (lucide-react has no brand icons, so SVGs were written directly)
* **Row 3** (`bg-deep` + white/10 top border) — Copyright line left, credit line right

### Files modified

* **[src/components/layout/Navbar.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/layout/Navbar.tsx)** — Replaced the hand-drawn `ShieldLogo` SVG component with the real logo from `public/images/logos/whitesands-school-logo.svg`. Removed the text labels beside it once it was clear the logo image already contains the school name.
* **[src/app/layout.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/app/layout.tsx)** — Added `<Footer />` below `<main>` so it renders on every page alongside the existing `<Navbar />`.


## Home Page — First 3 Sections

### Files created

| File                                                                                                                                                      | Description                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [src/components/sections/HeroSlideshow.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/sections/HeroSlideshow.tsx) | Full-viewport hero slideshow with 5 slides              |
| [src/components/sections/WelcomeBlock.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/sections/WelcomeBlock.tsx)   | Centred welcome section with label, heading, body, link |
| [src/components/sections/StatsStrip.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/sections/StatsStrip.tsx)       | Dark stats band with count-up numbers                   |

### Files modified

| File                                                                                                    | Change                                                   |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| [src/app/page.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/app/page.tsx) | Replaced the Next.js placeholder with the three sections |
| [next.config.ts](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/next.config.ts)     | Added `images.unsplash.com` remote pattern             |

---

### What each section does

**Hero Slideshow** — 5 Unsplash slides with a dark gradient overlay. `AnimatePresence` crossfades between slides every 5 seconds (pauses on hover). The headline animates word-by-word on each slide change. Prev/next arrow buttons and lemon-pill dot indicators sit at the edges. Sits flush against the top of the viewport behind the transparent navbar via `-mt-25 h-screen`.

**Welcome Block** — White section, centred, max-w-3xl. Uses `SectionLabel` and `AnimatedSection` for a scroll-triggered stagger reveal. A `text-deep` underlined link leads to the About page.

**Stats Strip** — `bg-deep` band with 6 stats (Years, Students, WAEC Pass Rate, Staff, Ratio, Campuses). Each number counts up from 0 using `useMotionValue` + `animate()` triggered once by `useInView` on scroll entry.


Four sections appended to the Whitesands homepage (`src/app/page.tsx`):

---

**Section 4 — Latest News** ([LatestNews.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/sections/LatestNews.tsx))
A 60/40 grid on large screens. The featured post sits in a white card with its own "Read More" button. Four sidebar posts are stacked with `py-6` spacing and 2-line excerpts. "View all news →" is anchored to the bottom of the sidebar list, not the page — removing the CTA confusion.

**Section 5 — Community Testimonials** ([CommunityTestimonials.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/sections/CommunityTestimonials.tsx))
Radix UI `Tabs.Root` driving three panels (Students / Staff / Parents). Active tab is `bg-deep text-white`. Tab content switches with a 150ms `AnimatePresence` fade. Each panel is a two-column layout: video placeholder left, large PT Serif italic quote right.

**Section 6 — CTA Strip** ([CTAStrip.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/sections/CTAStrip.tsx))
`bg-deep` band with three equal blocks (Inquire / Visit / Apply) separated by `border-white/20` dividers. Uses Framer Motion parent/child variant propagation — hovering a block fades in `bg-white/5` and lifts the Lucide icon `y: -4` simultaneously.

**Section 7 — Anniversary Teaser** ([AnniversaryTeaser.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/sections/AnniversaryTeaser.tsx))
`bg-lemon` strip. Left side is an inline SVG badge (deep circle, dashed outer ring, "25 / YEARS / 1999–2024"). Right side has the heading, PT Serif italic sub, and a primary CTA button linking to the anniversary page.

---

### Files created

| File                                                                                                                                                                      | New |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| [src/components/sections/LatestNews.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/sections/LatestNews.tsx)                       | ✓  |
| [src/components/sections/CommunityTestimonials.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/sections/CommunityTestimonials.tsx) | ✓  |
| [src/components/sections/CTAStrip.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/sections/CTAStrip.tsx)                           | ✓  |
| [src/components/sections/AnniversaryTeaser.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/components/sections/AnniversaryTeaser.tsx)         | ✓  |

### Files modified

| File                                                                                                    | Change                                               |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [src/app/page.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/app/page.tsx) | Added 4 imports + rendered the new sections in order |


Here's what was built in [src/app/about/page.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/app/about/page.tsx):

**Sticky Sub-Nav** — `sticky top-[88px] z-30`, white background with `border-b border-gray-200`. Active link gets `text-deep border-b-2 border-lemon`. Uses `IntersectionObserver` (`rootMargin: '-30% 0px -60% 0px'`) to track which section is in view. Click handlers manually offset scroll by `157px` (nav + sub-nav height) so the section title isn't hidden.

**Section 1 — Who We Are** (`#who-we-are`)

* `bg-deep py-32` hero banner with `AnimatedSection` fade-up on the H1 + italic subtitle
* 2-column: rich body copy left, `next/image` Unsplash placeholder with `fill` + gradient overlay right
* Pull quote: 4px `border-lemon` left edge, `bg-lemon/10` tint, PT Serif italic `text-2xl text-deep`

**Section 2 — Our History** (`#history`)

* `bg-offwhite` with centered heading block
* `TimelineMilestone` sub-component: `useInView` triggers `motion` fade-in from left/right alternating (`x: ±40`). Center 2px `bg-deep/20` spine on desktop. Mobile collapses to single-column with a dot connector.

**Section 3 — Vision & Mission** (`#vision-mission`)

* `bg-deep py-16` Vision block: centered, `font-serif italic text-5xl text-white`
* Mission: 2-column `font-sans` body text
* Core Values: 6-card grid — `border-t-4 border-t-white hover:border-t-lemon` (no layout shift), Framer Motion `whileHover: { y: -4 }`

**Section 4 — Educational Philosophy** (`#educational-philosophy`)

* `bg-offwhite` with 2-column magazine-style body text
* Full-width `bg-deep` pull quote band (breaks the container intentionally — placed outside `max-w-7xl` wrapper)
* Ends with a `border-lemon` underlined CTA link → `/our-people`

Built the new Our People page with a sticky Radix tab layout, live staff filtering, a profile drawer modal, student/parent/alumni panels, and a polished alumni CTA area. The alumni block now reads more like a designed section instead of a plain form.

Files created for this feature were [page.tsx](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-browser/workbench/workbench.html). No other new files were needed for this page


Builds clean — `/25th-anniversary` is statically prerendered with no errors.

Here's what was built in [src/app/25th-anniversary/page.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/app/25th-anniversary/page.tsx):

---

**Hero** — Full-viewport `bg-deep` with 26 floating particles (lemon + gold + white, random positions, generated client-side to avoid hydration issues). Anniversary seal SVG uses curved `<textPath>` for "WHITESANDS SCHOOL" around the ring, gold dashed outer ring, and large "25" in PT Serif. H1, italic `Duc in Altum` in lemon, sub in `text-white/60`. Scroll indicator is a pulsing lemon vertical line (`scaleY` animation).

**Principal's Message** — `bg-offwhite` two-column: portrait placeholder + name + hand-drawn SVG signature left; formal letter with `indent-8` first paragraphs and a gold `border-left` pull-quote right.

**Timeline** — `bg-white` with horizontal CSS overflow scroll on mobile. Gold gradient line runs behind the dots via `position: absolute`. Each of 8 milestone cards fades up on scroll with staggered `delay: i * 0.08`. Year in `text-bold font-black text-2xl`.

**Events Schedule** — `bg-deep`, 4 cards in a responsive grid. `bg-bold` date badge, `text-lemon` RSVP link, gold `hover:bg-white/5` transition.

**Photo Gallery** — `bg-offwhite` CSS `columns-3` masonry with `break-inside-avoid`. Lightbox uses `AnimatePresence` with keyboard navigation (←/→/Esc) and prev/next buttons.

**Alumni Tributes** — `bg-white` auto-advancing carousel at 4s. `AnimatePresence mode="wait"` slides quotes in/out. Decorative large quote mark in gold. Clickable dot indicators.

**CTA Strip** — `bg-bold`, 48px PT Serif heading, `Button variant="secondary"` (`bg-deep`), anchored to `#rsvp` from event cards.


Clean build. Both pages are statically generated — `/news` as a static page and all 7 `/news/[slug]` routes via `generateStaticParams`.

Here's what was built:

**[src/app/news/page.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/app/news/page.tsx)** — Index page (`'use client'`)

* `bg-deep` hero with `SectionLabel`, `font-serif` H1, and fade-in animation
* Sticky filter bar at `top-[88px]` with pill buttons derived from actual data categories (Academics, Events, Facilities, Values, Admissions, Sports, Staff) — active gets `bg-deep text-white`, inactive gets border + `hover:border-deep`
* Featured post: `lg:grid-cols-5` (3/5 image + 2/5 content) wrapped in `AnimatePresence` so it fades in/out when category filter changes
* 3-column `NewsCard` grid with Framer Motion `whileHover: { y: -4, boxShadow }` on each card; `line-clamp-2` on excerpt
* `useMemo` for filtered list, `useState` for both active category and page; `setPage(1)` resets on filter change
* Prev/next + numbered pagination (only renders when `totalPages > 1`)

**[src/app/news/[slug]/page.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/app/news/%5Bslug%5D/page.tsx)** — Post page (Server Component)

* `generateStaticParams` produces all 7 slugs from `getNews()`
* `notFound()` guard for unknown slugs
* 480px cover image with `mt-[88px]` offset for the fixed navbar + dark gradient overlay
* `max-w-3xl mx-auto` content: Badge + date meta → `font-serif text-5xl` H1 → `<hr>` → body paragraphs split on `\n\n`
* "Back to News" link at the bottom
* `bg-offwhite` related posts section: 3 cards (all posts except current, first 3), same hover lift pattern using Tailwind `group-hover` instead of Framer Motion (server-compatible)



**Contact** — [src/app/contact/page.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/app/contact/page.tsx)

* `bg-deep` hero with `SectionLabel` + `font-serif` H1
* 3-column info strip: MapPin / Phone / Mail icons in `text-lemon`, Roboto bold labels, PT Sans muted values
* 60/40 split: underline-style form (Full Name, Email, Phone, Subject dropdown, Message) with `AnimatePresence` success state swap; map placeholder + office hours card on the right
* `bg-offwhite` social strip with inline SVG brand icons (Instagram, Facebook, LinkedIn, YouTube) in `text-deep hover:text-bold`

**Fees Portal** — [src/app/fees-portal/page.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/app/fees-portal/page.tsx)

* `bg-deep` hero with `SectionLabel` + `font-serif` H1
* Radix `Tabs` for Primary / Junior Secondary / Senior Secondary; `AnimatePresence` fade between panels; `bg-deep` header row, alternating white/offwhite rows, annual total row in `bg-lemon/20`; annual totals computed from data
* 3-column payment method cards (Bank Transfer / Online Payment / Visit Bursar) with hover lift
* `bg-bold` CTA strip with secondary Button
* White card parent login — email + password with show/hide toggle, Roboto labels, "Forgot password?" link
* `bg-deep` contact strip with `accounts@whitesandsschool.edu.ng` and phone number



## Admin Panel — Complete

**18 new files created:**

### Routing & Protection

* [src/proxy.ts](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/proxy.ts) — Protects all `/admin/*` routes (except `/admin/login`) via `admin_auth` httpOnly cookie. Sets `x-pathname` header for the root layout.
* [src/app/layout.tsx](vscode-webview://0e8og3g19mjm63sc8k2l3p0fdsstb2v8hi8s83n8a1g59bq9fn44/src/app/layout.tsx) — Modified to skip `<Navbar>` and `<Footer>` for any admin path (reads `x-pathname` header set by the proxy).

### API Routes (`/src/app/api/admin/`)

| Route              | Methods                                           |
| ------------------ | ------------------------------------------------- |
| `auth/`          | POST — password check, sets httpOnly cookie (8h) |
| `logout/`        | POST — clears cookie, redirects to login         |
| `announcements/` | GET, PUT (full replace)                           |
| `news/`          | GET (all incl. drafts), POST                      |
| `news/[id]/`     | GET, PUT, DELETE                                  |
| `gallery/`       | GET, POST                                         |
| `gallery/[id]/`  | DELETE                                            |
| `virtue/`        | GET, PUT (upsert by month)                        |
| `staff/`         | GET, POST                                         |
| `staff/[id]/`    | GET, PUT, DELETE                                  |

### Admin Pages

| Page                     | Description                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| `login/`               | Centered card, logo, password field → POSTs to auth API                                         |
| `layout.tsx`           | 240px `bg-deep` sidebar with Lucide icons, active link indicator (lemon border), logout button |
| `page.tsx` (dashboard) | 5 stat cards: Total Posts, Staff, Active Announcement, Gallery Photos, Current Virtue            |
| `announcement/`        | List of all banners with active toggle (switch), color swatches, message/link fields             |
| `news/`                | Table with Published/Draft badges, Edit/Delete. "+ New Post" button                              |
| `news/new/`            | Create form with auto-slug from title                                                            |
| `news/[id]/`           | Edit form pre-populated from API                                                                 |
| `gallery/`             | Image grid with hover overlay + delete, plus Add Image form                                      |
| `virtue/`              | Month selector with month-pill index, virtue/definition/reflection fields                        |
| `staff/`               | Table with avatar, slide-in drawer form for add/edit, qualifications list manager                |

**Setup:** Add `ADMIN_PASSWORD=your_password` to `.env.local` before running.
