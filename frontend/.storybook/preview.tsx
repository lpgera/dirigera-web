import type { Preview } from '@storybook/react'
import { ConfigProvider, theme } from 'antd'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'
import { MockedProvider } from '@apollo/client/testing'

loadDevMessages()
loadErrorMessages()

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#1e1e1e' },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
  decorators: [
    (Story, context) => (
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <MockedProvider mocks={context.parameters.mocks ?? []}>
          {Story()}
        </MockedProvider>
      </ConfigProvider>
    ),
  ],
}

export default preview
