import React, { useEffect, useState } from 'react'
import { Button, Col, Popover, Row, Slider, Typography } from 'antd'
import { MdColorLens } from 'react-icons/all'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import delay from 'delay'
import {
  AccessoryDimmerMutation,
  AccessoryDimmerMutationVariables,
} from './Lightbulb.types.gen'
import ColorTemperatureSlider from './ColorTemperatureSlider'

type Props = {
  id: number
  name: string
  alive: boolean
  dimmer: number
  colorTemperature: number
  refetch: () => Promise<any>
  isLoading: boolean
  onLoadingChange: (isLoading: boolean) => void
}

const Lightbulb = ({
  alive,
  colorTemperature,
  dimmer,
  id,
  isLoading,
  name,
  onLoadingChange,
  refetch,
}: Props) => {
  const [value, setValue] = useState(0)
  useEffect(() => {
    setValue(dimmer)
  }, [dimmer])
  const [accessoryDimmer] = useMutation<
    AccessoryDimmerMutation,
    AccessoryDimmerMutationVariables
  >(
    gql`
      mutation AccessoryDimmer($id: Int!, $dimmer: Float!) {
        accessoryDimmer(id: $id, dimmer: $dimmer)
      }
    `
  )

  return (
    <Row align="bottom" gutter={[8, 8]}>
      <Col flex="auto">
        <Typography.Paragraph>{name}</Typography.Paragraph>
        <Slider
          min={0}
          max={100}
          value={value}
          disabled={isLoading || !alive}
          onChange={(newValue) => setValue(newValue as number)}
          onAfterChange={async (newValue) => {
            onLoadingChange(true)
            await accessoryDimmer({
              variables: { id, dimmer: newValue as number },
            })
            await delay(3000)
            await refetch()
            onLoadingChange(false)
          }}
        />
      </Col>
      <Col flex="0">
        <Popover
          content={
            <ColorTemperatureSlider
              id={id}
              colorTemperature={colorTemperature}
            />
          }
          title="Color temperature"
          trigger="click"
        >
          <Button shape="circle">
            <MdColorLens
              size="1.1em"
              style={{ verticalAlign: 'text-bottom' }}
            />
          </Button>
        </Popover>
      </Col>
    </Row>
  )
}

export default Lightbulb
