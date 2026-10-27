import type { CodegenConfig } from '@graphql-codegen/cli'

const clientConfig = {
  scalars: {
    BigInt: 'number',
    Date: 'Date',
    DateTime: 'Date',
  },
  strictScalars: true, // Throws an error if a custom scalar is missing from this config
  preResolveTypes: true, // Simplifies the generated types
  namingConvention: {
    typeNames: 'keep',
    enumValues: 'keep',
  },
  avoidOptionals: {
    field: true, // Avoids optionals on the level of the field
  },
  nonOptionalTypename: true, // Forces `__typename` on all selection sets
  skipTypeNameForRoot: true, // Don't generate __typename for root types
  dedupeFragments: true,
  dedupeOperationSuffix: true,
  omitOperationSuffix: true,
  enumsAsConst: true,
  maybeValue: 'T | null',
  useIndexSignature: true,
  flattenGeneratedTypes: true,
  inputMaybeValue: 'T | null | undefined',
}

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  documents: [
    '**/*.{ts,tsx}',
    // Ignore test files and dependencies
    '!**/*.test.ts',
    '!node_modules/**/*.ts',
  ],
  generates: {
    // typescript-operations 6 emits the enums its operations use, so it can
    // no longer share a file with the typescript plugin. Schema types live in
    // schema-types.ts and types.ts re-exports them.
    './client/shared/schema-types.ts': {
      config: clientConfig,
      plugins: [
        { add: { content: '/* eslint-disable */' } },
        'typescript',
        'typescript-resolvers',
        'typescript-apollo-client-helpers',
      ],
    },
    './client/shared/types.ts': {
      documents: ['client/**/*.{ts,tsx}'],
      config: {
        ...clientConfig,
        importSchemaTypesFrom: './client/shared/schema-types.ts',
      },
      plugins: [
        {
          add: {
            content: ['/* eslint-disable */', "export * from './schema-types'"],
          },
        },
        'typescript-operations',
      ],
    },
    './graphql/__generated__/resolvers-types.ts': {
      config: {
        useIndexSignature: true,
        enumsAsConst: true,
        mappers: {
          Loan: '@prisma/client#Loan as LoanModel',
        },
      },
      plugins: [
        { add: { content: '/* eslint-disable */' } },
        'typescript',
        'typescript-resolvers',
      ],
    },
  },
}

export default config
