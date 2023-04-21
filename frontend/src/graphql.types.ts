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

export enum ControlType {
  Device = 'DEVICE',
  DeviceSet = 'DEVICE_SET',
}

export type Device = {
  __typename?: 'Device'
  batteryPercentage?: Maybe<Scalars['Int']>
  colorHue?: Maybe<Scalars['Float']>
  colorSaturation?: Maybe<Scalars['Float']>
  colorTemperature?: Maybe<Scalars['Int']>
  id: Scalars['String']
  isOn?: Maybe<Scalars['Boolean']>
  isReachable: Scalars['Boolean']
  lightLevel?: Maybe<Scalars['Int']>
  name: Scalars['String']
  nextPlayItem?: Maybe<Scalars['String']>
  playItem?: Maybe<Scalars['String']>
  playback?: Maybe<Scalars['String']>
  type: ControlType
  volume?: Maybe<Scalars['Int']>
}

export type Mutation = {
  __typename?: 'Mutation'
  _?: Maybe<Scalars['String']>
  activateScene?: Maybe<Scalars['String']>
  login?: Maybe<Scalars['String']>
  quickControl?: Maybe<Scalars['Boolean']>
  setColorHueAndSaturation?: Maybe<Scalars['Boolean']>
  setColorTemperature?: Maybe<Scalars['Boolean']>
  setIsOn?: Maybe<Scalars['Boolean']>
  setLightLevel?: Maybe<Scalars['Boolean']>
  setPlayback?: Maybe<Scalars['Boolean']>
  setVolume?: Maybe<Scalars['Boolean']>
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
  type: ControlType
}

export type MutationSetColorHueAndSaturationArgs = {
  colorHue: Scalars['Float']
  colorSaturation: Scalars['Float']
  id: Scalars['String']
  type: ControlType
}

export type MutationSetColorTemperatureArgs = {
  colorTemperature: Scalars['Int']
  id: Scalars['String']
  type: ControlType
}

export type MutationSetIsOnArgs = {
  id: Scalars['String']
  isOn: Scalars['Boolean']
  type: ControlType
}

export type MutationSetLightLevelArgs = {
  id: Scalars['String']
  lightLevel: Scalars['Int']
  type: ControlType
}

export type MutationSetPlaybackArgs = {
  id: Scalars['String']
  playback: Scalars['String']
  type: ControlType
}

export type MutationSetVolumeArgs = {
  id: Scalars['String']
  type: ControlType
  volume: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
  _?: Maybe<Scalars['String']>
  devicePlayItemImageURL?: Maybe<Scalars['String']>
  room?: Maybe<Room>
  rooms: Array<Room>
  scenes: Array<Scene>
}

export type QueryDevicePlayItemImageUrlArgs = {
  id: Scalars['String']
}

export type QueryRoomArgs = {
  id: Scalars['String']
}

export type QuickControl = {
  __typename?: 'QuickControl'
  id: Scalars['String']
  isOn?: Maybe<Scalars['Boolean']>
  isReachable: Scalars['Boolean']
  name: Scalars['String']
  playback?: Maybe<Scalars['String']>
  type: ControlType
}

export type Room = {
  __typename?: 'Room'
  devices: Array<Device>
  id: Scalars['String']
  name: Scalars['String']
  quickControls: Array<QuickControl>
}

export type Scene = {
  __typename?: 'Scene'
  id: Scalars['String']
  name: Scalars['String']
}
