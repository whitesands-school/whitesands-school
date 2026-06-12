import { readContent, writeContent } from '@/lib/content-store'
import type { Testimonial } from '@/types'

export async function GET() {
  return Response.json(await readContent<Testimonial[]>('testimonials'))
}

export async function PUT(request: Request) {
  const body = (await request.json()) as Testimonial[]
  await writeContent('testimonials', body)
  return Response.json({ ok: true })
}
