import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { GalleryImage } from '@/types'

const filePath = join(process.cwd(), 'src/content/gallery.json')

function read(): GalleryImage[] {
  return JSON.parse(readFileSync(filePath, 'utf-8'))
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const images = read().filter((img) => img.id !== id)
  writeFileSync(filePath, JSON.stringify(images, null, 2))
  return Response.json({ ok: true })
}
