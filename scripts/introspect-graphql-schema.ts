import { makeExecutableSchema } from '@graphql-tools/schema'
import * as fs from 'fs'
import { printSchema } from 'graphql'
import * as path from 'path'
import { typeDefs } from 'graphql/typedefs'

const schema = makeExecutableSchema({ typeDefs })
const filePath = path.join(__dirname, '/../schema.graphql')
fs.writeFileSync(filePath, printSchema(schema ))
// eslint-disable-next-line no-console
console.info('Generated schema saved to ', filePath)
