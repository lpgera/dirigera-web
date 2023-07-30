import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Col, Row } from 'antd'
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from 'react-icons/fa'
import type {
  SetPlaybackMutation,
  SetPlaybackMutationVariables,
} from './Playback.types.gen'
import type { ControlType } from '../../graphql.types'

const SET_PLAYBACK_MUTATION = gql`
  mutation SetPlayback(
    $id: String!
    $type: ControlType!
    $playback: Playback!
  ) {
    setPlayback(id: $id, type: $type, playback: $playback)
  }
`

const Playback = ({
  id,
  type,
  isReachable,
  playback,
  playbackNextAvailable,
  playbackPreviousAvailable,
}: {
  id: string
  type: ControlType
  isReachable: boolean
  playback: string
  playbackNextAvailable?: boolean | null
  playbackPreviousAvailable?: boolean | null
}) => {
  const [setPlayback] = useMutation<
    SetPlaybackMutation,
    SetPlaybackMutationVariables
  >(SET_PLAYBACK_MUTATION)

  return (
    <Row gutter={[8, 0]}>
      <Col>
        <Button
          shape="circle"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          disabled={!isReachable || !playbackPreviousAvailable}
          icon={<FaStepBackward />}
          onClick={async () => {
            await setPlayback({
              variables: {
                id,
                type,
                playback: 'playbackPrevious',
              },
            })
          }}
        />
      </Col>
      <Col>
        <Button
          shape="circle"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          loading={playback === 'playbackBuffering'}
          disabled={!isReachable}
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
      </Col>
      <Col>
        <Button
          shape="circle"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          disabled={!isReachable || !playbackNextAvailable}
          icon={<FaStepForward />}
          onClick={async () => {
            await setPlayback({
              variables: {
                id,
                type,
                playback: 'playbackNext',
              },
            })
          }}
        />
      </Col>
    </Row>
  )
}

export default Playback
