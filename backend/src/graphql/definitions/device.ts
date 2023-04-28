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
    colorSaturation: Float
    colorHue: Float
    playback: String
    playbackPauseAvailable: Boolean
    playbackNextAvailable: Boolean
    playbackPreviousAvailable: Boolean
    volume: Int
    playItem: String
    nextPlayItem: String
  }

  extend type Query {
    devicePlayItemImageURL(id: String!): String @loggedIn
  }

  extend type Mutation {
    setIsOn(id: String!, type: ControlType!, isOn: Boolean!): Boolean @loggedIn
    setLightLevel(id: String!, type: ControlType!, lightLevel: Int!): Boolean
      @loggedIn
    setColorTemperature(
      id: String!
      type: ControlType!
      colorTemperature: Int!
    ): Boolean @loggedIn
    setColorHueAndSaturation(
      id: String!
      type: ControlType!
      colorHue: Float!
      colorSaturation: Float!
    ): Boolean @loggedIn
    setPlayback(id: String!, type: ControlType!, playback: String!): Boolean
      @loggedIn
    setVolume(id: String!, type: ControlType!, volume: Int!): Boolean @loggedIn
  }
`

async function getImageAsBase64(url: string | null) {
  if (!url) {
    return null
  }
  const response = await fetch(url)
  const buffer = Buffer.from(await response.arrayBuffer())
  const base64 = buffer.toString('base64')
  const mimeType = response.headers.get('content-type')
  return `data:${mimeType};base64,${base64}`
}

export function getAttributeIfCanReceive(device: Device, attribute: string) {
  return device.capabilities.canReceive.includes(attribute)
    ? device.attributes[attribute]
    : null
}

export function getDevicesNotInSet(devices: Device[]) {
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
        isOn: getAttributeIfCanReceive(device, 'isOn'),
        lightLevel: getAttributeIfCanReceive(device, 'lightLevel'),
        colorTemperature: getAttributeIfCanReceive(device, 'colorTemperature'),
        colorSaturation: getAttributeIfCanReceive(device, 'colorSaturation'),
        colorHue: getAttributeIfCanReceive(device, 'colorHue'),
        playback: getAttributeIfCanReceive(device, 'playback'),
        playbackPauseAvailable:
          device.attributes.playbackAvailableActions?.pause,
        playbackNextAvailable:
          device.attributes.playbackAvailableActions?.playbackNext,
        playbackPreviousAvailable:
          device.attributes.playbackAvailableActions?.playbackPrev,
        volume: getAttributeIfCanReceive(device, 'volume'),
        playItem: playItem ? `${playItem.artist} - ${playItem.title}` : null,
        nextPlayItem: nextPlayItem
          ? `${nextPlayItem.artist} - ${nextPlayItem.title}`
          : null,
      }
    })
}

export function getDeviceSets(devices: Device[]) {
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
      playbackPauseAvailable:
        devicesInSet[0]?.attributes?.playbackAvailableActions?.pause,
      playbackNextAvailable:
        devicesInSet[0]?.attributes?.playbackAvailableActions?.playbackNext,
      playbackPreviousAvailable:
        devicesInSet[0]?.attributes?.playbackAvailableActions?.playbackPrev,
      volume: devicesInSet[0]?.attributes?.volume,
      playItem: playItem ? `${playItem?.artist} - ${playItem?.title}` : null,
      nextPlayItem: nextPlayItem
        ? `${nextPlayItem?.artist} - ${nextPlayItem?.title}`
        : null,
    }
  })
}

const hasControl = (d: {
  isOn: boolean | null
  lightLevel: number | null
  colorTemperature: number | null
  colorSaturation: number | null
  colorHue: number | null
  playback: string | null
  volume: number | null
}) =>
  d.isOn !== null ||
  d.lightLevel !== null ||
  d.colorTemperature !== null ||
  d.colorSaturation !== null ||
  d.colorHue !== null ||
  d.playback !== null ||
  d.volume !== null

export const resolvers: Resolvers = {
  Room: {
    devices: async ({ id }, _, { dirigeraClient }) => {
      const devices = await dirigeraClient.devices.list()
      const devicesInRoom = devices.filter((device) => device.room?.id === id)

      return [
        ...getDevicesNotInSet(devicesInRoom),
        ...getDeviceSets(devicesInRoom),
      ]
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => Number(hasControl(b)) - Number(hasControl(a)))
    },
  },
  Query: {
    devicePlayItemImageURL: async (_, { id }, { dirigeraClient }) => {
      const device = await dirigeraClient.devices.get({ id })
      return getImageAsBase64(
        device.attributes.playbackAudio?.playItem?.imageURL
      )
    },
  },
  Mutation: {
    setIsOn: async (_, { id, type, isOn }, { dirigeraClient }) => {
      if (type === ControlType.Device) {
        await dirigeraClient.devices.setAttributes({ id, attributes: { isOn } })
      } else {
        await dirigeraClient.deviceSets.setAttributes({
          id,
          attributes: { isOn },
        })
      }
      return true
    },
    setLightLevel: async (_, { id, type, lightLevel }, { dirigeraClient }) => {
      if (type === ControlType.Device) {
        await dirigeraClient.devices.setAttributes({
          id,
          attributes: { lightLevel },
        })
      } else {
        await dirigeraClient.deviceSets.setAttributes({
          id,
          attributes: { lightLevel },
        })
      }
      return true
    },
    setColorTemperature: async (
      _,
      { id, type, colorTemperature },
      { dirigeraClient }
    ) => {
      if (type === ControlType.Device) {
        await dirigeraClient.devices.setAttributes({
          id,
          attributes: { colorTemperature },
        })
      } else {
        await dirigeraClient.deviceSets.setAttributes({
          id,
          attributes: { colorTemperature },
        })
      }
      return true
    },
    setColorHueAndSaturation: async (
      _,
      { id, type, colorHue, colorSaturation },
      { dirigeraClient }
    ) => {
      if (type === ControlType.Device) {
        await dirigeraClient.devices.setAttributes({
          id,
          attributes: { colorHue, colorSaturation },
        })
      } else {
        await dirigeraClient.deviceSets.setAttributes({
          id,
          attributes: { colorHue, colorSaturation },
        })
      }
      return true
    },
    setPlayback: async (_, { id, type, playback }, { dirigeraClient }) => {
      if (type === ControlType.Device) {
        await dirigeraClient.devices.setAttributes({
          id,
          attributes: { playback },
        })
      } else {
        await dirigeraClient.deviceSets.setAttributes({
          id,
          attributes: { playback },
        })
      }
      return true
    },
    setVolume: async (_, { id, type, volume }, { dirigeraClient }) => {
      if (type === ControlType.Device) {
        await dirigeraClient.devices.setAttributes({
          id,
          attributes: { volume },
        })
      } else {
        await dirigeraClient.deviceSets.setAttributes({
          id,
          attributes: { volume },
        })
      }
      return true
    },
  },
}
