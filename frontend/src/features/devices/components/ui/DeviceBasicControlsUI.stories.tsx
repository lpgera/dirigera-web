import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { DeviceBasicControlsUI } from "./DeviceBasicControlsUI";

const meta = {
  component: DeviceBasicControlsUI,
  title: "Features/Devices/UI/DeviceBasicControlsUI",
  tags: ["autodocs"],
  args: {
    onIsOnChange: fn(),
    onLightLevelChange: fn(),
    onVolumeChange: fn(),
    loading: {},
    isReachable: true,
    name: "Living Room Light",
  },
  decorators: [
    (story) => <div style={{ width: 400, padding: "20px" }}>{story()}</div>,
  ],
} satisfies Meta<typeof DeviceBasicControlsUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightWithToggleAndLevel: Story = {
  args: {
    isOn: true,
    lightLevel: 75,
    volume: null,
    batteryPercentage: null,
  },
};

export const LightOff: Story = {
  args: {
    isOn: false,
    lightLevel: 50,
    volume: null,
    batteryPercentage: null,
  },
};

export const SpeakerWithVolume: Story = {
  args: {
    isOn: true,
    lightLevel: null,
    volume: 60,
    batteryPercentage: null,
    name: "Kitchen Speaker",
  },
};

export const BatteryDeviceOnly: Story = {
  args: {
    isOn: null,
    lightLevel: null,
    volume: null,
    batteryPercentage: 85,
    name: "Motion Sensor",
  },
};

export const LightWithBattery: Story = {
  args: {
    isOn: true,
    lightLevel: 50,
    volume: null,
    batteryPercentage: 42,
    name: "Remote Control Bulb",
  },
};

export const AllControls: Story = {
  args: {
    isOn: true,
    lightLevel: 80,
    volume: 50,
    batteryPercentage: 100,
    name: "Multi-Function Device",
  },
};

export const Unreachable: Story = {
  args: {
    isOn: true,
    lightLevel: 50,
    volume: null,
    batteryPercentage: null,
    isReachable: false,
  },
};

export const LoadingToggle: Story = {
  args: {
    isOn: true,
    lightLevel: 75,
    volume: null,
    batteryPercentage: null,
    loading: { isOn: true },
  },
};

export const LoadingLightLevel: Story = {
  args: {
    isOn: true,
    lightLevel: 75,
    volume: null,
    batteryPercentage: null,
    loading: { lightLevel: true },
  },
};

export const LoadingVolume: Story = {
  args: {
    isOn: true,
    lightLevel: null,
    volume: 50,
    batteryPercentage: null,
    loading: { volume: true },
    name: "Speaker",
  },
};

export const NoControls: Story = {
  args: {
    isOn: null,
    lightLevel: null,
    volume: null,
    batteryPercentage: null,
  },
};

export const LowBattery: Story = {
  args: {
    isOn: null,
    lightLevel: null,
    volume: null,
    batteryPercentage: 10,
    name: "Door Sensor",
  },
};

export const ToggleOnly: Story = {
  args: {
    isOn: true,
    lightLevel: null,
    volume: null,
    batteryPercentage: null,
    name: "Smart Plug",
  },
};
