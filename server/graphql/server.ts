import { ApolloServer } from 'apollo-server'
import { gql } from 'apollo-server'
import * as device from './definitions/device'
import { Context } from './context'
import { TradfriClient } from 'node-tradfri-client'

const baseTypeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`

const definitions = [device]

export default (tradfriClient: TradfriClient) =>
  new ApolloServer({
    typeDefs: [baseTypeDefs, ...definitions.map((d) => d.typeDefs)],
    resolvers: definitions.map((d) => d.resolvers),
    context: (): Context => ({
      tradfriClient,
    }),
  })
