import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Slider, Switch } from 'antd'
import { BsBatteryFull } from 'react-icons/bs'
import Color from './Color'

const Device = ({
  device,
}: {
  device: {
    name: string
    type: string
    isReachable: boolean
    batteryPercentage?: number | null
    isOn?: boolean | null
    lightLevel?: number | null
    colorTemperature?: number | null
    colorSaturation?: number | null
    colorHue?: number | null
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
                // TODO call isOn mutation
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
                // TODO call light level mutation
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
                // TODO call color temperature mutation
              }}
              onHueChange={async (newValue) => {
                setColorHueValue(newValue)
                // TODO call hue mutation
              }}
              onSaturationChange={async (newValue) => {
                setColorSaturationValue(newValue)
                // TODO call saturation mutation
              }}
            />
          </Col>
        )}

        {/* TODO speaker functions */}
      </Row>
    </Card>
  )
}

export default Device
