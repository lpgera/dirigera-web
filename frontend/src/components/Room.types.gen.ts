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
    }>
  } | null
}
