import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import stylistic from '@stylistic/eslint-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [

  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:tailwindcss/recommended',
  ),
  stylistic.configs['recommended-flat'],
  {
    rules: {
      'tailwindcss/classnames-order': ['warn', {
        callees: ['classnames', 'clsx', 'cn'],
      }],
    },
  },
]

export default eslintConfig
