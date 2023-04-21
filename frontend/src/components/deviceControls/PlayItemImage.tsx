import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Image } from 'antd'
import type {
  DevicePlayItemImageUrlQuery,
  DevicePlayItemImageUrlQueryVariables,
} from './PlayItemImage.types.gen'
import { useRefetch } from '../../useRefetch'

const DEVICE_PLAY_ITEM_IMAGE_URL_QUERY = gql`
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

  return <Image preview={false} src={data?.devicePlayItemImageURL ?? ''} />
}

export default PlayItemImage
