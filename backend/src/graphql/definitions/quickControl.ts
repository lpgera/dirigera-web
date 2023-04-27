import gql from 'graphql-tag'
import type { Device, DeviceSet } from 'dirigera'
import { ControlType, type Resolvers } from '../resolvers.gen'

export const typeDefs = gql`
  extend type Room {
    quickControls: [QuickControl!]!
  }

  type QuickControl {
    id: String!
    name: String!
    type: ControlType!
    isReachable: Boolean!
    isOn: Boolean
    playback: String
  }

  extend type Mutation {
    quickControl(
      id: String!
      type: ControlType!
      isOn: Boolean
      playback: String
    ): Boolean @loggedIn
  }
`

export function getDeviceQuickControls(devices: Device[], roomId: string) {
  return devices
    .filter(
      (device) =>
        device.room?.id === roomId &&
        (device.capabilities.canReceive.includes('isOn') ||
          device.capabilities.canReceive.includes('playback')) &&
        device.deviceSet.length === 0
    )
    .map((device) => ({
      id: device.id,
      name: device.attributes.customName,
      type: ControlType.Device,
      isReachable: device.isReachable,
      isOn: device.attributes.isOn,
      playback: device.attributes.playback,
    }))
}

export function getDeviceSetQuickControls(devices: Device[], roomId: string) {
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
      type: ControlType.DeviceSet,
      isReachable: devicesInSet.every((d) => d.isReachable),
      isOn: devicesInSet.some((d) => d.attributes.isOn),
      playback: devicesInSet.find((d) => d.attributes.playback)?.attributes
        .playback,
    }
  })
}

export const resolvers: Resolvers = {
  Room: {
    quickControls: async ({ id }, _, { dirigeraClient }) => {
      const devices = await dirigeraClient.devices.list()
      return [
        ...getDeviceQuickControls(devices, id),
        ...getDeviceSetQuickControls(devices, id),
      ].sort((a, b) => a.name.localeCompare(b.name))
    },
  },
  Mutation: {
    quickControl: async (
      _,
      { id, type, isOn, playback },
      { dirigeraClient }
    ) => {
      if (type === ControlType.DeviceSet) {
        await dirigeraClient.deviceSets.setAttributes({
          id,
          attributes: {
            isOn: isOn != null ? isOn : undefined,
            playback: playback != null ? playback : undefined,
          },
        })
      }
      if (type === ControlType.Device) {
        await dirigeraClient.devices.setAttributes({
          id,
          attributes: {
            isOn: isOn != null ? isOn : undefined,
            playback: playback != null ? playback : undefined,
          },
        })
      }
      return null
    },
  },
}
