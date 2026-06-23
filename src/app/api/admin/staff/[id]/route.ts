import { readContent, writeContent } from '@/lib/content-store'
import { deleteUploadedImages } from '@/lib/media-store'
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
  const previousPhoto = staff[idx].photo
  staff[idx] = body
  await writeContent('staff', staff)
  // If the portrait was swapped for a different upload, bin the old one.
  if (previousPhoto && previousPhoto !== body.photo) {
    await deleteUploadedImages([previousPhoto])
  }
  return Response.json(body)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const all = await readContent<StaffMember[]>('staff')
  const removed = all.find((s) => s.id === id)
  await writeContent('staff', all.filter((s) => s.id !== id))
  await deleteUploadedImages([removed?.photo])
  return Response.json({ ok: true })
}
