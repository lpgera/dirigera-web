import React, { useState } from 'react'
import { Button, Card, Col, Result, Row, Skeleton, Tag } from 'antd'
import { gql } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client/react'
import {
  MdOutlineSpeaker,
  MdLightbulbOutline,
  MdOutlineOutlet,
  MdOutlineSettings,
} from 'react-icons/md'

import { useNavigate } from 'react-router-dom'
import type {
  QuickControlMutation,
  QuickControlMutationVariables,
  RoomsQuery,
} from './Rooms.types.gen'
import Scenes from './Scenes'
import { useRefetch } from '../useRefetch'

const columnSizes = {
  xs: 12,
  sm: 12,
  md: 8,
  lg: 8,
  xl: 6,
  xxl: 4,
}

const roundToOneDecimal = (number: number) => {
  return Math.round((number + Number.EPSILON) * 10) / 10
}

export const ROOMS_QUERY = gql`
  query Rooms {
    rooms {
      id
      name
      quickControls {
        id
        type
        isOn
      }
      temperature
      humidity
      pm25
      vocIndex
      co2
    }
  }
`

const QUICK_CONTROL_MUTATION = gql`
  mutation QuickControl(
    $roomId: String!
    $type: QuickControlType!
    $isOn: Boolean
  ) {
    quickControl(roomId: $roomId, type: $type, isOn: $isOn)
  }
`

const Rooms = () => {
  const navigate = useNavigate()

  const { data, refetch, error } = useQuery<RoomsQuery>(ROOMS_QUERY)

  const [loadingQuickControlIds, setLoadingQuicControlIds] = useState<
    Record<string, boolean>
  >({})

  const [quickControl] = useMutation<
    QuickControlMutation,
    QuickControlMutationVariables
  >(QUICK_CONTROL_MUTATION)

  useRefetch(refetch)

  const rooms = data?.rooms ?? []

  return (
    <>
      <Scenes />
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
          rooms.map((room) => (
            <Col key={room.id} {...columnSizes}>
              <Card
                title={room.name}
                extra={
                  <Button
                    shape="circle"
                    onClick={() => navigate(`room/${room.id}`)}
                    icon={
                      <MdOutlineSettings
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      />
                    }
                  />
                }
              >
                <Row align="middle" gutter={[8, 8]}>
                  {(room.temperature != null ||
                    room.humidity != null ||
                    room.pm25 != null ||
                    room.vocIndex != null ||
                    room.co2 != null) && (
                    <Col span={24} style={{ padding: 0, marginBottom: 8 }}>
                      <Row gutter={[8, 8]}>
                        {room.temperature != null && (
                          <Col>
                            <Tag variant="outlined">
                              {roundToOneDecimal(room.temperature)}°C
                            </Tag>
                          </Col>
                        )}
                        {room.humidity != null && (
                          <Col>
                            <Tag variant="outlined">
                              {roundToOneDecimal(room.humidity)}%
                            </Tag>
                          </Col>
                        )}
                        {room.pm25 != null && (
                          <Col>
                            <Tag variant="outlined">
                              PM<sub>2.5</sub> {roundToOneDecimal(room.pm25)}
                            </Tag>
                          </Col>
                        )}
                        {room.vocIndex != null && (
                          <Col>
                            <Tag variant="outlined">
                              VOC {roundToOneDecimal(room.vocIndex)}
                            </Tag>
                          </Col>
                        )}
                        {room.co2 != null && (
                          <Col>
                            <Tag variant="outlined">
                              CO<sub>2</sub> {roundToOneDecimal(room.co2)}
                            </Tag>
                          </Col>
                        )}
                      </Row>
                    </Col>
                  )}
                  {room.quickControls.length === 0 && (
                    <>No quick controls available</>
                  )}
                  <Row gutter={[8, 8]}>
                    {room.quickControls.map((qc) => (
                      <Col>
                        <Button
                          key={qc.id}
                          shape="circle"
                          loading={Boolean(loadingQuickControlIds[qc.id])}
                          type={qc.isOn ? 'primary' : 'default'}
                          onClick={async () => {
                            setLoadingQuicControlIds((prev) => ({
                              ...prev,
                              [qc.id]: true,
                            }))
                            await quickControl({
                              variables: {
                                roomId: room.id,
                                type: qc.type,
                                isOn: qc.isOn != null ? !qc.isOn : null,
                              },
                            })
                            setLoadingQuicControlIds((prev) => ({
                              ...prev,
                              [qc.id]: false,
                            }))
                          }}
                          icon={
                            qc.type === 'LIGHTS' ? (
                              <MdLightbulbOutline />
                            ) : qc.type === 'OUTLETS' ? (
                              <MdOutlineOutlet />
                            ) : qc.type === 'SPEAKERS' ? (
                              <MdOutlineSpeaker />
                            ) : null
                          }
                        />
                      </Col>
                    ))}
                  </Row>
                </Row>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </>
  )
}

export default Rooms
