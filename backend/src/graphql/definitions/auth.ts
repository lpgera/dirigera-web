import { gql } from 'graphql-tag'
import type { Resolvers } from '../resolvers.gen.ts'
import tsEnv from '@lpgera/ts-env'
import { sign } from '../../jwt.ts'
import { GraphQLError } from 'graphql/index'

const PASSWORD = tsEnv.stringOrThrow('PASSWORD')

export const typeDefs = gql`
  extend type Mutation {
    login(password: String!): String
  }
`

export const resolvers: Resolvers = {
  Mutation: {
    login: (_, { password }) => {
      if (password !== PASSWORD) {
        throw new GraphQLError('Invalid credentials.', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        })
      }

      return sign()
    },
  },
}
