import { readContent, writeContent } from '@/lib/content-store'
import { deleteUploadedImages } from '@/lib/media-store'
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
  const previousCover = posts[idx].coverImage
  posts[idx] = body
  await writeContent('news', posts)
  if (previousCover && previousCover !== body.coverImage) {
    await deleteUploadedImages([previousCover])
  }
  return Response.json(body)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const all = await readContent<NewsPost[]>('news')
  const removed = all.find((p) => p.id === id)
  await writeContent('news', all.filter((p) => p.id !== id))
  await deleteUploadedImages([removed?.coverImage])
  return Response.json({ ok: true })
}
