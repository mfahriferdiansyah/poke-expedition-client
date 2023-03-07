<script>
import { mapActions, mapState } from 'pinia'
import { usePokemonStore } from '../stores/pokemon'

export default {
  props: ['pokemon'],
  methods: {
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
        water: '#0190FF'
      }
      return typeColor[`${type.toLowerCase()}`]
    }
  }
}
</script>

<template>
  <div class="relative m-5 flex h-40 w-64 items-end justify-center pb-1 hover:scale-105">
    <div
      class="static flex h-32 w-64 cursor-pointer rounded-3xl shadow-lg"
      v-bind:style="{ 'background-color': getColorType(pokemon.type) }"
    >
      <div class="flex w-4/5 flex-col justify-evenly px-6 py-4">
        <h1 class="justify-center font-bold capitalize text-white">{{ pokemon.name }}</h1>
        <div>
          <p class="font-normal text-white">HP: {{ pokemon.hp }}</p>
          <p class="font-normal text-white">Attack: {{ pokemon.atk }}</p>
        </div>
      </div>
      <div class="absolute right-5 top-0 flex h-32 w-32 justify-end">
        <img class="h-full scale-110 hover:scale-125" :src="pokemon.image" />
      </div>
    </div>
  </div>
</template>
