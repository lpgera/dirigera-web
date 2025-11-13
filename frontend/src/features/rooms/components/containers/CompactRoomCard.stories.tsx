import type { Meta, StoryObj } from "@storybook/react";
import { CompactRoomCard } from "./CompactRoomCard";
import { SCENES_QUERY } from "@/features/scenes/api/scenesApi";
import type { Room } from "@/graphql.types";

/**
 * CompactRoomCard displays a room with:
 * - Room name header
 * - Scene buttons (configured via scenes.config.json)
 * - Device images in a grid layout
 * - Click handlers for each device
 *
 * Scenes are fetched via GraphQL and filtered based on room ID in scenes.config.json.
 * If no scenes are configured for a room, the scene section is hidden.
 */

const mockScenes = [
  { id: "scene-1", name: "Cozy" },
  { id: "scene-2", name: "Bright" },
  { id: "scene-3", name: "Movie Time" },
];

const mockRoom: Room = {
  __typename: "Room",
  id: "living-room",
  name: "Living Room",
  quickControls: [],
  devices: [
    {
      __typename: "Device",
      id: "device-1",
      name: "Ceiling Light",
      type: "DEVICE",
      isReachable: true,
      batteryPercentage: null,
      isOn: true,
      lightLevel: 75,
      colorTemperature: 3000,
      colorHue: null,
      colorSaturation: null,
    },
    {
      __typename: "Device",
      id: "device-2",
      name: "Table Lamp",
      type: "DEVICE",
      isReachable: true,
      batteryPercentage: null,
      isOn: false,
      lightLevel: null,
      colorTemperature: null,
      colorHue: null,
      colorSaturation: null,
    },
    {
      __typename: "Device",
      id: "device-3",
      name: "RGB Strip",
      type: "DEVICE",
      isReachable: true,
      batteryPercentage: null,
      isOn: true,
      lightLevel: 100,
      colorTemperature: null,
      colorHue: 120,
      colorSaturation: 0.8,
    },
    {
      __typename: "Device",
      id: "device-4",
      name: "Motion Sensor",
      type: "DEVICE",
      isReachable: true,
      batteryPercentage: 87,
      isOn: null,
      lightLevel: null,
      colorTemperature: null,
      colorHue: null,
      colorSaturation: null,
    },
    {
      __typename: "Device",
      id: "device-5",
      name: "Remote Control",
      type: "DEVICE",
      isReachable: true,
      batteryPercentage: 45,
      isOn: null,
      lightLevel: null,
      colorTemperature: null,
      colorHue: null,
      colorSaturation: null,
    },
  ],
};

const meta = {
  component: CompactRoomCard,
  tags: ["autodocs"],
  title: "Features/Rooms/CompactRoomCard",
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400, margin: "20px auto" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    mocks: [
      {
        request: {
          query: SCENES_QUERY,
        },
        result: {
          data: {
            scenes: mockScenes,
          },
        },
      },
    ],
  },
  argTypes: {
    room: {
      description: "Room object with id, name, and devices",
    },
    onDeviceClick: {
      description: "Callback when a device is clicked",
      action: "device-clicked",
    },
  },
} satisfies Meta<typeof CompactRoomCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    room: mockRoom,
  },
};

export const EmptyRoom: Story = {
  args: {
    room: {
      ...mockRoom,
      name: "Empty Room",
      devices: [],
    },
  },
};

export const SingleDevice: Story = {
  args: {
    room: {
      ...mockRoom,
      name: "Bathroom",
      devices: [mockRoom.devices[0]],
    },
  },
};

export const ManyDevices: Story = {
  args: {
    room: {
      ...mockRoom,
      name: "Office",
      devices: [...mockRoom.devices, ...mockRoom.devices, ...mockRoom.devices],
    },
  },
};

export const WithScenes: Story = {
  args: {
    room: {
      ...mockRoom,
      id: "living-room",
      name: "Living Room with Scenes",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Scenes are configured via scenes.config.json. In this example, room 'living-room' has scenes configured, which will appear as buttons above the device list.",
      },
    },
  },
};

export const NoScenes: Story = {
  args: {
    room: {
      ...mockRoom,
      id: "room-without-scenes",
      name: "Room Without Scenes",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "When a room has no scenes configured in scenes.config.json, only the device images are shown.",
      },
    },
  },
};

export const AllDeviceStates: Story = {
  args: {
    room: {
      ...mockRoom,
      name: "Device State Examples",
      devices: [
        {
          __typename: "Device",
          id: "on-bright",
          name: "On & Bright",
          type: "DEVICE",
          isReachable: true,
          batteryPercentage: null,
          isOn: true,
          lightLevel: 100,
          colorTemperature: 3000,
          colorHue: null,
          colorSaturation: null,
        },
        {
          __typename: "Device",
          id: "on-dim",
          name: "On & Dim",
          type: "DEVICE",
          isReachable: true,
          batteryPercentage: null,
          isOn: true,
          lightLevel: 25,
          colorTemperature: 3000,
          colorHue: null,
          colorSaturation: null,
        },
        {
          __typename: "Device",
          id: "off",
          name: "Off",
          type: "DEVICE",
          isReachable: true,
          batteryPercentage: null,
          isOn: false,
          lightLevel: null,
          colorTemperature: null,
          colorHue: null,
          colorSaturation: null,
        },
        {
          __typename: "Device",
          id: "unreachable",
          name: "Unreachable",
          type: "DEVICE",
          isReachable: false,
          batteryPercentage: null,
          isOn: true,
          lightLevel: 75,
          colorTemperature: null,
          colorHue: null,
          colorSaturation: null,
        },
        {
          __typename: "Device",
          id: "rgb-red",
          name: "RGB Red",
          type: "DEVICE",
          isReachable: true,
          batteryPercentage: null,
          isOn: true,
          lightLevel: 100,
          colorTemperature: null,
          colorHue: 0,
          colorSaturation: 1,
        },
        {
          __typename: "Device",
          id: "rgb-green",
          name: "RGB Green",
          type: "DEVICE",
          isReachable: true,
          batteryPercentage: null,
          isOn: true,
          lightLevel: 100,
          colorTemperature: null,
          colorHue: 120,
          colorSaturation: 1,
        },
        {
          __typename: "Device",
          id: "rgb-blue",
          name: "RGB Blue",
          type: "DEVICE",
          isReachable: true,
          batteryPercentage: null,
          isOn: true,
          lightLevel: 100,
          colorTemperature: null,
          colorHue: 240,
          colorSaturation: 1,
        },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows various device states: on/off, brightness levels, unreachable, and RGB colors. Click any device to trigger the onClick handler.",
      },
    },
  },
};
