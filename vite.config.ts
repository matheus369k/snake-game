import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/sneak-game/',
  resolve: {
    alias: {
      '@scripts': path.resolve(__dirname, './src/scripts'),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
