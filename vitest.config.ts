import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import packageJson from './package.json'

export default defineConfig({
  plugins: [vue()],
  test: {
    setupFiles: [
      './__tests__/setup.ts',
    ],
    globals: true,
    environment: 'jsdom',
  },
  define: {
    APP_VERSION: JSON.stringify(packageJson.version),
  },
})
