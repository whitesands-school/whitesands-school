import { readContent, writeContent } from '@/lib/content-store'
import type { NewsPost } from '@/types'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const post = (await readContent<NewsPost[]>('news')).find((p) => p.id === id)
  if (!post) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(post)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body: NewsPost = await request.json()
  const posts = await readContent<NewsPost[]>('news')
  const idx = posts.findIndex((p) => p.id === id)
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 })
  posts[idx] = body
  await writeContent('news', posts)
  return Response.json(body)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const posts = (await readContent<NewsPost[]>('news')).filter((p) => p.id !== id)
  await writeContent('news', posts)
  return Response.json({ ok: true })
}
