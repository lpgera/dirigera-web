import * as Types from '../graphql.types'

export type RoomsQueryVariables = Types.Exact<{ [key: string]: never }>

export type RoomsQuery = {
  __typename?: 'Query'
  rooms: Array<{
    __typename?: 'Room'
    id: string
    name: string
    temperature?: number | null
    humidity?: number | null
    pm25?: number | null
    vocIndex?: number | null
    co2?: number | null
    quickControls: Array<{
      __typename?: 'QuickControl'
      id: string
      type: Types.QuickControlType
      isOn?: boolean | null
    }>
  }>
}

export type QuickControlMutationVariables = Types.Exact<{
  roomId: Types.Scalars['String']['input']
  type: Types.QuickControlType
  isOn?: Types.InputMaybe<Types.Scalars['Boolean']['input']>
}>

export type QuickControlMutation = {
  __typename?: 'Mutation'
  quickControl?: boolean | null
}
