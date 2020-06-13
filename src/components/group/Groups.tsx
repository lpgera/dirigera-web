import React from 'react'
import { Col, Row } from 'antd'
import GroupCard from './GroupCard'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GroupsQuery } from './Groups.types.gen'

const Groups = () => {
  const { data, refetch } = useQuery<GroupsQuery>(gql`
    query Groups {
      groups {
        id
        name
        accessories {
          id
          name
          type
          onOff
          dimmer
          battery
        }
      }
    }
  `)

  const groups = data?.groups ?? []

  return (
    <Row gutter={[16, 16]}>
      {groups.map((group, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={6}>
          <GroupCard {...group} refetch={refetch} />
        </Col>
      ))}
    </Row>
  )
}

export default Groups
