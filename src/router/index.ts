import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto/routes'

console.log(routes)
export default createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
})
