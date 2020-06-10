export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type Query = {
  __typename?: 'Query'
  _?: Maybe<Scalars['String']>
  devices: Array<Device>
}

export type Mutation = {
  __typename?: 'Mutation'
  _?: Maybe<Scalars['String']>
}

export type Device = {
  __typename?: 'Device'
  id: Scalars['Int']
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}
