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
      onOff?: Types.Maybe<boolean>
      dimmer?: Types.Maybe<number>
      battery?: Types.Maybe<number>
      colorTemperature?: Types.Maybe<number>
    }>
  }>
}
