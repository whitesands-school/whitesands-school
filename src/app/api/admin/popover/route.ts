import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { SitePopover } from '@/types'

const filePath = join(process.cwd(), 'src/content/popover.json')

function read(): SitePopover[] {
  return JSON.parse(readFileSync(filePath, 'utf-8'))
}

export async function GET() {
  return Response.json(read())
}

export async function PUT(request: Request) {
  const body: SitePopover[] = await request.json()
  writeFileSync(filePath, JSON.stringify(body, null, 2))
  return Response.json({ ok: true })
}
