import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,vue,js,ts}'],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [],
} satisfies Config
