import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  // Add this section
  publicDir: 'images',
  assetsInclude: ['**/*.png'],
});