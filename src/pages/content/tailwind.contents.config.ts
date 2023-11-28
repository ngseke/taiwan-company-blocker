import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/content/**/*.{vue,js,ts}',
    './src/components/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
