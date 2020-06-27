import * as Types from '../../../graphql.types'

export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }

export type AccessoryDimmerMutationVariables = Exact<{
  id: Types.Scalars['Int']
  dimmer: Types.Scalars['Float']
}>

export type AccessoryDimmerMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'accessoryDimmer'
>

export type AccessoryColorTemperatureMutationVariables = Exact<{
  id: Types.Scalars['Int']
  colorTemperature: Types.Scalars['Float']
}>

export type AccessoryColorTemperatureMutation = {
  __typename?: 'Mutation'
} & Pick<Types.Mutation, 'accessoryColorTemperature'>
