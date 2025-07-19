import { gql } from 'graphql-tag'
import type { Server } from 'http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import * as loggedIn from './directives/loggedIn.ts'
import * as auth from './definitions/auth.ts'
import * as scene from './definitions/scene.ts'
import * as room from './definitions/room.ts'
import * as controlType from './definitions/controlType.ts'
import * as quickControl from './definitions/quickControl.ts'
import * as device from './definitions/device.ts'
import * as playback from './definitions/playback.ts'
import type { Context } from './context.ts'

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
