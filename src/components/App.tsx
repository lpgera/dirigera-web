import React from 'react'
import 'antd/dist/antd.dark.min.css'
import ApolloProvider from './ApolloProvider'
import { AuthProvider } from './AuthContext'
import Frame from './Frame'

function App() {
  return (
    <AuthProvider>
      <ApolloProvider>
        <Frame />
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
