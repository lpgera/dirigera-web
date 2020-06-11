import { gql } from 'apollo-server'
import { Resolvers } from '../resolvers.gen'
import { AccessoryTypes } from 'node-tradfri-client'

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
  }

  type Accessory {
    id: Int!
    name: String!
    type: AccessoryType!
    alive: Boolean!
    battery: Int
    onOff: Boolean
    dimmer: Int
  }

  extend type Group {
    accessories: [Accessory!]!
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
      return lightList[0]?.dimmer
    },
  },
  Group: {
    accessories: ({ deviceIDs }, _, { tradfriClient }) => {
      return deviceIDs.map((deviceID) => tradfriClient.devices[deviceID])
    },
  },
}
