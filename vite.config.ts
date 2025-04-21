import * as path from 'node:path'
import vue from '@vitejs/plugin-vue'
import browserslist from 'browserslist'
import browserslistToEsbuild from 'browserslist-to-esbuild'

import { browserslistToTargets } from 'lightningcss'
import Unocss from 'unocss/vite'

// import Pages from 'vite-plugin-pages'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import MetaLayouts from 'vite-plugin-vue-meta-layouts'
import svgLoader from 'vite-svg-loader'

// console.log(browserslist())
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: 'src/vite-plugin-vue-router.d.ts',
      // list of glob files to exclude from the routes generation
      // e.g. ['**/__*'] will exclude all files and folders starting with `__`
      // e.g. ['**/__*/**/*'] will exclude all files within folders starting with `__`
      // e.g. ['**/*.component.vue'] will exclude components ending with `.component.vue`
      exclude: ['**/*.component.vue'],
    }),
    vue(),
    svgLoader(),
    Unocss(),
    // Pages({
    //   resolver: 'vue',
    // }),
    MetaLayouts(),
    VueDevTools(),
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
        assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    cssMinify: 'lightningcss',
  },
})
