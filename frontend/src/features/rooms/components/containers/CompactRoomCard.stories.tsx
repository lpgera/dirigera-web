import type { Meta, StoryObj } from "@storybook/react";
import { CompactRoomCard } from "./CompactRoomCard";
import { SCENES_QUERY } from "@/features/scenes/api/scenesApi";
import { ScenesUI } from "@/features/scenes/components/ui/ScenesUI";
import type { Room } from "@/graphql.types";

/**
 * CompactRoomCard displays a room with:
 * - Room name header
 * - Scene buttons (can be passed as a prop or fetched internally)
 * - Device images in a grid layout
 * - Click handlers for each device
 *
 * The scenes prop allows for better separation of concerns and easier Storybook visualization.
 * If scenes are not provided, they will be fetched via GraphQL and filtered based on room ID.
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
    scenes: {
      description: "Optional scenes to display as buttons (React.ReactNode)",
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
    scenes: (
      <ScenesUI
        scenes={[
          { id: "scene-1", name: "Cozy" },
          { id: "scene-2", name: "Bright" },
          { id: "scene-3", name: "Movie Time" },
        ]}
        onActivateScene={(sceneId) => console.log(`Scene ${sceneId} activated`)}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the component with scenes passed as a prop, making it easier to visualize in Storybook without relying on scenes.config.json or GraphQL.",
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

export const WithCustomScenes: Story = {
  args: {
    room: mockRoom,
    scenes: (
      <ScenesUI
        scenes={[
          { id: "scene-morning", name: "Morning" },
          { id: "scene-evening", name: "Evening" },
          { id: "scene-night", name: "Night" },
        ]}
        onActivateScene={(sceneId) => console.log(`Scene ${sceneId} activated`)}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates passing custom scenes as a prop for better control and easier visualization in Storybook.",
      },
    },
  },
};

export const WithManyScenesPassedAsProp: Story = {
  args: {
    room: mockRoom,
    scenes: (
      <ScenesUI
        scenes={[
          { id: "scene-cozy", name: "Cozy" },
          { id: "scene-bright", name: "Bright" },
          { id: "scene-movie", name: "Movie Time" },
          { id: "scene-reading", name: "Reading" },
          { id: "scene-party", name: "Party" },
        ]}
        onActivateScene={(sceneId) => console.log(`Scene ${sceneId} activated`)}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows how the component handles multiple scenes when passed as a prop.",
      },
    },
  },
};

export const WithNoScenesPassedAsProp: Story = {
  args: {
    room: mockRoom,
    scenes: null,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When scenes prop is explicitly set to null, no scenes will be displayed. This is different from not passing the prop, which would fetch scenes internally.",
      },
    },
  },
};
