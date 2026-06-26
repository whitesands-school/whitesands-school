import { readContent } from '@/lib/content-store'
import type { NewsPost, StaffMember, BookList } from '@/types'

export const dynamic = 'force-dynamic'

// Public site search. Runs server-side so it can read the same content the
// pages render (and so unpublished news never leaks into results).

export interface SearchResult {
  type: 'Page' | 'News' | 'Person' | 'Book'
  title: string
  subtitle?: string
  href: string
}

// Hand-curated registry of the standing pages, with the words people are
// likely to search for. Kept here rather than crawled so results stay
// predictable and fast.
const PAGES: { title: string; subtitle: string; href: string; keywords: string }[] = [
  { title: 'About', subtitle: 'Story, vision & mission, philosophy', href: '/about', keywords: 'about story history vision mission philosophy pillars houses virtues campus duc in altum' },
  { title: 'What We Offer', subtitle: 'Academics & programmes', href: '/what-we-offer', keywords: 'what we offer academics curriculum programmes subjects' },
  { title: 'Academics', subtitle: 'Curriculum & results', href: '/what-we-offer/academics', keywords: 'academics curriculum waec subjects results examinations' },
  { title: 'Extracurricular', subtitle: 'Clubs, sport & activities', href: '/what-we-offer/extracurricular', keywords: 'extracurricular clubs sport sports music drama activities societies' },
  { title: 'Personal Formation', subtitle: 'Mentoring & character', href: '/what-we-offer/personal-formation', keywords: 'personal formation mentoring character virtue pastoral chaplaincy faith' },
  { title: 'Facilities', subtitle: 'Campus & buildings', href: '/what-we-offer/facilities', keywords: 'facilities campus chapel library laboratories labs sports field buildings' },
  { title: 'Our People', subtitle: 'Staff & leadership', href: '/our-people', keywords: 'our people staff teachers faculty management team leadership principal' },
  { title: 'Admissions', subtitle: 'How to apply & key dates', href: '/admissions', keywords: 'admissions apply application entrance exam js1 transfer key dates enrol register' },
  { title: 'Book List', subtitle: 'Textbooks by class', href: '/book-list', keywords: 'book list booklist textbooks books reading list stationery' },
  { title: 'Fees', subtitle: 'School fees & payment', href: '/fees-portal', keywords: 'fees school fees payment pixpay tuition pay portal bursary' },
  { title: 'News', subtitle: 'Latest from the school', href: '/news', keywords: 'news events updates blog announcements' },
  { title: 'Contact', subtitle: 'Reach the school', href: '/contact', keywords: 'contact address phone email location map visit directions' },
  { title: '25th Anniversary', subtitle: 'Silver jubilee', href: '/25th-anniversary', keywords: 'anniversary 25 silver jubilee celebration' },
  { title: 'Alumni Prizes', subtitle: 'Competitions for old boys', href: '/alumni-prizes', keywords: 'alumni prizes competition old boys awards submissions' },
]

function scored<T>(items: T[], haystack: (t: T) => string, q: string) {
  const tokens = q.split(/\s+/).filter(Boolean)
  return items
    .map((item) => {
      const hay = haystack(item).toLowerCase()
      if (!hay.includes(q) && !tokens.every((t) => hay.includes(t))) return null
      // Whole-phrase hits rank above scattered-token hits.
      const score = hay.includes(q) ? 2 : 1
      return { item, score }
    })
    .filter((x): x is { item: T; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.item)
}

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get('q')?.trim().toLowerCase() ?? ''
  if (q.length < 2) return Response.json({ results: [] })

  const [news, staff, booklist] = await Promise.all([
    readContent<NewsPost[]>('news'),
    readContent<StaffMember[]>('staff'),
    readContent<BookList>('booklist'),
  ])

  const results: SearchResult[] = []

  for (const p of scored(PAGES, (p) => `${p.title} ${p.subtitle} ${p.keywords}`, q).slice(0, 6)) {
    results.push({ type: 'Page', title: p.title, subtitle: p.subtitle, href: p.href })
  }

  const published = news.filter((n) => n.published)
  for (const n of scored(published, (n) => `${n.title} ${n.excerpt} ${n.category}`, q).slice(0, 5)) {
    results.push({ type: 'News', title: n.title, subtitle: n.category, href: `/news/${n.slug}` })
  }

  for (const s of scored(staff, (s) => `${s.name} ${s.title} ${s.department}`, q).slice(0, 5)) {
    results.push({ type: 'Person', title: s.name, subtitle: s.title, href: '/our-people' })
  }

  const books = (booklist.categories ?? []).flatMap((c) =>
    c.books.map((b) => ({ ...b, category: c.name }))
  )
  for (const b of scored(books, (b) => `${b.title} ${b.author ?? ''} ${b.subject ?? ''} ${b.category}`, q).slice(0, 5)) {
    results.push({
      type: 'Book',
      title: b.title,
      subtitle: [b.category, b.subject].filter(Boolean).join(' · '),
      href: '/book-list',
    })
  }

  return Response.json({ results })
}
