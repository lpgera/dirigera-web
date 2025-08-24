import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, Col, Result, Row, Skeleton, Typography } from 'antd'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import type { RoomQuery, RoomQueryVariables } from './Room.types.gen'
import { useRefetch } from '../useRefetch'
import Device from './Device'

const columnSizes = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 8,
  xl: 6,
  xxl: 4,
}

export const ROOM_QUERY = gql`
  query Room($id: String!) {
    room(id: $id) {
      id
      name
      devices {
        id
        name
        type
        isReachable
        batteryPercentage
        isOn
        lightLevel
        colorTemperature
        colorSaturation
        colorHue
        playback
        playbackNextAvailable
        playbackPreviousAvailable
        volume
        playItem
        nextPlayItem
        temperature
        humidity
        pm25
        vocIndex
        isOpen
      }
    }
  }
`

const Room = () => {
  const { roomId } = useParams()

  const { data, refetch, error } = useQuery<RoomQuery, RoomQueryVariables>(
    ROOM_QUERY,
    {
      variables: { id: roomId ?? '' },
    }
  )

  useRefetch(refetch)

  return (
    <>
      <Typography.Title level={2}>{data?.room?.name}</Typography.Title>

      <Row gutter={[16, 16]}>
        {!data ? (
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
            {data.room?.devices.length === 0 && (
              <Col span={24}>
                <Result status="404" title="No devices" />
              </Col>
            )}
            {data.room?.devices.map((device) => (
              <Col key={device.id} {...columnSizes}>
                <Device {...device} />
              </Col>
            ))}
          </>
        )}
      </Row>
    </>
  )
}

export default Room
