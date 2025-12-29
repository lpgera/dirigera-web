import React from 'react'
import { Card, Col, Row, Tooltip } from 'antd'
import type { ControlType } from '../graphql.types'
import IsOn from './deviceControls/IsOn'
import LightLevel from './deviceControls/LightLevel'
import Volume from './deviceControls/Volume'
import LightColor from './deviceControls/LightColor'
import Playback from './deviceControls/Playback'
import Battery from './deviceControls/Battery'
import PlayItemImage from './deviceControls/PlayItemImage'
import { MdOutlineWarningAmber } from 'react-icons/md'

const roundToTwoDecimals = (number: number) => {
  return Math.round((number + Number.EPSILON) * 100) / 100
}

const Device = ({
  id,
  name,
  type,
  isReachable,
  lastSeen,
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
  co2,
  isOpen,
  isDetected,
  illuminance,
}: {
  id: string
  name: string
  type: ControlType
  isReachable: boolean
  lastSeen: string
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
  co2?: number | null
  isOpen?: boolean | null
  isDetected?: boolean | null
  illuminance?: number | null
}) => {
  return (
    <Card
      title={name}
      extra={
        isReachable ? null : (
          <Tooltip
            title={`Device is unreachable. Last seen: ${new Date(lastSeen).toLocaleString()}`}
          >
            <MdOutlineWarningAmber
              size={'18px'}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </Tooltip>
        )
      }
    >
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

      {batteryPercentage != null && (
        <Row>
          <Col>
            <Battery batteryPercentage={batteryPercentage} />
          </Col>
        </Row>
      )}

      {isOpen != null && (
        <Row>
          <Col>
            <div>{isOpen ? 'Open' : 'Closed'}</div>
          </Col>
        </Row>
      )}

      {temperature != null && (
        <Row>
          <Col>
            <div>Temperature: {roundToTwoDecimals(temperature)}°C</div>
          </Col>
        </Row>
      )}

      {humidity != null && (
        <Row>
          <Col>
            <div>Humidity: {roundToTwoDecimals(humidity)}%</div>
          </Col>
        </Row>
      )}

      {pm25 != null && (
        <Row>
          <Col>
            <div>
              PM<sub>2.5</sub>: {pm25} μg/m<sup>3</sup>
            </div>
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

      {co2 != null && (
        <Row>
          <Col>
            <div>
              CO<sub>2</sub>: {co2} ppm
            </div>
          </Col>
        </Row>
      )}

      {isDetected != null && (
        <Row>
          <Col>
            <div>Motion detected: {isDetected ? 'yes' : 'no'}</div>
          </Col>
        </Row>
      )}

      {illuminance != null && (
        <Row>
          <Col>
            <div>Illumninance: {illuminance}</div>
          </Col>
        </Row>
      )}
    </Card>
  )
}

export default Device
