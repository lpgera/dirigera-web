import * as Types from '../graphql.types'

export type GroupsQueryVariables = {}

export type GroupsQuery = { __typename?: 'Query' } & {
  groups: Array<
    { __typename?: 'Group' } & Pick<Types.Group, 'id' | 'name'> & {
        accessories: Array<
          { __typename?: 'Accessory' } & Pick<
            Types.Accessory,
            | 'id'
            | 'name'
            | 'type'
            | 'alive'
            | 'onOff'
            | 'dimmer'
            | 'battery'
            | 'colorTemperature'
          >
        >
      }
  >
}
