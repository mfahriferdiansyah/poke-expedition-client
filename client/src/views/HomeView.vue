<script>
import Marker from '../components/Marker.vue'
import PokemonCard from '../components/PokemonCard.vue'
export default {
  components: {
    Marker,
    PokemonCard
  },
  data() {
    return {
      orange: '#FDB999',
      yellow: '#FEF08A',
      show: true,
      pokeList: true
    }
  }
}
</script>

<template>
  <div class="w-full">
    <div
      class="bg-cover bg-center h-screen w-full relative"
      style="
        background-image: url(https://assets-prd.ignimgs.com/2022/08/03/scarlet-violet-map-ai-1659557720105.jpg);
      "
    >
      <Marker @click="show = !show" :colorMarker="orange" class="absolute top-72 left-1/2" />
      <Marker @click="show = !show" :colorMarker="yellow" class="absolute bottom-80 left-96" />

      <Transition duration="550" name="nested">
        <div
          v-if="show"
          class="outer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5/6 w-5/6 justify-center"
        >
          <div class="inner relative">
            Deploy to region Kanto
            <button 
            @click="show = !show"
            class="absolute top-0 right-0 m-5">
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
          </div>
          <div
            v-if="pokeList"
            class="flex w-full h-5/6 flex-wrap overflow-y-auto"
          >
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
          </div>
          <div
            @click="show = !show"
            v-if="pokeList === false"
            class="flex w-full h-5/6 flex-wrap overflow-y-auto"
          >
            <PokemonCard />
            <PokemonCard />
            <PokemonCard />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style>
.outer,
.inner {
  background: #eee;
  padding: 30px;
  min-height: 100px;
}

.inner {
  background: #ccc;
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}
/* delay enter of nested element */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  /*
  	Hack around a Chrome 96 bug in handling nested opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
  opacity: 0.001;
}
</style>
