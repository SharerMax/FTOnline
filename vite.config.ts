import * as path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss(),
    Pages({
      resolver: 'vue',
    }),
    Layouts(),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) {
            return 'assets/[name]-[hash][extname]'
          }

          if (/\.(png|jpe?g|webp|gif|ico)$/i.test(assetInfo.name)) {
            return 'assets/img/[name]-[hash][extname]'
          }

          if (/\.svg$/i.test(assetInfo.name)) {
            return 'assets/svg/[name]-[hash][extname]'
          }

          if (/\.css$/i.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]'
          }

          if (/\.mp4$/i.test(assetInfo.name)) {
            return 'assets/video/[name]-[hash][extname]'
          }

          if (/\.mp3$/i.test(assetInfo.name)) {
            return 'assets/audio/[name]-[hash][extname]'
          }

          if (/\.(woff|woff2|otf|ttf)$/i.test(assetInfo.name)) {
            return 'assets/font/[name]-[hash][extname]'
          }

          return 'assets/[name]-[hash][extname]'
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
})
