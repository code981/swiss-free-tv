import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  preview: {
    allowedHosts: true,
  },
  build: {
    // hls.js is intentionally lazy-loaded as a separate player chunk.
    // Keep warnings focused on accidental main-bundle growth.
    chunkSizeWarningLimit: 700,
  },
});
