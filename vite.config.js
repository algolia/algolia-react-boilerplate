import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import viteSSR from 'vite-ssr/plugin.js';

export default defineConfig({
  plugins: [viteSSR(), react(), viteCompression()],
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', 'react-helmet-async'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
