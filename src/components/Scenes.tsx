import React, { FC } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import {
  ActiveSceneMutation,
  ActiveSceneMutationVariables,
  ScenesQuery,
  ScenesQueryVariables,
} from './Scenes.types.gen'
import { Button, Col, Row } from 'antd'

const Scenes: FC = () => {
  const { data } = useQuery<ScenesQuery, ScenesQueryVariables>(gql`
    query Scenes {
      scenes {
        id
        name
      }
    }
  `)

  const [activateScene] = useMutation<
    ActiveSceneMutation,
    ActiveSceneMutationVariables
  >(gql`
    mutation ActiveScene($id: Int!) {
      activateScene(id: $id)
    }
  `)

  const scenes = data?.scenes ?? []

  return (
    <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
      {scenes.map((s) => (
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
      ))}
    </Row>
  )
}

export default Scenes
