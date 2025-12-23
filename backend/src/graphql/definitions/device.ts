import { gql } from 'graphql-tag'
import type { Device, DeviceSet } from 'dirigera'
import type { Resolvers, ControlType } from '../resolvers.gen.ts'

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
    playback: Playback
    playbackPauseAvailable: Boolean
    playbackNextAvailable: Boolean
    playbackPreviousAvailable: Boolean
    volume: Int
    playItem: String
    nextPlayItem: String
    temperature: Float
    humidity: Float
    pm25: Int
    vocIndex: Int
    co2: Int
    isOpen: Boolean
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
    setPlayback(id: String!, type: ControlType!, playback: Playback!): Boolean
      @loggedIn
    setVolume(id: String!, type: ControlType!, volume: Int!): Boolean @loggedIn
  }
`

async function getImageAsBase64(url: string | null | undefined) {
  if (!url) {
    return null
  }
  const response = await fetch(url)
  const buffer = Buffer.from(await response.arrayBuffer())
  const base64 = buffer.toString('base64')
  const mimeType = response.headers.get('content-type')
  return `data:${mimeType};base64,${base64}`
}

export function getAttributeIfCanReceive<T extends keyof Device['attributes']>(
  device: Device,
  attribute: T
) {
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
        type: 'DEVICE' as ControlType,
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
        temperature: device.attributes.currentTemperature,
        humidity: device.attributes.currentRH,
        pm25: device.attributes.currentPM25,
        vocIndex: device.attributes.vocIndex,
        co2: device.attributes.currentCO2,
        isOpen: device.attributes.isOpen,
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
      type: 'DEVICE_SET' as ControlType,
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
      temperature: devicesInSet[0]?.attributes?.currentTemperature,
      humidity: devicesInSet[0]?.attributes?.currentRH,
      pm25: devicesInSet[0]?.attributes?.currentPM25,
      vocIndex: devicesInSet[0]?.attributes.vocIndex,
      isOpen: devicesInSet[0]?.attributes.isOpen,
    }
  })
}

const hasControl = (d: {
  isOn: boolean | null | undefined
  lightLevel: number | null | undefined
  colorTemperature: number | null | undefined
  colorSaturation: number | null | undefined
  colorHue: number | null | undefined
  playback: string | null | undefined
  volume: number | null | undefined
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
    devices: async ({ id }, _, { homeState: { devices } }) => {
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
    devicePlayItemImageURL: async (_, { id }, { homeState: { devices } }) => {
      const device = devices.find((d) => d.id === id)

      if (!device) {
        return null
      }

      return getImageAsBase64(
        device.attributes.playbackAudio?.playItem?.imageURL
      )
    },
  },
  Mutation: {
    setIsOn: async (_, { id, type, isOn }, { dirigeraClient }) => {
      if (type === 'DEVICE') {
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
      if (type === 'DEVICE') {
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
      if (type === 'DEVICE') {
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
      if (type === 'DEVICE') {
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
      if (type === 'DEVICE') {
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
      if (type === 'DEVICE') {
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
