import { readContent, writeContent } from '@/lib/content-store'
import type { BookList } from '@/types'

export async function GET() {
  return Response.json(await readContent<BookList>('booklist'))
}

export async function PUT(request: Request) {
  const body = (await request.json()) as BookList
  await writeContent('booklist', body)
  return Response.json({ ok: true })
}
