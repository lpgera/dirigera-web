import React from 'react'
import { Switch, Typography } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import {
  AccessoryOnOffMutation,
  AccessoryOnOffMutationVariables,
} from './Plug.types.gen'

type Props = {
  id: number
  name: string
  onOff: boolean
  refetch: () => Promise<any>
}

const Plug = (props: Props) => {
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
  return (
    <>
      <Typography.Paragraph>{props.name}</Typography.Paragraph>
      <Switch
        size="small"
        checked={props.onOff ?? false}
        onChange={async (newValue) => {
          await accessoryOnOff({
            variables: { id: props.id, onOff: newValue },
          })
          setTimeout(() => props.refetch(), 500)
        }}
      />
    </>
  )
}

export default Plug
