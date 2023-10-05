/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-layouts/client.d.ts" />
/// <reference types="vite-svg-loader" />

import 'vue-router'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}
