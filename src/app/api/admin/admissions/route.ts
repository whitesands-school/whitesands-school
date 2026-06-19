import { readContent, writeContent } from '@/lib/content-store'
import type { AdmissionsInfo } from '@/types'

export async function GET() {
  return Response.json(await readContent<AdmissionsInfo>('admissions'))
}

export async function PUT(request: Request) {
  const body = (await request.json()) as AdmissionsInfo
  await writeContent('admissions', body)
  return Response.json({ ok: true })
}
