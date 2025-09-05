import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    chunkSizeWarningLimit: 2000, // Increase limit for Pyodide
  },
  preview: {
    host: true,
    port: 4173,
  },
  optimizeDeps: {
    exclude: ['pyodide'],
  },
});