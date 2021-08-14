import * as Types from '../graphql.types'

export type LoginMutationVariables = Types.Exact<{
  password: Types.Scalars['String']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login?: Types.Maybe<string>
}
