import React, { useEffect, useState } from 'react'
import { Button, Popover, Slider, Space } from 'antd'
import { MdColorLens } from 'react-icons/md'

type Props = {
  colorTemperature?: number | null
  hue?: number | null
  saturation?: number | null
  disabled: boolean
  onColorTemperatureChange: (value: number) => void | Promise<void>
  onHueChange: (value: number) => void | Promise<void>
  onSaturationChange: (value: number) => void | Promise<void>
}

const Color = ({
  colorTemperature,
  hue,
  saturation,
  disabled,
  onColorTemperatureChange,
  onHueChange,
  onSaturationChange,
}: Props) => {
  const [colorTemperatureValue, setColorTemperatureValue] =
    useState(colorTemperature)
  const [hueValue, setHueValue] = useState(hue)
  const [saturationValue, setSaturationValue] = useState(saturation)
  useEffect(() => {
    setColorTemperatureValue(colorTemperature)
  }, [colorTemperature])
  useEffect(() => {
    setHueValue(hue)
  }, [hue])
  useEffect(() => {
    setSaturationValue(saturation)
  }, [saturation])

  return (
    <Popover
      content={
        <Space
          direction="vertical"
          size="middle"
          style={{ display: 'flex', padding: 8 }}
        >
          {colorTemperatureValue != null && (
            <div>
              Color temperature
              <Slider
                value={colorTemperatureValue}
                disabled={disabled}
                min={2202}
                max={4000}
                marks={{
                  2202: 'Warm',
                  4000: 'Cold',
                }}
                step={62}
                onChange={(value: number) => setColorTemperatureValue(value)}
                onAfterChange={(value: number) =>
                  onColorTemperatureChange(value)
                }
              />
            </div>
          )}
          {hueValue != null && (
            <div>
              Hue
              <Slider
                value={hueValue}
                disabled={disabled}
                marks={{
                  0: 'Red',
                  120: 'Green',
                  240: 'Blue',
                  359: 'Red',
                }}
                max={359}
                onChange={(value: number) => setHueValue(value)}
                onAfterChange={(value: number) => onHueChange(value)}
              />
            </div>
          )}
          {saturationValue != null && (
            <div>
              Saturation
              <Slider
                value={saturationValue}
                disabled={disabled}
                marks={{
                  0: 'White',
                  1: 'Color',
                }}
                max={1}
                step={0.01}
                onChange={(value: number) => setSaturationValue(value)}
                onAfterChange={(value: number) => onSaturationChange(value)}
              />
            </div>
          )}
        </Space>
      }
      title="Color"
      trigger="click"
    >
      <Button shape="circle" title="Color temperature">
        <MdColorLens size="1.1em" style={{ verticalAlign: 'text-bottom' }} />
      </Button>
    </Popover>
  )
}

export default Color
