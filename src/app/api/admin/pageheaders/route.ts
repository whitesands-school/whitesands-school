import { readContent, writeContent } from '@/lib/content-store'
import type { PageHeaderOverride } from '@/types'

export async function GET() {
  return Response.json(await readContent<PageHeaderOverride[]>('pageheaders'))
}

export async function PUT(request: Request) {
  const body = (await request.json()) as PageHeaderOverride[]
  await writeContent('pageheaders', body)
  return Response.json({ ok: true })
}
