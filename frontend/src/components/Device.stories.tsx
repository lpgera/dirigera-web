import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import 'antd/dist/reset.css'
import Frame from './Frame'
import Device from './Device'
import { DEVICE_PLAY_ITEM_IMAGE_URL_QUERY } from './deviceControls/PlayItemImage'

export default {
  title: 'Devices',
  component: Device,
  decorators: [(story) => <div style={{ width: 320 }}>{story()}</div>],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1e1e1e' }],
    },
    apolloClient: {
      mocks: [
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
  argTypes: {
    id: { control: false },
    isReachable: { control: { type: 'boolean' }, defaultValue: true },
    isOn: {
      control: { type: 'select' },
      options: [true, false, null],
      defaultValue: true,
    },
    lightLevel: {
      control: { type: 'number', min: 1, max: 100, step: 1 },
      defaultValue: null,
    },
    colorTemperature: {
      control: { type: 'number', min: 2202, max: 4000, step: 62 },
      defaultValue: null,
    },
    colorHue: {
      control: { type: 'number', min: 0, max: 360, step: 1 },
      defaultValue: null,
    },
    colorSaturation: {
      control: { type: 'number', min: 0, max: 1, step: 0.1 },
      defaultValue: null,
    },
    batteryPercentage: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      defaultValue: null,
    },
    playback: {
      control: {
        type: 'select',
      },
      options: [
        'playbackPlaying',
        'playbackPaused',
        'playbackIdle',
        'playbackBuffering',
        null,
      ],
      defaultValue: null,
    },
    volume: {
      control: { type: 'number', min: 0, max: 50, step: 1 },
    },
    playItem: {
      control: { type: 'text' },
    },
    nextPlayItem: {
      control: { type: 'text' },
    },
    playbackNextAvailable: {
      control: { type: 'select' },
      options: [true, false, null],
      defaultValue: null,
    },
    playbackPreviousAvailable: {
      control: { type: 'select' },
      options: [true, false, null],
      defaultValue: null,
    },
  },
} as Meta<typeof Frame>

type Story = StoryObj<typeof Frame>

export const Light: Story = {
  args: {
    id: '1',
    name: 'Light',
    type: 'DEVICE',
    isReachable: true,
    isOn: true,
    lightLevel: 100,
  },
}

export const LightWithColors: Story = {
  args: {
    id: '1',
    name: 'Light with colors',
    type: 'DEVICE',
    isReachable: true,
    isOn: true,
    lightLevel: 100,
    colorTemperature: 4000,
    colorHue: 0,
    colorSaturation: 1,
  },
}

export const ControlOutlet: Story = {
  args: {
    id: '1',
    name: 'Control outlet',
    type: 'DEVICE',
    isReachable: true,
    isOn: true,
  },
}

export const Speaker: Story = {
  args: {
    id: '1',
    name: 'Speaker',
    type: 'DEVICE',
    isReachable: true,
    playback: 'playbackPlaying',
    volume: 25,
    playItem: 'Song title',
    nextPlayItem: 'Next song title',
    playbackNextAvailable: true,
    playbackPreviousAvailable: true,
  },
}

export const Remote: Story = {
  args: {
    id: '1',
    name: 'Remote',
    type: 'DEVICE',
    isReachable: true,
    batteryPercentage: 100,
  },
}

export const EnvironmentSensor: Story = {
  args: {
    id: '1',
    name: 'Environment sensor',
    type: 'DEVICE',
    isReachable: true,
    temperature: 25,
    humidity: 50,
    pm25: 10,
    vocIndex: 100,
  },
}
