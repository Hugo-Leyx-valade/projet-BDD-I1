import { isAuthenticated, retrieveRole } from '../auth';
import { createRouter, createWebHistory } from 'vue-router';
import userConnect from '../views/userConnect.vue';
import ludoConnect from '../views/ludoConnect.vue';
import catalogue from '@/components/catalogue.vue';
import jeu from '@/components/jeu.vue';
import panelLudo from '@/components/panelLudotheque.vue'
import ludotheques from '@/components/ludotheques.vue';
import reservation from '@/components/reservation.vue';
import about from '@/components/about.vue';
import contact from '@/components/contact.vue';
import ludothequePage from '@/components/ludothequePage.vue';
import EventCreation from '@/components/EventCreation.vue';
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
      path: '/ludoGate',
      name:'ludoGate',
      component:ludoConnect,
    },
    {
      path: '/EventCreation/:id',
      props:true,
      name:'EventCreation',
      component:EventCreation,
    },
    {
      path: '/ludotheques',
      name: 'ludotheques',
      component:ludotheques,
    },
    {
      
      path: '/ludothequesPage/:id',
      name: 'ludopage',
      props:true,
      component:ludothequePage,
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
      path: '/reservation',
      name:'reservation',
      props:true,
      component: reservation,
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
