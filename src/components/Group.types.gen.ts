import * as Types from '../graphql.types'

export type GroupOnOffMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  onOff: Types.Scalars['Boolean']
}>

export type GroupOnOffMutation = {
  __typename?: 'Mutation'
  groupOnOff?: string | null
}

export type GroupDimmerMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  dimmer: Types.Scalars['Float']
}>

export type GroupDimmerMutation = {
  __typename?: 'Mutation'
  groupDimmer?: string | null
}

export type GroupColorTemperatureMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  colorTemperature: Types.Scalars['Float']
}>

export type GroupColorTemperatureMutation = {
  __typename?: 'Mutation'
  groupColorTemperature?: string | null
}

export type GroupHueMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  hue: Types.Scalars['Float']
}>

export type GroupHueMutation = {
  __typename?: 'Mutation'
  groupHue?: string | null
}

export type GroupSaturationMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  saturation: Types.Scalars['Float']
}>

export type GroupSaturationMutation = {
  __typename?: 'Mutation'
  groupSaturation?: string | null
}
