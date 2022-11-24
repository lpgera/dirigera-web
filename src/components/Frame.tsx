import { Col, Layout, Row, Typography } from 'antd'
import { BsFillHouseFill } from 'react-icons/bs'
import Groups from './Groups'
import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import Login from './Login'
import Logout from './Logout'

const Frame = () => {
  const { state: authState } = useContext(AuthContext)
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'rgb(30 30 30)' }}>
      <Layout.Content style={{ margin: '16px' }}>
        <Typography.Title>
          <Row gutter={[8, 8]} style={{ fontSize: 'inherit' }}>
            <Col flex="0" style={{ fontSize: 'inherit' }}>
              <BsFillHouseFill
                size="1.1em"
                style={{
                  backgroundColor: '#0059aa',
                  color: '#fbd910',
                  verticalAlign: 'text-bottom',
                }}
              />
            </Col>
            <Col flex="auto" style={{ fontSize: 'inherit' }}>
              Tradfri web UI
            </Col>
            <Col flex="0" style={{ fontSize: 'inherit' }}>
              <Logout />
            </Col>
          </Row>
        </Typography.Title>
        {authState.token ? <Groups /> : <Login />}
      </Layout.Content>
    </Layout>
  )
}

export default Frame
