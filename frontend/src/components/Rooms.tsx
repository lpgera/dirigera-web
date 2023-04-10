import React, { useEffect } from 'react'
import { Button, Card, Col, Result, Row, Skeleton } from 'antd'
import { useQuery, gql, useMutation } from '@apollo/client'
import useWebSocket from 'react-use-websocket'
import { GoSettings } from 'react-icons/go'
import {
  QuickControlMutation,
  QuickControlMutationVariables,
  RoomsQuery,
} from './Rooms.types.gen'
import Scenes from './Scenes'

const columnSizes = {
  xs: 12,
  sm: 12,
  md: 8,
  lg: 8,
  xl: 6,
  xxl: 4,
}

const buttonStyles = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const wsUrl = (() => {
  const { href, protocol, port } = window.location
  const url = new URL('websocket', href)
  url.protocol = protocol.replace('http', 'ws')
  url.port = port
  return url.toString()
})()

export const ROOMS_QUERY = gql`
  query Rooms {
    rooms {
      id
      name
      quickControls {
        id
        name
        isReachable
        isOn
        type
      }
    }
  }
`

const QUICK_CONTROL_MUTATION = gql`
  mutation QuickControl(
    $id: String!
    $type: QuickControlType!
    $isOn: Boolean!
  ) {
    quickControl(id: $id, type: $type, isOn: $isOn)
  }
`

const Rooms = () => {
  const { data, refetch, loading, error } = useQuery<RoomsQuery>(ROOMS_QUERY)

  // quick control mutation
  const [quickControl, { loading: quickControlLoading }] = useMutation<
    QuickControlMutation,
    QuickControlMutationVariables
  >(QUICK_CONTROL_MUTATION)

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

  const rooms = data?.rooms ?? []

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
          <>
            {rooms.map((room) => (
              <Col key={room.id} {...columnSizes}>
                <Card
                  title={room.name}
                  extra={
                    <Button
                      shape={'circle'}
                      disabled={true}
                      icon={
                        <>
                          <GoSettings
                            size="1.1em"
                            style={{
                              verticalAlign: 'text-bottom',
                            }}
                          />
                        </>
                      }
                    />
                  }
                >
                  <Row align="middle" gutter={[8, 8]}>
                    {room.quickControls.map((qc) => (
                      <Button
                        key={qc.id}
                        block
                        style={buttonStyles}
                        disabled={!qc.isReachable || quickControlLoading}
                        type={qc.isOn ? 'primary' : 'default'}
                        onClick={() =>
                          quickControl({
                            variables: {
                              id: qc.id,
                              type: qc.type,
                              isOn: !qc.isOn,
                            },
                          })
                        }
                      >
                        {qc.name}
                      </Button>
                    ))}
                  </Row>
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
    </>
  )
}

export default Rooms
