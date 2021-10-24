import React, { useEffect, useState } from 'react'
import { Card, Col, Collapse, Divider, Row, Slider, Switch } from 'antd'
import { useMutation, gql } from '@apollo/client'
import Accessory, { AccessoryProps } from './Accessory'
import {
  GroupColorTemperatureMutation,
  GroupColorTemperatureMutationVariables,
  GroupDimmerMutation,
  GroupDimmerMutationVariables,
  GroupOnOffMutation,
  GroupOnOffMutationVariables,
} from './Group.types.gen'
import ColorTemperature from './ColorTemperature'

type Props = {
  id: number
  name: string
  accessories: AccessoryProps[]
  isDeviceListDefaultOpen?: Boolean
}

const calculateGroupDimmer = (accessories: AccessoryProps[]) => {
  const dimmers = accessories
    .map((a) => a.dimmer)
    .filter((d) => d != null) as number[]

  const sum = dimmers.reduce((accumulator, dimmer) => accumulator + dimmer, 0)

  if (dimmers.length) {
    return sum / dimmers.length
  }

  return null
}

const calculateGroupOnOff = (accessories: AccessoryProps[]) =>
  accessories.some((a) => a.onOff)

const calculateGroupColorTemperature = (accessories: AccessoryProps[]) => {
  const colorTemperatures = accessories
    .map((a) => a.colorTemperature)
    .filter((ct) => ct != null) as number[]

  const sum = colorTemperatures.reduce((accumulator, ct) => accumulator + ct, 0)

  if (colorTemperatures.length) {
    return sum / colorTemperatures.length
  }

  return null
}

const Group = ({ accessories, id, name, isDeviceListDefaultOpen }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [dimmer, setDimmer] = useState<number | null>(null)
  const [onOff, setOnOff] = useState(false)
  const [colorTemperature, setColorTemperature] = useState<number | null>(null)
  useEffect(() => {
    setDimmer(calculateGroupDimmer(accessories))
    setOnOff(calculateGroupOnOff(accessories))
    setColorTemperature(calculateGroupColorTemperature(accessories))
  }, [accessories])

  const [groupOnOff] = useMutation<
    GroupOnOffMutation,
    GroupOnOffMutationVariables
  >(
    gql`
      mutation GroupOnOff($id: Int!, $onOff: Boolean!) {
        groupOnOff(id: $id, onOff: $onOff)
      }
    `
  )
  const [groupDimmer] = useMutation<
    GroupDimmerMutation,
    GroupDimmerMutationVariables
  >(gql`
    mutation GroupDimmer($id: Int!, $dimmer: Float!) {
      groupDimmer(id: $id, dimmer: $dimmer)
    }
  `)
  const [groupColorTemperature] = useMutation<
    GroupColorTemperatureMutation,
    GroupColorTemperatureMutationVariables
  >(gql`
    mutation GroupColorTemperature($id: Int!, $colorTemperature: Float!) {
      groupColorTemperature(id: $id, colorTemperature: $colorTemperature)
    }
  `)

  const isAnyAccessoryAlive = accessories.some((a) => a.alive)

  return (
    <Card title={name}>
      <Row align="middle" gutter={[8, 8]}>
        <Col flex="0">
          <Switch
            size="small"
            style={{ marginTop: '9px', marginBottom: '9px' }}
            checked={onOff}
            loading={isLoading}
            disabled={!isAnyAccessoryAlive}
            onChange={async (newValue) => {
              setIsLoading(true)
              await groupOnOff({
                variables: { id, onOff: newValue },
              })
              setIsLoading(false)
            }}
            title={`Toggle ${name}`}
          />
        </Col>
        {dimmer !== null ? (
          <Col flex="auto">
            <Slider
              min={0}
              max={100}
              value={dimmer}
              disabled={isLoading || !isAnyAccessoryAlive}
              onChange={(newValue: number) => setDimmer(newValue)}
              onAfterChange={async (newValue: number) => {
                setIsLoading(true)
                await groupDimmer({
                  variables: { id, dimmer: newValue },
                })
                setIsLoading(false)
              }}
            />
          </Col>
        ) : null}
        {colorTemperature !== null ? (
          <Col flex="0">
            <ColorTemperature
              colorTemperature={colorTemperature}
              disabled={isLoading || !isAnyAccessoryAlive}
              onAfterChange={async (value) => {
                await groupColorTemperature({
                  variables: {
                    id,
                    colorTemperature: value as number,
                  },
                })
              }}
            />
          </Col>
        ) : null}
      </Row>
      {accessories.length ? (
        <Collapse
          bordered={false}
          style={{
            marginLeft: '-24px',
            marginRight: '-24px',
            marginBottom: '-24px',
            marginTop: '24px',
          }}
          defaultActiveKey={isDeviceListDefaultOpen ? [1] : undefined}
        >
          <Collapse.Panel header="Devices" key="1" style={{ border: 0 }}>
            {accessories.map((accessory, index, array) => (
              <React.Fragment key={accessory.id}>
                <Accessory
                  {...accessory}
                  isLoading={isLoading}
                  onLoadingChange={(isLoading) => setIsLoading(isLoading)}
                />
                {index !== array.length - 1 ? <Divider /> : null}
              </React.Fragment>
            ))}
          </Collapse.Panel>
        </Collapse>
      ) : null}
    </Card>
  )
}

export default Group
