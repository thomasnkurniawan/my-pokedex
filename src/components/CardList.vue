<template>
  <div
    class="max-w-sm rounded-lg overflow-hidden shadow-lg m-5 flex flex-col justify-between h-full"
    v-for="item in items"
    :key="item.id"
  >
    <router-link :to="{ name: 'PokemonDetails', params: { id: item.id } }">
      <img class="w-full" :src="item.imageUrl" :alt="item.name" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2 uppercase">{{ item.name }}</div>
        <p class="text-gray-700 text-lg underline mb-2">Ability</p>
        <div class="flex flex-col gap-3">
          <span
            class="text-gray-500 text-sm capitalize"
            v-for="ability in item.abilities"
            :key="ability"
          >
            {{ ability.name }}
          </span>
        </div>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span
          v-for="type in item.types"
          :key="type"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >#{{ type }}</span
        >
      </div>
    </router-link>

    <button
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow m-5"
      @click="toggleFavorite(item.id)"
    >
      {{ isFavorite(item.id) ? 'Unfavorite' : 'Favorite' }}
    </button>
  </div>

  <div v-if="loading">Loading...</div>
</template>

<script>
export default {
  props: {
    items: Array
  },
  methods: {
    isFavorite(id) {
      return this.getFavoriteStatus(id)
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
      } else {
        favorites.push(id)
      }
      this.setFavorites(favorites)
    }
  }
}
</script>

<style scoped></style>
