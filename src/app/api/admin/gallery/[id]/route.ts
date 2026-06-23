import { readContent, writeContent } from '@/lib/content-store'
import { deleteUploadedImages } from '@/lib/media-store'
import type { GalleryImage } from '@/types'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const images = await readContent<GalleryImage[]>('gallery')
  const removed = images.find((img) => img.id === id)
  await writeContent(
    'gallery',
    images.filter((img) => img.id !== id)
  )
  // Drop the underlying upload so the bucket doesn't accumulate orphans.
  await deleteUploadedImages([removed?.src])
  return Response.json({ ok: true })
}
