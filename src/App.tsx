import React from 'react'
import { Layout, Typography } from 'antd'
import { BsFillHouseFill } from 'react-icons/bs'
import 'antd/dist/antd.css'
import ApolloProvider from './ApolloProvider'
import Groups from './Groups'

function App() {
  return (
    <ApolloProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Content style={{ margin: '16px' }}>
          <Typography.Title>
            <BsFillHouseFill
              size={'1.1em'}
              style={{
                backgroundColor: '#0059aa',
                color: '#fbd910',
                verticalAlign: 'text-bottom',
              }}
            />{' '}
            Tradfri web UI
          </Typography.Title>
          <Groups />
        </Layout.Content>
      </Layout>
    </ApolloProvider>
  )
}

export default App
