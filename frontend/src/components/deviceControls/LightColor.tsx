import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Popover, Slider, Space } from 'antd'
import { MdColorLens } from 'react-icons/md'
import type {
  SetColorHueAndSaturationMutation,
  SetColorHueAndSaturationMutationVariables,
  SetColorTemperatureMutation,
  SetColorTemperatureMutationVariables,
} from '../Device.types.gen'
import type { ControlType } from '../../graphql.types'

const SET_COLOR_TEMPERATURE_MUTATION = gql`
  mutation SetColorTemperature(
    $id: String!
    $type: ControlType!
    $colorTemperature: Int!
  ) {
    setColorTemperature(
      id: $id
      type: $type
      colorTemperature: $colorTemperature
    )
  }
`

const SET_COLOR_HUE_AND_SATURATION_MUTATION = gql`
  mutation SetColorHueAndSaturation(
    $id: String!
    $type: ControlType!
    $colorHue: Float!
    $colorSaturation: Float!
  ) {
    setColorHueAndSaturation(
      id: $id
      type: $type
      colorHue: $colorHue
      colorSaturation: $colorSaturation
    )
  }
`

const LightColor = ({
  id,
  type,
  isReachable,
  colorTemperature,
  colorHue,
  colorSaturation,
}: {
  id: string
  type: ControlType
  isReachable: boolean
  colorTemperature?: number | null
  colorHue?: number | null
  colorSaturation?: number | null
}) => {
  const [colorTemperatureValue, setColorTemperatureValue] =
    useState(colorTemperature)
  const [colorHueValue, setColorHueValue] = useState(colorHue)
  const [colorSaturationValue, setColorSaturationValue] =
    useState(colorSaturation)
  useEffect(() => {
    setColorTemperatureValue(colorTemperature)
  }, [colorTemperature])
  useEffect(() => {
    setColorHueValue(colorHue)
  }, [colorHue])
  useEffect(() => {
    setColorSaturationValue(colorSaturation)
  }, [colorSaturation])

  const [setColorTemperature, { loading: setColorTemperatureLoading }] =
    useMutation<
      SetColorTemperatureMutation,
      SetColorTemperatureMutationVariables
    >(SET_COLOR_TEMPERATURE_MUTATION)
  const [
    setColorHueAndSaturation,
    { loading: setColorHueAndSaturationLoading },
  ] = useMutation<
    SetColorHueAndSaturationMutation,
    SetColorHueAndSaturationMutationVariables
  >(SET_COLOR_HUE_AND_SATURATION_MUTATION)

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
                disabled={!isReachable || setColorTemperatureLoading}
                min={2202}
                max={4000}
                marks={{
                  2202: 'Warm',
                  4000: 'Cold',
                }}
                step={62}
                onChange={(newValue: number) =>
                  setColorTemperatureValue(newValue)
                }
                onAfterChange={async (newValue: number) =>
                  await setColorTemperature({
                    variables: {
                      id,
                      type,
                      colorTemperature: newValue,
                    },
                  })
                }
              />
            </div>
          )}
          {colorHueValue != null && (
            <div>
              Hue
              <Slider
                value={colorHueValue}
                disabled={!isReachable || setColorHueAndSaturationLoading}
                marks={{
                  0: 'Red',
                  120: 'Green',
                  240: 'Blue',
                  359: 'Red',
                }}
                max={359}
                onChange={(newValue: number) => setColorHueValue(newValue)}
                onAfterChange={async (newValue: number) => {
                  await setColorHueAndSaturation({
                    variables: {
                      id,
                      type,
                      colorHue: newValue,
                      colorSaturation: colorSaturationValue ?? 1,
                    },
                  })
                }}
              />
            </div>
          )}
          {colorSaturationValue != null && (
            <div>
              Saturation
              <Slider
                value={colorSaturationValue}
                disabled={!isReachable || setColorHueAndSaturationLoading}
                marks={{
                  0: 'White',
                  1: 'Color',
                }}
                max={1}
                step={0.01}
                onChange={(newValue: number) =>
                  setColorSaturationValue(newValue)
                }
                onAfterChange={async (newValue: number) =>
                  await setColorHueAndSaturation({
                    variables: {
                      id,
                      type,
                      colorHue: colorHueValue ?? 0,
                      colorSaturation: newValue,
                    },
                  })
                }
              />
            </div>
          )}
        </Space>
      }
      title="Color"
      trigger="click"
    >
      <Button
        shape="circle"
        title="Color"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MdColorLens />
      </Button>
    </Popover>
  )
}

export default LightColor
