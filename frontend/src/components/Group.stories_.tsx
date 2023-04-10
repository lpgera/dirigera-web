// import React from 'react'
// import { Meta, StoryObj } from '@storybook/react'
// import 'antd/dist/reset.css'
// import Group from './Group'
// import { AccessoryType } from '../graphql.types'
// import Frame from './Frame'
//
// export default {
//   title: 'Group states',
//   component: Group,
//   layout: 'centered',
//   decorators: [(story) => <div style={{ width: 320 }}>{story()}</div>],
//   args: {
//     id: 1,
//     isDeviceListDefaultOpen: true,
//   },
// } as Meta<typeof Group>
//
// type Story = StoryObj<typeof Frame>
//
// export const Empty: Story = {
//   args: {
//     name: 'Empty group',
//     accessories: [],
//   },
// }
//
// export const Bulb: Story = {
//   args: {
//     name: 'Group with bulb',
//     accessories: [
//       {
//         id: 1,
//         name: 'Bulb',
//         type: AccessoryType.Lightbulb,
//         alive: true,
//         onOff: true,
//         dimmer: 100,
//         battery: null,
//         colorTemperature: 60,
//       },
//       {
//         id: 2,
//         name: 'Remote',
//         type: AccessoryType.Remote,
//         alive: true,
//         onOff: null,
//         dimmer: null,
//         battery: 87,
//         colorTemperature: null,
//       },
//       {
//         id: 3,
//         name: 'Motion sensor',
//         type: AccessoryType.MotionSensor,
//         alive: true,
//         onOff: null,
//         dimmer: null,
//         battery: 74,
//         colorTemperature: null,
//       },
//     ],
//   },
// }
//
// export const Driver: Story = {
//   args: {
//     name: 'Group with LED driver',
//     accessories: [
//       {
//         id: 1,
//         name: 'Driver',
//         type: AccessoryType.Lightbulb,
//         alive: true,
//         onOff: true,
//         dimmer: 50,
//         battery: null,
//         colorTemperature: null,
//       },
//     ],
//   },
// }
//
// export const Plug: Story = {
//   args: {
//     name: 'Group with plug',
//     accessories: [
//       {
//         id: 1,
//         name: 'Plug',
//         type: AccessoryType.Plug,
//         alive: true,
//         onOff: true,
//         dimmer: null,
//         battery: null,
//         colorTemperature: null,
//       },
//     ],
//   },
// }
//
// export const Inaccessible: Story = {
//   args: {
//     name: 'Group with inaccessible devices',
//     accessories: [
//       {
//         id: 1,
//         name: 'Bulb',
//         type: AccessoryType.Lightbulb,
//         alive: false,
//         onOff: true,
//         dimmer: 100,
//         battery: null,
//         colorTemperature: 60,
//       },
//       {
//         id: 2,
//         name: 'Driver',
//         type: AccessoryType.Lightbulb,
//         alive: false,
//         onOff: true,
//         dimmer: 50,
//         battery: null,
//         colorTemperature: null,
//       },
//       {
//         id: 3,
//         name: 'Plug',
//         type: AccessoryType.Plug,
//         alive: false,
//         onOff: true,
//         dimmer: null,
//         battery: null,
//         colorTemperature: null,
//       },
//     ],
//   },
// }
//
// export const ShortcutButtonGroup: Story = {
//   args: {
//     name: 'Shortcut button group',
//     accessories: [
//       {
//         id: 1,
//         name: 'TRADFRI SHORTCUT Button',
//         type: AccessoryType.Remote,
//         alive: true,
//         onOff: null,
//         dimmer: null,
//         battery: 87,
//         colorTemperature: null,
//       },
//     ],
//   },
// }

export {}
