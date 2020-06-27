import React, { useEffect, useState } from 'react'
import { Col, Row, Slider, Switch } from 'antd'
import { BsBatteryFull } from 'react-icons/bs'
import delay from 'delay'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
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
  refetch: () => Promise<any>
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
  refetch,
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
                await delay(500)
                await refetch()
                onLoadingChange(false)
              }}
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
              onChange={(newValue) => setDimmerValue(newValue as number)}
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
                await delay(3000)
                await refetch()
              }}
            />
          </Col>
        ) : null}
      </Row>
    </>
  )
}

export default Accessory
