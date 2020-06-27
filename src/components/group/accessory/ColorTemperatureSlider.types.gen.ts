import * as Types from '../../../graphql.types'

export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }

export type SetColorTemperatureMutationVariables = Exact<{
  id: Types.Scalars['Int']
  colorTemperature: Types.Scalars['Float']
}>

export type SetColorTemperatureMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'accessoryColorTemperature'
>
