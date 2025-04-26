import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/content/**/*.{vue,js,jsx,ts,tsx}',
    './src/pages/options/**/*.{vue,js,jsx,ts,tsx}',
    './src/components/**/*.{vue,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
