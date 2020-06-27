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
  alive: boolean
  onOff: boolean
  refetch: () => Promise<any>
  isLoading: boolean
  onLoadingChange: (isLoading: boolean) => void
}

const Plug = ({
  alive,
  id,
  isLoading,
  name,
  onLoadingChange,
  onOff,
  refetch,
}: Props) => {
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
      <Typography.Paragraph>{name}</Typography.Paragraph>
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
    </>
  )
}

export default Plug
