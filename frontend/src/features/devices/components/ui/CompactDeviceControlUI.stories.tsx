import type { Meta, StoryObj } from "@storybook/react";
import { CompactDeviceControlUI } from "./CompactDeviceControlUI";

const meta = {
  component: CompactDeviceControlUI,
  title: "Features/Devices/UI/CompactDeviceControlUI",

  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof CompactDeviceControlUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Living Room Light",
    imagePath: undefined,
    isOn: true,
    isReachable: true,
    lightLevel: 80,
    lightColor: "#ffffff",
    showGlow: true,
  },
};

export const DeviceOff: Story = {
  args: {
    name: "Living Room Light",
    imagePath: undefined,
    isOn: false,
    isReachable: true,
    lightLevel: 0,
    lightColor: "#ffffff",
    showGlow: false,
  },
};

export const LowBrightness: Story = {
  args: {
    name: "Living Room Light",
    imagePath: undefined,
    isOn: true,
    isReachable: true,
    lightLevel: 20,
    lightColor: "#ffffff",
    showGlow: true,
  },
};

export const Unreachable: Story = {
  args: {
    name: "Living Room Light",
    imagePath: undefined,
    isOn: true,
    isReachable: false,
    lightLevel: 80,
    lightColor: "#ffffff",
    showGlow: false,
  },
};

export const ColoredLight: Story = {
  args: {
    name: "RGB Light",
    imagePath: undefined,
    isOn: true,
    isReachable: true,
    lightLevel: 100,
    lightColor: "#ff6600",
    showGlow: true,
  },
};

export const LongName: Story = {
  args: {
    name: "This is a very long device name that should be truncated",
    imagePath: undefined,
    isOn: true,
    isReachable: true,
    lightLevel: 80,
    lightColor: "#ffffff",
    showGlow: true,
  },
};

export const MultipleDevices: Story = {
  args: {
    name: "Living Room Light",
    imagePath: undefined,
    isOn: true,
    isReachable: true,
    lightLevel: 80,
    lightColor: "#ffffff",
    showGlow: true,
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
      <CompactDeviceControlUI
        name="Living Room Light"
        imagePath={undefined}
        isOn={true}
        isReachable={true}
        lightLevel={80}
        lightColor="#ffffff"
        showGlow={true}
      />
      <CompactDeviceControlUI
        name="Bedroom Light"
        imagePath={undefined}
        isOn={true}
        isReachable={true}
        lightLevel={50}
        lightColor="#ffaa00"
        showGlow={true}
      />
      <CompactDeviceControlUI
        name="Kitchen Light"
        imagePath={undefined}
        isOn={false}
        isReachable={true}
        lightLevel={0}
        lightColor="#ffffff"
        showGlow={false}
      />
      <CompactDeviceControlUI
        name="Hallway Light"
        imagePath={undefined}
        isOn={true}
        isReachable={true}
        lightLevel={100}
        lightColor="#0066ff"
        showGlow={true}
      />
    </div>
  ),
};
