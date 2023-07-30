import gql from 'graphql-tag'
import type { Server } from 'http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import * as loggedIn from './directives/loggedIn'
import * as auth from './definitions/auth'
import * as scene from './definitions/scene'
import * as room from './definitions/room'
import * as controlType from './definitions/controlType'
import * as quickControl from './definitions/quickControl'
import * as device from './definitions/device'
import * as playback from './definitions/playback'
import type { Context } from './context'

const baseTypeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`

const definitions = [
  auth,
  scene,
  room,
  controlType,
  quickControl,
  device,
  playback,
]
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

export const apolloServer = (httpServer: Server) =>
  new ApolloServer<Context>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
