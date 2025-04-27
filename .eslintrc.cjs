module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['tailwindcss', 'react', 'react-hooks'],
  extends: [
    'standard-with-typescript',
    'plugin:tailwindcss/recommended',
    'plugin:@cspell/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended-legacy',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      './tsconfig.json',
      './tsconfig.node.json',
      './tsconfig.script.json',
    ],
    parser: '@typescript-eslint/parser',
    ecmaFeatures: { jsx: true },
  },
  ignorePatterns: ['dist', 'coverage'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@cspell/spellchecker': ['warn', {
      customWordListFile: 'cspell-words.txt',
    }],
    'arrow-parens': ['error', 'always'],
    'no-console': ['error'],
    '@typescript-eslint/comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
    }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-misused-promises': ['error', {
      checksVoidReturn: false,
    }],
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',

    'react/jsx-indent': ['warn', 2, {
      checkAttributes: true,
      indentLogicalExpressions: true,
    }],
    'react/prop-types': ['off'],
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],
    'jsx-quotes': ['warn', 'prefer-double'],
    'react/jsx-curly-spacing': ['warn', { when: 'never', children: true }],
    'react/jsx-tag-spacing': ['warn', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never',
    }],
    'react/self-closing-comp': 'warn',
    'react/jsx-fragments': 'warn',
    'react/jsx-equals-spacing': [2, 'never'],
    'react/jsx-sort-props': ['warn', {
      reservedFirst: true,
      shorthandFirst: true,
      callbacksLast: true,
    }],
    'testing-library/no-node-access': ['error', { allowContainerFirstChild: true }],
  },
}
