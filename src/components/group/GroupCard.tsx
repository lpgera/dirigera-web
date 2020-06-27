import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Popover,
  Row,
  Slider,
  Switch,
} from 'antd'
import { MdColorLens } from 'react-icons/all'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import delay from 'delay'
import Accessory, { AccessoryProps } from './accessory/Accessory'
import {
  GroupColorTemperatureMutation,
  GroupColorTemperatureMutationVariables,
  GroupDimmerMutation,
  GroupDimmerMutationVariables,
  GroupOnOffMutation,
  GroupOnOffMutationVariables,
} from './GroupCard.types.gen'

type Props = {
  id: number
  name: string
  accessories: AccessoryProps[]
  refetch: () => Promise<any>
}

const calculateGroupDimmer = (accessories: AccessoryProps[]) => {
  const sum = accessories.reduce(
    (accumulator, item) => accumulator + (item.dimmer ?? 0),
    0
  )
  const count = accessories.filter((a) => a.dimmer !== null).length
  return sum / count
}

const calculateGroupOnOff = (accessories: AccessoryProps[]) =>
  accessories.some((a) => a.onOff)

const calculateGroupColorTemperature = (accessories: AccessoryProps[]) => {
  const colorTemperatures = accessories
    .map((a) => a.colorTemperature)
    .filter((ct) => ct != null) as number[]

  const sum = colorTemperatures.reduce((a, b) => a + b, 0)

  if (colorTemperatures.length) {
    return sum / colorTemperatures.length
  }
  return 0
}

const GroupCard = ({ accessories, id, name, refetch }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [dimmer, setDimmer] = useState(0)
  const [onOff, setOnOff] = useState(false)
  const [colorTemperature, setColorTemperature] = useState(0)
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
              await delay(500)
              await refetch()
              setIsLoading(false)
            }}
          />
        </Col>
        <Col flex="auto">
          <Slider
            style={{ marginTop: '12px' }}
            min={0}
            max={100}
            value={dimmer}
            disabled={isLoading}
            onChange={(newValue) => setDimmer(newValue as number)}
            onAfterChange={async (newValue) => {
              setIsLoading(true)
              await groupDimmer({
                variables: { id, dimmer: newValue as number },
              })
              await delay(3000)
              await refetch()
              setIsLoading(false)
            }}
          />
        </Col>
        <Col flex="0">
          <Popover
            content={
              <Slider
                defaultValue={colorTemperature}
                marks={{
                  0: 'Cold',
                  100: 'Warm',
                }}
                step={10}
                onAfterChange={async (value) => {
                  await groupColorTemperature({
                    variables: {
                      id,
                      colorTemperature: value as number,
                    },
                  })
                }}
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

export default GroupCard
