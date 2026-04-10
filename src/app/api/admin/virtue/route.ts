import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { VirtueOfMonth } from '@/types'

const filePath = join(process.cwd(), 'src/content/virtue.json')

function read(): VirtueOfMonth[] {
  return JSON.parse(readFileSync(filePath, 'utf-8'))
}

export async function GET() {
  return Response.json(read())
}

export async function PUT(request: Request) {
  const body: VirtueOfMonth = await request.json()
  const virtues = read()
  const idx = virtues.findIndex(
    (v) => v.month.toLowerCase() === body.month.toLowerCase()
  )
  if (idx === -1) {
    virtues.push(body)
  } else {
    virtues[idx] = body
  }
  writeFileSync(filePath, JSON.stringify(virtues, null, 2))
  return Response.json(body)
}
