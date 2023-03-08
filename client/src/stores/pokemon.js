import { defineStore } from 'pinia'
import axios from 'axios'
const baseUrl = "http://localhost:3000";


export const usePokemonStore = defineStore('pokemon', {
    state: () => (
        {
            access_token: localStorage.access_token || '',
            pokemonInExpedition: '',
            pokemonNotInExpedition: '',
            regionList: '',
            pokeList: true,
            show: false,
            claimReward: '',
            gachaReward: '',
            waitingAnimation: false,
            loginEmail: '',
            loginPassword: '',
        }
    ),
    actions: {
        async getPokemon() {
            await axios({
                url: baseUrl + '/pokemons',
                method: 'GET',
                headers: {
                    access_token: this.access_token
                }
            })
                .then(({ data }) => {
                    console.log(data)
                    this.pokemonInExpedition = data.pokemonInExpedition
                    this.pokemonNotInExpedition = data.pokemonNotInExpedition
                })
                .catch(response => {
                    this.errorHandler(response)
                })
        },
        async startExpedition({ RegionId, UserPokemonId }) {
            await axios({
                url: baseUrl + '/explorations/' + RegionId,
                method: 'POST',
                headers: {
                    access_token: this.access_token
                },
                data: {
                    UserPokemonId: UserPokemonId
                }
            })
                .then(({ data }) => {
                    console.log(data)
                    this.getPokemon()
                })
                .catch(response => {
                    this.errorHandler(response)
                })
        },
        async endExpedition({ id }) {
            await axios({
                url: baseUrl + '/explorations/' + id,
                method: 'DELETE',
                headers: {
                    access_token: this.access_token
                }
            })
                .then(({ data }) => {
                    console.log(data)
                    this.claimReward = data.reward
                    this.getPokemon()
                })
                .catch(response => {
                    this.errorHandler(response)
                })
        },
        async getRegion() {
            await axios({
                url: baseUrl + '/regions',
                method: 'GET',
                headers: {
                    access_token: this.access_token
                }
            })
                .then(({ data }) => {
                    this.regionList = data
                })
                .catch(response => {
                    this.errorHandler(response)
                })
        },
        async midtransGacha() {
            await axios({
                url: baseUrl + '/midtrans-get-token',
                method: 'POST',
                headers: {
                    access_token: this.access_token
                }
            })
                .then(({ data }) => {
                    console.log(data)
                    const gachaCb = this.gachaPrize
                    window.snap.pay(data.token, {
                        onSuccess: function (result) {
                            gachaCb()
                        }
                    })
                })
                .catch(response => {
                    this.errorHandler(response)
                })
        },
        async gachaPrize() {
            this.waitingAnimation = true
            await axios({
                url: baseUrl + '/pokemons/2',
                method: 'POST',
                headers: {
                    access_token: this.access_token
                }
            })
                .then(({ data }) => {
                    console.log(data)
                    Swal.fire({
                        title: 'Alright!',
                        text: `${data.userPokemon.name.charAt(0).toUpperCase() + data.userPokemon.name.slice(1)} captured!`,
                        imageUrl: data.userPokemon.image,
                        imageWidth: 400,
                        imageHeight: 200
                    })
                    this.waitingAnimation = false
                })
                .catch(response => {
                    this.errorHandler(response)
                })
        },
        async loginHandler() {
            await axios({
                url: baseUrl + '/login',
                method: 'POST',
                data: {
                    email: this.loginEmail, password: this.loginPassword
                }
            })
                .then(({ data }) => {
                    console.log(data)
                    localStorage.access_token = data.access_token
                    this.access_token = data.access_token
                    this.router.push('/')
                })
                .catch(response => {
                    this.errorHandler(response)
                })
        },
        async logoutHandler() {
            localStorage.clear()
            this.access_token = ''
            this.loginEmail= ''
            this.loginPassword= ''
            this.router.push('/login')
        },
        errorHandler(error) {
            console.log(error)
            console.log(error.response.data.message)
            let {message} = error.response.data
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: message
              })
        }
    },
})