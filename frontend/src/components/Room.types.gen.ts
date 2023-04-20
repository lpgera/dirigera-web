import * as Types from '../graphql.types'

export type RoomQueryVariables = Types.Exact<{
  id: Types.Scalars['String']
}>

export type RoomQuery = {
  __typename?: 'Query'
  room?: {
    __typename?: 'Room'
    id: string
    name: string
    devices: Array<{
      __typename?: 'Device'
      id: string
      name: string
      type: Types.ControlType
      isReachable: boolean
      batteryPercentage?: number | null
      isOn?: boolean | null
      lightLevel?: number | null
      colorTemperature?: number | null
      colorSaturation?: number | null
      colorHue?: number | null
      playback?: string | null
      volume?: number | null
      playItem?: string | null
      playItemImageURL?: string | null
      nextPlayItem?: string | null
    }>
  } | null
}
