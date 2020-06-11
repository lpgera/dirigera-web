import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
import { TradfriGroup, TradfriAccessory } from './typeMappings'
import { Context } from './context'
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
  dimmer?: Maybe<Scalars['Int']>
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

export type IsTypeOfResolverFn<T = {}> = (
  obj: T,
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
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']>
  Mutation: ResolverTypeWrapper<{}>
  AccessoryType: AccessoryType
  Accessory: ResolverTypeWrapper<TradfriAccessory>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Group: ResolverTypeWrapper<TradfriGroup>
  CacheControlScope: CacheControlScope
  Upload: ResolverTypeWrapper<Scalars['Upload']>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {}
  String: Scalars['String']
  Mutation: {}
  AccessoryType: AccessoryType
  Accessory: TradfriAccessory
  Int: Scalars['Int']
  Boolean: Scalars['Boolean']
  Group: TradfriGroup
  CacheControlScope: CacheControlScope
  Upload: Scalars['Upload']
}>

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
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
  dimmer?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = Context> = ResolversObject<{
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Accessory?: AccessoryResolvers<ContextType>
  Group?: GroupResolvers<ContextType>
  Upload?: GraphQLScalarType
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>
