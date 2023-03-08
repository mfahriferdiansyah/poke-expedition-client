<script>
import { mapActions, mapWritableState } from 'pinia'
import { usePokemonStore } from '../stores/pokemon'
export default {
  computed: {
    ...mapWritableState(usePokemonStore, ['pokeList', 'show'])
  },
  props: ['region']
}
</script>

<template>
    
  <p>Deploy to region     
        <p
        class="-bottom-9 right-0 text-xs font-semibold inline-block py-1 px-2 rounded-md text-yellow-600 bg-yellow-200 uppercase last:mr-0 mr-1"
        >
        {{ region.name }}
        </p>
    </p>
  <p>Maximum expedition time         
    <p
        class="-bottom-9 right-0 text-xs font-semibold inline-block py-1 px-2 rounded-md text-yellow-600 bg-yellow-200 uppercase last:mr-0 mr-1"
        >
        {{ (region.time)/3600000 + ' hours' }}
    </p>
  </p>
  <p>Max coin reward 
    <p
        class="-bottom-9 right-0 text-xs font-semibold inline-block py-1 px-2 rounded-md text-yellow-600 bg-yellow-200 uppercase last:mr-0 mr-1"
        >
        {{ (region.coin).toLocaleString('en-US') }}
    </p>    
 </p>
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
    <p
      class="-bottom-9 right-0 text-xs font-semibold inline-block py-1 px-2 animate-pulse rounded-md text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1"
    >
    Pokemon In Expedition
    </p>
  </button>
  <button
    @click="pokeList = !pokeList"
    v-if="pokeList != true"
    class="absolute transition ease-in-out delay-150 right-0 bottom-0 m-5"
  >
    <p
      class="-bottom-9 right-0 text-xs font-semibold inline-block py-1 px-2 animate-pulse rounded-md text-green-600 bg-green-200 uppercase last:mr-0 mr-1"
    >
      Pokemon Ready to Deploy
    </p>
  </button>
</template>
