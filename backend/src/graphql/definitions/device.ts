import gql from 'graphql-tag'
import type { Resolvers } from '../resolvers.gen'

export const typeDefs = gql`
  extend type Room {
    devices: [Device!]!
  }

  type Device {
    id: String!
    name: String!
  }
`

export const resolvers: Resolvers = {
  Room: {
    devices: async ({ id }, _, { dirigeraClient }) => {
      const devices = await dirigeraClient.devices.list()

      return devices
        .filter((device) => device.room?.id === id)
        .map((device) => ({
          id: device.id,
          name: device.attributes.customName,
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
    },
  },
}
