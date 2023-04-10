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
      isOn: boolean
      type: Types.QuickControlType
    }>
  }>
}

export type QuickControlMutationVariables = Types.Exact<{
  id: Types.Scalars['String']
  type: Types.QuickControlType
  isOn: Types.Scalars['Boolean']
}>

export type QuickControlMutation = {
  __typename?: 'Mutation'
  quickControl: boolean
}
