import * as Types from '../graphql.types'

export type RoomsQueryVariables = Types.Exact<{ [key: string]: never }>

export type RoomsQuery = {
  __typename?: 'Query'
  rooms: Array<{
    __typename?: 'Room'
    id: string
    name: string
    quickControls: Array<{
      __typename?: 'QuickControl'
      id: string
      name: string
      isReachable: boolean
      isOn?: boolean | null
      playback?: string | null
      type: Types.ControlType
    }>
  }>
}

export type QuickControlMutationVariables = Types.Exact<{
  id: Types.Scalars['String']
  type: Types.ControlType
  isOn?: Types.InputMaybe<Types.Scalars['Boolean']>
  playback?: Types.InputMaybe<Types.Scalars['String']>
}>

export type QuickControlMutation = {
  __typename?: 'Mutation'
  quickControl?: boolean | null
}
