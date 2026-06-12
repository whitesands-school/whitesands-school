import { readContent, writeContent } from '@/lib/content-store'
import type { Announcement } from '@/types'

export async function GET() {
  return Response.json(await readContent<Announcement[]>('announcements'))
}

export async function PUT(request: Request) {
  const body = (await request.json()) as Announcement[]
  await writeContent('announcements', body)
  return Response.json({ ok: true })
}
