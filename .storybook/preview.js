import { MockedProvider } from '@apollo/client/testing'

export const parameters = {
  apolloClient: {
    MockedProvider,
    // any props you want to pass to MockedProvider on every story
  },
}
