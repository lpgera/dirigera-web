import React, { useEffect, useState } from 'react'
import { Col, Row, Slider, Switch, Typography } from 'antd'
import { BsBatteryFull } from 'react-icons/bs'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { AccessoryType } from './graphql.types'

export type AccessoryProps = {
  id: number
  name: string
  type: AccessoryType
  dimmer?: number | null
  onOff?: boolean | null
  battery?: number | null
}

type Props = AccessoryProps & {
  refetch: () => void
}

const Accessory = (props: Props) => {
  const [value, setValue] = useState(0)
  useEffect(() => {
    setValue(props.dimmer ?? 0)
  }, [props.dimmer])

  const [accessoryOnOff] = useMutation(
    gql`
      mutation AccessoryOnOff($id: Int!, $onOff: Boolean!) {
        accessoryOnOff(id: $id, onOff: $onOff)
      }
    `
  )
  const [accessoryDimmer] = useMutation(
    gql`
      mutation AccessoryDimmer($id: Int!, $dimmer: Float!) {
        accessoryDimmer(id: $id, dimmer: $dimmer)
      }
    `
  )

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
            value={value}
            onChange={(newValue) => setValue(newValue as number)}
            onAfterChange={async (newValue) => {
              await accessoryDimmer({
                variables: { id: props.id, dimmer: newValue as number },
              })
              setTimeout(() => props.refetch(), 3000)
            }}
          />
        </>
      )
    case AccessoryType.Plug:
      return (
        <>
          <Typography.Paragraph>{props.name}</Typography.Paragraph>
          <Switch
            size="small"
            checked={props.onOff ?? false}
            onChange={async (newValue) => {
              await accessoryOnOff({
                variables: { id: props.id, onOff: newValue },
              })
              setTimeout(() => props.refetch(), 500)
            }}
          />
        </>
      )
  }
  return null
}

export default Accessory
