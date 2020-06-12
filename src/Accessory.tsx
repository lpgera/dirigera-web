import React from 'react'
import { AccessoryType } from './graphql.types'
import { Col, Row, Slider, Switch, Typography } from 'antd'
import { BsBatteryFull } from 'react-icons/bs'

export type AccessoryProps = {
  id: number
  name: string
  type: AccessoryType
  dimmer?: number | null
  onOff?: boolean | null
  battery?: number | null
}

const Accessory = (props: AccessoryProps) => {
  switch (props.type) {
    case AccessoryType.Remote:
    case AccessoryType.MotionSensor:
      return (
        <Row>
          <Col flex={'auto'}>{props.name}</Col>
          <Col flex={'50px'}>
            <BsBatteryFull style={{ verticalAlign: 'middle' }} />{' '}
            {props.battery}%
          </Col>
        </Row>
      )
    case AccessoryType.Lightbulb:
      return (
        <>
          <Typography.Paragraph>{props.name}</Typography.Paragraph>
          <Slider
            min={0}
            max={100}
            value={props.dimmer ?? undefined}
            // onChange={(newValue) => setValue(newValue as number)}
          />
        </>
      )
    case AccessoryType.Plug:
      return (
        <>
          <Typography.Paragraph>{props.name}</Typography.Paragraph>
          <Switch size="small" checked={props.onOff ?? false} />
        </>
      )
  }
  return null
}

export default Accessory
