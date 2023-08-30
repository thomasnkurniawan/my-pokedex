<template>
  <div
    class="relative w-full items-center overflow-hidden bg-white px-4 pb-8 pt-5 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 lg:mt-[60px]"
    v-if="pokemons"
  >
    <div class="flex justify-between">
      <svg
        @click="() => $router.go(-1)"
        class="w-5 my-3 cursor-pointer"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <h1 class="my-3 text-3xl">Pokemon Detail</h1>
    </div>
    <div class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
      <div class="h-full overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
        <img :src="pokemons.imageUrl" alt="Pokemon Sprite" class="h-full w-full object-contain" />
      </div>
      <div class="sm:col-span-8 lg:col-span-7">
        <h2 class="text-2xl font-bold text-gray-900 sm:pr-12 uppercase">{{ pokemons.name }}</h2>

        <section aria-labelledby="information-heading" class="mt-2">
          <div>
            <h4 class="text-sm font-medium text-gray-900">Types</h4>

            <fieldset class="mt-4">
              <span
                v-for="type in pokemons.pokemonTypes"
                :key="type"
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >{{ type.name }}</span
              >
            </fieldset>
          </div>
        </section>

        <section aria-labelledby="options-heading" class="mt-10">
          <div class="mt-10">
            <h4 class="text-sm font-medium text-gray-900">Height</h4>

            <fieldset class="mt-4">
              <span class="flex items-center space-x-3">
                <label
                  class="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400 uppercase"
                >
                  {{ pokemons.height }}
                </label>
              </span>
            </fieldset>
          </div>

          <div class="mt-10">
            <h4 class="text-sm font-medium text-gray-900">Color</h4>

            <fieldset class="mt-4">
              <span class="flex items-center space-x-3">
                <label
                  class="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400"
                >
                  <span
                    aria-hidden="true"
                    :class="`h-8 w-8 rounded-full border border-black border-opacity-10`"
                    :style="{ backgroundColor: pokemons.species?.color }"
                  ></span>
                </label>
              </span>
            </fieldset>
          </div>

          <div class="mt-10">
            <h4 class="text-sm font-medium text-gray-900">Habitat</h4>

            <fieldset class="mt-4">
              <span class="flex items-center space-x-3">
                <label
                  class="relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400 uppercase"
                >
                  {{ pokemons.species?.habitat }}
                </label>
              </span>
            </fieldset>
          </div>

          <div class="mt-10">
            <h4 class="text-sm font-medium text-gray-900">Abilities</h4>

            <fieldset class="mt-4" v-for="{ name, description } in pokemons.abilities" :key="name">
              <span class="flex flex-col items-start">
                <p class="uppercase">
                  {{ name }}
                </p>
                <p class="text-gray-400">{{ description.effect }}</p>
              </span>
            </fieldset>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { getPokemonById } from '@/services/api.service'
import { useRoute } from 'vue-router'

export default {
  data() {
    return {
      pokemons: {}
    }
  },
  created() {
    this.fetchPokemons()
  },
  methods: {
    async fetchPokemons() {
      if (this.loading) return

      this.loading = true

      try {
        const route = useRoute()
        const pokemonDataAPI = await getPokemonById(route.params.id)

        this.pokemons = pokemonDataAPI[0]

        this.loading = false
      } catch (error) {
        console.error('Error fetching Pokémon:', error)
        this.loading = false
      }
    }
  }
}
</script>
