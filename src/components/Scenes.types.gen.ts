import * as Types from '../graphql.types'

export type ScenesQueryVariables = Types.Exact<{ [key: string]: never }>

export type ScenesQuery = { __typename?: 'Query' } & {
  scenes: Array<{ __typename?: 'Scene' } & Pick<Types.Scene, 'id' | 'name'>>
}

export type ActiveSceneMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']
}>

export type ActiveSceneMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'activateScene'
>
