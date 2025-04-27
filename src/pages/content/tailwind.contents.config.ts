import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/content/**/*.{js,jsx,ts,tsx}',
    './src/pages/options/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
