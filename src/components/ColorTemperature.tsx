import React, { useEffect, useState } from 'react'
import { Button, Popover, Slider } from 'antd'
import { MdColorLens } from 'react-icons/all'

type Props = {
  colorTemperature: number
  disabled: boolean
  onAfterChange: (value: number) => void | Promise<void>
}

const ColorTemperature = ({
  colorTemperature,
  disabled,
  onAfterChange,
}: Props) => {
  const [value, setValue] = useState(colorTemperature)
  useEffect(() => {
    setValue(colorTemperature)
  }, [colorTemperature])

  return (
    <Popover
      content={
        <Slider
          value={value}
          disabled={disabled}
          marks={{
            0: 'Cold',
            100: 'Warm',
          }}
          step={10}
          onChange={(value: number) => setValue(value)}
          onAfterChange={(value: number) => onAfterChange(value)}
        />
      }
      title="Color temperature"
      trigger="click"
    >
      <Button shape="circle" title="Color temperature">
        <MdColorLens size="1.1em" style={{ verticalAlign: 'text-bottom' }} />
      </Button>
    </Popover>
  )
}

export default ColorTemperature
