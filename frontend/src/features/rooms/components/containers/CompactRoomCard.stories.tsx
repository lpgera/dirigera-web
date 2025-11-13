import type { Meta, StoryObj } from "@storybook/react";
import { CompactRoomCard } from "./CompactRoomCard";
import type { Room } from "@/graphql.types";

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
      name: "Unreachable Light",
      type: "DEVICE",
      isReachable: false,
      batteryPercentage: null,
      isOn: true,
      lightLevel: 50,
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
      devices: [
        ...mockRoom.devices,
        ...mockRoom.devices,
        ...mockRoom.devices,
      ],
    },
  },
};
