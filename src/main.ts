import type { Directive } from 'vue'
import { createHead } from '@unhead/vue'
import { createApp } from 'vue'
import { handleHotUpdate } from 'vue-router/auto-routes'
import App from './App.vue'
import router from './router'

import store from './store'
// import '@unocss/reset/normalize.css'
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
import './style/common.css'
import 'uno.css'
import './utils/autoDarkClass'

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
  handleHotUpdate(router)
}

const head = createHead()
// console.log(router.getRoutes())
createApp(App).directive('focus', {
  mounted(el) {
    el.focus()
  },
} satisfies Directive<HTMLElement>).use(store).use(router).use(head).mount('#app')
if (import.meta.env.PROD) {
  import('@vercel/analytics').then(module => module.inject())
}
