<template>
  <router-link
    v-for="item in items"
    :key="item.id"
    :to="{ name: 'PokemonDetails', params: { id: item.id } }"
  >
    <div class="max-w-sm rounded-lg overflow-hidden shadow-lg m-5">
      <img class="w-full" :src="item.imageUrl" :alt="item.name" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ item.name }}</div>
        <p class="text-gray-700 text-sm">
          Ability:
          <span class="text-gray-700 text-sm" v-for="ability in item.abilities" :key="ability">
            {{ ability.name }} |
          </span>
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span
          v-for="type in item.types"
          :key="type"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >#{{ type }}</span
        >
      </div>
    </div>
  </router-link>

  <div v-if="loading">Loading...</div>
</template>

<script>
export default {
  props: {
    items: Array
  }
}
</script>

<style scoped></style>
