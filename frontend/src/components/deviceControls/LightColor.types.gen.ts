import * as Types from '../../graphql.types'

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
