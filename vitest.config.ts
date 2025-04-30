import { defineConfig } from 'vitest/config'
import packageJson from './package.json'

export default defineConfig({
  test: {
    setupFiles: [
      './__tests__/setup.ts',
    ],
    globals: true,
    environment: 'jsdom',
    testTimeout: 30000,
  },
  define: {
    APP_VERSION: JSON.stringify(packageJson.version),
  },
})
