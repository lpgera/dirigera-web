import type { GraphQLResolveInfo } from 'graphql'
import type { Context } from './context.ts'
export type Maybe<T> =
  T extends PromiseLike<infer U> ? Promise<U | null> : T | null
export type InputMaybe<T> =
  T extends PromiseLike<infer U> ? Promise<U | null> : T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type ControlType = 'DEVICE' | 'DEVICE_SET'

export type Device = {
  __typename?: 'Device'
  batteryPercentage?: Maybe<Scalars['Int']['output']>
  colorHue?: Maybe<Scalars['Float']['output']>
  colorSaturation?: Maybe<Scalars['Float']['output']>
  colorTemperature?: Maybe<Scalars['Int']['output']>
  humidity?: Maybe<Scalars['Int']['output']>
  id: Scalars['String']['output']
  isOn?: Maybe<Scalars['Boolean']['output']>
  isOpen?: Maybe<Scalars['Boolean']['output']>
  isReachable: Scalars['Boolean']['output']
  lightLevel?: Maybe<Scalars['Int']['output']>
  name: Scalars['String']['output']
  nextPlayItem?: Maybe<Scalars['String']['output']>
  playItem?: Maybe<Scalars['String']['output']>
  playback?: Maybe<Playback>
  playbackNextAvailable?: Maybe<Scalars['Boolean']['output']>
  playbackPauseAvailable?: Maybe<Scalars['Boolean']['output']>
  playbackPreviousAvailable?: Maybe<Scalars['Boolean']['output']>
  pm25?: Maybe<Scalars['Int']['output']>
  temperature?: Maybe<Scalars['Int']['output']>
  type: ControlType
  vocIndex?: Maybe<Scalars['Int']['output']>
  volume?: Maybe<Scalars['Int']['output']>
}

export type Mutation = {
  __typename?: 'Mutation'
  _?: Maybe<Scalars['String']['output']>
  activateScene?: Maybe<Scalars['String']['output']>
  login?: Maybe<Scalars['String']['output']>
  quickControl?: Maybe<Scalars['Boolean']['output']>
  setColorHueAndSaturation?: Maybe<Scalars['Boolean']['output']>
  setColorTemperature?: Maybe<Scalars['Boolean']['output']>
  setIsOn?: Maybe<Scalars['Boolean']['output']>
  setLightLevel?: Maybe<Scalars['Boolean']['output']>
  setPlayback?: Maybe<Scalars['Boolean']['output']>
  setVolume?: Maybe<Scalars['Boolean']['output']>
}

export type MutationActivateSceneArgs = {
  id: Scalars['String']['input']
}

export type MutationLoginArgs = {
  password: Scalars['String']['input']
}

export type MutationQuickControlArgs = {
  id: Scalars['String']['input']
  isOn?: InputMaybe<Scalars['Boolean']['input']>
  playback?: InputMaybe<Playback>
  type: ControlType
}

export type MutationSetColorHueAndSaturationArgs = {
  colorHue: Scalars['Float']['input']
  colorSaturation: Scalars['Float']['input']
  id: Scalars['String']['input']
  type: ControlType
}

export type MutationSetColorTemperatureArgs = {
  colorTemperature: Scalars['Int']['input']
  id: Scalars['String']['input']
  type: ControlType
}

export type MutationSetIsOnArgs = {
  id: Scalars['String']['input']
  isOn: Scalars['Boolean']['input']
  type: ControlType
}

export type MutationSetLightLevelArgs = {
  id: Scalars['String']['input']
  lightLevel: Scalars['Int']['input']
  type: ControlType
}

export type MutationSetPlaybackArgs = {
  id: Scalars['String']['input']
  playback: Playback
  type: ControlType
}

export type MutationSetVolumeArgs = {
  id: Scalars['String']['input']
  type: ControlType
  volume: Scalars['Int']['input']
}

export type Playback =
  | 'playbackBuffering'
  | 'playbackIdle'
  | 'playbackNext'
  | 'playbackPaused'
  | 'playbackPlaying'
  | 'playbackPrevious'

export type Query = {
  __typename?: 'Query'
  _?: Maybe<Scalars['String']['output']>
  devicePlayItemImageURL?: Maybe<Scalars['String']['output']>
  room?: Maybe<Room>
  rooms: Array<Room>
  scenes: Array<Scene>
}

export type QueryDevicePlayItemImageUrlArgs = {
  id: Scalars['String']['input']
}

export type QueryRoomArgs = {
  id: Scalars['String']['input']
}

export type QuickControl = {
  __typename?: 'QuickControl'
  id: Scalars['String']['output']
  isOn?: Maybe<Scalars['Boolean']['output']>
  isReachable: Scalars['Boolean']['output']
  name: Scalars['String']['output']
  playback?: Maybe<Scalars['String']['output']>
  type: ControlType
}

export type Room = {
  __typename?: 'Room'
  devices: Array<Device>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  quickControls: Array<QuickControl>
}

export type Scene = {
  __typename?: 'Scene'
  id: Scalars['String']['output']
  name: Scalars['String']['output']
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type Resolver<
  TResult,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> = ResolverFn<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<
  TTypes,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<
  T = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = Record<PropertyKey, never>,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
  ControlType: ControlType
  Device: ResolverTypeWrapper<Device>
  Float: ResolverTypeWrapper<Scalars['Float']['output']>
  Int: ResolverTypeWrapper<Scalars['Int']['output']>
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>
  Playback: Playback
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>
  QuickControl: ResolverTypeWrapper<QuickControl>
  Room: ResolverTypeWrapper<Room>
  Scene: ResolverTypeWrapper<Scene>
  String: ResolverTypeWrapper<Scalars['String']['output']>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output']
  Device: Device
  Float: Scalars['Float']['output']
  Int: Scalars['Int']['output']
  Mutation: Record<PropertyKey, never>
  Query: Record<PropertyKey, never>
  QuickControl: QuickControl
  Room: Room
  Scene: Scene
  String: Scalars['String']['output']
}>

export type LoggedInDirectiveArgs = {}

export type LoggedInDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = LoggedInDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type DeviceResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Device'] =
    ResolversParentTypes['Device'],
> = ResolversObject<{
  batteryPercentage?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  colorHue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  colorSaturation?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  colorTemperature?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  humidity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isOn?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  isOpen?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  isReachable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  lightLevel?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  nextPlayItem?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  playItem?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  playback?: Resolver<
    Maybe<ResolversTypes['Playback']>,
    ParentType,
    ContextType
  >
  playbackNextAvailable?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  playbackPauseAvailable?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  playbackPreviousAvailable?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  pm25?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  temperature?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  type?: Resolver<ResolversTypes['ControlType'], ParentType, ContextType>
  vocIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  volume?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] =
    ResolversParentTypes['Mutation'],
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  activateScene?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationActivateSceneArgs, 'id'>
  >
  login?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'password'>
  >
  quickControl?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationQuickControlArgs, 'id' | 'type'>
  >
  setColorHueAndSaturation?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetColorHueAndSaturationArgs,
      'colorHue' | 'colorSaturation' | 'id' | 'type'
    >
  >
  setColorTemperature?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSetColorTemperatureArgs,
      'colorTemperature' | 'id' | 'type'
    >
  >
  setIsOn?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationSetIsOnArgs, 'id' | 'isOn' | 'type'>
  >
  setLightLevel?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationSetLightLevelArgs, 'id' | 'lightLevel' | 'type'>
  >
  setPlayback?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationSetPlaybackArgs, 'id' | 'playback' | 'type'>
  >
  setVolume?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationSetVolumeArgs, 'id' | 'type' | 'volume'>
  >
}>

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] =
    ResolversParentTypes['Query'],
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  devicePlayItemImageURL?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<QueryDevicePlayItemImageUrlArgs, 'id'>
  >
  room?: Resolver<
    Maybe<ResolversTypes['Room']>,
    ParentType,
    ContextType,
    RequireFields<QueryRoomArgs, 'id'>
  >
  rooms?: Resolver<Array<ResolversTypes['Room']>, ParentType, ContextType>
  scenes?: Resolver<Array<ResolversTypes['Scene']>, ParentType, ContextType>
}>

export type QuickControlResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['QuickControl'] =
    ResolversParentTypes['QuickControl'],
> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isOn?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  isReachable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  playback?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  type?: Resolver<ResolversTypes['ControlType'], ParentType, ContextType>
}>

export type RoomResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Room'] =
    ResolversParentTypes['Room'],
> = ResolversObject<{
  devices?: Resolver<Array<ResolversTypes['Device']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  quickControls?: Resolver<
    Array<ResolversTypes['QuickControl']>,
    ParentType,
    ContextType
  >
}>

export type SceneResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Scene'] =
    ResolversParentTypes['Scene'],
> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}>

export type Resolvers<ContextType = Context> = ResolversObject<{
  Device?: DeviceResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  QuickControl?: QuickControlResolvers<ContextType>
  Room?: RoomResolvers<ContextType>
  Scene?: SceneResolvers<ContextType>
}>

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  loggedIn?: LoggedInDirectiveResolver<any, any, ContextType>
}>
