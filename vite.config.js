import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'
import inject from '@rollup/plugin-inject'

export default defineConfig({
  plugins: [react(), reactRefresh()],
  build: {
    rollupOptions: {
      plugins: [
        inject({
          process: 'process',
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
