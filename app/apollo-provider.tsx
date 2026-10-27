'use client'

import { HttpLink } from '@apollo/client'
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename'
import { ApolloLink } from '@apollo/client'
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/client-integration-nextjs'

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      removeTypenameFromVariables(),
      new HttpLink({ uri: '/api/graphql' }),
    ]),
  })
}

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
