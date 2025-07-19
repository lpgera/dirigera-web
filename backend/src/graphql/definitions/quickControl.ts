import { gql } from 'graphql-tag'
import type { Device, DeviceSet } from 'dirigera'
import type { ControlType, Resolvers } from '../resolvers.gen.ts'

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
      playback: Playback
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
      type: 'DEVICE' as ControlType,
      isReachable: device.isReachable,
      isOn: device.attributes.isOn,
      playback: device.attributes.playback,
    }))
}

export function getDeviceSetQuickControls(devices: Device[], roomId: string) {
  const deviceSets = [
    ...devices
      .filter(
        (d) =>
          d.room?.id === roomId &&
          (d.capabilities.canReceive.includes('isOn') ||
            d.capabilities.canReceive.includes('playback'))
      )
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
      type: 'DEVICE_SET' as ControlType,
      isReachable: devicesInSet.every((d) => d.isReachable),
      isOn: devicesInSet.some((d) => d.attributes.isOn),
      playback: devicesInSet.find((d) => d.attributes.playback)?.attributes
        .playback,
    }
  })
}

export const resolvers: Resolvers = {
  Room: {
    quickControls: async ({ id }, _, { homeState: { devices } }) => {
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
      if (type === 'DEVICE_SET') {
        await dirigeraClient.deviceSets.setAttributes({
          id,
          attributes: {
            isOn: isOn != null ? isOn : undefined,
            playback: playback != null ? playback : undefined,
          },
        })
      }
      if (type === 'DEVICE') {
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
