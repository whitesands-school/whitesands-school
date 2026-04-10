import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { NewsPost } from '@/types'

const filePath = join(process.cwd(), 'src/content/news.json')

function read(): NewsPost[] {
  return JSON.parse(readFileSync(filePath, 'utf-8'))
}

export async function GET() {
  return Response.json(read())
}

export async function POST(request: Request) {
  const body: NewsPost = await request.json()
  const posts = read()
  posts.unshift(body)
  writeFileSync(filePath, JSON.stringify(posts, null, 2))
  return Response.json(body, { status: 201 })
}
