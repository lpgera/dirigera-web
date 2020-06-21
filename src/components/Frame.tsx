import { Layout, Typography } from 'antd'
import { BsFillHouseFill } from 'react-icons/bs'
import Groups from './group/Groups'
import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import Login from './Login'

const Frame = () => {
  const { state: authState } = useContext(AuthContext)
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Content style={{ margin: '16px' }}>
        <Typography.Title>
          <BsFillHouseFill
            size="1.1em"
            style={{
              backgroundColor: '#0059aa',
              color: '#fbd910',
              verticalAlign: 'text-bottom',
            }}
          />{' '}
          Tradfri web UI
        </Typography.Title>
        {authState.token ? <Groups /> : <Login />}
      </Layout.Content>
    </Layout>
  )
}

export default Frame
