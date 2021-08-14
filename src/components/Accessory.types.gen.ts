import * as Types from '../graphql.types'

export type AccessoryOnOffMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  onOff: Types.Scalars['Boolean']
}>

export type AccessoryOnOffMutation = {
  __typename?: 'Mutation'
  accessoryOnOff?: Types.Maybe<string>
}

export type AccessoryDimmerMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  dimmer: Types.Scalars['Float']
}>

export type AccessoryDimmerMutation = {
  __typename?: 'Mutation'
  accessoryDimmer?: Types.Maybe<string>
}

export type AccessoryColorTemperatureMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  colorTemperature: Types.Scalars['Float']
}>

export type AccessoryColorTemperatureMutation = {
  __typename?: 'Mutation'
  accessoryColorTemperature?: Types.Maybe<string>
}
