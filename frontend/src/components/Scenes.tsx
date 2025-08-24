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

export const SCENES_QUERY = gql`
  query Scenes {
    scenes {
      id
      name
    }
  }
`

const Scenes: FC = () => {
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

  const scenes = data?.scenes ?? []

  return (
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
  )
}

export default Scenes
