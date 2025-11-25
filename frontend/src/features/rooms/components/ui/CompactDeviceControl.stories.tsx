import type { Meta, StoryObj } from "@storybook/react";
import { CompactDeviceControl } from "./CompactDeviceControl";
import type { Device } from "@/graphql.types";

const meta = {
  component: CompactDeviceControl,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof CompactDeviceControl>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockDevice: Device = {
  id: "1",
  name: "Living Room Light",
  type: "DEVICE",
  isOn: true,
  isReachable: true,
  lightLevel: 80,
  colorHue: 120,
  colorSaturation: 0.7,
  colorTemperature: null,
  batteryPercentage: null,
  volume: null,
  playback: null,
  playbackNextAvailable: null,
  playbackPreviousAvailable: null,
  playItem: null,
  nextPlayItem: null,
  isOpen: null,
  temperature: null,
  humidity: null,
  pm25: null,
  vocIndex: null,
};

export const Default: Story = {
  args: {
    device: mockDevice,
  },
};

export const DeviceOff: Story = {
  args: {
    device: {
      ...mockDevice,
      isOn: false,
    },
  },
};

export const LowBrightness: Story = {
  args: {
    device: {
      ...mockDevice,
      lightLevel: 20,
    },
  },
};

export const Unreachable: Story = {
  args: {
    device: {
      ...mockDevice,
      isReachable: false,
    },
  },
};

export const WarmWhite: Story = {
  args: {
    device: {
      ...mockDevice,
      colorHue: null,
      colorSaturation: null,
      colorTemperature: 2700,
    },
  },
};

export const LongName: Story = {
  args: {
    device: {
      ...mockDevice,
      name: "This is a very long device name that should be truncated",
    },
  },
};

export const MultipleDevices: Story = {
  args: {
    device: mockDevice,
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        maxWidth: "400px",
      }}
    >
      <CompactDeviceControl
        device={{
          ...mockDevice,
          id: "1",
          name: "Living Room Light",
          lightLevel: 80,
        }}
      />
      <CompactDeviceControl
        device={{
          ...mockDevice,
          id: "2",
          name: "Bedroom Light",
          lightLevel: 50,
          colorHue: 30,
        }}
      />
      <CompactDeviceControl
        device={{
          ...mockDevice,
          id: "3",
          name: "Kitchen Light",
          isOn: false,
        }}
      />
      <CompactDeviceControl
        device={{
          ...mockDevice,
          id: "4",
          name: "Hallway Light",
          lightLevel: 100,
          colorHue: 240,
        }}
      />
    </div>
  ),
};
