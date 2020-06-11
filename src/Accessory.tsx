import React from 'react'
import { AccessoryType } from './graphql.types'
import { Slider, Switch, Typography } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons'

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
        <>
          {props.name} - {props.battery}%
        </>
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
