import { PrismaPg } from '@prisma/adapter-pg'
import { Prisma, PrismaClient } from '@prisma/client'

// See https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client
declare global {
  // the global namespace requires use of var
  var globalPrisma: PrismaClient
}

// Prisma 7 connects through a driver adapter instead of a `url` in the schema.
function createPrismaClient(options: Prisma.PrismaClientOptions = {}) {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  return new PrismaClient({ ...options, adapter })
}

const isProd = process.env.NODE_ENV === 'production'
let prisma: PrismaClient

if (isProd) {
  prisma = createPrismaClient()
} else {
  if (!global.globalPrisma) {
    const optionsArg: Prisma.PrismaClientOptions = {}

    // uncomment to enable prisma logging
    // optionsArg.log = ['query', 'info', `warn`, `error`]

    global.globalPrisma = createPrismaClient(optionsArg)
  }

  prisma = global.globalPrisma
}

export default prisma
