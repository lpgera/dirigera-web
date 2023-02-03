import React, { ReactNode, useContext } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { AuthContext, AuthContextType } from './AuthContext'

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
        uri:
          process.env.NODE_ENV === 'development'
            ? `http://${window.location.hostname}:${process.env.REACT_APP_SERVER_PORT}/graphql`
            : 'graphql',
        credentials: 'same-origin',
        headers: {
          'x-token': authContext.state.token ?? '',
        },
      }),
    ]),
    cache: new InMemoryCache(),
  })

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const authContext = useContext(AuthContext)
  return (
    <ApolloProvider client={client(authContext)}>{children}</ApolloProvider>
  )
}

export default Provider
