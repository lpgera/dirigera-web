import React, { useEffect, useState } from 'react'
import { Card, Col, Collapse, Divider, Row, Slider, Switch } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
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
  refetch: () => Promise<any>
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

const Group = ({ accessories, id, name, refetch }: Props) => {
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

  return (
    <Card title={name}>
      <Row align="middle" gutter={[8, 8]}>
        <Col flex="0">
          <Switch
            size="small"
            checked={onOff}
            loading={isLoading}
            onChange={async (newValue) => {
              setIsLoading(true)
              await groupOnOff({
                variables: { id, onOff: newValue },
              })
              await refetch()
              setIsLoading(false)
            }}
            title={`Toggle ${name}`}
          />
        </Col>
        {dimmer !== null ? (
          <Col flex="auto">
            <Slider
              style={{ marginTop: '12px' }}
              min={0}
              max={100}
              value={dimmer}
              disabled={isLoading}
              onChange={(newValue: number) => setDimmer(newValue)}
              onAfterChange={async (newValue: number) => {
                setIsLoading(true)
                await groupDimmer({
                  variables: { id, dimmer: newValue },
                })
                await refetch()
                setIsLoading(false)
              }}
            />
          </Col>
        ) : null}
        {colorTemperature !== null ? (
          <Col flex="0">
            <ColorTemperature
              colorTemperature={colorTemperature}
              onAfterChange={async (value) => {
                await groupColorTemperature({
                  variables: {
                    id,
                    colorTemperature: value as number,
                  },
                })
                await refetch()
              }}
            />
          </Col>
        ) : null}
      </Row>
      <Collapse style={{ marginTop: '32px' }}>
        <Collapse.Panel header="Devices" key="1">
          {accessories.map((accessory, index, array) => (
            <React.Fragment key={accessory.id}>
              <Accessory
                {...accessory}
                isLoading={isLoading}
                refetch={refetch}
                onLoadingChange={(isLoading) => setIsLoading(isLoading)}
              />
              {index !== array.length - 1 ? <Divider /> : null}
            </React.Fragment>
          ))}
        </Collapse.Panel>
      </Collapse>
    </Card>
  )
}

export default Group
