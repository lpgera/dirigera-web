import { ApolloServer } from 'apollo-server-express'
import { gql } from 'apollo-server'
import { makeExecutableSchema } from '@graphql-tools/schema'
import type { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import type { DirigeraClient } from 'dirigera'
import * as loggedIn from './directives/loggedIn'
import * as auth from './definitions/auth'
import * as scene from './definitions/scene'
import * as room from './definitions/room'
import type { Context } from './context'
import { verify } from '../jwt'

const baseTypeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`

const definitions = [auth, scene, room]
const directives = [loggedIn]

const schema = loggedIn.loggedInDirectiveTransformer(
  makeExecutableSchema({
    typeDefs: [
      baseTypeDefs,
      ...definitions.map((d) => d.typeDefs),
      ...directives.map((d) => d.type),
    ],
    resolvers: definitions.map((d) => d.resolvers),
  })
)

export default (dirigeraClient: DirigeraClient) =>
  new ApolloServer({
    schema,
    context: (expressContext: ExpressContext): Context => {
      const token = expressContext.req.headers['x-token']
      const isLoggedIn = Boolean(token && verify(token.toString()))
      return {
        dirigeraClient,
        isLoggedIn,
      }
    },
  })
