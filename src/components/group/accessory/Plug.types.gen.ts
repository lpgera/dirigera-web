import * as Types from '../../../graphql.types'

export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }

export type AccessoryOnOffMutationVariables = Exact<{
  id: Types.Scalars['Int']
  onOff: Types.Scalars['Boolean']
}>

export type AccessoryOnOffMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'accessoryOnOff'
>
