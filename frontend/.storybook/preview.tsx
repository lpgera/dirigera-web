import type { Preview } from '@storybook/react'
import { ConfigProvider, theme } from 'antd'
import { MockedProvider } from '@apollo/client/testing'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    apolloClient: {
      MockedProvider,
    },
  },
  decorators: [
    (Story) => (
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        {Story()}
      </ConfigProvider>
    ),
  ],
}

export default preview
