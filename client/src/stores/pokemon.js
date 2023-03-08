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
            waitingAnimation: false
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
                    console.log(response)
                    console.log(response.response.data.message)
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
                    console.log(response)
                    console.log(response.response.data.message)
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
                    console.log(response)
                    console.log(response.response.data.message)
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
                    console.log(response)
                    console.log(response.response.data.message)
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
                .then(({data}) => {
                    console.log(data)
                    const gachaCb = this.gachaPrize
                    window.snap.pay(data.token, {
                        onSuccess: function(result){
                          /* You may add your own implementation here */
                          
                            gachaCb()
                        },
                        // onPending: function(result){
                        //   /* You may add your own implementation here */
                        //   alert("wating your payment!"); console.log(result);
                        // },
                        // onError: function(result){
                        //   /* You may add your own implementation here */
                        //   alert("payment failed!"); console.log(result);
                        // },
                        // onClose: function(){
                        //   /* You may add your own implementation here */
                        //   alert('you closed the popup without finishing the payment');
                        // }
                      })
                })
                .catch(response => {
                    console.log(response)
                    console.log(response.response.data.message)
                })
        },
        async gachaPrize(){
            this.waitingAnimation = true
            await axios({
                url: baseUrl + '/pokemons/2',
                method: 'POST',
                headers: {
                    access_token: this.access_token
                }
            })
                .then(({data}) => {
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
                    console.log(response)
                    console.log(response.response.data.message)
                })
        }
    },
})