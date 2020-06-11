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
  groups: Array<Group>
}

export type Mutation = {
  __typename?: 'Mutation'
  _?: Maybe<Scalars['String']>
  accessoryOnOff?: Maybe<Scalars['String']>
  accessoryDimmer?: Maybe<Scalars['String']>
  groupOnOff?: Maybe<Scalars['String']>
  groupDimmer?: Maybe<Scalars['String']>
}

export type MutationAccessoryOnOffArgs = {
  id: Scalars['Int']
  onOff: Scalars['Boolean']
}

export type MutationAccessoryDimmerArgs = {
  id: Scalars['Int']
  dimmer: Scalars['Float']
}

export type MutationGroupOnOffArgs = {
  id: Scalars['Int']
  onOff: Scalars['Boolean']
}

export type MutationGroupDimmerArgs = {
  id: Scalars['Int']
  dimmer: Scalars['Float']
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
}

export type Group = {
  __typename?: 'Group'
  id: Scalars['Int']
  name: Scalars['String']
  accessories: Array<Accessory>
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}
