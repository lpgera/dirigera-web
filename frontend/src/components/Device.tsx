import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, Row, Slider, Switch } from 'antd'
import { BsBatteryFull } from 'react-icons/bs'
import { FaPlay, FaPause } from 'react-icons/fa'
import Color from './Color'
import { gql, useMutation } from '@apollo/client'
import type {
  SetColorHueAndSaturationMutation,
  SetColorHueAndSaturationMutationVariables,
  SetColorTemperatureMutation,
  SetColorTemperatureMutationVariables,
  SetIsOnMutation,
  SetIsOnMutationVariables,
  SetLightLevelMutation,
  SetLightLevelMutationVariables,
  SetPlaybackMutation,
  SetPlaybackMutationVariables,
  SetVolumeMutation,
  SetVolumeMutationVariables,
} from './Device.types.gen'
import type { ControlType } from '../graphql.types'

const SET_IS_ON_MUTATION = gql`
  mutation SetIsOn($id: String!, $type: ControlType!, $isOn: Boolean!) {
    setIsOn(id: $id, type: $type, isOn: $isOn)
  }
`

const SET_LIGHT_LEVEL_MUTATION = gql`
  mutation SetLightLevel($id: String!, $type: ControlType!, $lightLevel: Int!) {
    setLightLevel(id: $id, type: $type, lightLevel: $lightLevel)
  }
`

const SET_COLOR_TEMPERATURE_MUTATION = gql`
  mutation SetColorTemperature(
    $id: String!
    $type: ControlType!
    $colorTemperature: Int!
  ) {
    setColorTemperature(
      id: $id
      type: $type
      colorTemperature: $colorTemperature
    )
  }
`

const SET_COLOR_HUE_AND_SATURATION_MUTATION = gql`
  mutation SetColorHueAndSaturation(
    $id: String!
    $type: ControlType!
    $colorHue: Float!
    $colorSaturation: Float!
  ) {
    setColorHueAndSaturation(
      id: $id
      type: $type
      colorHue: $colorHue
      colorSaturation: $colorSaturation
    )
  }
`

const SET_PLAYBACK_MUTATION = gql`
  mutation SetPlayback($id: String!, $type: ControlType!, $playback: String!) {
    setPlayback(id: $id, type: $type, playback: $playback)
  }
`

const SET_VOLUME_MUTATION = gql`
  mutation SetVolume($id: String!, $type: ControlType!, $volume: Int!) {
    setVolume(id: $id, type: $type, volume: $volume)
  }
`

const Device = ({
  device,
}: {
  device: {
    id: string
    name: string
    type: ControlType
    isReachable: boolean
    batteryPercentage?: number | null
    isOn?: boolean | null
    lightLevel?: number | null
    colorTemperature?: number | null
    colorSaturation?: number | null
    colorHue?: number | null
    playback?: string | null
    volume?: number | null
    playItem?: string | null
    playItemImageURL?: string | null
    nextPlayItem?: string | null
  }
}) => {
  const [lightLevelValue, setLightLevelValue] = useState(
    device.lightLevel ?? null
  )
  const [colorTemperatureValue, setColorTemperatureValue] = useState(
    device.colorTemperature ?? null
  )
  const [colorSaturationValue, setColorSaturationValue] = useState(
    device.colorSaturation ?? null
  )
  const [colorHueValue, setColorHueValue] = useState(device.colorHue ?? null)
  useEffect(() => {
    setLightLevelValue(device.lightLevel ?? null)
  }, [device.lightLevel])
  useEffect(() => {
    setColorTemperatureValue(device.colorTemperature ?? null)
  }, [device.colorTemperature])
  useEffect(() => {
    setColorSaturationValue(device.colorSaturation ?? null)
  }, [device.colorSaturation])
  useEffect(() => {
    setColorHueValue(device.colorHue ?? null)
  }, [device.colorHue])

  const [setIsOn] = useMutation<SetIsOnMutation, SetIsOnMutationVariables>(
    SET_IS_ON_MUTATION
  )
  const [setLightLevel] = useMutation<
    SetLightLevelMutation,
    SetLightLevelMutationVariables
  >(SET_LIGHT_LEVEL_MUTATION)
  const [setColorTemperature] = useMutation<
    SetColorTemperatureMutation,
    SetColorTemperatureMutationVariables
  >(SET_COLOR_TEMPERATURE_MUTATION)
  const [setColorHueAndSaturation] = useMutation<
    SetColorHueAndSaturationMutation,
    SetColorHueAndSaturationMutationVariables
  >(SET_COLOR_HUE_AND_SATURATION_MUTATION)
  const [setPlayback] = useMutation<
    SetPlaybackMutation,
    SetPlaybackMutationVariables
  >(SET_PLAYBACK_MUTATION)
  const [setVolume] = useMutation<
    SetVolumeMutation,
    SetVolumeMutationVariables
  >(SET_VOLUME_MUTATION)

  return (
    <Card title={device.name}>
      <Row align="middle" gutter={[8, 8]}>
        {device.batteryPercentage != null && (
          <Col>
            <BsBatteryFull size={22} style={{ verticalAlign: 'middle' }} />{' '}
            {device.batteryPercentage}%
          </Col>
        )}

        {device.isOn != null && (
          <Col>
            <Switch
              style={{ marginTop: '9px', marginBottom: '9px' }}
              size="small"
              checked={device.isOn}
              disabled={!device.isReachable}
              onChange={async (newValue) => {
                await setIsOn({
                  variables: {
                    id: device.id,
                    type: device.type,
                    isOn: newValue,
                  },
                })
              }}
              title={`Toggle ${device.name}`}
            />
          </Col>
        )}

        {lightLevelValue != null && (
          <Col flex="auto">
            <Slider
              min={1}
              max={100}
              value={lightLevelValue}
              disabled={!device.isReachable}
              onChange={(newValue: number) => setLightLevelValue(newValue)}
              onAfterChange={async (newValue: number) => {
                await setLightLevel({
                  variables: {
                    id: device.id,
                    type: device.type,
                    lightLevel: newValue,
                  },
                })
              }}
            />
          </Col>
        )}

        {colorTemperatureValue != null && (
          <Col flex="0">
            <Color
              colorTemperature={colorTemperatureValue}
              hue={colorHueValue}
              saturation={colorSaturationValue}
              disabled={!device.isReachable}
              onColorTemperatureChange={async (newValue) => {
                setColorTemperatureValue(newValue)
                await setColorTemperature({
                  variables: {
                    id: device.id,
                    type: device.type,
                    colorTemperature: newValue,
                  },
                })
              }}
              onHueChange={async (newValue) => {
                setColorHueValue(newValue)
                await setColorHueAndSaturation({
                  variables: {
                    id: device.id,
                    type: device.type,
                    colorHue: newValue,
                    colorSaturation: device.colorSaturation ?? 1,
                  },
                })
              }}
              onSaturationChange={async (newValue) => {
                setColorSaturationValue(newValue)
                await setColorHueAndSaturation({
                  variables: {
                    id: device.id,
                    type: device.type,
                    colorHue: device.colorHue ?? 0,
                    colorSaturation: newValue,
                  },
                })
              }}
            />
          </Col>
        )}

        {device.playback != null && (
          <Col>
            <Button
              shape={'circle'}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              loading={device.playback === 'playbackBuffering'}
              disabled={
                !device.isReachable ||
                !['playbackPaused', 'playbackPlaying'].includes(device.playback)
              }
              icon={
                device.playback === 'playbackPlaying' ? <FaPause /> : <FaPlay />
              }
              onClick={async () => {
                if (device.playback === 'playbackPaused') {
                  return await setPlayback({
                    variables: {
                      id: device.id,
                      type: device.type,
                      playback: 'playbackPlaying',
                    },
                  })
                }

                await setPlayback({
                  variables: {
                    id: device.id,
                    type: device.type,
                    playback: 'playbackPaused',
                  },
                })
              }}
            />
          </Col>
        )}

        {device.volume != null && (
          <Col flex="auto">
            <Slider
              min={0}
              max={100}
              value={device.volume}
              disabled={!device.isReachable}
              onChange={async (newValue: number) => {
                await setVolume({
                  variables: {
                    id: device.id,
                    type: device.type,
                    volume: newValue,
                  },
                })
              }}
            />
          </Col>
        )}

        {device.playItem != null && (
          <Col style={{ textAlign: 'center', flexBasis: '100%' }}>
            Now playing: {device.playItem}
          </Col>
        )}

        {device.nextPlayItem != null && (
          <Col style={{ textAlign: 'center', flexBasis: '100%' }}>
            Next: {device.nextPlayItem}
          </Col>
        )}

        {device.playItemImageURL != null && (
          <Col flex="auto">
            <Image preview={false} src={device.playItemImageURL} />
          </Col>
        )}
      </Row>
    </Card>
  )
}

export default Device
