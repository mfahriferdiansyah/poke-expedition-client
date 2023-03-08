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
            regUsername: '',
            regEmail: '',
            regPassword: '',
            regPhone: '',
            regAddress: '',
            userDetail: '',
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
        async checkPokemon(){
            await axios({
                url: baseUrl + '/explorations',
                method: 'GET',
                headers: {
                    access_token: this.access_token
                }
            })
                .then(({data}) => {
                    this.userDetail = data
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
                    this.alertHandler('success', 'Expedition started')
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
                    this.alertHandler('success', 'Expedition ended')
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
                    const alertHandler = this.alertHandler
                    window.snap.pay(data.token, {
                        onSuccess: function (result) {
                            alertHandler('success', 'Pokemon arrived soon')
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
                    this.alertHandler('success', 'Login success')
                    this.router.push('/')
                })
                .catch(response => {
                    this.errorHandler(response)
                })
        },
        async registerHandler() {
            await axios({
                url: baseUrl + '/register',
                method: 'POST',
                data: {
                    username: this.regUsername,
                    email: this.regEmail,
                    password: this.regPassword,
                    phoneNumber: this.regPhone,
                    address: this.regAddress
                }
            })
                .then(({ data }) => {
                    console.log(data)
                    this.loginEmail = this.regEmail
                    this.loginPassword = this.regPassword
                    this.alertHandler('success', 'Register success')
                    this.loginHandler()
                })
                .catch(response => {
                    this.errorHandler(response)
                })
        },
        async logoutHandler() {
            localStorage.clear()
            this.access_token = ''
            this.loginEmail = ''
            this.loginPassword = ''
            this.regAddress = '',
            this.regEmail = '',
            this.regPhone = '',
            this.regPassword = '',
            this.router.push('/login')
            this.alertHandler('success', 'Logout success')
        },
        errorHandler(error) {
            console.log(error)
            console.log(error.response.data.message)
            let { message } = error.response.data
            if(message === 'Wrong login credential') {
                this.logoutHandler()
            }
            this.alertHandler('error', message)
        },
        alertHandler(sign, message) {
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
                icon: sign,
                title: message
            })
        },

    },
})