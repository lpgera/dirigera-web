import * as Types from '../../graphql.types'

export type SetPlaybackMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input']
  type: Types.ControlType
  playback: Types.Scalars['String']['input']
}>

export type SetPlaybackMutation = {
  __typename?: 'Mutation'
  setPlayback?: boolean | null
}
