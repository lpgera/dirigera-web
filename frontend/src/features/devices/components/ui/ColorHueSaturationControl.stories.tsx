import type { Meta, StoryObj } from "@storybook/react";
import { ColorHueSaturationControl } from "./ColorHueSaturationControl";

const meta = {
  component: ColorHueSaturationControl,
  title: "Features/Devices/UI/ColorHueSaturationControl",
  tags: ["autodocs"],
  args: {
    onChange: (hue: number, saturation: number) =>
      console.log(`Color changed - Hue: ${hue}, Saturation: ${saturation}`),
  },
  decorators: [
    (story) => <div style={{ width: 320, padding: "20px" }}>{story()}</div>,
  ],
} satisfies Meta<typeof ColorHueSaturationControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    colorHue: 180,
    colorSaturation: 0.5,
    isReachable: true,
    loading: false,
  },
};

export const Red: Story = {
  args: {
    colorHue: 0,
    colorSaturation: 1,
    isReachable: true,
    loading: false,
  },
};

export const Green: Story = {
  args: {
    colorHue: 120,
    colorSaturation: 1,
    isReachable: true,
    loading: false,
  },
};

export const Blue: Story = {
  args: {
    colorHue: 240,
    colorSaturation: 1,
    isReachable: true,
    loading: false,
  },
};

export const Desaturated: Story = {
  args: {
    colorHue: 180,
    colorSaturation: 0,
    isReachable: true,
    loading: false,
  },
};

export const Disabled: Story = {
  args: {
    colorHue: 180,
    colorSaturation: 0.5,
    isReachable: false,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    colorHue: 180,
    colorSaturation: 0.5,
    isReachable: true,
    loading: true,
  },
};
