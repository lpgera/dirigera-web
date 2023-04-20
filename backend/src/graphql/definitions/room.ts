import gql from 'graphql-tag'
import { type Resolvers } from '../resolvers.gen'

export const typeDefs = gql`
  type Room {
    id: String!
    name: String!
  }

  extend type Query {
    rooms: [Room!]! @loggedIn
  }
`

export const resolvers: Resolvers = {
  Query: {
    rooms: async (_, __, { dirigeraClient }) => {
      const rooms = await dirigeraClient.rooms.list()

      return rooms
        .map(({ id, name }) => ({
          id,
          name,
          quickControls: [],
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
    },
  },
}
