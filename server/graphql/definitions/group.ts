import { gql } from 'apollo-server'
import { AccessoryTypes } from 'node-tradfri-client'
import { Resolvers } from '../resolvers.gen'

export const typeDefs = gql`
  type Group {
    id: Int!
    name: String!
  }

  extend type Query {
    groups: [Group!]! @loggedIn
  }

  extend type Mutation {
    groupOnOff(id: Int!, onOff: Boolean!): String @loggedIn
    groupDimmer(id: Int!, dimmer: Float!): String @loggedIn
    groupColorTemperature(id: Int!, colorTemperature: Float!): String @loggedIn
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
      return Object.values(tradfriClient.groups)
        .map(({ group }) => group)
        .filter((group) => group.name !== 'SuperGroup')
    },
  },
  Mutation: {
    groupOnOff: async (_, { id, onOff }, { tradfriClient }) => {
      const { group } = tradfriClient.groups[id]
      await tradfriClient.operateGroup(
        group,
        {
          onOff,
        },
        true
      )
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
    groupColorTemperature: async (
      _,
      { id, colorTemperature },
      { tradfriClient }
    ) => {
      const {
        group: { deviceIDs },
      } = tradfriClient.groups[id]
      await Promise.all(
        deviceIDs.map(async (deviceID) => {
          const device = tradfriClient.devices[deviceID]
          if (device.type === AccessoryTypes.lightbulb) {
            await tradfriClient.operateLight(device, {
              colorTemperature,
            })
          }
        })
      )
      return null
    },
  },
}
