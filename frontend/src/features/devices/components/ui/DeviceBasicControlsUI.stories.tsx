import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { DeviceBasicControlsUI } from "./DeviceBasicControlsUI";
import { DeviceToggle } from "./DeviceToggle";
import { LightLevelControl } from "./LightLevelControl";
import { VolumeControl } from "./VolumeControl";
import { BatteryIndicator } from "./BatteryIndicator";

const meta = {
  component: DeviceBasicControlsUI,
  title: "Features/Devices/UI/DeviceBasicControlsUI",
  tags: ["autodocs"],
  decorators: [
    (story) => <div style={{ width: 400, padding: "20px" }}>{story()}</div>,
  ],
} satisfies Meta<typeof DeviceBasicControlsUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightWithToggleAndLevel: Story = {
  args: {
    toggleSlot: (
      <DeviceToggle
        isOn={true}
        isReachable={true}
        onChange={fn()}
        loading={false}
      />
    ),
    lightLevelSlot: (
      <LightLevelControl
        lightLevel={75}
        isReachable={true}
        disabled={false}
        onChange={fn()}
        loading={false}
      />
    ),
  },
};

export const LightOff: Story = {
  args: {
    toggleSlot: (
      <DeviceToggle
        isOn={false}
        isReachable={true}
        onChange={fn()}
        loading={false}
      />
    ),
    lightLevelSlot: (
      <LightLevelControl
        lightLevel={50}
        isReachable={true}
        disabled={true}
        onChange={fn()}
        loading={false}
      />
    ),
  },
};

export const SpeakerWithVolume: Story = {
  args: {
    toggleSlot: (
      <DeviceToggle
        isOn={true}
        isReachable={true}
        onChange={fn()}
        loading={false}
      />
    ),
    volumeSlot: (
      <VolumeControl
        volume={60}
        isReachable={true}
        onChange={fn()}
        loading={false}
      />
    ),
  },
};

export const BatteryDeviceOnly: Story = {
  args: {
    batterySlot: <BatteryIndicator batteryPercentage={85} name="Motion Sensor" />,
  },
};

export const LightWithBattery: Story = {
  args: {
    toggleSlot: (
      <DeviceToggle
        isOn={true}
        isReachable={true}
        onChange={fn()}
        loading={false}
      />
    ),
    lightLevelSlot: (
      <LightLevelControl
        lightLevel={50}
        isReachable={true}
        disabled={false}
        onChange={fn()}
        loading={false}
      />
    ),
    batterySlot: (
      <BatteryIndicator batteryPercentage={42} name="Remote Control Bulb" />
    ),
  },
};

export const AllControls: Story = {
  args: {
    toggleSlot: (
      <DeviceToggle
        isOn={true}
        isReachable={true}
        onChange={fn()}
        loading={false}
      />
    ),
    lightLevelSlot: (
      <LightLevelControl
        lightLevel={80}
        isReachable={true}
        disabled={false}
        onChange={fn()}
        loading={false}
      />
    ),
    volumeSlot: (
      <VolumeControl
        volume={50}
        isReachable={true}
        onChange={fn()}
        loading={false}
      />
    ),
    batterySlot: (
      <BatteryIndicator batteryPercentage={100} name="Multi-Function Device" />
    ),
  },
};

export const Unreachable: Story = {
  args: {
    toggleSlot: (
      <DeviceToggle
        isOn={true}
        isReachable={false}
        onChange={fn()}
        loading={false}
      />
    ),
    lightLevelSlot: (
      <LightLevelControl
        lightLevel={50}
        isReachable={false}
        disabled={true}
        onChange={fn()}
        loading={false}
      />
    ),
  },
};

export const LoadingToggle: Story = {
  args: {
    toggleSlot: (
      <DeviceToggle
        isOn={true}
        isReachable={true}
        onChange={fn()}
        loading={true}
      />
    ),
    lightLevelSlot: (
      <LightLevelControl
        lightLevel={75}
        isReachable={true}
        disabled={false}
        onChange={fn()}
        loading={false}
      />
    ),
  },
};

export const LoadingLightLevel: Story = {
  args: {
    toggleSlot: (
      <DeviceToggle
        isOn={true}
        isReachable={true}
        onChange={fn()}
        loading={false}
      />
    ),
    lightLevelSlot: (
      <LightLevelControl
        lightLevel={75}
        isReachable={true}
        disabled={false}
        onChange={fn()}
        loading={true}
      />
    ),
  },
};

export const LoadingVolume: Story = {
  args: {
    toggleSlot: (
      <DeviceToggle
        isOn={true}
        isReachable={true}
        onChange={fn()}
        loading={false}
      />
    ),
    volumeSlot: (
      <VolumeControl
        volume={50}
        isReachable={true}
        onChange={fn()}
        loading={true}
      />
    ),
  },
};

export const NoControls: Story = {
  args: {},
};

export const LowBattery: Story = {
  args: {
    batterySlot: <BatteryIndicator batteryPercentage={10} name="Door Sensor" />,
  },
};

export const ToggleOnly: Story = {
  args: {
    toggleSlot: (
      <DeviceToggle
        isOn={true}
        isReachable={true}
        onChange={fn()}
        loading={false}
      />
    ),
  },
};
