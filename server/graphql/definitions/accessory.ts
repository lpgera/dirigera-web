import { gql } from 'apollo-server'
import { AccessoryTypes } from 'node-tradfri-client'
import { Resolvers } from '../resolvers.gen'

export const typeDefs = gql`
  enum AccessoryType {
    REMOTE
    SLAVE_REMOTE
    LIGHTBULB
    PLUG
    MOTION_SENSOR
    SIGNAL_REPEATER
    BLIND
    SOUND_REMOTE
    AIR_PURIFIER
  }

  type Accessory {
    id: Int!
    name: String!
    type: AccessoryType!
    alive: Boolean!
    battery: Int
    onOff: Boolean
    dimmer: Float
    colorTemperature: Float
    hue: Float
    saturation: Float
  }

  extend type Group {
    accessories: [Accessory!]!
  }

  extend type Mutation {
    accessoryOnOff(id: Int!, onOff: Boolean!): String @loggedIn
    accessoryDimmer(id: Int!, dimmer: Float!): String @loggedIn
    accessoryColorTemperature(id: Int!, colorTemperature: Float!): String
      @loggedIn
    accessoryHue(id: Int!, hue: Float!): String
    accessorySaturation(id: Int!, saturation: Float!): String
  }
`

export const resolvers: Resolvers = {
  AccessoryType: {
    REMOTE: AccessoryTypes.remote,
    SLAVE_REMOTE: AccessoryTypes.slaveRemote,
    LIGHTBULB: AccessoryTypes.lightbulb,
    PLUG: AccessoryTypes.plug,
    MOTION_SENSOR: AccessoryTypes.motionSensor,
    SIGNAL_REPEATER: AccessoryTypes.signalRepeater,
    BLIND: AccessoryTypes.blind,
    SOUND_REMOTE: AccessoryTypes.soundRemote,
    AIR_PURIFIER: AccessoryTypes.airPurifier,
  },
  Accessory: {
    id: ({ instanceId }) => {
      return instanceId
    },
    battery: ({ deviceInfo: { battery } }) => {
      return battery
    },
    onOff: ({ lightList = [], plugList = [] }) => {
      return lightList[0]?.onOff ?? plugList[0]?.onOff
    },
    dimmer: ({ lightList = [] }) => {
      const dimmerValue = lightList[0]?.dimmer
      if (dimmerValue === null || dimmerValue === undefined) {
        return dimmerValue
      }
      return lightList[0]?.onOff ? dimmerValue : 0
    },
    colorTemperature: ({ lightList = [] }) => {
      return lightList[0]?.colorTemperature
    },
    hue: ({ lightList = [] }) => {
      return lightList[0]?.hue
    },
    saturation: ({ lightList = [] }) => {
      return lightList[0]?.saturation
    },
  },
  Group: {
    accessories: ({ deviceIDs }, _, { tradfriClient }) => {
      return deviceIDs
        .map((deviceID) => tradfriClient.devices[deviceID])
        .sort((a, b) => a.name.localeCompare(b.name))
    },
  },
  Mutation: {
    accessoryOnOff: async (_, { id, onOff }, { tradfriClient }) => {
      const accessory = tradfriClient.devices[id]
      switch (accessory.type) {
        case AccessoryTypes.plug:
          await tradfriClient.operatePlug(accessory, { onOff })
          break
        case AccessoryTypes.lightbulb:
          await tradfriClient.operateLight(accessory, { onOff })
          break
      }
      return null
    },
    accessoryDimmer: async (_, { id, dimmer }, { tradfriClient }) => {
      const accessory = tradfriClient.devices[id]
      await tradfriClient.operateLight(accessory, {
        dimmer,
        transitionTime: dimmer > 0 ? 2 : undefined,
      })
      return null
    },
    accessoryColorTemperature: async (
      _,
      { id, colorTemperature },
      { tradfriClient }
    ) => {
      const accessory = tradfriClient.devices[id]
      await tradfriClient.operateLight(accessory, {
        colorTemperature,
      })
      return null
    },
    accessoryHue: async (_, { id, hue }, { tradfriClient }) => {
      const accessory = tradfriClient.devices[id]
      await tradfriClient.operateLight(accessory, {
        hue,
      })
      return null
    },
    accessorySaturation: async (_, { id, saturation }, { tradfriClient }) => {
      const accessory = tradfriClient.devices[id]
      await tradfriClient.operateLight(accessory, {
        saturation,
      })
      return null
    },
  },
}
