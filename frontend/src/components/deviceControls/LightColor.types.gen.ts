import * as Types from '../../graphql.types'

export type SetColorTemperatureMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input']
  type: Types.ControlType
  colorTemperature: Types.Scalars['Int']['input']
}>

export type SetColorTemperatureMutation = {
  __typename?: 'Mutation'
  setColorTemperature?: boolean | null
}

export type SetColorHueAndSaturationMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input']
  type: Types.ControlType
  colorHue: Types.Scalars['Float']['input']
  colorSaturation: Types.Scalars['Float']['input']
}>

export type SetColorHueAndSaturationMutation = {
  __typename?: 'Mutation'
  setColorHueAndSaturation?: boolean | null
}
