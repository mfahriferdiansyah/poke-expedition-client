<script>
import {mapState, mapWritableState} from 'pinia'
import {usePokemonStore} from '../stores/pokemon'
export default {
    computed: {
        ...mapWritableState(usePokemonStore, ['pokeList', 'show'])
    },
    props: ['region']
}
</script>

<template>
  <p>Deploy to region {{region.name}}</p>
  <p>Maximum expedition time {{ region.time }}</p>
  <p>Max coin reward {{ region.coin }}</p>
  <button @click="show = !show" class="absolute top-0 right-0 m-5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <button
    @click="pokeList = !pokeList"
    v-if="pokeList"
    class="absolute transition ease-in-out delay-150 right-0 bottom-0 m-5"
  >
    Pokemon In Expedition
  </button>
  <button
    @click="pokeList = !pokeList"
    v-if="pokeList != true"
    class="absolute transition ease-in-out delay-150 right-0 bottom-0 m-5"
  >
    Pokemon Ready to Deploy
  </button>
</template>
