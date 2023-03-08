import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import GachaPage from '../views/GachaPage.vue'
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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   const pokemon = usePokemonStore()
//   if (from.name === 'gacha') {
//     setTimeout(() => {
//       pokemon.showBall = true
//       next()
//     }, 500);
//   }
// })

export default router
