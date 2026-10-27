import type { JSX } from 'react'

export default function Loading(): JSX.Element {
  return (
    <main className="flex-1 overflow-y-auto focus:outline-hidden">
      <div className="relative max-w-6xl mx-auto md:px-8 xl:px-0">
        <div className="pt-10 pb-16">
          <div className="px-4 sm:px-6 md:px-0 pb-6">
            <h1 className="text-3xl font-extrabold text-gray-900">Loans</h1>
          </div>
          <p className="px-4 sm:px-6 md:px-0 text-sm text-gray-500">
            Loading loans&hellip;
          </p>
        </div>
      </div>
    </main>
  )
}
