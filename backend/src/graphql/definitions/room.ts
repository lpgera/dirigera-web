import { gql } from 'apollo-server'
import { QuickControlType, type Resolvers } from '../resolvers.gen'
import type { Device, DeviceSet } from 'dirigera'

export const typeDefs = gql`
  type Room {
    id: String!
    name: String!
    quickControls: [QuickControl!]!
  }

  type QuickControl {
    id: String!
    name: String!
    isReachable: Boolean!
    isOn: Boolean!
    type: QuickControlType!
  }

  enum QuickControlType {
    DEVICE
    DEVICE_SET
  }

  extend type Query {
    rooms: [Room!]! @loggedIn
  }

  extend type Mutation {
    quickControl(
      id: String!
      type: QuickControlType!
      isOn: Boolean!
    ): Boolean! @loggedIn
  }
`

function getDeviceQuickControls(devices: Device[], roomId: string) {
  return devices
    .filter(
      (device) =>
        device.room?.id === roomId &&
        device.capabilities.canReceive.includes('isOn') &&
        device.deviceSet.length === 0
    )
    .map((device) => ({
      id: device.id,
      name: device.attributes.customName,
      isReachable: device.isReachable,
      isOn: device.attributes.isOn,
      type: QuickControlType.Device,
    }))
}

function getDeviceSetQuickControls(devices: Device[], roomId: string) {
  const deviceSets = [
    ...devices
      .filter((d) => d.room?.id === roomId)
      .flatMap((d) => d.deviceSet)
      .reduce((map, item) => {
        if (!map.has(item.id)) {
          map.set(item.id, item)
        }
        return map
      }, new Map<string, DeviceSet>())
      .values(),
  ]

  return deviceSets.map((deviceSet) => {
    const devicesInSet = devices.filter((d) =>
      d.deviceSet.some((ds) => ds.id === deviceSet.id)
    )
    return {
      id: deviceSet.id,
      name: deviceSet.name,
      isReachable: devicesInSet.every((d) => d.isReachable),
      isOn: devicesInSet.some((d) => d.attributes.isOn),
      type: QuickControlType.DeviceSet,
    }
  })
}

export const resolvers: Resolvers = {
  Query: {
    rooms: async (_, __, { dirigeraClient }) => {
      const home = await dirigeraClient.home()

      const rooms = await dirigeraClient.rooms.list()

      return rooms
        .map(({ id, name }) => ({
          id,
          name,
          quickControls: [
            ...getDeviceQuickControls(home.devices, id),
            ...getDeviceSetQuickControls(home.devices, id),
          ].sort((a, b) => a.name.localeCompare(b.name)),
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
    },
  },
  Mutation: {
    quickControl: async (_, { id, type, isOn }, { dirigeraClient }) => {
      if (type === QuickControlType.DeviceSet) {
        await dirigeraClient.deviceSets.setIsOn({ id, isOn })
      }
      if (type === QuickControlType.Device) {
        await dirigeraClient.devices.setAttributes({ id, attributes: { isOn } })
      }
      return isOn
    },
  },
}
