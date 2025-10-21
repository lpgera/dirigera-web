import React from 'react'
import { Col, Row } from 'antd'
import RoomCard from './RoomCard'
import { Room } from '../graphql.types'

interface Device {
  id: string
  name: string
  type: string
  isReachable: boolean
  batteryPercentage: number | null | undefined
  isOn: boolean | null
  lightLevel: number | null
  colorTemperature: number | null
  colorHue: number | null
  colorSaturation: number | null
}

interface RoomsGridProps {
  rooms: Room[]
  columnSizes: Record<string, number>
}

const RoomsGrid: React.FC<RoomsGridProps> = ({ rooms, columnSizes }) => {
  return (
    <Row gutter={[16, 16]}>
      {rooms.map((room) => (
        <Col key={room.id} {...columnSizes}>
          <RoomCard room={room} />
        </Col>
      ))}
    </Row>
  )
}

export default RoomsGrid
