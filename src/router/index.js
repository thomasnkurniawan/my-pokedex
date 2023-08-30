import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokemonDetailView from '../views/PokemonDetailView.vue'
import PokemonFavorite from '../views/PokemonFavorite.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokemon/:id',
      name: 'PokemonDetails',
      component: PokemonDetailView,
      props: true
    },
    {
      path: '/favorite/',
      name: 'PokemonFavorite',
      component: PokemonFavorite
    }
  ]
})

export default router
