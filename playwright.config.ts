import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test/e2e',
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'vite preview --port 3000',
    port: 3000,
    reuseExistingServer: true,
  },
});