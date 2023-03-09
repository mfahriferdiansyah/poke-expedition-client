<script>
import Marker from '../components/Marker.vue'
import PokemonCard from '../components/PokemonCard.vue'
import HomeBanner from '../components/HomeBanner.vue'
import StarterGift from '../components/StarterGift.vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { usePokemonStore } from '../stores/pokemon'

export default {
  components: {
    Marker,
    PokemonCard,
    HomeBanner,
    StarterGift
  },
  computed: {
    ...mapState(usePokemonStore, [
      'pokemonInExpedition',
      'pokemonNotInExpedition',
      'regionList',
      'claimReward',
      'userDetail'
    ]),
    ...mapWritableState(usePokemonStore, ['pokeList', 'show'])
  },
  data() {
    return {
      orange: '#FDB999',
      yellow: '#FEF08A',
      RegionId: '',
      isDedployed: true
    }
  },
  methods: {
    ...mapActions(usePokemonStore, ['getPokemon', 'startExpedition', 'endExpedition', 'getRegion', 'checkPokemon']),
    capitalLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    async startConfirmation({ RegionId, UserPokemonId, img, name }) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `${this.capitalLetter(name)} going to do expedition`,
        imageUrl: img,
        imageWidth: 400,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Send'
      })
      if (result.isConfirmed) {
        await this.startExpedition({ RegionId, UserPokemonId })
        await Swal.fire({
          title: 'Alright, enjoy the journey!',
          text: `${this.capitalLetter(name)} deployed!`,
          imageUrl: img,
          imageWidth: 400,
          imageHeight: 200
        })
        this.pokeList = !this.pokeList
      }
    },
    async endConfirmation({ id, img, name, time, createdAt }) {
      let isExpedition = time + new Date(createdAt).getTime() > new Date(Date.now()).getTime()
      let text = "You will lose all reward and won't be able to revert this!"
      let colorButton = '#d33'
      let confirmText = 'End'
      if (!isExpedition) {
        text = 'Congratulations, claim and get the reward'
        colorButton = '#71A03F'
        confirmText = 'Claim'
      }
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: text,
        imageUrl: img,
        imageWidth: 400,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonColor: colorButton,
        cancelButtonColor: '#3085d6',
        confirmButtonText: confirmText
      })
      if (result.isConfirmed) {
        await this.endExpedition({ id })
        this.pokeList = !this.pokeList
        await Swal.fire({
          title: 'Alright!',
          text: `${this.capitalLetter(name)} arrived at home safely with +${
            this.claimReward
          } coins.`,
          imageUrl: img,
          imageWidth: 400,
          imageHeight: 200
        })
      }
    }
  },

  async created() {
    await this.checkPokemon()
    this.getPokemon()
    this.getRegion()
    ;(this.show = false), (this.pokeList = true)
  }
}
</script>

<template>
  <StarterGift v-if="!userDetail.UserPokemons.length" />
  <Marker
    @click=";(show = !show), (RegionId = 1)"
    :colorMarker="orange"
    class="absolute top-72 left-1/2"
  />
  <Marker
    @click=";(show = !show), (RegionId = 2)"
    :colorMarker="yellow"
    class="absolute bottom-80 left-96"
  />
  <Transition duration="550" name="nested">

    <div
      v-if="show && this.$route.fullPath === '/'"
      class="outer font-mono absolute top-1/2 left-1/2 transform -translate-x-1/2 rounded-lg bg-white  -translate-y-1/2 h-5/6 w-5/6 justify-center"
    >
      <div class="inner relative shadow-lg bg-slate-100 rounded-md">
        <span v-for="(region, index) in regionList" :key="index">
          <HomeBanner :region="region" v-if="region.id === RegionId" />
        </span>
      </div>

      <!--Pokemon not in expedition-->
      <div v-if="pokeList" class="flex w-full h-5/6 flex-wrap overflow-y-auto">
        <PokemonCard
          @click="
            startConfirmation({
              RegionId,
              UserPokemonId: pokemon.id,
              img: pokemon.image,
              name: pokemon.name
            })
          "
          :RegionId="RegionId"
          :pokemon="pokemon"
          v-for="(pokemon, index) in pokemonNotInExpedition"
          :key="index"
        />
      </div>

      <!--Pokemon in expedition-->
      <div v-if="pokeList === false" class="flex w-full h-5/6 flex-wrap overflow-y-auto">
        <PokemonCard
          :expeditionTime="
            Math.max(
              pokemon.time + new Date(pokemon.createdAt).getTime() - new Date(Date.now()).getTime(),
              0
            )
          "
          :isDeployed="isDedployed"
          @click="
            endConfirmation({
              id: pokemon.id,
              img: pokemon.UserPokemon.image,
              name: pokemon.UserPokemon.name,
              time: pokemon.time,
              createdAt: pokemon.createdAt
            })
          "
          :pokemon="pokemon.UserPokemon"
          v-for="(pokemon, index) in pokemonInExpedition"
          :key="index"
        />
      </div>
    </div>
  </Transition>
</template>

<style>
.outer,
.inner {
  padding: 30px;
  min-height: 100px;
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
