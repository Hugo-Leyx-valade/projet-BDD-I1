import { isAuthenticated } from '../auth';
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import catalogue from '@/components/catalogue.vue'
import jeu from '@/components/jeu.vue'
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
      beforeEnter: (to, from, next) => {
        if (!isAuthenticated()) {
          next('/');  // Redirige vers login si l'utilisateur n'est pas authentifié
          alert("Vous n'êtes pas authentifié !")
        } else {
          next();  // Laisse passer si authentifié
        }
      }
    },
    {
      path: '/jeu/:id',
      name:'jeu',
      props:true,
      component: jeu,
      beforeEnter: (to, from, next) => {
        if (!isAuthenticated()) {
          next('/');  // Redirige vers login si l'utilisateur n'est pas authentifié
          alert("Vous n'êtes pas authentifié !")
        } else {
          next();  // Laisse passer si authentifié
        }
      }
    },
  ],
})

export default router
