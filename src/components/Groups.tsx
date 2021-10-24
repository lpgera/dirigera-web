import React, { useEffect } from 'react'
import { Card, Col, Result, Row, Skeleton } from 'antd'
import { useQuery, gql } from '@apollo/client'
import useWebSocket from 'react-use-websocket'
import Group from './Group'
import { GroupsQuery } from './Groups.types.gen'
import Scenes from './Scenes'

const columnSizes = {
  xs: 12,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 4,
  xxl: 3,
}

const wsUrl = (() => {
  const { href, protocol, port } = window.location
  const url = new URL('ws', href)
  url.protocol = protocol.replace('http', 'ws')
  url.port =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_SERVER_PORT ?? port
      : port
  return url.toString()
})()

export const GROUPS_QUERY = gql`
  query Groups {
    groups {
      id
      name
      accessories {
        id
        name
        type
        alive
        onOff
        dimmer
        battery
        colorTemperature
      }
    }
  }
`

const Groups = () => {
  const { data, refetch, loading, error } = useQuery<GroupsQuery>(GROUPS_QUERY)

  const { lastMessage } = useWebSocket(wsUrl, {
    shouldReconnect: () => true,
  })

  useEffect(() => {
    refetch()?.catch(console.error)
  }, [lastMessage, refetch])

  useEffect(() => {
    const listener = () => {
      if (!document.hidden) {
        refetch()?.catch(console.error)
      }
    }
    window.addEventListener('visibilitychange', listener)
    return () => {
      window.removeEventListener('visibilitychange', listener)
    }
  }, [refetch])

  const groups = data?.groups ?? []

  return (
    <>
      <Scenes />
      <Row gutter={[16, 16]}>
        {loading ? (
          <Col key="loading" {...columnSizes}>
            <Card>
              <Skeleton active={true} />
            </Card>
          </Col>
        ) : error ? (
          <Col span={24}>
            <Result status="error" title="Error" subTitle={error.message} />
          </Col>
        ) : (
          groups.map((group) => (
            <Col key={group.id} {...columnSizes}>
              <Group {...group} />
            </Col>
          ))
        )}
      </Row>
    </>
  )
}

export default Groups
