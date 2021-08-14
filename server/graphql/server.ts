import { ApolloServer } from 'apollo-server-express'
import { gql } from 'apollo-server'
import * as auth from './definitions/auth'
import * as group from './definitions/group'
import * as accessory from './definitions/accessory'
import * as scene from './definitions/scene'
import * as loggedIn from './directives/loggedIn'
import { Context } from './context'
import { TradfriClient } from 'node-tradfri-client'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { verify } from './jwt'

const baseTypeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`

const definitions = [auth, accessory, group, scene]
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

export default (tradfriClient: TradfriClient) =>
  new ApolloServer({
    schema,
    context: (expressContext: ExpressContext): Context => {
      const token = expressContext.req.headers['x-token']
      const isLoggedIn = Boolean(token && verify(token.toString()))
      return {
        tradfriClient,
        isLoggedIn,
      }
    },
  })
