import { gql } from 'apollo-server'
import { Resolvers } from '../resolvers.gen'
import delay from 'delay'

export const typeDefs = gql`
  type Scene {
    id: Int!
    name: String!
  }

  extend type Query {
    scenes: [Scene!]! @loggedIn
  }

  extend type Mutation {
    activateScene(id: Int!): String @loggedIn
  }
`

export const resolvers: Resolvers = {
  Query: {
    scenes: (_, __, { tradfriClient }) => {
      return Object.values(tradfriClient.groups)
        .filter(({ group }) => group.name === 'SuperGroup')
        .flatMap(({ scenes }) => Object.values(scenes))
        .map(({ instanceId, name }) => ({
          id: instanceId,
          name: name === 'ALLOFF' ? 'All off' : name,
        }))
    },
  },
  Mutation: {
    activateScene: async (_, { id }, { tradfriClient }) => {
      const superGroup = Object.values(tradfriClient.groups).find(
        ({ group }) => group.name === 'SuperGroup'
      )?.group
      if (!superGroup) {
        throw new Error(`Couldn't find SuperGroup`)
      }
      await tradfriClient.operateGroup(
        superGroup,
        {
          sceneId: id,
        },
        true
      )
      await delay(500)
      return null
    },
  },
}
