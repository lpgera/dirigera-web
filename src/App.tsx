import React from 'react'
import { Col, Layout, Row, Typography } from 'antd'
import { HomeFilled } from '@ant-design/icons'
import 'antd/dist/antd.css'
import GroupCard from './GroupCard'

function App() {
  return (
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
        <Row gutter={[16, 16]}>
          {[...Array(8)].map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
              <GroupCard />
            </Col>
          ))}
        </Row>
      </Layout.Content>
    </Layout>
  )
}

export default App
