import React from 'react'
import { Slider } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
  SetColorTemperatureMutation,
  SetColorTemperatureMutationVariables,
} from './ColorTemperatureSlider.types.gen'

type Props = {
  id: number
  colorTemperature: number
}

const ColorTemperatureSlider = ({ id, colorTemperature }: Props) => {
  const [setColorTemperature] = useMutation<
    SetColorTemperatureMutation,
    SetColorTemperatureMutationVariables
  >(gql`
    mutation SetColorTemperature($id: Int!, $colorTemperature: Float!) {
      accessoryColorTemperature(id: $id, colorTemperature: $colorTemperature)
    }
  `)

  return (
    <Slider
      defaultValue={colorTemperature}
      marks={{
        0: 'Cold',
        100: 'Warm',
      }}
      step={10}
      onAfterChange={async (value) => {
        await setColorTemperature({
          variables: {
            id,
            colorTemperature: value as number,
          },
        })
      }}
    />
  )
}

export default ColorTemperatureSlider
