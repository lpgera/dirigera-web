import React, { FC } from 'react'
import { Button, Col, Row } from 'antd'
import { gql } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client/react'
import {
  ActiveSceneMutation,
  ActiveSceneMutationVariables,
  ScenesQuery,
  ScenesQueryVariables,
} from './Scenes.types.gen'
import { useRefetch } from '../useRefetch'
import { useSceneScopes } from '../useSceneScopes'

export const SCENES_QUERY = gql`
  query Scenes {
    scenes {
      id
      name
    }
  }
`

interface ScenesProps {
  scope?: 'house' | 'floor' | 'room'
  scopeId?: string // floor ID or room ID when scope is 'floor' or 'room'
  title?: string // Optional title for the scenes section
}

const Scenes: FC<ScenesProps> = ({ scope = 'house', scopeId, title }) => {
  const { data, refetch } = useQuery<ScenesQuery, ScenesQueryVariables>(
    SCENES_QUERY
  )

  const [activateScene] = useMutation<
    ActiveSceneMutation,
    ActiveSceneMutationVariables
  >(gql`
    mutation ActiveScene($id: String!) {
      activateScene(id: $id)
    }
  `)

  useRefetch(refetch)

  const {
    getHouseScenes,
    getFloorScenes,
    getRoomScenes,
    filterScenes,
    hasConfiguration,
    isScopeConfigured,
  } = useSceneScopes()

  const allScenes = data?.scenes ?? []

  // Determine which scenes to show
  let scenes: typeof allScenes = []

  if (hasConfiguration) {
    // Configuration file exists
    if (isScopeConfigured(scope, scopeId)) {
      // This scope is explicitly configured (even if empty array)
      let allowedSceneIds: string[] = []

      if (scope === 'house') {
        allowedSceneIds = getHouseScenes()
      } else if (scope === 'floor' && scopeId) {
        allowedSceneIds = getFloorScenes(scopeId)
      } else if (scope === 'room' && scopeId) {
        allowedSceneIds = getRoomScenes(scopeId)
      }

      scenes = filterScenes(allScenes, allowedSceneIds)
    } else {
      // This scope is not configured - show nothing
      scenes = []
    }
  } else {
    // No configuration file - show all scenes everywhere (backward compatible)
    scenes = allScenes
  }

  // Don't render if no scenes to show
  if (scenes.length === 0) {
    return null
  }

  return (
    <>
      {title && <div style={{ marginBottom: 8, fontWeight: 500 }}>{title}</div>}
      <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
        {!data ? (
          <Col key="loading">
            <Button disabled>Loading...</Button>
          </Col>
        ) : (
          scenes.map((s) => (
            <Col key={s.id}>
              <Button
                onClick={async () => {
                  await activateScene({
                    variables: {
                      id: s.id,
                    },
                  })
                }}
              >
                {s.name}
              </Button>
            </Col>
          ))
        )}
      </Row>
    </>
  )
}

export default Scenes
