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
        }
    },
})