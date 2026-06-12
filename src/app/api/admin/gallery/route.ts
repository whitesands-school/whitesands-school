import { readContent, writeContent } from '@/lib/content-store'
import type { GalleryImage } from '@/types'

export async function GET() {
  return Response.json(await readContent<GalleryImage[]>('gallery'))
}

export async function POST(request: Request) {
  const body: GalleryImage = await request.json()
  const images = await readContent<GalleryImage[]>('gallery')
  images.push(body)
  await writeContent('gallery', images)
  return Response.json(body, { status: 201 })
}
