import * as Types from '../graphql.types'

export type GroupsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GroupsQuery = {
  __typename?: 'Query'
  groups: Array<{
    __typename?: 'Group'
    id: number
    name: string
    accessories: Array<{
      __typename?: 'Accessory'
      id: number
      name: string
      type: Types.AccessoryType
      alive: boolean
      onOff?: boolean | null | undefined
      dimmer?: number | null | undefined
      battery?: number | null | undefined
      colorTemperature?: number | null | undefined
    }>
  }>
}
