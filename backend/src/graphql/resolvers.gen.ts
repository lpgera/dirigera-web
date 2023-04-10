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

export type Mutation = {
  __typename?: 'Mutation'
  _?: Maybe<Scalars['String']>
  activateScene?: Maybe<Scalars['String']>
  login?: Maybe<Scalars['String']>
  quickControl: Scalars['Boolean']
}

export type MutationActivateSceneArgs = {
  id: Scalars['String']
}

export type MutationLoginArgs = {
  password: Scalars['String']
}

export type MutationQuickControlArgs = {
  id: Scalars['String']
  isOn: Scalars['Boolean']
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
  isOn: Scalars['Boolean']
  isReachable: Scalars['Boolean']
  name: Scalars['String']
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
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
  QuickControl: ResolverTypeWrapper<QuickControl>
  QuickControlType: QuickControlType
  Room: ResolverTypeWrapper<Room>
  Scene: ResolverTypeWrapper<Scene>
  String: ResolverTypeWrapper<Scalars['String']>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']
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
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationQuickControlArgs, 'id' | 'isOn' | 'type'>
  >
}>

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  rooms?: Resolver<Array<ResolversTypes['Room']>, ParentType, ContextType>
  scenes?: Resolver<Array<ResolversTypes['Scene']>, ParentType, ContextType>
}>

export type QuickControlResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['QuickControl'] = ResolversParentTypes['QuickControl']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isOn?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isReachable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['QuickControlType'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type RoomResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']
> = ResolversObject<{
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
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  QuickControl?: QuickControlResolvers<ContextType>
  Room?: RoomResolvers<ContextType>
  Scene?: SceneResolvers<ContextType>
}>

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  loggedIn?: LoggedInDirectiveResolver<any, any, ContextType>
}>
