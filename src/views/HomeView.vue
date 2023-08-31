<script setup>
import CardList from '@/components/CardList.vue'
import dropdown from '@/components/DropdownComponent.vue'
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col lg:flex-row justify-between p-5 align-middle items-center">
      <h1 class="text-3xl">My Pokedex</h1>
      <div class="py-5 flex gap-5">
        <dropdown
          :options="pokemonTypes"
          placeholder="Filter Pokemon Types"
          @option-selected="handleOptionSelected"
        />
        <div class="relative">
          <router-link :to="{ name: 'PokemonFavorite' }">
            <div class="absolute right-[-5px] top-[-5px] mb-3">
              <span class="relative flex h-3 w-3">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
                ></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            </div>
            <button
              class="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Favorite list
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div>
      <div class="w-full p-5" v-if="show">
        <div
          id="alert-1"
          class="flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <svg
            class="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
            />
          </svg>
          <span class="sr-only">Info</span>
          <div class="ml-3 text-sm font-medium">{{ alertText }}</div>
          <button
            type="button"
            class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-1"
            aria-label="Close"
            @click="
              () => {
                this.show = !this.show
              }
            "
          >
            <span class="sr-only">Close</span>
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="w-full grid grid-cols-1 sm:grid-cols-4 gap-3 mb-5">
      <div v-for="item in pokemons" :key="item.id">
        <card-list
          :dataPokemon="item"
          @onClickFavorite="
            (id) => {
              item.isFavorite = !item.isFavorite
              this.toggleFavorite(id)
            }
          "
        />
      </div>
    </div>
    <div class="w-full flex justify-center p-5" v-if="loading">
      <div role="status">
        <svg
          aria-hidden="true"
          class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  fetchPokemonTypesData,
  fetchPokemonData,
  fetchPokemonbyTypesData
} from '@/services/api.service'

export default {
  data() {
    return {
      pokemons: [],
      pokemonTypes: [],
      loading: false,
      page: 0,
      openDropdown: false,
      selectedOption: null,
      show: false,
      alertText: 'Berhasil Tambah favorit!'
    }
  },
  created() {
    if (this.selectedOption) {
      this.fetchPokemonsByType()
    } else {
      this.fetchPokemons()
    }
    this.getPokemonType()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    async fetchPokemons() {
      if (this.loading) return

      this.loading = true

      try {
        const pokeData = await fetchPokemonData(this.page)
        const mappedWithFavorite = pokeData.map((item) => {
          const currentFavStatus = this.getFavoriteStatus(item.id)
          return {
            ...item,
            isFavorite: currentFavStatus
          }
        })
        this.pokemons = [...this.pokemons, ...mappedWithFavorite]
        this.page = this.page + 20
        this.loading = false
      } catch (error) {
        console.error('Error fetching Pokémon:', error)
        this.loading = false
      }
    },
    async fetchPokemonsByType() {
      if (this.loading) return

      this.loading = true

      try {
        const pokeData = await fetchPokemonbyTypesData(this.selectedOption)
        const mappedWithFavorite = pokeData.map((item) => {
          const currentFavStatus = this.getFavoriteStatus(item.id)
          return {
            ...item,
            isFavorite: currentFavStatus
          }
        })
        this.pokemons = [...this.pokemons, ...mappedWithFavorite]

        this.loading = false
      } catch (error) {
        console.error('Error fetching Pokémon:', error)
        this.loading = false
      }
    },
    handleScroll() {
      const bottomOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight
      if (bottomOfPage) {
        this.fetchPokemons()
      }
    },
    async getPokemonType() {
      this.pokemonTypes = await fetchPokemonTypesData()
    },
    handleOptionSelected(option) {
      this.selectedOption = option
      this.fetchPokemonsByType()
    },
    getFavoriteStatus(id) {
      const favorites = this.getFavorites()
      return favorites.includes(id)
    },
    getFavorites() {
      const storedFavorites = localStorage.getItem('favorites')
      return storedFavorites ? JSON.parse(storedFavorites) : []
    },
    setFavorites(favorites) {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    },
    toggleFavorite(id) {
      const favorites = this.getFavorites()
      const index = favorites.indexOf(id)
      if (index !== -1) {
        favorites.splice(index, 1)
        this.show = true
        this.alertText = 'Berhasil Hapus Favorit!'
      } else {
        favorites.push(id)
        this.show = true
        this.alertText = 'Berhasil Tambah Favorit!'
      }
      this.setFavorites(favorites)
    }
  }
}
</script>

<style scoped></style>
