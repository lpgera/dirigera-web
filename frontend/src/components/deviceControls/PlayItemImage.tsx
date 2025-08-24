import React from 'react'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { Image } from 'antd'
import type {
  DevicePlayItemImageUrlQuery,
  DevicePlayItemImageUrlQueryVariables,
} from './PlayItemImage.types.gen'
import { useRefetch } from '../../useRefetch'

export const DEVICE_PLAY_ITEM_IMAGE_URL_QUERY = gql`
  query DevicePlayItemImageURL($id: String!) {
    devicePlayItemImageURL(id: $id)
  }
`

const PlayItemImage = ({ id }: { id: string }) => {
  const { data, refetch } = useQuery<
    DevicePlayItemImageUrlQuery,
    DevicePlayItemImageUrlQueryVariables
  >(DEVICE_PLAY_ITEM_IMAGE_URL_QUERY, {
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
  })

  useRefetch(refetch)

  if (!data?.devicePlayItemImageURL) {
    return null
  }

  return <Image preview={false} src={data.devicePlayItemImageURL} />
}

export default PlayItemImage
