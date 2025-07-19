import { gql } from 'graphql-tag'

export const typeDefs = gql`
  enum ControlType {
    DEVICE
    DEVICE_SET
  }
`

export const resolvers = {}
