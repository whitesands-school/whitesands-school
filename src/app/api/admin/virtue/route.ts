import { readContent, writeContent } from '@/lib/content-store'
import type { VirtueOfMonth } from '@/types'

export async function GET() {
  return Response.json(await readContent<VirtueOfMonth[]>('virtue'))
}

export async function PUT(request: Request) {
  const body: VirtueOfMonth = await request.json()
  const virtues = await readContent<VirtueOfMonth[]>('virtue')
  const idx = virtues.findIndex(
    (v) => v.month.toLowerCase() === body.month.toLowerCase()
  )
  if (idx === -1) {
    virtues.push(body)
  } else {
    virtues[idx] = body
  }
  await writeContent('virtue', virtues)
  return Response.json(body)
}
