import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      reporter: ['text', 'lcov'],
    },
    include: ['test/unit/**/*.test.ts', 'test/unit/**/*.test.tsx'], // ✅ Only run unit tests
    exclude: ['test/e2e/**'], // optional, explicitly ignore e2e
  },
});
