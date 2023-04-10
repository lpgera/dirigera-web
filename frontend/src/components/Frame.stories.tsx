import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import 'antd/dist/reset.css'
import Frame from './Frame'
import { AuthContext } from './AuthContext'
import { ROOMS_QUERY } from './Rooms'
import { SCENES_QUERY } from './Scenes'

export default {
  title: 'Application',
  component: Frame,
  decorators: [
    (story, context) => (
      <AuthContext.Provider
        value={{
          state: { token: context.parameters.token },
          dispatch: () => {},
        }}
      >
        {story()}
      </AuthContext.Provider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof Frame>

type Story = StoryObj<typeof Frame>

export const LoggedOut: Story = {}

export const LoggedIn: Story = {
  parameters: {
    token: 'mock_token',
    apolloClient: {
      mocks: [
        {
          request: {
            query: SCENES_QUERY,
          },
          result: {
            data: {
              scenes: [
                { id: 1, name: 'All off' },
                { id: 2, name: 'Scene 1' },
                { id: 3, name: 'Scene 2' },
                { id: 4, name: 'Scene 3' },
              ],
            },
          },
        },
        {
          request: {
            query: ROOMS_QUERY,
          },
          newData: () => ({
            data: {
              rooms: [
                {
                  id: '1',
                  name: 'Living Room',
                  quickControls: [
                    {
                      id: '1',
                      name: 'Lights (on)',
                      isReachable: true,
                      isOn: true,
                    },
                  ],
                },
                {
                  id: '2',
                  name: 'Bedroom',
                  quickControls: [
                    {
                      id: '1',
                      name: 'Lights (unreachable)',
                      isReachable: false,
                      isOn: false,
                    },
                    {
                      id: '2',
                      name: 'Lights (off)',
                      isReachable: true,
                      isOn: false,
                    },
                  ],
                },
                { id: '3', name: 'Entrance', quickControls: [] },
              ],
            },
          }),
        },
      ],
    },
  },
}
