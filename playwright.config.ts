import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test/e2e',
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'vite build && vite preview --port 3000',
    port: 3000,
    stdout: "pipe",
    stderr: "pipe",
    reuseExistingServer: !process.env.CI,
  },
});
