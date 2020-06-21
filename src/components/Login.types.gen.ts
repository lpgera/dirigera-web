import * as Types from '../graphql.types'

export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }

export type LoginMutationVariables = Exact<{
  password: Types.Scalars['String']
}>

export type LoginMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'login'
>
