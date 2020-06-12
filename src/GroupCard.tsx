import React, { useState } from 'react'
import { Card, Col, Collapse, Divider, Row, Slider, Switch } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import debounce from 'lodash/debounce'
import Accessory, { AccessoryProps } from './Accessory'
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
  refetch: () => void
}

const calculateGroupDimmer = (accessories: AccessoryProps[]) => {
  const sum = accessories.reduce(
    (accumulator, item) => accumulator + (item.dimmer ?? 0),
    0
  )
  const count = accessories.filter((a) => a.dimmer !== null).length
  return sum / count
}

const GroupCard = (props: Props) => {
  const [value, setValue] = useState(calculateGroupDimmer(props.accessories))
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
            checked={props.accessories.some((a) => a.onOff)}
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
            value={value}
            onChange={(newValue) => {
              setValue(newValue as number)
            }}
            onAfterChange={async (newValue) => {
              await groupDimmer({
                variables: { id: props.id, dimmer: newValue as number },
              })
              setTimeout(() => props.refetch(), 2000)
            }}
          />
        </Col>
      </Row>
      <Collapse style={{ marginTop: '32px' }}>
        <Collapse.Panel header="Devices" key="1">
          {props.accessories.map((accessory, index, array) => (
            <>
              <Accessory {...accessory} />
              {index !== array.length - 1 ? <Divider /> : null}
            </>
          ))}
        </Collapse.Panel>
      </Collapse>
    </Card>
  )
}

export default GroupCard
