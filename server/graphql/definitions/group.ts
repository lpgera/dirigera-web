import { gql } from 'apollo-server'
import { Resolvers } from '../resolvers.gen'

export const typeDefs = gql`
  type Group {
    id: Int!
    name: String!
  }
  extend type Query {
    groups: [Group!]!
  }
`

export const resolvers: Resolvers = {
  Group: {
    id: ({ instanceId }) => {
      return instanceId
    },
  },
  Query: {
    groups: (_, __, { tradfriClient }) => {
      return Object.values(tradfriClient.groups).map(({ group }) => group)
    },
  },
}
