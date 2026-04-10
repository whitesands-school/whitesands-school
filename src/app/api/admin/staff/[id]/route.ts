import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { StaffMember } from '@/types'

const filePath = join(process.cwd(), 'src/content/staff.json')

function read(): StaffMember[] {
  return JSON.parse(readFileSync(filePath, 'utf-8'))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const member = read().find((s) => s.id === id)
  if (!member) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(member)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body: StaffMember = await request.json()
  const staff = read()
  const idx = staff.findIndex((s) => s.id === id)
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 })
  staff[idx] = body
  writeFileSync(filePath, JSON.stringify(staff, null, 2))
  return Response.json(body)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const staff = read().filter((s) => s.id !== id)
  writeFileSync(filePath, JSON.stringify(staff, null, 2))
  return Response.json({ ok: true })
}
