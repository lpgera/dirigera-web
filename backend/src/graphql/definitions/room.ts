import { gql } from 'graphql-tag'
import { type Resolvers } from '../resolvers.gen.ts'

export const typeDefs = gql`
  type Room {
    id: String!
    name: String!
  }

  extend type Query {
    rooms: [Room!]! @loggedIn
    room(id: String!): Room @loggedIn
  }
`

export const resolvers: Resolvers = {
  Query: {
    rooms: async (_, __, { homeState: { rooms } }) => {
      return rooms
        .map(({ id, name }) => ({
          id,
          name,
          quickControls: [],
          devices: [],
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
    },
    room: async (_, { id }, { homeState: { rooms } }) => {
      const room = rooms.find((r) => r.id === id)

      if (!room) {
        return null
      }

      return {
        id,
        name: room.name,
        quickControls: [],
        devices: [],
      }
    },
  },
}
