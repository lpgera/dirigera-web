import React from 'react'
import { Col, Row } from 'antd'
import { BsBatteryFull } from 'react-icons/bs'

type Props = {
  name: string
  battery: number
}

const BatteryAccessory = (props: Props) => {
  return (
    <Row>
      <Col flex="auto">{props.name}</Col>
      <Col flex="0">
        <BsBatteryFull style={{ verticalAlign: 'middle' }} /> {props.battery}%
      </Col>
    </Row>
  )
}

export default BatteryAccessory
