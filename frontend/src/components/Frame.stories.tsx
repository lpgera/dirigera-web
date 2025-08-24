import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import 'antd/dist/reset.css'
import Frame from './Frame'
import { AuthContext } from './AuthContext'
import Rooms, { ROOMS_QUERY } from './Rooms'
import { SCENES_QUERY } from './Scenes'
import RoomComponent, { ROOM_QUERY } from './Room'
import { DEVICE_PLAY_ITEM_IMAGE_URL_QUERY } from './deviceControls/PlayItemImage'
import { withRouter } from 'storybook-addon-remix-react-router'

const defaultDeviceParams = {
  batteryPercentage: null,
  colorHue: null,
  colorSaturation: null,
  colorTemperature: null,
  humidity: null,
  isOn: null,
  isOpen: null,
  lightLevel: null,
  nextPlayItem: null,
  playItem: null,
  playback: null,
  playbackNextAvailable: true,
  playbackPreviousAvailable: true,
  pm25: null,
  temperature: null,
  vocIndex: null,
  volume: null,
}

const mocks = [
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
    result: {
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
                playback: null,
                type: 'DEVICE',
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
                playback: null,
                type: 'DEVICE',
              },
              {
                id: '2',
                name: 'Lights (off)',
                isReachable: true,
                isOn: false,
                playback: null,
                type: 'DEVICE',
              },
            ],
          },
          {
            id: '3',
            name: 'Kitchen',
            quickControls: [
              {
                id: '1',
                name: 'Speaker (idle)',
                isReachable: true,
                isOn: null,
                playback: 'playbackIdle',
                type: 'DEVICE',
              },
              {
                id: '2',
                name: 'Speaker (playing)',
                isReachable: true,
                isOn: null,
                playback: 'playbackPlaying',
                type: 'DEVICE',
              },
            ],
          },
          { id: '4', name: 'Entrance', quickControls: [] },
        ],
      },
    },
  },
  {
    request: {
      query: ROOM_QUERY,
      variables: {
        id: '',
      },
    },
    result: {
      data: {
        room: {
          id: 'room-id',
          name: 'Room name',
          devices: [
            {
              id: '1',
              name: 'Speaker',
              type: 'DEVICE',
              isReachable: true,
              ...defaultDeviceParams,
              playback: 'playbackPlaying',
              volume: 25,
              playItem: 'Song title',
              nextPlayItem: 'Next song title',
              playbackNextAvailable: true,
              playbackPreviousAvailable: true,
            },
            {
              id: '2',
              name: 'Light 1',
              type: 'DEVICE',
              isReachable: true,
              ...defaultDeviceParams,
              isOn: false,
              lightLevel: 1,
            },
            {
              id: '3',
              name: 'Light 2',
              type: 'DEVICE_SET',
              isReachable: true,
              ...defaultDeviceParams,
              isOn: true,
              lightLevel: 100,
              colorTemperature: 4000,
              colorHue: 0,
              colorSaturation: 1,
            },
            {
              id: '4',
              name: 'Remote',
              type: 'DEVICE',
              isReachable: true,
              ...defaultDeviceParams,
              batteryPercentage: 50,
            },
            {
              id: '5',
              name: 'Sensor',
              type: 'DEVICE',
              isReachable: true,
              ...defaultDeviceParams,
              temperature: 25,
              humidity: 50,
              pm25: 10,
              vocIndex: 100,
            },
            {
              id: '6',
              name: 'Open/close sensor',
              type: 'DEVICE',
              isReachable: true,
              ...defaultDeviceParams,
              batteryPercentage: 92,
              isOpen: true,
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: DEVICE_PLAY_ITEM_IMAGE_URL_QUERY,
      variables: {
        id: '1',
      },
    },
    result: {
      data: {
        devicePlayItemImageURL: 'https://placehold.co/320x320?text=Album+art',
      },
    },
  },
]

export default {
  title: 'Application pages',
  component: Frame,
  decorators: [
    withRouter,
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
    mocks,
  },
} as Meta<typeof Frame>

type Story = StoryObj<typeof Frame>

export const LoggedOut: Story = {
  parameters: {
    apolloClient: {},
  },
}

export const QuickControls: Story = {
  parameters: {
    reactRouter: {
      routePath: '/',
      outlet: <Rooms />,
    },
    token: 'mock_token',
  },
}

export const Room: Story = {
  parameters: {
    reactRouter: {
      routePath: '/rooms/room-id',
      outlet: <RoomComponent />,
    },
    token: 'mock_token',
  },
}
