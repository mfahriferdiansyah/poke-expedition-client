import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import GachaPage from '../views/GachaPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import { usePokemonStore } from '../stores/pokemon'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/gacha',
    name: 'gacha',
    component: GachaPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    redirect: 'home'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const pokemon = usePokemonStore()
  pokemon.access_token = localStorage.access_token
  if(to.name === 'login' || to.name === 'register'){
    if(localStorage.access_token){
      next({name: 'home'})
    } else {
      next()
    }
  } else if (to.name !== 'login' && to.name !== 'register'){
    if(!localStorage.access_token){
      next({name: 'login'})
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
