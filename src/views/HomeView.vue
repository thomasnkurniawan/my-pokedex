<script setup>
import CardList from '@/components/CardList.vue'
import dropdown from '@/components/DropdownComponent.vue'
</script>

<template>
  <div class="w-full">
    <div class="flex justify-between pt-5 align-middle items-center">
      <h1 class="text-3xl m-5">Pokemon List</h1>
      <dropdown
        :options="pokemonTypes"
        placeholder="Filter Pokemon Types"
        @option-selected="handleOptionSelected"
      />
    </div>
    <div class="w-full grid grid-cols-2 sm:grid-cols-4">
      <card-list :items="pokemons" />
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
      page: 1,
      loading: false,
      openDropdown: false,
      selectedOption: null
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
        this.pokemons = [...this.pokemons, ...pokeData]
        this.page++
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
        this.pokemons = pokeData
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
    }
  }
}
</script>

<style scoped></style>
