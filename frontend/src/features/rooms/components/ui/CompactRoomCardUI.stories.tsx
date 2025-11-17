import type { Meta, StoryObj } from "@storybook/react";
import { CompactRoomCardUI } from "./CompactRoomCardUI";
import { ScenesUI } from "@/features/scenes/components/ui/ScenesUI";
import type { Device } from "@/graphql.types";

/**
 * CompactRoomCardUI is a pure presentational component that displays:
 * - Room name header
 * - Optional scenes section
 * - Device images in a grid layout
 * - Battery devices in a separate section
 * - Click handlers for each device
 *
 * This component receives all computed data as props, making it easy to
 * visualize different states in Storybook without mocking hooks or GraphQL.
 */

const mockGetDeviceImage = (deviceId: string) => {
  const imageMap: Record<string, string> = {
    "device-1": "https://picsum.photos/id/199/80/80",
    "device-2": "https://picsum.photos/id/200/80/80",
    "device-3": "https://picsum.photos/id/201/80/80",
    "device-4": "https://picsum.photos/id/202/80/80",
    "device-5": "https://picsum.photos/id/203/80/80",
    "device-6": "https://picsum.photos/id/204/80/80",
  };
  return imageMap[deviceId];
};

const mockDevices: Device[] = [
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
  {
    __typename: "Device",
    id: "device-6",
    name: "Floor Lamp (No Image)",
    type: "DEVICE",
    isReachable: true,
    batteryPercentage: null,
    isOn: true,
    lightLevel: 50,
    colorTemperature: 2700,
    colorHue: null,
    colorSaturation: null,
  },
  {
    __typename: "Device",
    id: "device-7",
    name: "Door Sensor (No Image)",
    type: "DEVICE",
    isReachable: true,
    batteryPercentage: 92,
    isOn: null,
    lightLevel: null,
    colorTemperature: null,
    colorHue: null,
    colorSaturation: null,
  },
  {
    __typename: "Device",
    id: "device-8",
    name: "Smart Plug (No Image)",
    type: "DEVICE",
    isReachable: true,
    batteryPercentage: null,
    isOn: true,
    lightLevel: null,
    colorTemperature: null,
    colorHue: null,
    colorSaturation: null,
  },
];

const meta = {
  component: CompactRoomCardUI,
  tags: ["autodocs"],
  title: "Features/Rooms/CompactRoomCardUI",
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400, margin: "20px auto" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    roomName: {
      description: "Name of the room to display in the card header",
    },
    devices: {
      description:
        "Array of processed devices with computed imagePath and deviceColor",
    },
    scenes: {
      description: "Optional scenes to display as buttons (React.ReactNode)",
    },
    onDeviceClick: {
      description: "Callback when a device is clicked",
      action: "device-clicked",
    },
  },
} satisfies Meta<typeof CompactRoomCardUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    roomName: "Living Room",
    devices: mockDevices,
    getDeviceImage: mockGetDeviceImage,
  },
};

export const EmptyRoom: Story = {
  args: {
    roomName: "Empty Room",
    devices: [],
    getDeviceImage: mockGetDeviceImage,
  },
};

export const SingleDevice: Story = {
  args: {
    roomName: "Bathroom",
    devices: [mockDevices[0]],
    getDeviceImage: mockGetDeviceImage,
  },
};

export const ManyDevices: Story = {
  args: {
    roomName: "Office",
    devices: [
      ...mockDevices,
      ...mockDevices.map((d, i) => ({
        ...d,
        id: `${d.id}-copy-${i}`,
      })),
      ...mockDevices.map((d, i) => ({
        ...d,
        id: `${d.id}-copy2-${i}`,
      })),
    ],
    getDeviceImage: mockGetDeviceImage,
  },
};

export const OnlyBatteryDevices: Story = {
  args: {
    roomName: "Sensors Room",
    devices: mockDevices.filter((d) => d.batteryPercentage !== null),
    getDeviceImage: mockGetDeviceImage,
  },
};

export const OnlyPoweredDevices: Story = {
  args: {
    roomName: "Lights Only",
    devices: mockDevices.filter((d) => d.batteryPercentage === null),
    getDeviceImage: mockGetDeviceImage,
  },
};

export const WithScenes: Story = {
  args: {
    roomName: "Living Room with Scenes",
    devices: mockDevices,
    getDeviceImage: mockGetDeviceImage,
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
};

export const WithManyScenes: Story = {
  args: {
    roomName: "Living Room",
    devices: mockDevices,
    getDeviceImage: mockGetDeviceImage,
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
};

export const AllDeviceStates: Story = {
  args: {
    roomName: "Device State Examples",
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
    getDeviceImage: mockGetDeviceImage,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows various device states: on/off, brightness levels, unreachable, and RGB colors with deviceColor computed.",
      },
    },
  },
};

export const WithCustomColors: Story = {
  args: {
    roomName: "RGB Lights",
    devices: [
      {
        ...mockDevices[2],
        id: "rgb-1",
        name: "Purple Light",
      },
      {
        ...mockDevices[2],
        id: "rgb-2",
        name: "Orange Light",
      },
      {
        ...mockDevices[2],
        id: "rgb-3",
        name: "Pink Light",
      },
    ],
    getDeviceImage: mockGetDeviceImage,
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates devices with custom deviceColor values applied.",
      },
    },
  },
};

export const NoScenes: Story = {
  args: {
    roomName: "Room Without Scenes",
    devices: mockDevices,
    getDeviceImage: mockGetDeviceImage,
    scenes: null,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When scenes is null or undefined, no scenes section is rendered.",
      },
    },
  },
};

export const DevicesWithoutImages: Story = {
  args: {
    roomName: "Devices Without Images",
    devices: mockDevices.filter((d) => !mockGetDeviceImage(d.id)),
    getDeviceImage: mockGetDeviceImage,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how devices without imagePath are rendered. These devices will show a fallback or placeholder state.",
      },
    },
  },
};

export const MixedDevicesWithAndWithoutImages: Story = {
  args: {
    roomName: "Mixed Device Images",
    devices: [
      ...mockDevices.filter((d) => mockGetDeviceImage(d.id)).slice(0, 2),
      ...mockDevices.filter((d) => !mockGetDeviceImage(d.id)),
      ...mockDevices.filter((d) => mockGetDeviceImage(d.id)).slice(2, 3),
    ],
    getDeviceImage: mockGetDeviceImage,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows a mix of devices with and without images to demonstrate the real-world scenario.",
      },
    },
  },
};
