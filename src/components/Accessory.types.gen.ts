import * as Types from '../graphql.types'

export type AccessoryOnOffMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  onOff: Types.Scalars['Boolean']
}>

export type AccessoryOnOffMutation = {
  __typename?: 'Mutation'
  accessoryOnOff?: string | null
}

export type AccessoryDimmerMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  dimmer: Types.Scalars['Float']
}>

export type AccessoryDimmerMutation = {
  __typename?: 'Mutation'
  accessoryDimmer?: string | null
}

export type AccessoryColorTemperatureMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  colorTemperature: Types.Scalars['Float']
}>

export type AccessoryColorTemperatureMutation = {
  __typename?: 'Mutation'
  accessoryColorTemperature?: string | null
}

export type AccessoryHueMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  hue: Types.Scalars['Float']
}>

export type AccessoryHueMutation = {
  __typename?: 'Mutation'
  accessoryHue?: string | null
}

export type AccessorySaturationMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  saturation: Types.Scalars['Float']
}>

export type AccessorySaturationMutation = {
  __typename?: 'Mutation'
  accessorySaturation?: string | null
}
