export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
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
  groups: Array<Group>
  scenes: Array<Scene>
}

export type Mutation = {
  __typename?: 'Mutation'
  _?: Maybe<Scalars['String']>
  login?: Maybe<Scalars['String']>
  accessoryOnOff?: Maybe<Scalars['String']>
  accessoryDimmer?: Maybe<Scalars['String']>
  accessoryColorTemperature?: Maybe<Scalars['String']>
  groupOnOff?: Maybe<Scalars['String']>
  groupDimmer?: Maybe<Scalars['String']>
  groupColorTemperature?: Maybe<Scalars['String']>
  activateScene?: Maybe<Scalars['String']>
}

export type MutationLoginArgs = {
  password: Scalars['String']
}

export type MutationAccessoryOnOffArgs = {
  id: Scalars['Int']
  onOff: Scalars['Boolean']
}

export type MutationAccessoryDimmerArgs = {
  id: Scalars['Int']
  dimmer: Scalars['Float']
}

export type MutationAccessoryColorTemperatureArgs = {
  id: Scalars['Int']
  colorTemperature: Scalars['Float']
}

export type MutationGroupOnOffArgs = {
  id: Scalars['Int']
  onOff: Scalars['Boolean']
}

export type MutationGroupDimmerArgs = {
  id: Scalars['Int']
  dimmer: Scalars['Float']
}

export type MutationGroupColorTemperatureArgs = {
  id: Scalars['Int']
  colorTemperature: Scalars['Float']
}

export type MutationActivateSceneArgs = {
  id: Scalars['Int']
}

export enum AccessoryType {
  Remote = 'REMOTE',
  SlaveRemote = 'SLAVE_REMOTE',
  Lightbulb = 'LIGHTBULB',
  Plug = 'PLUG',
  MotionSensor = 'MOTION_SENSOR',
  SignalRepeater = 'SIGNAL_REPEATER',
  Blind = 'BLIND',
  SoundRemote = 'SOUND_REMOTE',
}

export type Accessory = {
  __typename?: 'Accessory'
  id: Scalars['Int']
  name: Scalars['String']
  type: AccessoryType
  alive: Scalars['Boolean']
  battery?: Maybe<Scalars['Int']>
  onOff?: Maybe<Scalars['Boolean']>
  dimmer?: Maybe<Scalars['Float']>
  colorTemperature?: Maybe<Scalars['Float']>
}

export type Group = {
  __typename?: 'Group'
  id: Scalars['Int']
  name: Scalars['String']
  accessories: Array<Accessory>
}

export type Scene = {
  __typename?: 'Scene'
  id: Scalars['Int']
  name: Scalars['String']
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}
