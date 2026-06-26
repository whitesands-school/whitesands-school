import { readContent, writeContent } from '@/lib/content-store'
import type { StaffMember } from '@/types'

export async function GET() {
  return Response.json(await readContent<StaffMember[]>('staff'))
}

export async function POST(request: Request) {
  const body: StaffMember = await request.json()
  const staff = await readContent<StaffMember[]>('staff')
  staff.push(body)
  await writeContent('staff', staff)
  return Response.json(body, { status: 201 })
}

// Bulk replace — used by the admin "reorder" controls, which save the whole
// list with refreshed `order` values in one write.
export async function PUT(request: Request) {
  const body = (await request.json()) as StaffMember[]
  if (!Array.isArray(body)) {
    return Response.json({ error: 'Expected an array.' }, { status: 400 })
  }
  await writeContent('staff', body)
  return Response.json({ ok: true })
}
