import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button } from 'antd'
import { FaPause, FaPlay } from 'react-icons/fa'
import type {
  SetPlaybackMutation,
  SetPlaybackMutationVariables,
} from './Playback.types.gen'
import type { ControlType } from '../../graphql.types'

const SET_PLAYBACK_MUTATION = gql`
  mutation SetPlayback($id: String!, $type: ControlType!, $playback: String!) {
    setPlayback(id: $id, type: $type, playback: $playback)
  }
`

const Playback = ({
  id,
  type,
  isReachable,
  playback,
}: {
  id: string
  type: ControlType
  isReachable: boolean
  playback: string
}) => {
  const [setPlayback] = useMutation<
    SetPlaybackMutation,
    SetPlaybackMutationVariables
  >(SET_PLAYBACK_MUTATION)

  return (
    <Button
      shape={'circle'}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      loading={playback === 'playbackBuffering'}
      disabled={
        !isReachable ||
        !['playbackPaused', 'playbackPlaying'].includes(playback)
      }
      icon={playback === 'playbackPlaying' ? <FaPause /> : <FaPlay />}
      onClick={async () => {
        if (playback === 'playbackPaused') {
          return await setPlayback({
            variables: {
              id,
              type,
              playback: 'playbackPlaying',
            },
          })
        }

        await setPlayback({
          variables: {
            id,
            type,
            playback: 'playbackPaused',
          },
        })
      }}
    />
  )
}

export default Playback
