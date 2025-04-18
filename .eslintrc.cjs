module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['vue', 'tailwindcss'],
  extends: [
    'standard-with-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@cspell/recommended',
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
    extraFileExtensions: ['.vue'],
  },
  ignorePatterns: ['dist', 'coverage'],
  rules: {
    '@cspell/spellchecker': ['warn', {
      customWordListFile: 'cspell-words.txt',
    }],
    'arrow-parens': ['error', 'always'],
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
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

    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 3 },
      multiline: { max: 1 },
    }],
    'vue/component-tags-order': ['error', {
      order: ['script', 'template', 'style'],
    }],
    'vue/no-template-shadow': 'off',
    'vue/component-api-style': ['error', ['script-setup']],
    'vue/block-lang': ['error', { script: { lang: 'ts' } }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
    'vue/html-button-has-type': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/prefer-true-attribute-shorthand': 'error',
    'vue/v-for-delimiter-style': ['error', 'in'],
    'vue/attributes-order': ['error', { alphabetical: true }],
    'vue/v-on-event-hyphenation': ['error', 'never', { autofix: true }],
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/array-bracket-spacing': 'error',
    'vue/arrow-spacing': 'error',
    'vue/block-spacing': 'error',
    'vue/comma-spacing': 'error',
    'vue/func-call-spacing': 'error',
    'vue/key-spacing': 'error',
    'vue/keyword-spacing': 'error',
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/space-in-parens': 'error',
    'vue/space-infix-ops': 'error',
    'vue/space-unary-ops': 'error',
    'vue/singleline-html-element-content-newline': 'off',
  },
}
