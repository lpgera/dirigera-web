import React, { ReactNode, useContext } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  CombinedGraphQLErrors,
} from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { persistCache } from 'apollo3-cache-persist'
import { AuthContext, AuthContextType } from './AuthContext'
import { ErrorLink } from '@apollo/client/link/error'

const cache = new InMemoryCache()

persistCache({
  cache,
  storage: window.localStorage,
}).catch(console.error)

const client = (authContext: AuthContextType) =>
  new ApolloClient({
    link: ApolloLink.from([
      new ErrorLink(({ error }) => {
        if (
          CombinedGraphQLErrors.is(error) &&
          error.errors?.some((err) =>
            err.message.includes(
              'You must be logged in to access this resource.'
            )
          )
        ) {
          authContext.dispatch({ type: 'logout' })
        }
        console.error(error)
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
