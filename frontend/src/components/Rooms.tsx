import React from 'react'
import {
  MdOutlineBattery0Bar,
  MdOutlineBattery1Bar,
  MdOutlineBattery2Bar,
  MdOutlineBattery3Bar,
  MdOutlineBattery4Bar,
  MdOutlineBattery5Bar,
  MdOutlineBattery6Bar,
  MdOutlineBatteryFull,
  MdOutlineBatteryUnknown,
} from 'react-icons/md'
import { Button, Card, Col, Divider, Result, Row, Skeleton } from 'antd'
import { gql } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client/react'
import { GoGear } from 'react-icons/go'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import type {
  QuickControlMutation,
  QuickControlMutationVariables,
  RoomsQuery,
} from './Rooms.types.gen'
import Scenes from './Scenes'
import { useRefetch } from '../useRefetch'
import BatteryIcon from './BatteryIcon'

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
        playback
        type
      }
      devices {
        id
        name
        isReachable
        batteryPercentage
      }
    }
  }
`

const QUICK_CONTROL_MUTATION = gql`
  mutation QuickControl(
    $id: String!
    $type: ControlType!
    $isOn: Boolean
    $playback: Playback
  ) {
    quickControl(id: $id, type: $type, isOn: $isOn, playback: $playback)
  }
`

const Rooms = () => {
  const navigate = useNavigate()

  const { data, refetch, error } = useQuery<RoomsQuery>(ROOMS_QUERY)

  const [quickControl, { loading: quickControlLoading }] = useMutation<
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
                      <InfoCircleOutlined
                        style={{ fontSize: 32, color: '#1890ff', marginTop: 2 }}
                      />
                    }
                    title="View room details"
                  />
                }
              >
                <Row align="middle" gutter={[8, 8]}>
                  {room.quickControls.length === 0 && (
                    <>No quick controls available</>
                  )}
                  {room.quickControls.map((qc) => (
                    <Button
                      key={qc.id}
                      block
                      style={buttonStyles}
                      disabled={
                        (qc.playback && qc.playback !== 'playbackPlaying') ||
                        !qc.isReachable ||
                        quickControlLoading
                      }
                      type={
                        qc.isOn || qc.playback === 'playbackPlaying'
                          ? 'primary'
                          : 'default'
                      }
                      onClick={() =>
                        quickControl({
                          variables: {
                            id: qc.id,
                            type: qc.type,
                            isOn: qc.isOn != null ? !qc.isOn : null,
                            playback:
                              qc.playback === 'playbackPlaying'
                                ? 'playbackPaused'
                                : null,
                          },
                        })
                      }
                    >
                      {qc.name}
                    </Button>
                  ))}
                </Row>
                <Divider />
                <Row>
                  {room.devices
                    .filter(
                      (device) =>
                        device.batteryPercentage !== null &&
                        device.batteryPercentage !== undefined
                    )
                    .map((device) => (
                      <Col key={device.id} style={{ marginRight: 8 }}>
                        <BatteryIcon
                          batteryPercentage={device.batteryPercentage}
                          name={device.name}
                        />
                      </Col>
                    ))}
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
