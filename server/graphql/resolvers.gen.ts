import { GraphQLResolveInfo } from 'graphql'
import { TradfriGroup, TradfriAccessory } from './typeMappings'
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

export type Accessory = {
  __typename?: 'Accessory'
  alive: Scalars['Boolean']
  battery?: Maybe<Scalars['Int']>
  colorTemperature?: Maybe<Scalars['Float']>
  dimmer?: Maybe<Scalars['Float']>
  hue?: Maybe<Scalars['Float']>
  id: Scalars['Int']
  name: Scalars['String']
  onOff?: Maybe<Scalars['Boolean']>
  saturation?: Maybe<Scalars['Float']>
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
  accessoryHue?: Maybe<Scalars['String']>
  accessoryOnOff?: Maybe<Scalars['String']>
  accessorySaturation?: Maybe<Scalars['String']>
  activateScene?: Maybe<Scalars['String']>
  groupColorTemperature?: Maybe<Scalars['String']>
  groupDimmer?: Maybe<Scalars['String']>
  groupHue?: Maybe<Scalars['String']>
  groupOnOff?: Maybe<Scalars['String']>
  groupSaturation?: Maybe<Scalars['String']>
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

export type MutationAccessoryHueArgs = {
  hue: Scalars['Float']
  id: Scalars['Int']
}

export type MutationAccessoryOnOffArgs = {
  id: Scalars['Int']
  onOff: Scalars['Boolean']
}

export type MutationAccessorySaturationArgs = {
  id: Scalars['Int']
  saturation: Scalars['Float']
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

export type MutationGroupHueArgs = {
  hue: Scalars['Float']
  id: Scalars['Int']
}

export type MutationGroupOnOffArgs = {
  id: Scalars['Int']
  onOff: Scalars['Boolean']
}

export type MutationGroupSaturationArgs = {
  id: Scalars['Int']
  saturation: Scalars['Float']
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
  Accessory: ResolverTypeWrapper<TradfriAccessory>
  AccessoryType: AccessoryType
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Float: ResolverTypeWrapper<Scalars['Float']>
  Group: ResolverTypeWrapper<TradfriGroup>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
  Scene: ResolverTypeWrapper<Scene>
  String: ResolverTypeWrapper<Scalars['String']>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Accessory: TradfriAccessory
  Boolean: Scalars['Boolean']
  Float: Scalars['Float']
  Group: TradfriGroup
  Int: Scalars['Int']
  Mutation: {}
  Query: {}
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

export type AccessoryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Accessory'] = ResolversParentTypes['Accessory']
> = ResolversObject<{
  alive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  battery?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  colorTemperature?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  dimmer?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  hue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  onOff?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  saturation?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  type?: Resolver<ResolversTypes['AccessoryType'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type GroupResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']
> = ResolversObject<{
  accessories?: Resolver<
    Array<ResolversTypes['Accessory']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  accessoryColorTemperature?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationAccessoryColorTemperatureArgs,
      'colorTemperature' | 'id'
    >
  >
  accessoryDimmer?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationAccessoryDimmerArgs, 'dimmer' | 'id'>
  >
  accessoryHue?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationAccessoryHueArgs, 'hue' | 'id'>
  >
  accessoryOnOff?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationAccessoryOnOffArgs, 'id' | 'onOff'>
  >
  accessorySaturation?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationAccessorySaturationArgs, 'id' | 'saturation'>
  >
  activateScene?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationActivateSceneArgs, 'id'>
  >
  groupColorTemperature?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationGroupColorTemperatureArgs, 'colorTemperature' | 'id'>
  >
  groupDimmer?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationGroupDimmerArgs, 'dimmer' | 'id'>
  >
  groupHue?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationGroupHueArgs, 'hue' | 'id'>
  >
  groupOnOff?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationGroupOnOffArgs, 'id' | 'onOff'>
  >
  groupSaturation?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationGroupSaturationArgs, 'id' | 'saturation'>
  >
  login?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'password'>
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

export type Resolvers<ContextType = Context> = ResolversObject<{
  Accessory?: AccessoryResolvers<ContextType>
  Group?: GroupResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Scene?: SceneResolvers<ContextType>
}>

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  loggedIn?: LoggedInDirectiveResolver<any, any, ContextType>
}>
