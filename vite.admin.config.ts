import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist/admin',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, 'src/entry-admin.ts'),
      name: 'Admin',
      formats: ['es'],
      fileName: 'admin',
    },
    rollupOptions: {
      external: ['space'],
      inlineDynamicImports: true,
      output: {
        manualChunks: () => 'admin.js',
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
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: 'space', replacement: '/api/v1/assets/space' },
    ],
  },
  plugins: [vue()],
})
