import { readContent, type ContentName } from '@/lib/content-store'

// Public, read-only access to the content types that are already rendered on
// the public site. This lets Client Components show live admin edits without
// the service-role key. Sensitive content (e.g. `inbox`) is intentionally
// excluded — only the types listed here can be read through this endpoint.
const PUBLIC_CONTENT = new Set<ContentName>([
  'virtue',
  'testimonials',
  'gallery',
])

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  if (!PUBLIC_CONTENT.has(name as ContentName)) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
  return Response.json(await readContent(name as ContentName))
}
