import { type Directive, createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@unocss/reset/normalize.css'
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
import './style/common.css'
import 'uno.css'
import store from '@/store'

// console.log(router.getRoutes())
createApp(App).directive('focus', {
  mounted(el) {
    el.focus()
  },
} satisfies Directive<HTMLElement>).use(store).use(router).mount('#app')
