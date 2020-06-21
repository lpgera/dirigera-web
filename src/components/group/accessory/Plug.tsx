import React from 'react'
import { Switch, Typography } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import delay from 'delay'
import {
  AccessoryOnOffMutation,
  AccessoryOnOffMutationVariables,
} from './Plug.types.gen'

type Props = {
  id: number
  name: string
  onOff: boolean
  refetch: () => Promise<any>
  isLoading: boolean
  onLoadingChange: (isLoading: boolean) => void
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
        loading={props.isLoading}
        onChange={async (newValue) => {
          props.onLoadingChange(true)
          await accessoryOnOff({
            variables: { id: props.id, onOff: newValue },
          })
          await delay(500)
          await props.refetch()
          props.onLoadingChange(false)
        }}
      />
    </>
  )
}

export default Plug
