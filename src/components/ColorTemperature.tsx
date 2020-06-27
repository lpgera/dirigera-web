import React, { useEffect, useState } from 'react'
import { Button, Popover, Slider } from 'antd'
import { MdColorLens } from 'react-icons/all'

type Props = {
  colorTemperature: number
  onAfterChange: (value: number) => void | Promise<void>
}

const ColorTemperature = ({ colorTemperature, onAfterChange }: Props) => {
  const [value, setValue] = useState(colorTemperature)
  useEffect(() => {
    setValue(colorTemperature)
  }, [colorTemperature])

  return (
    <Popover
      content={
        <Slider
          value={value}
          marks={{
            0: 'Cold',
            100: 'Warm',
          }}
          step={10}
          onChange={(value) => setValue(value as number)}
          onAfterChange={(value) => onAfterChange(value as number)}
        />
      }
      title="Color temperature"
      trigger="click"
    >
      <Button shape="circle">
        <MdColorLens size="1.1em" style={{ verticalAlign: 'text-bottom' }} />
      </Button>
    </Popover>
  )
}

export default ColorTemperature
