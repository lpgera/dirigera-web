import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'development'
      ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}/graphql`
      : 'graphql',
})

const Provider: React.FC = (props) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}

export default Provider
