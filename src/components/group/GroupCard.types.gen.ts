import * as Types from '../../graphql.types'

export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }

export type GroupOnOffMutationVariables = Exact<{
  id: Types.Scalars['Int']
  onOff: Types.Scalars['Boolean']
}>

export type GroupOnOffMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'groupOnOff'
>

export type GroupDimmerMutationVariables = Exact<{
  id: Types.Scalars['Int']
  dimmer: Types.Scalars['Float']
}>

export type GroupDimmerMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'groupDimmer'
>
