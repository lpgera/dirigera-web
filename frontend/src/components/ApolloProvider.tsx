import React, { ReactNode, useContext } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { persistCache } from 'apollo3-cache-persist'
import { AuthContext, AuthContextType } from './AuthContext'

const cache = new InMemoryCache()

persistCache({
  cache,
  storage: window.localStorage,
}).catch(console.error)

const client = (authContext: AuthContextType) =>
  new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (
          graphQLErrors?.some((err) =>
            err.message.includes(
              'You must be logged in to access this resource.'
            )
          )
        ) {
          authContext.dispatch({ type: 'logout' })
        }
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          )
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`)
        }
      }),
      new HttpLink({
        uri: './graphql',
        credentials: 'same-origin',
        headers: {
          'x-token': authContext.state.token ?? '',
        },
      }),
    ]),
    cache,
  })

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const authContext = useContext(AuthContext)
  return (
    <ApolloProvider client={client(authContext)}>{children}</ApolloProvider>
  )
}

export default Provider
