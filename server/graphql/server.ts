import { ApolloServer } from 'apollo-server-express'
import { gql } from 'apollo-server'
import * as group from './definitions/group'
import * as accessory from './definitions/accessory'
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

const definitions = [accessory, group]

export default (tradfriClient: TradfriClient) =>
  new ApolloServer({
    typeDefs: [baseTypeDefs, ...definitions.map((d) => d.typeDefs)],
    resolvers: definitions.map((d) => d.resolvers),
    context: (): Context => ({
      tradfriClient,
    }),
  })
