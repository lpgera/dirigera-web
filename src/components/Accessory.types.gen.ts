import * as Types from '../graphql.types'

export type AccessoryOnOffMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  onOff: Types.Scalars['Boolean']
}>

export type AccessoryOnOffMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'accessoryOnOff'
>

export type AccessoryDimmerMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  dimmer: Types.Scalars['Float']
}>

export type AccessoryDimmerMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'accessoryDimmer'
>

export type AccessoryColorTemperatureMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  colorTemperature: Types.Scalars['Float']
}>

export type AccessoryColorTemperatureMutation = {
  __typename?: 'Mutation'
} & Pick<Types.Mutation, 'accessoryColorTemperature'>
