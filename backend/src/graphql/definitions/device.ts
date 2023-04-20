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
    isReachable: Boolean!
    batteryPercentage: Int
    isOn: Boolean
    lightLevel: Int
    colorTemperature: Int
    colorSaturation: Int
    colorHue: Int
    playback: String
    volume: Int
    playItem: String
    playItemImageURL: String
    nextPlayItem: String
  }
`

function getDevicesNotInSet(devices: Device[]) {
  return devices
    .filter((d) => d.deviceSet.length === 0)
    .map((device) => {
      const playItem = device.attributes.playbackAudio?.playItem
      const nextPlayItem = device.attributes.playbackAudio?.nextPlayItem

      return {
        id: device.id,
        name: device.attributes.customName,
        type: ControlType.Device,
        isReachable: device.isReachable,
        batteryPercentage: device.attributes.batteryPercentage,
        isOn: device.attributes.isOn,
        lightLevel: device.attributes.lightLevel,
        colorTemperature: device.attributes.colorTemperature,
        colorSaturation: device.attributes.colorSaturation,
        colorHue: device.attributes.colorHue,
        playback: device.attributes.playback,
        volume: device.attributes.volume,
        playItem: playItem ? `${playItem.artist} - ${playItem.title}` : null,
        playItemImageURL: playItem?.imageURL,
        nextPlayItem: nextPlayItem
          ? `${nextPlayItem.artist} - ${nextPlayItem.title}`
          : null,
      }
    })
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

  return deviceSets.map((deviceSet) => {
    const devicesInSet = devices.filter((d) =>
      d.deviceSet.some((ds) => ds.id === deviceSet.id)
    )

    const playItem = devicesInSet[0]?.attributes?.playbackAudio?.playItem
    const nextPlayItem =
      devicesInSet[0]?.attributes?.playbackAudio?.nextPlayItem

    return {
      id: deviceSet.id,
      name: deviceSet.name,
      type: ControlType.DeviceSet,
      isReachable: devicesInSet.every((d) => d.isReachable),
      batteryPercentage: devicesInSet[0]?.attributes?.batteryPercentage,
      isOn: devicesInSet.some((d) => d.attributes.isOn),
      lightLevel: devicesInSet[0]?.attributes?.lightLevel,
      colorTemperature: devicesInSet[0]?.attributes?.colorTemperature,
      colorSaturation: devicesInSet[0]?.attributes?.colorSaturation,
      colorHue: devicesInSet[0]?.attributes?.colorHue,
      playback: devicesInSet[0]?.attributes?.playback,
      volume: devicesInSet[0]?.attributes?.volume,
      playItem: playItem ? `${playItem?.artist} - ${playItem?.title}` : '',
      playItemImageURL: playItem?.imageURL,
      nextPlayItem: nextPlayItem
        ? `${nextPlayItem?.artist} - ${nextPlayItem?.title}`
        : '',
    }
  })
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
