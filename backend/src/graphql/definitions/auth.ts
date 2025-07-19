import { gql } from 'graphql-tag'
import type { Resolvers } from '../resolvers.gen.ts'
import tsEnv from '@lpgera/ts-env'
import { sign } from '../../jwt.ts'

const PASSWORD = tsEnv.stringOrThrow('PASSWORD')

export const typeDefs = gql`
  extend type Mutation {
    login(password: String!): String
  }
`

export const resolvers: Resolvers = {
  Mutation: {
    login: (_, { password }) => {
      if (password === PASSWORD) {
        return sign()
      }
      return null
    },
  },
}
