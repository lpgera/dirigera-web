import * as Types from '../../graphql.types'

export type DevicePlayItemImageUrlQueryVariables = Types.Exact<{
  id: Types.Scalars['String']
}>

export type DevicePlayItemImageUrlQuery = {
  __typename?: 'Query'
  devicePlayItemImageURL?: string | null
}
