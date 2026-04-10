'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin')
      } else {
        setError('Incorrect password. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logos/whitesands-school-logo.svg"
            alt="Whitesands School"
            width={72}
            height={72}
          />
        </div>

        {/* Label */}
        <div className="text-center mb-8">
          <p className="font-roboto text-xs font-semibold tracking-widest uppercase text-muted mb-1">
            Whitesands School
          </p>
          <h1 className="font-roboto font-bold text-xl text-deep">
            Admin Panel
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block font-roboto text-sm font-medium text-dark mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg font-sans text-sm text-dark placeholder-muted focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep transition"
            />
          </div>

          {error && (
            <p className="text-sm text-bold font-sans">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-deep text-white font-roboto font-semibold text-sm py-2.5 rounded-lg hover:bg-deep/90 transition disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Enter'}
          </button>
        </form>

        <p className="mt-6 text-center">
          <a
            href="/"
            className="font-sans text-xs text-muted hover:text-deep transition"
          >
            ← Back to website
          </a>
        </p>
      </div>
    </div>
  )
}
