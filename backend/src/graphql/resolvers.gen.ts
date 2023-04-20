import { GraphQLResolveInfo } from 'graphql'
import { Context } from './context'
export type Maybe<T> = T extends PromiseLike<infer U>
  ? Promise<U | null>
  : T | null
export type InputMaybe<T> = T extends PromiseLike<infer U>
  ? Promise<U | null>
  : T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
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
  playItemImageURL?: Maybe<Scalars['String']>
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

export type Query = {
  __typename?: 'Query'
  _?: Maybe<Scalars['String']>
  room?: Maybe<Room>
  rooms: Array<Room>
  scenes: Array<Scene>
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

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

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
  TArgs
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
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  ControlType: ControlType
  Device: ResolverTypeWrapper<Device>
  Float: ResolverTypeWrapper<Scalars['Float']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
  QuickControl: ResolverTypeWrapper<QuickControl>
  Room: ResolverTypeWrapper<Room>
  Scene: ResolverTypeWrapper<Scene>
  String: ResolverTypeWrapper<Scalars['String']>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']
  Device: Device
  Float: Scalars['Float']
  Int: Scalars['Int']
  Mutation: {}
  Query: {}
  QuickControl: QuickControl
  Room: Room
  Scene: Scene
  String: Scalars['String']
}>

export type LoggedInDirectiveArgs = {}

export type LoggedInDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = LoggedInDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type DeviceResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Device'] = ResolversParentTypes['Device']
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
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isOn?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  isReachable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  lightLevel?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  nextPlayItem?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  playItem?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  playItemImageURL?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  playback?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  type?: Resolver<ResolversTypes['ControlType'], ParentType, ContextType>
  volume?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
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
}>

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
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
  ParentType extends ResolversParentTypes['QuickControl'] = ResolversParentTypes['QuickControl']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isOn?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  isReachable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  playback?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  type?: Resolver<ResolversTypes['ControlType'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type RoomResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']
> = ResolversObject<{
  devices?: Resolver<Array<ResolversTypes['Device']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  quickControls?: Resolver<
    Array<ResolversTypes['QuickControl']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type SceneResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Scene'] = ResolversParentTypes['Scene']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
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
