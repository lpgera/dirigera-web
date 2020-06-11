import React, { useState } from 'react'
import { Card, Col, Collapse, Divider, Row, Slider, Switch } from 'antd'
import Accessory, { AccessoryProps } from './Accessory'

type Props = {
  id: number
  name: string
  accessories: AccessoryProps[]
}

const GroupCard = (props: Props) => {
  const [value, setValue] = useState(0)
  return (
    <Card title={props.name}>
      <Row align="middle">
        <Col flex="50px">
          <Switch
            size="small"
            checked={value > 0}
            onChange={(newValue) => setValue(newValue ? 100 : 0)}
          />
        </Col>
        <Col flex="auto">
          <Slider
            style={{ marginTop: '12px' }}
            min={0}
            max={100}
            value={value}
            onChange={(newValue) => setValue(newValue as number)}
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
