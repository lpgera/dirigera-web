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

  extend type Mutation {
    groupOnOff(id: Int!, onOff: Boolean!): String
    groupDimmer(id: Int!, dimmer: Float!): String
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
  Mutation: {
    groupOnOff: async (_, { id, onOff }, { tradfriClient }) => {
      const { group } = tradfriClient.groups[id]
      await tradfriClient.operateGroup(group, {
        onOff,
      })
      return null
    },
    groupDimmer: async (_, { id, dimmer }, { tradfriClient }) => {
      const { group } = tradfriClient.groups[id]
      await tradfriClient.operateGroup(group, {
        dimmer,
        transitionTime: dimmer > 0 ? 2 : undefined,
        onOff: dimmer > 0,
      })
      return null
    },
  },
}
