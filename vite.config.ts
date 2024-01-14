import * as path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'

// import Pages from 'vite-plugin-pages'
import VueRouter from 'unplugin-vue-router/vite'
import svgLoader from 'vite-svg-loader'

import MetaLayouts from 'vite-plugin-vue-meta-layouts'
import Inspect from 'vite-plugin-inspect'
import { browserslistToTargets } from 'lightningcss'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import browserslist from 'browserslist'

// console.log(browserslist())
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: 'src/vite-plugin-vue-router.d.ts',
    }),
    vue(),
    svgLoader(),
    Unocss(),
    // Pages({
    //   resolver: 'vue',
    // }),
    MetaLayouts(),
    Inspect(),
  ],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist()),
    },
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  server: {
    warmup: {
      clientFiles: ['./src/components/**/*.vue', './src/layouts/**/*.vue', './src/styles/**/*.css'],
    },
  },
  build: {
    target: browserslistToEsbuild(),
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
    cssMinify: 'lightningcss',
  },
})
