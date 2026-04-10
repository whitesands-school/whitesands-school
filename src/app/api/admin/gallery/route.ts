import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { GalleryImage } from '@/types'

const filePath = join(process.cwd(), 'src/content/gallery.json')

function read(): GalleryImage[] {
  return JSON.parse(readFileSync(filePath, 'utf-8'))
}

export async function GET() {
  return Response.json(read())
}

export async function POST(request: Request) {
  const body: GalleryImage = await request.json()
  const images = read()
  images.push(body)
  writeFileSync(filePath, JSON.stringify(images, null, 2))
  return Response.json(body, { status: 201 })
}
