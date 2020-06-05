import React, { useState } from 'react'
import { Card, Collapse, Divider, Slider } from 'antd'

const GroupCard = () => {
  const [value, setValue] = useState(0)

  return (
    <Card title={'Bedroom'}>
      <Slider
        min={0}
        max={100}
        value={value}
        onChange={(newValue) => setValue(newValue as number)}
      />
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
