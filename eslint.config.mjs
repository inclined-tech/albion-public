import js from '@eslint/js'
import next from 'eslint-config-next'
import nextTypescript from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import react from 'eslint-plugin-react'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'next-env.d.ts',
    'client/shared/types.ts',
    'client/shared/schema-types.ts',
    'graphql/__generated__/**',
  ]),
  js.configs.recommended,
  react.configs.flat.recommended,
  ...next,
  ...nextTypescript,
  prettier,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  {
    // GraphQL resolvers have a fixed positional signature -
    // (parent, args, context, info) - so a leading argument is often
    // unused by design rather than by oversight.
    files: ['graphql/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    },
  },
])
