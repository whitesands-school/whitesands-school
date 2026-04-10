'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import type { NewsPost } from '@/types'

const CATEGORIES = ['Academics', 'Events', 'Facilities', 'Values', 'Admissions', 'Sports', 'Staff']

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export default function NewPostPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<Omit<NewsPost, 'id'>>({
    title: '',
    slug: '',
    category: 'Academics',
    excerpt: '',
    content: '',
    coverImage: '',
    date: new Date().toISOString().split('T')[0],
    published: false,
  })

  function set(patch: Partial<typeof form>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value
    set({ title, slug: slugify(title) })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const id = `news-${Date.now()}`
    await fetch('/api/admin/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...form }),
    })
    router.push('/admin/news')
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/news"
          className="p-1.5 text-muted hover:text-dark hover:bg-gray-100 rounded transition"
        >
          <ChevronLeft size={18} />
        </Link>
        <h1 className="font-roboto font-bold text-2xl text-dark">New Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        {/* Title */}
        <div>
          <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
            Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={handleTitleChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
            placeholder="Post title"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
            Slug
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => set({ slug: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-muted focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
            placeholder="auto-generated-from-title"
          />
        </div>

        {/* Category + Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => set({ category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => set({ date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
            Cover Image URL
          </label>
          <input
            type="text"
            value={form.coverImage}
            onChange={(e) => set({ coverImage: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
            placeholder="/images/news/my-post.jpg"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
            Excerpt
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => set({ excerpt: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition resize-none"
            placeholder="Short summary shown in listings…"
          />
        </div>

        {/* Body */}
        <div>
          <label className="block font-roboto text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
            Body
            <span className="ml-2 normal-case font-normal text-muted/70">
              (separate paragraphs with a blank line)
            </span>
          </label>
          <textarea
            value={form.content}
            onChange={(e) => set({ content: e.target.value })}
            rows={10}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans text-dark focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
            placeholder="Post content…"
          />
        </div>

        {/* Published toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => set({ published: !form.published })}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              form.published ? 'bg-deep' : 'bg-gray-200'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                form.published ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="font-roboto text-sm text-dark">
            {form.published ? 'Published' : 'Draft'}
          </span>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-deep text-white font-roboto font-semibold text-sm rounded-lg hover:bg-deep/90 transition disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save Post'}
          </button>
          <Link
            href="/admin/news"
            className="px-6 py-2.5 border border-gray-200 text-muted font-roboto text-sm rounded-lg hover:border-gray-300 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
