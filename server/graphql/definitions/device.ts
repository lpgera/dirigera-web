import { gql } from 'apollo-server'
import { Resolvers } from '../resolvers.gen'

export const typeDefs = gql`
  type Device {
    id: Int!
  }
  extend type Query {
    devices: [Device!]!
  }
`

export const resolvers: Resolvers = {
  Query: {
    devices: () => {
      return [
        {
          id: 1,
        },
      ]
    },
  },
}
