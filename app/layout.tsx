import '../styles/global.css'

import type { JSX } from 'react'
import type { Metadata } from 'next'
import ApolloProvider from './apollo-provider'

export const metadata: Metadata = {
  title: 'Very Simple Loan Dashboard',
  description: 'Inclined',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <ApolloProvider>{children}</ApolloProvider>
        </div>
      </body>
    </html>
  )
}
