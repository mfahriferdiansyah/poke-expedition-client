<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { usePokemonStore } from '../stores/pokemon'
export default {
    methods: {
        ...mapActions(usePokemonStore, ['gachaPrize', 'getPokemon']),
        async changeDialog() {
            await this.gachaPrize(1)
            this.claim = false
            await this.getPokemon()
        }
    },
    data() {
        return {
            showDialog : true,
            claim: true
        }
    },
}
</script>

<template>
  <div class="relative">
    <img
      class="h-28"
      src="https://www.freepnglogos.com/uploads/pokemon-png/ash-and-pikachu-dashiesparkle-pokemon-png-29.png"
      alt=""
    />
    <div  class="bg-slate-600 w-1/3 h-32 rounded-md mx-5">
      <div v-if="showDialog && claim"  class="p-5 font-mono text-white flex justify-between">
        <div class="flex flex-col">
          <p>Hi, you look new here.</p>
          <p>
            Before you start your journey, please click the pokeball first.
          </p>
        </div>
        <img @click="changeDialog" class="m-5 h-14 animate-bounce hover:animate-pulse cursor-pointer" src="../assets/pokeball.png" alt="" />
      </div>
      <div v-if="showDialog && !claim"  class="p-5 font-mono text-white flex justify-between">
        <div class="flex flex-col">
          <p>Nice, what pokemon you got ?</p>
          <p>
            Also acquire new pokemon by gacha.
            Do expedition to acquire coin, click the marker on the map an you are ready to go.
          </p>
        </div>
        </div>
    </div>
  </div>
</template>
