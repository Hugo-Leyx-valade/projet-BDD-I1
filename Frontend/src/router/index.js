import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import catalogue from '@/components/catalogue.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: catalogue,
    },
    {
      
    }
  ],
})

export default router
