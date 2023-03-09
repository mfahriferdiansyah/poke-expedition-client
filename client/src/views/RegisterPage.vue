<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { usePokemonStore } from '../stores/pokemon'

export default {
  computed: {
    ...mapWritableState(usePokemonStore, ['regAddress', 'regEmail', 'regPassword', 'regPhone', 'regUsername'])
  },
  methods: {
    ...mapActions(usePokemonStore, ['registerHandler'])
  },
}
</script>

<template>
  <div class="h-[calc(100vh-10vh)]">
    <div class="h-full flex justify-center items-center">
      <section id="login" class="flex relative items-center justify-center">
        <div
          class="outer flex max-w-3xl items-center rounded-2xl bg-slate-100 bg-opacity-95 p-5 shadow-lg h-full border"
        >
          <div
            class="flex inner bg-white relative flex-col align-top md:w-1/2 px-8 md:px-16 gap-5 flex-1 h-full justify-between"
          >
          <img
              class="absolute h-28 -top-20 -left-10"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
            />
            <div class="flex flex-col gap-5">
              <h1 class="text-3xl font-bold justify-self-end">Register</h1>
              <p>Start your jorney with us</p>
            </div>
            <form   
            @submit.prevent="registerHandler"
            id="form-register" action="" method="POST" class="flex flex-col gap-4">
              <input
              v-model="regUsername"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                class="p-2 rounded-lg shadow-md"
              />
              <input
              v-model="regEmail"
                type="text"
                name="email"
                placeholder="Email"
                class="p-2 rounded-lg shadow-md"
              />
              <input
              v-model="regPassword"
                type="password"
                name="password"
                placeholder="Password"
                class="p-2 rounded-lg shadow-md"
              />
              <input
              v-model="regPhone"
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number"
                class="p-2 rounded-lg shadow-md"
              />
              <input
              v-model="regAddress"
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                class="p-2 rounded-lg shadow-md"
              />
              <button class="p-2 rounded-full bg-orange-500 text-white hover:bg-opacity-80">
                Register
              </button>
            </form>
            <div class="flex items-baseline gap-2 justify-center">
              <p class="text-start text-sm text-slate-500 font-semibold">
                Already have an account ?
              </p>
              <router-link to="/login" class="text-slate-600 cursor-pointer underline text-sm">Login</router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style>
.side-picture{
    width: 360px;
    height: 500px;
}
</style>