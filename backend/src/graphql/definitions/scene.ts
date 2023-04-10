import { gql } from 'apollo-server'
import type { Resolvers } from '../resolvers.gen'

export const typeDefs = gql`
  type Scene {
    id: String!
    name: String!
  }

  extend type Query {
    scenes: [Scene!]! @loggedIn
  }

  extend type Mutation {
    activateScene(id: String!): String @loggedIn
  }
`

export const resolvers: Resolvers = {
  Query: {
    scenes: async (_, __, { dirigeraClient }) => {
      const scenes = await dirigeraClient.scenes.list()
      return scenes.map((scene) => ({
        id: scene.id,
        name: scene.info.name,
      }))
    },
  },
  Mutation: {
    activateScene: async (_, { id }, { dirigeraClient }) => {
      await dirigeraClient.scenes.trigger({ id })
      return null
    },
  },
}
