import React from 'react'
import { BulbOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { useDeviceImages } from '../useDeviceImages'
import IsOn from './deviceControls/IsOn'
import LightLevel from './deviceControls/LightLevel'
import LightColor from './deviceControls/LightColor'
import { Device } from '../graphql.types'

interface DeviceControlProps {
  device: Device
}

const DeviceControl: React.FC<DeviceControlProps> = ({ device }) => {
  const { getDeviceImage } = useDeviceImages()
  const imagePath = getDeviceImage(device.id)

  const hasControls =
    device.isOn != null ||
    device.lightLevel != null ||
    device.colorTemperature != null ||
    device.colorHue != null ||
    device.colorSaturation != null

  return (
    <Row
      align="middle"
      gutter={8}
      style={{
        padding: '8px 0',
      }}
    >
      {/* Device Image or Icon */}
      <Col flex="none">
        {imagePath ? (
          <img
            src={imagePath}
            alt={device.name}
            style={{
              width: 50,
              height: 50,
              objectFit: 'cover',
              borderRadius: 8,
              backgroundColor: 'rgba(255, 255, 255, 1)',
              opacity: device.isReachable ? 1 : 0.5,
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: device.isReachable ? 1 : 0.5,
            }}
          >
            <BulbOutlined style={{ fontSize: 24 }} />
          </div>
        )}
      </Col>

      {/* Device Name */}
      <Col
        flex="auto"
        style={{
          fontSize: 12,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          minWidth: 0,
        }}
      >
        {device.name}
      </Col>

      {/* Device Controls */}
      {hasControls && (
        <>
          {device.isOn != null && (
            <Col flex="none">
              <IsOn
                id={device.id}
                name={device.name}
                type={device.type}
                isReachable={device.isReachable}
                isOn={device.isOn}
              />
            </Col>
          )}

          {device.lightLevel != null && (
            <Col
              flex="auto"
              style={{
                minWidth: 80,
                maxWidth: 150,
              }}
            >
              <LightLevel
                id={device.id}
                type={device.type}
                isReachable={device.isReachable}
                lightLevel={device.lightLevel}
              />
            </Col>
          )}

          {(device.colorTemperature != null ||
            device.colorHue != null ||
            device.colorSaturation != null) && (
            <Col flex="none">
              <LightColor
                id={device.id}
                type={device.type}
                isReachable={device.isReachable}
                colorTemperature={device.colorTemperature}
                colorHue={device.colorHue}
                colorSaturation={device.colorSaturation}
              />
            </Col>
          )}
        </>
      )}
    </Row>
  )
}

export default DeviceControl
