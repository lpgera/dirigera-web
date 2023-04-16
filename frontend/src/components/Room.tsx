import React from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from 'antd'

const Room = () => {
  const { roomId } = useParams()
  return <Typography.Text>{roomId}</Typography.Text>
}

export default Room
