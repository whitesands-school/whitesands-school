import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

// POST /api/admin/upload — multipart upload to the public `media` bucket on
// Supabase Storage. Returns the public URL, which the content JSON stores
// verbatim (media() passes absolute URLs through untouched).

const MAX_BYTES = 10 * 1024 * 1024 // 10 MB
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
])

export async function POST(request: Request) {
  const me = await getSessionUser()
  if (!me) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Expected multipart form data.' }, { status: 400 })
  }

  const file = form.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: 'Only JPEG, PNG, WebP, AVIF, and GIF images are allowed.' },
      { status: 400 }
    )
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Image must be 10 MB or smaller.' }, { status: 400 })
  }

  const folder = sanitizeSegment(String(form.get('folder') || 'uploads'))
  const base = sanitizeSegment(
    file.name.replace(/\.[^.]+$/, '') || 'image'
  ).slice(0, 60)
  const ext = (file.name.match(/\.([a-zA-Z0-9]+)$/)?.[1] || 'jpg').toLowerCase()
  const path = `${folder}/${Date.now()}-${base}.${ext}`

  const admin = createSupabaseAdminClient()
  const { error } = await admin.storage
    .from('media')
    .upload(path, file, { contentType: file.type, cacheControl: '31536000' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const {
    data: { publicUrl },
  } = admin.storage.from('media').getPublicUrl(path)

  return NextResponse.json({ url: publicUrl, path })
}

function sanitizeSegment(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-') || 'uploads'
}
