import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import packageJson from './package.json'

export default defineConfig({
  plugins: [vue() as any],
  test: {
    setupFiles: [
      './__tests__/setup.ts',
    ],
    globals: true,
    environment: 'jsdom',
    testTimeout: 20000,
  },
  define: {
    APP_VERSION: JSON.stringify(packageJson.version),
  },
})
