import React from 'react'
import { Layout, Typography } from 'antd'
import { HomeFilled } from '@ant-design/icons'
import 'antd/dist/antd.css'
import ApolloProvider from './ApolloProvider'
import Groups from './Groups'

function App() {
  return (
    <ApolloProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Content style={{ margin: '16px' }}>
          <Typography.Title>
            <HomeFilled
              style={{
                backgroundColor: '#0059aa',
                color: '#fbd910',
                padding: '5px',
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
