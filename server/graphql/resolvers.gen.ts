import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
import { TradfriGroup, TradfriAccessory } from './typeMappings'
import { Context } from './context'
export type Maybe<T> = T extends PromiseLike<infer U>
  ? Promise<U | null>
  : T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
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

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Group = {
  __typename?: 'Group'
  id: Scalars['Int']
  name: Scalars['String']
  accessories: Array<Accessory>
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

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

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
  Accessory: ResolverTypeWrapper<TradfriAccessory>
  Int: ResolverTypeWrapper<Scalars['Int']>
  String: ResolverTypeWrapper<Scalars['String']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Float: ResolverTypeWrapper<Scalars['Float']>
  AccessoryType: AccessoryType
  CacheControlScope: CacheControlScope
  Group: ResolverTypeWrapper<TradfriGroup>
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
  Scene: ResolverTypeWrapper<Scene>
  Upload: ResolverTypeWrapper<Scalars['Upload']>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Accessory: TradfriAccessory
  Int: Scalars['Int']
  String: Scalars['String']
  Boolean: Scalars['Boolean']
  Float: Scalars['Float']
  Group: TradfriGroup
  Mutation: {}
  Query: {}
  Scene: Scene
  Upload: Scalars['Upload']
}>

export type AccessoryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Accessory'] = ResolversParentTypes['Accessory']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['AccessoryType'], ParentType, ContextType>
  alive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  battery?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  onOff?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  dimmer?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  colorTemperature?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type GroupResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  accessories?: Resolver<
    Array<ResolversTypes['Accessory']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  login?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'password'>
  >
  accessoryOnOff?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationAccessoryOnOffArgs, 'id' | 'onOff'>
  >
  accessoryDimmer?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationAccessoryDimmerArgs, 'id' | 'dimmer'>
  >
  accessoryColorTemperature?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationAccessoryColorTemperatureArgs,
      'id' | 'colorTemperature'
    >
  >
  groupOnOff?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationGroupOnOffArgs, 'id' | 'onOff'>
  >
  groupDimmer?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationGroupDimmerArgs, 'id' | 'dimmer'>
  >
  groupColorTemperature?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationGroupColorTemperatureArgs, 'id' | 'colorTemperature'>
  >
  activateScene?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationActivateSceneArgs, 'id'>
  >
}>

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>
  scenes?: Resolver<Array<ResolversTypes['Scene']>, ParentType, ContextType>
}>

export type SceneResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Scene'] = ResolversParentTypes['Scene']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = Context> = ResolversObject<{
  Accessory?: AccessoryResolvers<ContextType>
  Group?: GroupResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Scene?: SceneResolvers<ContextType>
  Upload?: GraphQLScalarType
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>
