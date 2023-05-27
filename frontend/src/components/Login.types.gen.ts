import * as Types from '../graphql.types'

export type LoginMutationVariables = Types.Exact<{
  password: Types.Scalars['String']['input']
}>

export type LoginMutation = { __typename?: 'Mutation'; login?: string | null }
