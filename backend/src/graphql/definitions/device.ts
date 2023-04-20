import gql from 'graphql-tag'
import type { Device, DeviceSet } from 'dirigera'
import { type Resolvers, ControlType } from '../resolvers.gen'

export const typeDefs = gql`
  extend type Room {
    devices: [Device!]!
  }

  type Device {
    id: String!
    name: String!
    type: ControlType!
  }
`

function getDevicesNotInSet(devices: Device[]) {
  return devices
    .filter((d) => d.deviceSet.length === 0)
    .map((device) => ({
      id: device.id,
      name: device.attributes.customName,
      type: ControlType.Device,
    }))
}

function getDeviceSets(devices: Device[]) {
  const deviceSets = [
    ...devices
      .flatMap((d) => d.deviceSet)
      .reduce((map, item) => {
        if (!map.has(item.id)) {
          map.set(item.id, item)
        }
        return map
      }, new Map<string, DeviceSet>())
      .values(),
  ]

  return deviceSets.map((deviceSet) => ({
    id: deviceSet.id,
    name: deviceSet.name,
    type: ControlType.DeviceSet,
  }))
}

export const resolvers: Resolvers = {
  Room: {
    devices: async ({ id }, _, { dirigeraClient }) => {
      const devices = await dirigeraClient.devices.list()
      const devicesInRoom = devices.filter((device) => device.room?.id === id)

      return [
        ...getDevicesNotInSet(devicesInRoom),
        ...getDeviceSets(devicesInRoom),
      ].sort((a, b) => a.name.localeCompare(b.name))
    },
  },
}
