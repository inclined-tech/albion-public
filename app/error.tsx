'use client'

import type { JSX } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): JSX.Element {
  return (
    <main className="flex-1 overflow-y-auto focus:outline-hidden">
      <div className="relative max-w-6xl mx-auto md:px-8 xl:px-0">
        <div className="pt-10 pb-16 px-4 sm:px-6 md:px-0">
          <h1 className="text-3xl font-extrabold text-gray-900">Loans</h1>
          <p className="pt-4 text-sm text-gray-500">
            Could not load loans: {error.message}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  )
}
