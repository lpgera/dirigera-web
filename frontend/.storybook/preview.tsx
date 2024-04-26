import type { Preview } from '@storybook/react'
import { ConfigProvider, theme } from 'antd'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
      },
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
