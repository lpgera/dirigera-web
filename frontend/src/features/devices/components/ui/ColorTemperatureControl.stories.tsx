import type { Meta, StoryObj } from "@storybook/react";
import { ColorTemperatureControl } from "./ColorTemperatureControl";

const meta = {
  component: ColorTemperatureControl,
  title: "Features/Devices/UI/ColorTemperatureControl",
  tags: ["autodocs"],
  args: {
    onChange: (value: number) =>
      console.log("Color temperature changed to:", value),
  },
  decorators: [
    (story) => <div style={{ width: 320, padding: "20px" }}>{story()}</div>,
  ],
} satisfies Meta<typeof ColorTemperatureControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    colorTemperature: 3000,
    isReachable: true,
    loading: false,
  },
};

export const Warm: Story = {
  args: {
    colorTemperature: 2202,
    isReachable: true,
    loading: false,
  },
};

export const Cold: Story = {
  args: {
    colorTemperature: 4000,
    isReachable: true,
    loading: false,
  },
};

export const Disabled: Story = {
  args: {
    colorTemperature: 3000,
    isReachable: false,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    colorTemperature: 3000,
    isReachable: true,
    loading: true,
  },
};
