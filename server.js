import { ApolloServer, gql } from 'apollo-server'

import PokemonApi from './PokemonApi';

const typeDefs = gql`
  # Comments in GraphQL
  type Pokemon {
      name: String,
      abilities: [Ability]
  }
  
  type Ability {
      name: String,
      url: String,      
  }
  
  type Query {
      getPokemonList: [Pokemon],
      getPokemon(id: Int): Pokemon
  }
`

const pokemonApi = new PokemonApi()

const resolvers = {
  Query: {
    getPokemonList: async (_source) => {
      return pokemonApi.getPokemon()
    },
    getPokemon: async (_source, { id }) => {
      return pokemonApi.getPokemon(id)
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`)
})