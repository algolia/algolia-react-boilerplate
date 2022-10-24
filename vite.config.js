import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import inject from '@rollup/plugin-inject'

export default defineConfig({
  plugins: [react()],
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
