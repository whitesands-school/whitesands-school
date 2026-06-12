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
