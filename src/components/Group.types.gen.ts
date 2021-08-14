import * as Types from '../graphql.types'

export type GroupOnOffMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  onOff: Types.Scalars['Boolean']
}>

export type GroupOnOffMutation = {
  __typename?: 'Mutation'
  groupOnOff?: Types.Maybe<string>
}

export type GroupDimmerMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  dimmer: Types.Scalars['Float']
}>

export type GroupDimmerMutation = {
  __typename?: 'Mutation'
  groupDimmer?: Types.Maybe<string>
}

export type GroupColorTemperatureMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  colorTemperature: Types.Scalars['Float']
}>

export type GroupColorTemperatureMutation = {
  __typename?: 'Mutation'
  groupColorTemperature?: Types.Maybe<string>
}
