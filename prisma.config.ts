import 'dotenv/config'

import { defineConfig, env } from 'prisma/config'

// Prisma 7 stopped auto-loading .env, so the CLI needs dotenv imported here
// or `prisma migrate` / `prisma db seed` cannot see DATABASE_URL.
// Prisma 7 no longer accepts `url` inside the schema's datasource block, and
// the `prisma` key in package.json is gone. Both live here now.
export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
  migrations: {
    seed: 'npx ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts',
  },
})
