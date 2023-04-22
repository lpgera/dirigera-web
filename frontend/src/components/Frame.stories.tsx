import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import 'antd/dist/reset.css'
import Frame from './Frame'
import { AuthContext } from './AuthContext'
import Rooms, { ROOMS_QUERY } from './Rooms'
import { SCENES_QUERY } from './Scenes'
import RoomComponent, { ROOM_QUERY } from './Room'
import { DEVICE_PLAY_ITEM_IMAGE_URL_QUERY } from './deviceControls/PlayItemImage'

export default {
  title: 'Application pages',
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

export const QuickControls: Story = {
  parameters: {
    reactRouter: {
      routePath: '/',
      outlet: <Rooms />,
    },
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
          }),
        },
      ],
    },
  },
}

export const Room: Story = {
  parameters: {
    reactRouter: {
      routePath: '/rooms/room-id',
      outlet: <RoomComponent />,
    },
    token: 'mock_token',
    apolloClient: {
      mocks: [
        {
          request: {
            query: ROOM_QUERY,
            variables: {
              id: '',
            },
          },
          newData: () => ({
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
                    isOn: null,
                    lightLevel: null,
                    colorTemperature: null,
                    colorHue: null,
                    colorSaturation: null,
                    batteryPercentage: null,
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
                    isOn: false,
                    lightLevel: 1,
                    colorTemperature: null,
                    colorHue: null,
                    colorSaturation: null,
                    batteryPercentage: null,
                    playback: null,
                    volume: null,
                    playItem: null,
                    nextPlayItem: null,
                    playbackNextAvailable: null,
                    playbackPreviousAvailable: null,
                  },
                  {
                    id: '3',
                    name: 'Light 2',
                    type: 'DEVICE_SET',
                    isReachable: true,
                    isOn: true,
                    lightLevel: 100,
                    colorTemperature: 4000,
                    colorHue: 0,
                    colorSaturation: 1,
                    batteryPercentage: null,
                    playback: null,
                    volume: null,
                    playItem: null,
                    nextPlayItem: null,
                    playbackNextAvailable: null,
                    playbackPreviousAvailable: null,
                  },
                  {
                    id: '4',
                    name: 'Remote',
                    type: 'DEVICE',
                    isReachable: true,
                    isOn: null,
                    lightLevel: null,
                    colorTemperature: null,
                    colorHue: null,
                    colorSaturation: null,
                    batteryPercentage: 50,
                    playback: null,
                    volume: null,
                    playItem: null,
                    nextPlayItem: null,
                    playbackNextAvailable: null,
                    playbackPreviousAvailable: null,
                  },
                ],
              },
            },
          }),
        },
        {
          request: {
            query: DEVICE_PLAY_ITEM_IMAGE_URL_QUERY,
            variables: {
              id: '1',
            },
          },
          newData: () => ({
            data: {
              devicePlayItemImageURL:
                'https://placehold.co/320x320?text=Album+art',
            },
          }),
        },
      ],
    },
  },
}
