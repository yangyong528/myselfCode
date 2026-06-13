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
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
          meta: {
            title: '数据分析',
            icon: 'PieChart'
          }
        },{
          path: 'knowledge',
          name: 'knowledge',
          component: () => import('@/views/Knowledge.vue'),
          meta: {
            title: '知识库',
            icon: 'Document'
            }
          }, {
          path: 'consultation',
          name: 'consultation',
          component: () => import('@/views/Consultation.vue'),
          meta: {
            title: '咨询',
            icon: 'Document'
          }
        }
      ]
    }
  ]
})

export default router