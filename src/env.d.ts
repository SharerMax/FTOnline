/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client.d.ts" />
import 'vue-router'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}
