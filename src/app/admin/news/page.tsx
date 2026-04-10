'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import type { NewsPost } from '@/types'

export default function AdminNewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/news')
      .then((r) => r.json())
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
  }, [])

  async function deletePost(id: string) {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/admin/news/${id}`, { method: 'DELETE' })
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  if (loading) {
    return <div className="text-sm text-muted font-sans">Loading…</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-roboto font-bold text-2xl text-dark">News & Blog</h1>
          <p className="font-sans text-sm text-muted mt-1">
            {posts.length} posts · {posts.filter((p) => p.published).length} published
          </p>
        </div>
        <Link
          href="/admin/news/new"
          className="px-4 py-2 bg-deep text-white font-roboto font-semibold text-sm rounded-lg hover:bg-deep/90 transition"
        >
          + New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 font-roboto font-semibold text-xs uppercase tracking-wide text-muted">
                Title
              </th>
              <th className="text-left px-4 py-3 font-roboto font-semibold text-xs uppercase tracking-wide text-muted hidden md:table-cell">
                Category
              </th>
              <th className="text-left px-4 py-3 font-roboto font-semibold text-xs uppercase tracking-wide text-muted hidden lg:table-cell">
                Date
              </th>
              <th className="text-left px-4 py-3 font-roboto font-semibold text-xs uppercase tracking-wide text-muted">
                Status
              </th>
              <th className="px-4 py-3 w-24" />
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition"
              >
                <td className="px-5 py-3.5">
                  <span className="font-sans text-dark font-medium line-clamp-1">
                    {post.title}
                  </span>
                </td>
                <td className="px-4 py-3.5 hidden md:table-cell">
                  <span className="font-sans text-muted">{post.category}</span>
                </td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  <span className="font-sans text-muted">
                    {new Date(post.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-roboto font-semibold ${
                      post.published
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2 justify-end">
                    <Link
                      href={`/admin/news/${post.id}`}
                      className="p-1.5 text-muted hover:text-deep hover:bg-deep/5 rounded transition"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="p-1.5 text-muted hover:text-bold hover:bg-bold/5 rounded transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-muted font-sans text-sm">
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
