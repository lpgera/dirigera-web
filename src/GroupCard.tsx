import React from 'react'
import { Card, Col, Collapse, Divider, Row, Slider, Switch } from 'antd'
import Accessory, { AccessoryProps } from './Accessory'

type Props = {
  id: number
  name: string
  accessories: AccessoryProps[]
}

const calculateGroupDimmer = (accessories: AccessoryProps[]) => {
  const sum = accessories.reduce(
    (accumulator, item) => accumulator + (item.dimmer ?? 0),
    0
  )
  const count = accessories.filter((a) => a.dimmer !== null).length
  return sum / count
}

const GroupCard = (props: Props) => {
  return (
    <Card title={props.name}>
      <Row align="middle">
        <Col flex="50px">
          <Switch
            size="small"
            checked={props.accessories.some((a) => a.onOff)}
            // onChange={(newValue) => setValue(newValue ? 100 : 0)}
          />
        </Col>
        <Col flex="auto">
          <Slider
            style={{ marginTop: '12px' }}
            min={0}
            max={100}
            value={calculateGroupDimmer(props.accessories)}
            // onChange={(newValue) => setValue(newValue as number)}
          />
        </Col>
      </Row>
      <Collapse style={{ marginTop: '32px' }}>
        <Collapse.Panel header="Devices" key="1">
          {props.accessories.map((accessory, index, array) => (
            <>
              <Accessory {...accessory} />
              {index !== array.length - 1 ? <Divider /> : null}
            </>
          ))}
        </Collapse.Panel>
      </Collapse>
    </Card>
  )
}

export default GroupCard
