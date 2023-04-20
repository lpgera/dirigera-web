import * as Types from '../graphql.types'

export type SetIsOnMutationVariables = Types.Exact<{
  id: Types.Scalars['String']
  type: Types.ControlType
  isOn: Types.Scalars['Boolean']
}>

export type SetIsOnMutation = {
  __typename?: 'Mutation'
  setIsOn?: boolean | null
}

export type SetLightLevelMutationVariables = Types.Exact<{
  id: Types.Scalars['String']
  type: Types.ControlType
  lightLevel: Types.Scalars['Int']
}>

export type SetLightLevelMutation = {
  __typename?: 'Mutation'
  setLightLevel?: boolean | null
}

export type SetColorTemperatureMutationVariables = Types.Exact<{
  id: Types.Scalars['String']
  type: Types.ControlType
  colorTemperature: Types.Scalars['Int']
}>

export type SetColorTemperatureMutation = {
  __typename?: 'Mutation'
  setColorTemperature?: boolean | null
}

export type SetColorHueAndSaturationMutationVariables = Types.Exact<{
  id: Types.Scalars['String']
  type: Types.ControlType
  colorHue: Types.Scalars['Float']
  colorSaturation: Types.Scalars['Float']
}>

export type SetColorHueAndSaturationMutation = {
  __typename?: 'Mutation'
  setColorHueAndSaturation?: boolean | null
}

export type SetPlaybackMutationVariables = Types.Exact<{
  id: Types.Scalars['String']
  type: Types.ControlType
  playback: Types.Scalars['String']
}>

export type SetPlaybackMutation = {
  __typename?: 'Mutation'
  setPlayback?: boolean | null
}

export type SetVolumeMutationVariables = Types.Exact<{
  id: Types.Scalars['String']
  type: Types.ControlType
  volume: Types.Scalars['Int']
}>

export type SetVolumeMutation = {
  __typename?: 'Mutation'
  setVolume?: boolean | null
}
