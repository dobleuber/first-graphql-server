import { ApolloServer, gql } from 'apollo-server'
import mongoose from 'mongoose'

const typeDefs = gql`
  type User {
    _id: String!
    username: String!
    firstName: String!
    lastName: String!
  }
  
  type Query {
    allUsers: [User!]!
  }
  
  type Mutation {
    createUser(userName: String!, firstName: String, lastName: String!): User!
  }
`

mongoose.connect('mongodb://localhost/test');

const User = mongoose.model('users', { username: String, firstName: String, lastName: String})

const resolvers = {
  Query: {
    allUsers: async (parent, args, { User }) => {
      const users = await User.find()
      return users.map(u => {
        u._id = u._id.toString()
        return u;
      })
    }
  },
  Mutation: {
    createUser: async (parent, args, { User }) => {
      const usr = await new User(args).save()
      usr._id = usr._id.toString()
      return usr;
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers, context: { User }})

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`)
})