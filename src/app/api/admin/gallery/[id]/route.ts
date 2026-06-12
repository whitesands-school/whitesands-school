import { readContent, writeContent } from '@/lib/content-store'
import type { GalleryImage } from '@/types'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const images = (await readContent<GalleryImage[]>('gallery')).filter(
    (img) => img.id !== id
  )
  await writeContent('gallery', images)
  return Response.json({ ok: true })
}
