import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import htmlPurge from 'vite-plugin-html-purgecss'
import path from 'path';

export default defineConfig({
  plugins: [react(), htmlPurge()],
  build: {
    rollupOptions: {
      external: ['/react-instantsearch-core']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
