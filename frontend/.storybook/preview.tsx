import type { Preview } from '@storybook/react'
import { ConfigProvider, theme } from 'antd'
import { MockedProvider } from '@apollo/client/testing'
import { withRouter } from 'storybook-addon-react-router-v6'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    apolloClient: {
      MockedProvider,
    },
  },
  decorators: [
    withRouter,
    (Story) => (
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        {Story()}
      </ConfigProvider>
    ),
  ],
}

export default preview
