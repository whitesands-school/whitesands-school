import { readContent, writeContent } from '@/lib/content-store'
import type { SitePopover } from '@/types'

export async function GET() {
  return Response.json(await readContent<SitePopover[]>('popover'))
}

export async function PUT(request: Request) {
  const body: SitePopover[] = await request.json()
  await writeContent('popover', body)
  return Response.json({ ok: true })
}
