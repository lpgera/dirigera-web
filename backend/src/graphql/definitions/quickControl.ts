import { gql } from 'graphql-tag'
import type { QuickControlType, Resolvers } from '../resolvers.gen.ts'

export const typeDefs = gql`
  extend type Room {
    quickControls: [QuickControl!]!
  }

  enum QuickControlType {
    LIGHTS
    OUTLETS
    SPEAKERS
  }

  type QuickControl {
    id: String!
    type: QuickControlType!
    isOn: Boolean
  }

  extend type Mutation {
    quickControl(
      roomId: String!
      type: QuickControlType!
      isOn: Boolean
    ): Boolean @loggedIn
  }
`

export const resolvers: Resolvers = {
  Room: {
    quickControls: async ({ id }, _, { homeState: { devices } }) => {
      const roomDevices = devices
        .filter((d) => d.room?.id === id)
        .filter((d) => d.isReachable)

      const lights = roomDevices.filter((d) => d.type === 'light')
      const outlets = roomDevices.filter((d) => d.type === 'outlet')
      const speakers = roomDevices.filter((d) => d.type === 'speaker')

      const lighthsQuickControl =
        lights.length > 0
          ? {
              id: `${id}-lights`,
              type: 'LIGHTS' as QuickControlType,
              isOn: lights.some((d) => d.attributes.isOn),
            }
          : null
      const outletsQuickControl =
        outlets.length > 0
          ? {
              id: `${id}-outlets`,
              type: 'OUTLETS' as QuickControlType,
              isOn: outlets.some((d) => d.attributes.isOn),
            }
          : null
      const speakersQuickControl =
        speakers.length > 0
          ? {
              id: `${id}-speakers`,
              type: 'SPEAKERS' as QuickControlType,
              isOn: speakers.some(
                (d) => d.attributes.playback === 'playbackPlaying'
              ),
            }
          : null

      return [
        lighthsQuickControl,
        outletsQuickControl,
        speakersQuickControl,
      ].filter(Boolean)
    },
  },
  Mutation: {
    quickControl: async (
      _,
      { roomId, type, isOn },
      { dirigeraClient, homeState }
    ) => {
      const devices = homeState.devices
        .filter((d) => d.room?.id === roomId)
        .filter((d) => {
          switch (type) {
            case 'LIGHTS':
              return d.type === 'light'
            case 'OUTLETS':
              return d.type === 'outlet'
            case 'SPEAKERS':
              return d.type === 'speaker'
            default:
              return false
          }
        })
      await Promise.all(
        devices.map((d) => {
          switch (d.type) {
            case 'speaker':
              return dirigeraClient.speakers.setPlayback({
                id: d.id,
                playback: isOn ? 'playbackPlaying' : 'playbackPaused',
              })
            case 'light':
              return dirigeraClient.lights.setIsOn({
                id: d.id,
                isOn,
              })
            case 'outlet':
              return dirigeraClient.outlets.setIsOn({
                id: d.id,
                isOn,
              })
            default:
              return null
          }
        })
      )
      return null
    },
  },
}
