<template>
  <div
    class="max-w-sm rounded-lg overflow-hidden shadow-lg m-5 flex flex-col justify-between h-full"
    v-if="dataPokemon"
  >
    <div class="flex p-5 justify-end">
      <button @click="toggleFavorite(dataPokemon.id)">
        <svg
          v-if="dataPokemon.isFavorite"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 16 15"
        >
          <path
            fill="blue"
            d="M8.44806 2.36593C8.22844 1.87802 7.77701 1.87802 7.55739 2.36593L6.07352 5.66001C6.02177 5.77514 5.86477 5.87681 5.74039 5.87681H2.53216C1.99115 5.87681 1.82415 6.2839 2.21121 6.66188L4.79145 9.18263C4.88626 9.27517 4.94192 9.47154 4.90974 9.59971L3.96036 13.4078C3.82772 13.94 4.18433 14.1768 4.62619 13.8518L7.82746 11.4948C7.91879 11.4275 8.08492 11.4275 8.17625 11.4948L11.3775 13.8518C11.8176 14.1759 12.1769 13.9382 12.049 13.406L11.1044 9.46981C11.074 9.34294 11.1327 9.14613 11.2275 9.05663L13.7816 6.65406C14.1761 6.28303 14.0143 5.87637 13.472 5.87637H10.2638C10.1407 5.87637 9.98194 5.77341 9.93062 5.65958L8.44675 2.36549L8.44806 2.36593Z"
          />
        </svg>
        <svg
          v-if="!dataPokemon.isFavorite"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 16 15"
        >
          <path
            d="M9.65202 5.3939C9.81452 5.7544 10.225 6.0214 10.6195 6.0214H14.308C14.362 6.0214 14.3955 6.0269 14.404 6.0304C14.3675 6.0154 14.3225 5.9739 14.295 5.9049C14.2675 5.8359 14.272 5.7744 14.2885 5.7384C14.285 5.7464 14.2645 5.7729 14.2255 5.8099L11.289 8.5749C11.0125 8.8354 10.8755 9.2969 10.964 9.6659L12.05 14.1959C12.063 14.2509 12.066 14.2859 12.0645 14.2944C12.0715 14.2484 12.1055 14.1864 12.1775 14.1384C12.2495 14.0904 12.32 14.0834 12.3645 14.0949C12.356 14.0929 12.325 14.0764 12.28 14.0434L8.59902 11.3309C8.26752 11.0869 7.76852 11.0869 7.43802 11.3309L3.75702 14.0434C3.71102 14.0774 3.67902 14.0939 3.67052 14.0964C3.71602 14.0844 3.78802 14.0914 3.86202 14.1404C3.93602 14.1894 3.97102 14.2544 3.97752 14.3019C3.97652 14.2934 3.97952 14.2579 3.99352 14.2029L5.08502 9.8204C5.17652 9.4524 5.04702 8.9929 4.77502 8.7274L1.80802 5.8264C1.77002 5.7889 1.75002 5.7619 1.74652 5.7539C1.76102 5.7884 1.76402 5.8469 1.73752 5.9119C1.71102 5.9769 1.66802 6.0159 1.63402 6.0304C1.64252 6.0269 1.67552 6.0214 1.72952 6.0214H5.41802C5.81352 6.0214 6.22252 5.7564 6.38552 5.3939L8.09152 1.6029C8.11252 1.5559 8.13102 1.5294 8.13852 1.5224C8.11752 1.5414 8.07452 1.5599 8.01902 1.5599C7.96352 1.5599 7.92102 1.5414 7.90002 1.5224C7.90802 1.5294 7.92602 1.5564 7.94702 1.6029L9.65302 5.3939H9.65202ZM10.4555 5.0324L8.74952 1.2414C8.41202 0.491398 7.62502 0.490898 7.28752 1.2414L5.58152 5.0324C5.56052 5.0789 5.46552 5.1404 5.41752 5.1404H1.72902C0.892016 5.1404 0.593016 5.8704 1.19202 6.4559L4.15902 9.3569C4.20702 9.4039 4.24602 9.5424 4.23002 9.6074L3.13852 13.9899C2.93152 14.8214 3.59102 15.2599 4.27952 14.7524L7.96052 12.0399C7.98102 12.0249 8.05602 12.0249 8.07652 12.0399L11.7575 14.7524C12.444 15.2579 13.105 14.8204 12.906 13.9904L11.82 9.4604C11.805 9.3984 11.8465 9.2594 11.8925 9.2159L14.829 6.4509C15.441 5.8749 15.1495 5.1409 14.308 5.1409H10.6195C10.5725 5.1409 10.4755 5.0779 10.4555 5.0329V5.0324Z"
            fill="blue"
          />
        </svg>
      </button>
    </div>
    <router-link :to="{ name: 'PokemonDetails', params: { id: dataPokemon.id } }">
      <img class="w-full" :src="dataPokemon.imageUrl" :alt="dataPokemon.name" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2 uppercase">{{ dataPokemon.name }}</div>
        <p class="text-gray-700 text-lg underline mb-2">Ability</p>
        <div class="flex flex-col gap-3">
          <span
            class="text-gray-500 text-sm capitalize"
            v-for="ability in dataPokemon.abilities"
            :key="ability"
          >
            {{ ability.name }}
          </span>
        </div>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span
          v-for="type in dataPokemon.types"
          :key="type"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >#{{ type }}</span
        >
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    dataPokemon: Object
  },
  created() {
    console.debug(this.dataPokemon)
  },
  methods: {
    toggleFavorite(id) {
      this.$emit('onClickFavorite', id)
    }
  }
}
</script>

<style scoped></style>
