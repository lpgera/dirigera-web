export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Mutation = {
  __typename?: 'Mutation'
  _?: Maybe<Scalars['String']>
  activateScene?: Maybe<Scalars['String']>
  login?: Maybe<Scalars['String']>
  quickControl?: Maybe<Scalars['Boolean']>
}

export type MutationActivateSceneArgs = {
  id: Scalars['String']
}

export type MutationLoginArgs = {
  password: Scalars['String']
}

export type MutationQuickControlArgs = {
  id: Scalars['String']
  isOn?: InputMaybe<Scalars['Boolean']>
  playback?: InputMaybe<Scalars['String']>
  type: QuickControlType
}

export type Query = {
  __typename?: 'Query'
  _?: Maybe<Scalars['String']>
  rooms: Array<Room>
  scenes: Array<Scene>
}

export type QuickControl = {
  __typename?: 'QuickControl'
  id: Scalars['String']
  isOn?: Maybe<Scalars['Boolean']>
  isReachable: Scalars['Boolean']
  name: Scalars['String']
  playback?: Maybe<Scalars['String']>
  type: QuickControlType
}

export enum QuickControlType {
  Device = 'DEVICE',
  DeviceSet = 'DEVICE_SET',
}

export type Room = {
  __typename?: 'Room'
  id: Scalars['String']
  name: Scalars['String']
  quickControls: Array<QuickControl>
}

export type Scene = {
  __typename?: 'Scene'
  id: Scalars['String']
  name: Scalars['String']
}
