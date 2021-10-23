import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist/client',
    rollupOptions: {
      external: ['space'],
      output: {
        paths: {
          space: '/api/v1/assets/space',
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3333/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: 'space', replacement: '/api/v1/assets/space' },
    ],
  },
})
