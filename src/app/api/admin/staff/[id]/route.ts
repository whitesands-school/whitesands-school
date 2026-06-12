import { readContent, writeContent } from '@/lib/content-store'
import type { StaffMember } from '@/types'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const member = (await readContent<StaffMember[]>('staff')).find((s) => s.id === id)
  if (!member) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(member)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body: StaffMember = await request.json()
  const staff = await readContent<StaffMember[]>('staff')
  const idx = staff.findIndex((s) => s.id === id)
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 })
  staff[idx] = body
  await writeContent('staff', staff)
  return Response.json(body)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const staff = (await readContent<StaffMember[]>('staff')).filter((s) => s.id !== id)
  await writeContent('staff', staff)
  return Response.json({ ok: true })
}
