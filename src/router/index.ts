import { setupLayouts } from 'virtual:meta-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'

export default createRouter({
  history: createWebHistory(),
  extendRoutes: (routes) => {
    // console.log('raw:', routes)
    return setupLayouts(routes)
  },
})
