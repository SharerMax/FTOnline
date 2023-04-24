import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const DefaultLayout = () => import('../layout/Index.vue')
const Index = () => import('../page/Index.vue')

const routes: RouteRecordRaw[] = [{
  path: '/',
  component: DefaultLayout,
  redirect: '',
  children: [
    {
      path: '',
      component: Index,
    },
  ],
}]

export default createRouter({
  history: createWebHistory(),
  routes,
})
