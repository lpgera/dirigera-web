import React from 'react'
import { Card, Col, Row } from 'antd'
import type { ControlType } from '../graphql.types'
import IsOn from './deviceControls/IsOn'
import LightLevel from './deviceControls/LightLevel'
import Volume from './deviceControls/Volume'
import LightColor from './deviceControls/LightColor'
import Playback from './deviceControls/Playback'
import Battery from './deviceControls/Battery'
import PlayItemImage from './deviceControls/PlayItemImage'

const Device = ({
  id,
  name,
  type,
  isReachable,
  batteryPercentage,
  isOn,
  lightLevel,
  colorTemperature,
  colorSaturation,
  colorHue,
  playback,
  playbackNextAvailable,
  playbackPreviousAvailable,
  volume,
  playItem,
  nextPlayItem,
  temperature,
  humidity,
  pm25,
  vocIndex,
  isOpen,
}: {
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
  playbackNextAvailable?: boolean | null
  playbackPreviousAvailable?: boolean | null
  volume?: number | null
  playItem?: string | null
  nextPlayItem?: string | null
  temperature?: number | null
  humidity?: number | null
  pm25?: number | null
  vocIndex?: number | null
  isOpen?: boolean | null
}) => {
  return (
    <Card title={name}>
      <Row align="middle" gutter={[8, 8]}>
        {isOn != null && (
          <Col>
            <IsOn
              id={id}
              name={name}
              type={type}
              isReachable={isReachable}
              isOn={isOn}
            />
          </Col>
        )}

        {lightLevel != null && (
          <Col
            flex="auto"
            style={{
              minWidth: 80,
            }}
          >
            <LightLevel
              id={id}
              type={type}
              isReachable={isReachable}
              lightLevel={lightLevel}
            />
          </Col>
        )}

        {(colorTemperature != null ||
          colorHue != null ||
          colorSaturation != null) && (
          <Col>
            <LightColor
              id={id}
              type={type}
              isReachable={isReachable}
              colorTemperature={colorTemperature}
              colorHue={colorHue}
              colorSaturation={colorSaturation}
            />
          </Col>
        )}

        {playback != null && (
          <Col>
            <Playback
              id={id}
              type={type}
              isReachable={isReachable}
              playback={playback}
              playbackNextAvailable={playbackNextAvailable}
              playbackPreviousAvailable={playbackPreviousAvailable}
            />
          </Col>
        )}

        {volume != null && (
          <Col
            flex="auto"
            style={{
              minWidth: 80,
            }}
          >
            <Volume
              id={id}
              type={type}
              isReachable={isReachable}
              volume={volume}
            />
          </Col>
        )}

        {playItem != null && (
          <Col style={{ textAlign: 'center', flexBasis: '100%' }}>
            Now playing: {playItem}
          </Col>
        )}

        {nextPlayItem != null && (
          <Col style={{ textAlign: 'center', flexBasis: '100%' }}>
            Next: {nextPlayItem}
          </Col>
        )}

        {playItem != null && type === 'DEVICE' && (
          <Col flex="auto">
            <PlayItemImage id={id} />
          </Col>
        )}
      </Row>

      {isOpen != null && (
        <Row>
          <Col>
            <div>{isOpen ? 'Open' : 'Closed'}</div>
          </Col>
        </Row>
      )}

      {batteryPercentage != null && (
        <Row>
          <Col>
            <Battery batteryPercentage={batteryPercentage} />
          </Col>
        </Row>
      )}

      {temperature != null && (
        <Row>
          <Col>
            <div>Temperature: {temperature}°C</div>
          </Col>
        </Row>
      )}

      {humidity != null && (
        <Row>
          <Col>
            <div>Humidity: {humidity}%</div>
          </Col>
        </Row>
      )}

      {pm25 != null && (
        <Row>
          <Col>
            <div>PM2.5: {pm25} μg/m³</div>
          </Col>
        </Row>
      )}

      {vocIndex != null && (
        <Row>
          <Col>
            <div>tVOC Index: {vocIndex}</div>
          </Col>
        </Row>
      )}
    </Card>
  )
}

export default Device
