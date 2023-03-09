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
    ...mapWritableState(usePokemonStore, ['waitingAnimation', 'balance'])
  },
  methods: {
    ...mapActions(usePokemonStore, ['midtransGacha', 'checkPokemon', 'coinsGacha'])
  },
  async created() {
    await this.checkPokemon()
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
      <div class="inner relative bg-slate-200">
        <img src="../assets/gacha.jpg" alt="" />
        <img
          @click.prevent="coinsGacha"
          v-if="!waitingAnimation"
          class="absolute cursor-pointer hover:animate-pulse animate-bounce w-56 h-56 top-56 -right-10"
          src="../assets/pokeball.png"
        />
        <img
          v-if="waitingAnimation"
          class="absolute cursor-pointer animate-ping w-56 h-56 top-56 -right-10"
          src="../assets/pokeball.png"
        />

        <img
         @click.prevent="midtransGacha"
          v-if="!waitingAnimation"
          class="absolute masterball cursor-pointer w-60 h-60 top-72 left-0"
          src="../assets/masterball.png"
        />
        <img
         @click.prevent="midtransGacha"
          v-if="waitingAnimation"
          class="absolute animate-ping w-60 h-60 top-72 left-0"
          src="../assets/masterball.png"
        />
      </div>
      <span
        class="w-full mt-5 h-40 text-xs font-semibold inline-block py-1 px-2 rounded-sm text-purple-600 shadow-md bg-white uppercase last:mr-0 mr-1"
      >
        <div class="p-5 gap-3 flex flex-col justify-center">
          <span
            class="text-center font-semibold inline-block py-1 px-2 rounded-md text-green-600 bg-green-200 uppercase last:mr-0 mr-1"
          >
            <p>There are two type of pokeball</p>
          </span>
          <div class="flex justify-between mr-1">
            <!--Desc pokeball-->
            <div class="flex">
              <div class="flex items-start gap-5 justify-start">
                <div class="flex flex-col gap-2">
                  <div class="flex gap-1">
                    <span
                      class="-bottom-9 left-0 font-semibold inline-block py-1 px-2 rounded-md text-violet-600 bg-violet-200 uppercase "
                    >
                      <p>1. Masterball</p>
                    </span>
                    <span
                      class="-bottom-9 left-0 font-semibold inline-block py-1 px-2 rounded-md text-violet-600 bg-violet-200 uppercase "
                    >
                      <p>Can only be obtained by top up</p>
                    </span>
                  </div>
                  <span
                    class="-bottom-9 left-0 font-semibold inline-block py-1 px-2 rounded-md text-violet-600 bg-violet-200 uppercase "
                  >
                    <p>Containing Gen-2 + Gen-1 Pokemon</p>
                  </span>
                  <span
                    class="-bottom-9 left-0 font-semibold inline-block py-1 px-2 rounded-md text-violet-600 bg-violet-200 uppercase "
                  >
                    <p>Price: 10.000 IDR</p>
                  </span>
                </div>
                <div class="flex flex-col gap-2">
                  <div class="flex gap-1">
                    <span
                      class="-bottom-9 left-0 font-semibold inline-block py-1 px-2 rounded-md text-red-600 bg-red-200 uppercase"
                    >
                      <p>2. Pokeball</p>
                    </span>
                    <span
                      class="-bottom-9 left-0 font-semibold inline-block py-1 px-2 rounded-md text-red-600 bg-red-200 uppercase"
                    >
                      <p>Can only be obtained by in-game currency</p>
                    </span>
                  </div>
                  <span
                    class=" font-semibold inline-block py-1 px-2 rounded-md text-red-600 bg-red-200 uppercase "
                  >
                    <p>Containing Gen-1 Pokemon Only</p>
                  </span>
                  <span
                    class="font-semibold inline-block py-1 px-2 rounded-md text-red-600 bg-red-200 uppercase "
                  >
                    <p>Price: 10.000 COINS</p>
                  </span>
                </div>
              </div>
            </div>
            <!--User Balance-->
            <div class="flex flex-col gap-2">
              <span
                class="-bottom-9 text-center left-0 font-semibold py-1 px-2 rounded-md text-gray-600 bg-gray-200 uppercase "
              >
                <p>Total Balance Coins</p>
              </span>
              <span
                class="left-0 font-semibold py-1 px-2 text-lg text-center rounded-md text-yellow-600 bg-yellow-200 uppercase "
              >
                <p>{{balance.toLocaleString('en-US')}}</p>
              </span>
            </div>
          </div>
        </div>
      </span>
    </div>
  </Transition>
</template>

<style>
.masterball {
  animation: shake 1s;
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
