import { isAuthenticated, retrieveRole } from '../auth';
import { createRouter, createWebHistory } from 'vue-router'
import userConnect from '../views/userConnect.vue'
import ludoConnect from '../views/ludoConnect.vue'
import catalogue from '@/components/catalogue.vue'
import jeu from '@/components/profil.vue'
import panelLudo from '@/components/panelLudotheque.vue'
import about from '@/components/about.vue'
import contact from '@/components/contact.vue'
import profil from '@/components/profil.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      name: 'home',
      component: userConnect,
    },
    {
      path: '/profil',
      name: 'profil',
      component: profil, 
    },
    {
      path: '/ludoGate',
      name:'ludoGate',
      component:ludoConnect,
    },
    {
      path: '/contact',
      name: 'contact',
      component:contact, 
    },
    {
      path: '/about', 
      name: 'about',
      component:about,
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
          next('/Login');  // Redirige vers login si l'utilisateur n'est pas authentifié
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
          next('/Login');  // Redirige vers login si l'utilisateur n'est pas authentifié
          alert("Vous n'êtes pas authentifié !")
        } else {
          next();  // Laisse passer si authentifié
        }
      }
    },
    {
      path: '/panelLudotheque',
      component: panelLudo,
      beforeEnter: (to, from, next) => {
        if(isAuthenticated()){
          if(JSON.parse(retrieveRole()).Role === 2){
            next();
          }else{
            next('/catalogue');
            alert("Vous n'êtes pas authorizé à accéder à cette page.")
          }
        }else{
          next('/Login');
          alert("Vous n'êtes pas authentifié !")
        }
      }
    }
  ],
})

export default router
