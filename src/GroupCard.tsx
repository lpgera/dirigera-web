import React, { useState } from 'react'
import { Card, Col, Collapse, Divider, Row, Slider, Switch } from 'antd'

const GroupCard = () => {
  const [value, setValue] = useState(0)

  return (
    <Card title={'Bedroom'}>
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
          {[...Array(3)].map((_, index, array) => (
            <>
              Device {index}
              <Slider
                min={0}
                max={100}
                value={value}
                onChange={(newValue) => setValue(newValue as number)}
              />
              {index !== array.length - 1 ? <Divider /> : null}
            </>
          ))}
        </Collapse.Panel>
      </Collapse>
    </Card>
  )
}

export default GroupCard
