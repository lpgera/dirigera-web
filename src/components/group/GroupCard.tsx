import React, { useEffect, useState } from 'react'
import { Card, Col, Collapse, Divider, Row, Slider, Switch } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Accessory, { AccessoryProps } from './accessory/Accessory'
import {
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

const GroupCard = (props: Props) => {
  const [dimmerState, setDimmerState] = useState(0)
  const [onOffState, setOnOffState] = useState(false)
  useEffect(() => {
    setDimmerState(calculateGroupDimmer(props.accessories))
    setOnOffState(calculateGroupOnOff(props.accessories))
  }, [props.accessories])

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

  return (
    <Card title={props.name}>
      <Row align="middle">
        <Col flex="50px">
          <Switch
            size="small"
            checked={onOffState}
            onChange={async (newValue) => {
              await groupOnOff({
                variables: { id: props.id, onOff: newValue },
              })
              setTimeout(() => props.refetch(), 500)
            }}
          />
        </Col>
        <Col flex="auto">
          <Slider
            style={{ marginTop: '12px' }}
            min={0}
            max={100}
            value={dimmerState}
            onChange={(newValue) => setDimmerState(newValue as number)}
            onAfterChange={async (newValue) => {
              await groupDimmer({
                variables: { id: props.id, dimmer: newValue as number },
              })
              setTimeout(() => props.refetch(), 3000)
            }}
          />
        </Col>
      </Row>
      <Collapse style={{ marginTop: '32px' }}>
        <Collapse.Panel header="Devices" key="1">
          {props.accessories.map((accessory, index, array) => (
            <React.Fragment key={accessory.id}>
              <Accessory {...accessory} refetch={props.refetch} />
              {index !== array.length - 1 ? <Divider /> : null}
            </React.Fragment>
          ))}
        </Collapse.Panel>
      </Collapse>
    </Card>
  )
}

export default GroupCard
