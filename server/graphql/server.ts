import { ApolloServer } from 'apollo-server-express'
import { gql } from 'apollo-server'
import * as auth from './definitions/auth'
import * as group from './definitions/group'
import * as accessory from './definitions/accessory'
import * as loggedIn from './directives/loggedIn'
import { Context } from './context'
import { TradfriClient } from 'node-tradfri-client'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { verify } from './jwt'

const baseTypeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`

const definitions = [auth, accessory, group]
const directives = [loggedIn]

export default (tradfriClient: TradfriClient) =>
  new ApolloServer({
    typeDefs: [
      baseTypeDefs,
      ...definitions.map((d) => d.typeDefs),
      ...directives.map((d) => d.type),
    ],
    resolvers: definitions.map((d) => d.resolvers),
    schemaDirectives: {
      loggedIn: loggedIn.LoggedInDirective,
    },
    context: (expressContext: ExpressContext): Context => {
      const token = expressContext.req.headers['x-token']
      const isLoggedIn = Boolean(token && verify(token.toString()))
      return {
        tradfriClient,
        isLoggedIn,
      }
    },
  })
