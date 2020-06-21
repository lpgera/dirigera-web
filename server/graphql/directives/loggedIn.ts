import { defaultFieldResolver, GraphQLField } from 'graphql'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import { gql, AuthenticationError } from 'apollo-server'

export class LoggedInDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...resolverArgs) {
      const [, , { isLoggedIn }] = resolverArgs
      if (!isLoggedIn) {
        throw new AuthenticationError(
          'You must be logged in to access this resource.'
        )
      }
      return await resolve.apply(this, resolverArgs)
    }
  }
}

export const type = gql`
  directive @loggedIn on FIELD_DEFINITION | MUTATION
`
