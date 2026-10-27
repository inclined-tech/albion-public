import { ApolloServer } from '@apollo/server'
import { typeDefs } from 'graphql/typedefs'
import resolvers from 'graphql/resolvers'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import type { NextRequest } from 'next/server'

const apolloServer = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
})

const handler = startServerAndCreateNextHandler(apolloServer)

export function GET(request: NextRequest): Promise<Response> {
  return handler(request)
}

export function POST(request: NextRequest): Promise<Response> {
  return handler(request)
}
