import React from 'react'
import ApolloProvider from './ApolloProvider'
import { AuthProvider } from './AuthContext'
import Frame from './Frame'
import { ConfigProvider, theme } from 'antd'
import 'antd/dist/reset.css'

function App() {
  return (
    <AuthProvider>
      <ApolloProvider>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
          <Frame />
        </ConfigProvider>
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
