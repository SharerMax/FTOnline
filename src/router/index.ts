import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

const routes = setupLayouts(generatedRoutes)

// const DefaultLayout = () => import('../layout/Index.vue')

export default createRouter({
  history: createWebHistory(),
  routes,
})
