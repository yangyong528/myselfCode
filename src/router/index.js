import { createRouter, createWebHistory } from 'vue-router'
import BackendLayout from '@/components/BackendLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/back',
      name: 'backendLayout',
      component: BackendLayout,
      children: [
        // {
        //   path: '/back/home',
        //   name: 'home',
        //   component: () => import('@/views/home/index.vue')
        // }
      ]
    }
  ]
})

export default router