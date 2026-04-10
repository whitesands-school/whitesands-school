import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { StaffMember } from '@/types'

const filePath = join(process.cwd(), 'src/content/staff.json')

function read(): StaffMember[] {
  return JSON.parse(readFileSync(filePath, 'utf-8'))
}

export async function GET() {
  return Response.json(read())
}

export async function POST(request: Request) {
  const body: StaffMember = await request.json()
  const staff = read()
  staff.push(body)
  writeFileSync(filePath, JSON.stringify(staff, null, 2))
  return Response.json(body, { status: 201 })
}
