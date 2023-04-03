import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import 'antd/dist/reset.css'
import Frame from './Frame'
import { AuthContext } from './AuthContext'
import { GROUPS_QUERY } from './Groups'
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
            query: GROUPS_QUERY,
          },
          newData: () => ({
            data: {
              groups: [
                {
                  id: 1,
                  name: 'Room 1',
                  accessories: [
                    {
                      id: 11,
                      name: 'Bulb 💡 1',
                      type: 'LIGHTBULB',
                      alive: true,
                      onOff: true,
                      dimmer: 100,
                      battery: null,
                      colorTemperature: 58.8,
                    },
                    {
                      id: 12,
                      name: 'Bulb 💡 2',
                      type: 'LIGHTBULB',
                      alive: true,
                      onOff: false,
                      dimmer: 0,
                      battery: null,
                      colorTemperature: 58.8,
                    },
                    {
                      id: 13,
                      name: 'Bulb 💡 3',
                      type: 'LIGHTBULB',
                      alive: true,
                      onOff: false,
                      dimmer: 0,
                      battery: null,
                      colorTemperature: 58.8,
                    },
                    {
                      id: 14,
                      name: 'Motion sensor',
                      type: 'MOTION_SENSOR',
                      alive: true,
                      onOff: null,
                      dimmer: null,
                      battery: 74,
                      colorTemperature: null,
                    },
                    {
                      id: 15,
                      name: 'Remote 🎛️',
                      type: 'REMOTE',
                      alive: true,
                      onOff: null,
                      dimmer: null,
                      battery: 87,
                      colorTemperature: null,
                    },
                  ],
                },
                {
                  id: 2,
                  name: 'Room 2',
                  accessories: [
                    {
                      id: 21,
                      name: 'Bulb 💡 1',
                      type: 'LIGHTBULB',
                      alive: true,
                      onOff: false,
                      dimmer: 0,
                      battery: null,
                      colorTemperature: 70.1,
                    },
                    {
                      id: 22,
                      name: 'Bulb 💡 2',
                      type: 'LIGHTBULB',
                      alive: false,
                      onOff: false,
                      dimmer: 0,
                      battery: null,
                      colorTemperature: 70.1,
                    },
                    {
                      id: 23,
                      name: 'Bulb 💡 3',
                      type: 'LIGHTBULB',
                      alive: true,
                      onOff: false,
                      dimmer: 0,
                      battery: null,
                      colorTemperature: 70.1,
                    },
                    {
                      id: 24,
                      name: 'Remote 🎛️',
                      type: 'REMOTE',
                      alive: true,
                      onOff: null,
                      dimmer: null,
                      battery: 87,
                      colorTemperature: null,
                    },
                  ],
                },
                {
                  id: 3,
                  name: 'Room 3',
                  accessories: [
                    {
                      id: 31,
                      name: 'Driver 1 💡',
                      type: 'LIGHTBULB',
                      alive: true,
                      onOff: true,
                      dimmer: 70.1,
                      battery: null,
                      colorTemperature: null,
                    },
                    {
                      id: 32,
                      name: 'Driver 2 💡',
                      type: 'LIGHTBULB',
                      alive: true,
                      onOff: true,
                      dimmer: 70.1,
                      battery: null,
                      colorTemperature: null,
                    },
                  ],
                },
                {
                  id: 4,
                  name: 'Room 4',
                  accessories: [
                    {
                      id: 41,
                      name: 'Plug 🔌',
                      type: 'PLUG',
                      alive: true,
                      onOff: false,
                      dimmer: null,
                      battery: null,
                      colorTemperature: null,
                    },
                  ],
                },
              ],
            },
          }),
        },
      ],
    },
  },
}
