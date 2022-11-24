import { MockedProvider } from '@apollo/client/testing'
import { ConfigProvider, theme } from 'antd'
import { DecoratorFn } from '@storybook/react'

export const parameters = {
  apolloClient: {
    MockedProvider,
  },
}

export const decorators = [
  (Story) => (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      {Story()}
    </ConfigProvider>
  ),
] as DecoratorFn[]
