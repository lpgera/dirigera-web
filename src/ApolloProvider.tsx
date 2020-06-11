import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: 'http://localhost:5678/grapqhl',
})

const Provider: React.FC = (props) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}

export default Provider
