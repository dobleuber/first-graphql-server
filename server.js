import { ApolloServer, gql } from 'apollo-server'

const books = [
  {
    title: 'Harry potter and the chambers of secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
]

const typeDefs = gql`
  # Comments in GraphQL
  type Book {
    title: String,
    author: String
  }
  
  type Query {
    books: [Book]
  }
`

const resolvers = {
  Query: {
    books: () => books
  }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`)
})