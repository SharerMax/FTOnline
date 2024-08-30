/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-meta-layouts/client" />
/// <reference types="vite-svg-loader" />
/// <reference types="unplugin-vue-router/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // more env variables...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
