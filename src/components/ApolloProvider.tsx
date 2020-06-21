import React, { useContext } from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from '@apollo/react-hooks'
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
            ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}/graphql`
            : 'graphql',
        credentials: 'same-origin',
        headers: {
          'x-token': window.localStorage.getItem('token'),
        },
      }),
    ]),
    cache: new InMemoryCache(),
  })

const Provider: React.FC = (props) => {
  const authContext = useContext(AuthContext)
  return (
    <ApolloProvider client={client(authContext)}>
      {props.children}
    </ApolloProvider>
  )
}

export default Provider
