import React, { useEffect, useState } from 'react'
import { Col, Row, Slider, Switch } from 'antd'
import { BsBatteryFull } from 'react-icons/bs'
import { useMutation, gql } from '@apollo/client'
import {
  AccessoryColorTemperatureMutation,
  AccessoryColorTemperatureMutationVariables,
  AccessoryDimmerMutation,
  AccessoryDimmerMutationVariables,
  AccessoryOnOffMutation,
  AccessoryOnOffMutationVariables,
} from './Accessory.types.gen'
import { AccessoryType } from '../graphql.types'
import ColorTemperature from './ColorTemperature'

export type AccessoryProps = {
  id: number
  name: string
  type: AccessoryType
  alive: boolean
  dimmer?: number | null
  onOff?: boolean | null
  battery?: number | null
  colorTemperature?: number | null
}

type Props = AccessoryProps & {
  isLoading: boolean
  onLoadingChange: (isLoading: boolean) => void
}

const Accessory = ({
  alive,
  battery,
  colorTemperature,
  dimmer,
  id,
  isLoading,
  name,
  onLoadingChange,
  onOff,
  type,
}: Props) => {
  const isSwitchable = [AccessoryType.Plug, AccessoryType.Lightbulb].includes(
    type
  )
  const [dimmerValue, setDimmerValue] = useState(dimmer ?? null)
  const [colorTemperatureValue, setColorTemperatureValue] = useState(
    colorTemperature ?? null
  )
  useEffect(() => {
    setDimmerValue(dimmer ?? null)
  }, [dimmer])
  useEffect(() => {
    setColorTemperatureValue(colorTemperature ?? null)
  }, [colorTemperature])

  const [accessoryOnOff] = useMutation<
    AccessoryOnOffMutation,
    AccessoryOnOffMutationVariables
  >(
    gql`
      mutation AccessoryOnOff($id: Int!, $onOff: Boolean!) {
        accessoryOnOff(id: $id, onOff: $onOff)
      }
    `
  )
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
  const [accessoryColorTemperature] = useMutation<
    AccessoryColorTemperatureMutation,
    AccessoryColorTemperatureMutationVariables
  >(gql`
    mutation AccessoryColorTemperature($id: Int!, $colorTemperature: Float!) {
      accessoryColorTemperature(id: $id, colorTemperature: $colorTemperature)
    }
  `)

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col flex="auto">{name}</Col>
        {battery !== null ? (
          <Col flex="60px">
            <BsBatteryFull style={{ verticalAlign: 'middle' }} /> {battery}%
          </Col>
        ) : null}
      </Row>
      <Row align="middle" gutter={[8, 8]}>
        {isSwitchable ? (
          <Col>
            <Switch
              size="small"
              checked={onOff ?? false}
              loading={isLoading}
              disabled={!alive}
              onChange={async (newValue) => {
                onLoadingChange(true)
                await accessoryOnOff({
                  variables: { id, onOff: newValue },
                })
                onLoadingChange(false)
              }}
              title={`Toggle ${name}`}
            />
          </Col>
        ) : null}
        {dimmerValue !== null ? (
          <Col flex="auto">
            <Slider
              min={0}
              max={100}
              value={dimmerValue}
              disabled={isLoading || !alive}
              onChange={(newValue: number) => setDimmerValue(newValue)}
              onAfterChange={async (newValue: number) => {
                onLoadingChange(true)
                await accessoryDimmer({
                  variables: { id, dimmer: newValue },
                })
                onLoadingChange(false)
              }}
            />
          </Col>
        ) : null}
        {colorTemperatureValue !== null ? (
          <Col flex="0">
            <ColorTemperature
              colorTemperature={colorTemperatureValue}
              onAfterChange={async (newValue) => {
                setColorTemperatureValue(newValue)
                await accessoryColorTemperature({
                  variables: { id, colorTemperature: newValue },
                })
              }}
            />
          </Col>
        ) : null}
      </Row>
    </>
  )
}

export default Accessory
