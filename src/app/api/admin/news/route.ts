import { readContent, writeContent } from '@/lib/content-store'
import type { NewsPost } from '@/types'

export async function GET() {
  return Response.json(await readContent<NewsPost[]>('news'))
}

export async function POST(request: Request) {
  const body: NewsPost = await request.json()
  const posts = await readContent<NewsPost[]>('news')
  posts.unshift(body)
  await writeContent('news', posts)
  return Response.json(body, { status: 201 })
}
