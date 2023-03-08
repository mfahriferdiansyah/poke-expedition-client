<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { usePokemonStore } from '../stores/pokemon'

export default {
  data() {
    return {
      showGacha: false,
      showBall: true
    }
  },
  computed: {
    ...mapWritableState(usePokemonStore, ['waitingAnimation'])
  },
  methods: {
    ...mapActions(usePokemonStore, ['midtransGacha'])
  },
  created() {
    setTimeout(() => {
      this.showGacha = true
    }, 500)
  }
}
</script>

<template>
  <Transition v-if="this.$route.fullPath === '/gacha'" duration="550" name="nested">
    <div
      v-if="showGacha"
      class="outer rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5/6 w-5/6 justify-center"
    >
      <div class="inner relative">
        <img src="../assets/gacha.jpg" alt="" />
        <img
          @click.prevent="midtransGacha"
          v-if="!waitingAnimation"
          class="absolute cursor-pointer hover:animate-pulse animate-bounce w-56 h-56 top-56 -right-10"
          src="../assets/pokeball.png"
        />
        <img 
        v-if="waitingAnimation"
        class="absolute cursor-pointer animate-ping w-56 h-56 top-56 -right-10"
        src="../assets/pokeball.png">
      </div>
    </div>
  </Transition>
</template>
