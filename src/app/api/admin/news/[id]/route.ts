import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { NewsPost } from '@/types'

const filePath = join(process.cwd(), 'src/content/news.json')

function read(): NewsPost[] {
  return JSON.parse(readFileSync(filePath, 'utf-8'))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const post = read().find((p) => p.id === id)
  if (!post) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(post)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body: NewsPost = await request.json()
  const posts = read()
  const idx = posts.findIndex((p) => p.id === id)
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 })
  posts[idx] = body
  writeFileSync(filePath, JSON.stringify(posts, null, 2))
  return Response.json(body)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const posts = read().filter((p) => p.id !== id)
  writeFileSync(filePath, JSON.stringify(posts, null, 2))
  return Response.json({ ok: true })
}
