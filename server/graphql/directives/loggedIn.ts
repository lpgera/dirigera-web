import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'
import { gql, AuthenticationError } from 'apollo-server'

export const loggedInDirectiveTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const loggedInDirective = getDirective(
        schema,
        fieldConfig,
        'loggedIn'
      )?.[0]

      if (loggedInDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = async function (...resolverArgs) {
          const [, , { isLoggedIn }] = resolverArgs
          if (!isLoggedIn) {
            throw new AuthenticationError(
              'You must be logged in to access this resource.'
            )
          }
          return await resolve.apply(this, resolverArgs)
        }
        return fieldConfig
      }

      return fieldConfig
    },
  })

export const type = gql`
  directive @loggedIn on FIELD_DEFINITION | MUTATION
`
