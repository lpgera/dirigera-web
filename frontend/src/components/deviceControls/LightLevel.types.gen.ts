import * as Types from '../../graphql.types'

export type SetLightLevelMutationVariables = Types.Exact<{
  id: Types.Scalars['String']
  type: Types.ControlType
  lightLevel: Types.Scalars['Int']
}>

export type SetLightLevelMutation = {
  __typename?: 'Mutation'
  setLightLevel?: boolean | null
}
