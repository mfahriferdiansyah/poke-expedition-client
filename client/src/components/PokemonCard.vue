<script>
import { mapActions, mapState } from 'pinia'
import { usePokemonStore } from '../stores/pokemon'

export default {
  props: ['pokemon', 'isDeployed', 'expeditionTime'],
  data() {
    return {
      counting: true
    }
  },
  methods: {
    onCountdownEnd: function () {
      this.counting = false
    },
    getColorType(type) {
      type = type.toLowerCase()
      const typeColor = {
        bug: '#26de81',
        dragon: '#ffeaa7',
        electric: '#fed330',
        fairy: '#FF0069',
        fighting: '#30336b',
        fire: '#f0932b',
        flying: '#81ecec',
        grass: '#00b894',
        ground: '#EFB549',
        ghost: '#a55eea',
        ice: '#74b9ff',
        normal: '#95afc0',
        poison: '#6c5ce7',
        psychic: '#a29bfe',
        rock: '#2d3436',
        dark: '#2d3436',
        water: '#0190FF'
      }
      return typeColor[`${type.toLowerCase()}`]
    },
  },
}
</script>

<template>
    <div
    class="relative m-5 flex h-40 w-64 items-end justify-center pb-1 hover:scale-105 font-mono"
    >
    <vue-countdown
      :time="expeditionTime"
      @end="onCountdownEnd"
      v-slot="{ days, hours, minutes, seconds }"
    >
      <div
        class="static flex h-32 w-64 cursor-pointer rounded-md shadow-lg"
        v-bind:style="{ 'background-color': getColorType(pokemon.type) }"
      >
        <div class="flex w-4/5 flex-col justify-evenly px-6 py-4">
          <h1 class="justify-center font-bold capitalize text-white">{{ pokemon.name }}</h1>
          <div>
            <p class="font-normal text-white">HP: {{ pokemon.hp }}</p>
            <p class="font-normal text-white">Attack: {{ pokemon.atk }}</p>
          </div>
        </div>
        <div class="absolute right-1 top-0 flex h-32 w-32 justify-end">
          <img class="h-full scale-110" :src="pokemon.image" />
        </div>
      </div>
      <p v-if="isDeployed" class="font-mono">
        <span
          v-if="counting"
          class="absolute -bottom-9 left-0 text-xs font-semibold inline-block py-1 px-2 rounded-md text-red-600 bg-red-200 uppercase last:mr-0 mr-1"
        >
          <p>Time Remaining：{{ days }}:{{ hours }}:{{ minutes }}:{{ seconds }}</p>
        </span>
        <span
          v-if="!counting"
          class="absolute -bottom-9 left-0 text-xs font-semibold inline-block py-1 px-2 rounded-md text-green-600 bg-green-200 uppercase last:mr-0 mr-1"
        >
          <p>Expedition ended. Ready to claim</p>
        </span>
        <span
          v-if="isDeployed && counting"
          class="absolute -bottom-9 right-0 text-xs font-semibold inline-block py-1 px-2 rounded-md text-red-600 bg-red-200 uppercase last:mr-0 mr-1"
        >
          Deployed
        </span>
      </p>
      <p v-if="!isDeployed" class="font-mono">
        <span
          class="absolute top-0 left-0 text-xs font-semibold inline-block py-1 px-2 rounded-md text-green-600 bg-green-200 uppercase last:mr-0 mr-1"
        >
          Ready to deploy
        </span>
      </p>
    </vue-countdown>
    </div>
</template>
