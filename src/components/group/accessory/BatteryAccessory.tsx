import React from 'react'
import { Col, Row } from 'antd'
import { BsBatteryFull } from 'react-icons/bs'

type Props = {
  name: string
  battery: number
}

const BatteryAccessory = ({ battery, name }: Props) => {
  return (
    <Row gutter={[8, 8]}>
      <Col flex="auto">{name}</Col>
      <Col flex="60px">
        <BsBatteryFull style={{ verticalAlign: 'middle' }} /> {battery}%
      </Col>
    </Row>
  )
}

export default BatteryAccessory
