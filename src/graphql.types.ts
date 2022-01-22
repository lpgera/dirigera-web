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

export type Accessory = {
  __typename?: 'Accessory'
  alive: Scalars['Boolean']
  battery?: Maybe<Scalars['Int']>
  colorTemperature?: Maybe<Scalars['Float']>
  dimmer?: Maybe<Scalars['Float']>
  id: Scalars['Int']
  name: Scalars['String']
  onOff?: Maybe<Scalars['Boolean']>
  type: AccessoryType
}

export enum AccessoryType {
  AirPurifier = 'AIR_PURIFIER',
  Blind = 'BLIND',
  Lightbulb = 'LIGHTBULB',
  MotionSensor = 'MOTION_SENSOR',
  Plug = 'PLUG',
  Remote = 'REMOTE',
  SignalRepeater = 'SIGNAL_REPEATER',
  SlaveRemote = 'SLAVE_REMOTE',
  SoundRemote = 'SOUND_REMOTE',
}

export type Group = {
  __typename?: 'Group'
  accessories: Array<Accessory>
  id: Scalars['Int']
  name: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  _?: Maybe<Scalars['String']>
  accessoryColorTemperature?: Maybe<Scalars['String']>
  accessoryDimmer?: Maybe<Scalars['String']>
  accessoryOnOff?: Maybe<Scalars['String']>
  activateScene?: Maybe<Scalars['String']>
  groupColorTemperature?: Maybe<Scalars['String']>
  groupDimmer?: Maybe<Scalars['String']>
  groupOnOff?: Maybe<Scalars['String']>
  login?: Maybe<Scalars['String']>
}

export type MutationAccessoryColorTemperatureArgs = {
  colorTemperature: Scalars['Float']
  id: Scalars['Int']
}

export type MutationAccessoryDimmerArgs = {
  dimmer: Scalars['Float']
  id: Scalars['Int']
}

export type MutationAccessoryOnOffArgs = {
  id: Scalars['Int']
  onOff: Scalars['Boolean']
}

export type MutationActivateSceneArgs = {
  id: Scalars['Int']
}

export type MutationGroupColorTemperatureArgs = {
  colorTemperature: Scalars['Float']
  id: Scalars['Int']
}

export type MutationGroupDimmerArgs = {
  dimmer: Scalars['Float']
  id: Scalars['Int']
}

export type MutationGroupOnOffArgs = {
  id: Scalars['Int']
  onOff: Scalars['Boolean']
}

export type MutationLoginArgs = {
  password: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  _?: Maybe<Scalars['String']>
  groups: Array<Group>
  scenes: Array<Scene>
}

export type Scene = {
  __typename?: 'Scene'
  id: Scalars['Int']
  name: Scalars['String']
}
