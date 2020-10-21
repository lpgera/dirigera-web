import * as Types from '../graphql.types'

export type GroupOnOffMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  onOff: Types.Scalars['Boolean']
}>

export type GroupOnOffMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'groupOnOff'
>

export type GroupDimmerMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  dimmer: Types.Scalars['Float']
}>

export type GroupDimmerMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'groupDimmer'
>

export type GroupColorTemperatureMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
  colorTemperature: Types.Scalars['Float']
}>

export type GroupColorTemperatureMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'groupColorTemperature'
>
