import React, { useEffect, useState } from 'react'
import { Slider, Typography } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import delay from 'delay'
import {
  AccessoryDimmerMutation,
  AccessoryDimmerMutationVariables,
} from './Lightbulb.types.gen'

type Props = {
  id: number
  name: string
  dimmer: number
  refetch: () => Promise<any>
  isLoading: boolean
  onLoadingChange: (isLoading: boolean) => void
}

const Lightbulb = (props: Props) => {
  const [value, setValue] = useState(0)
  useEffect(() => {
    setValue(props.dimmer)
  }, [props.dimmer])
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

  return (
    <>
      <Typography.Paragraph>{props.name}</Typography.Paragraph>
      <Slider
        min={0}
        max={100}
        value={value}
        disabled={props.isLoading}
        onChange={(newValue) => setValue(newValue as number)}
        onAfterChange={async (newValue) => {
          props.onLoadingChange(true)
          await accessoryDimmer({
            variables: { id: props.id, dimmer: newValue as number },
          })
          await delay(3000)
          await props.refetch()
          props.onLoadingChange(false)
        }}
      />
    </>
  )
}

export default Lightbulb
