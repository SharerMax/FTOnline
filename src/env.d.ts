/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client.d.ts" />
export {}

import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}
