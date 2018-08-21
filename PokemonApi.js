

import 'isomorphic-fetch'

export default class PokemonApi {
  constructor() {
    this.baseURL = 'http://pokeapi.co/api/v2/'
  }

  async getPokemon(id = '') {
    const url = `${this.baseURL}pokemon/${id}`
    console.log(url)
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        if (id) {
          data.abilities = data.abilities.map((a) => {
            const { name, url } = a.ability
            return { name, url }
          })
        }
        return id ? data : data.results
      })
  }
}