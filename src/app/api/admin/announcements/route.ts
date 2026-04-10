import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { Announcement } from '@/types'

const filePath = join(process.cwd(), 'src/content/announcements.json')

function read(): Announcement[] {
  return JSON.parse(readFileSync(filePath, 'utf-8'))
}

export async function GET() {
  return Response.json(read())
}

export async function PUT(request: Request) {
  const body = await request.json()
  writeFileSync(filePath, JSON.stringify(body, null, 2))
  return Response.json({ ok: true })
}
