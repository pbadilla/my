// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: 'jsdom', 
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'], 
      exclude: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', 'node_modules/**'], 
      all: true, 
    },
  },
});
