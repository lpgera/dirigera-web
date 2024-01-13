import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Slider } from 'antd'
import type {
  SetVolumeMutation,
  SetVolumeMutationVariables,
} from './Volume.types.gen'
import type { ControlType } from '../../graphql.types'

const SET_VOLUME_MUTATION = gql`
  mutation SetVolume($id: String!, $type: ControlType!, $volume: Int!) {
    setVolume(id: $id, type: $type, volume: $volume)
  }
`

const Volume = ({
  id,
  type,
  isReachable,
  volume,
}: {
  id: string
  type: ControlType
  isReachable: boolean
  volume: number
}) => {
  const [volumeValue, setVolumeValue] = useState(volume)
  useEffect(() => {
    setVolumeValue(volume ?? null)
  }, [volume])

  const [setVolume, { loading }] = useMutation<
    SetVolumeMutation,
    SetVolumeMutationVariables
  >(SET_VOLUME_MUTATION)

  return (
    <Slider
      min={0}
      max={50}
      value={volumeValue}
      disabled={!isReachable || loading}
      onChange={(newValue: number) => setVolumeValue(newValue)}
      tooltip={{ formatter: (value) => `Volume: ${value}%` }}
      onChangeComplete={async (newValue: number) => {
        await setVolume({
          variables: {
            id,
            type,
            volume: newValue,
          },
        })
      }}
    />
  )
}

export default Volume
