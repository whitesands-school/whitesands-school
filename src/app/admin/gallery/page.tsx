'use client'

import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import type { GalleryImage } from '@/types'

const CATEGORIES = ['Campus', 'Academics', 'Events', 'Sports', 'Faith', 'Arts']

const EMPTY = { src: '', alt: '', category: 'Campus' }

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    fetch('/api/admin/gallery')
      .then((r) => r.json())
      .then((data) => {
        setImages(data)
        setLoading(false)
      })
  }, [])

  async function deleteImage(id: string) {
    if (!confirm('Remove this image?')) return
    await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' })
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  async function addImage(e: React.FormEvent) {
    e.preventDefault()
    if (!form.src) return
    setAdding(true)
    const id = `gallery-${Date.now()}`
    const newImage: GalleryImage = { id, ...form }
    const res = await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newImage),
    })
    if (res.ok) {
      setImages((prev) => [...prev, newImage])
      setForm(EMPTY)
    }
    setAdding(false)
  }

  if (loading) {
    return <div className="text-sm text-muted font-sans">Loading…</div>
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-roboto font-bold text-2xl text-dark">Gallery</h1>
        <p className="font-sans text-sm text-muted mt-1">
          {images.length} images across{' '}
          {[...new Set(images.map((i) => i.category))].length} categories
        </p>
      </div>

      {/* Add form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="font-roboto font-semibold text-sm uppercase tracking-wide text-muted mb-4">
          Add Image
        </h2>
        <form onSubmit={addImage} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
              Image URL
            </label>
            <input
              type="text"
              value={form.src}
              onChange={(e) => setForm((f) => ({ ...f, src: e.target.value }))}
              placeholder="/images/gallery/photo.jpg"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
            />
          </div>
          <div>
            <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
              Alt Text
            </label>
            <input
              type="text"
              value={form.alt}
              onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))}
              placeholder="Description of image"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
            />
          </div>
          <div>
            <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
              Category
            </label>
            <div className="flex gap-2">
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <button
                type="submit"
                disabled={adding}
                className="px-4 py-2 bg-deep text-white font-roboto font-semibold text-sm rounded-lg hover:bg-deep/90 transition disabled:opacity-60 whitespace-nowrap"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="group relative bg-gray-100 rounded-xl overflow-hidden aspect-square"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              unoptimized
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100">
              <span className="inline-block px-2 py-0.5 bg-white/90 text-deep text-xs font-roboto font-semibold rounded mb-1 w-fit">
                {img.category}
              </span>
              <p className="text-white text-xs font-sans line-clamp-2">{img.alt}</p>
            </div>
            {/* Delete button */}
            <button
              onClick={() => deleteImage(img.id)}
              className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg text-bold hover:bg-white opacity-0 group-hover:opacity-100 transition shadow"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}

        {images.length === 0 && (
          <div className="col-span-4 py-12 text-center text-muted font-sans text-sm">
            No images yet. Add one above.
          </div>
        )}
      </div>
    </div>
  )
}
