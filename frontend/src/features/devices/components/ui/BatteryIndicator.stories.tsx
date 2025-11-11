import type { Meta, StoryObj } from "@storybook/react";
import { BatteryIndicator } from "./BatteryIndicator";

const meta = {
  component: BatteryIndicator,
  title: "Features/Devices/UI/BatteryIndicator",
  tags: ["autodocs"],
  decorators: [(story) => <div style={{ padding: "20px" }}>{story()}</div>],
} satisfies Meta<typeof BatteryIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    batteryPercentage: 100,
    name: "Remote Control",
  },
};

export const High: Story = {
  args: {
    batteryPercentage: 90,
    name: "Motion Sensor",
  },
};

export const Medium: Story = {
  args: {
    batteryPercentage: 65,
    name: "Door Sensor",
  },
};

export const Low: Story = {
  args: {
    batteryPercentage: 45,
    name: "Window Sensor",
  },
};

export const VeryLow: Story = {
  args: {
    batteryPercentage: 20,
    name: "Remote",
  },
};

export const Critical: Story = {
  args: {
    batteryPercentage: 5,
    name: "Remote Control",
  },
};

export const Unknown: Story = {
  args: {
    batteryPercentage: -1,
    name: "Device",
  },
};

export const WithoutName: Story = {
  args: {
    batteryPercentage: 75,
  },
};

export const Null: Story = {
  args: {
    batteryPercentage: null,
    name: "Device",
  },
};
