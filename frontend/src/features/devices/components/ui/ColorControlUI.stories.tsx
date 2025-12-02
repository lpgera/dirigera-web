import type { Meta, StoryObj } from "@storybook/react";
import { ColorControl } from "./ColorControlUI";

const meta = {
  component: ColorControl,
  title: "Features/Devices/UI/ColorControl",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1a1a1a" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  args: {
    isReachable: true,
    loading: false,
  },
} satisfies Meta<typeof ColorControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ColorOnly: Story = {
  args: {
    colorHue: 120,
    colorSaturation: 0.8,
    onColorHueChange: (hue: number) => {
      console.log("Hue changed:", hue);
    },
    onColorSaturationChange: (sat: number) => {
      console.log("Saturation changed:", sat);
    },
    onColorHueSaturationChangeComplete: (hue: number, sat: number) => {
      console.log("Color change complete:", { hue, sat });
    },
  },
};

export const TemperatureOnly: Story = {
  args: {
    colorTemperature: 2700,
    onColorTemperatureChange: (temp: number) => {
      console.log("Temperature changing:", temp);
    },
    onColorTemperatureChangeComplete: (temp: number) => {
      console.log("Temperature change complete:", temp);
    },
  },
};

export const BothControls: Story = {
  args: {
    colorHue: 30,
    colorSaturation: 0.8,
    colorTemperature: 2700,
    onColorHueChange: (hue: number) => {
      console.log("Hue changed:", hue);
    },
    onColorSaturationChange: (sat: number) => {
      console.log("Saturation changed:", sat);
    },
    onColorHueSaturationChangeComplete: (hue: number, sat: number) => {
      console.log("Color change complete:", { hue, sat });
    },
    onColorTemperatureChange: (temp: number) => {
      console.log("Temperature changing:", temp);
    },
    onColorTemperatureChangeComplete: (temp: number) => {
      console.log("Temperature change complete:", temp);
    },
  },
};

export const Unreachable: Story = {
  args: {
    colorHue: 200,
    colorSaturation: 0.6,
    colorTemperature: 3000,
    isReachable: false,
    onColorHueChange: (hue: number) => {
      console.log("Hue changed:", hue);
    },
    onColorSaturationChange: (sat: number) => {
      console.log("Saturation changed:", sat);
    },
    onColorHueSaturationChangeComplete: (hue: number, sat: number) => {
      console.log("Color change complete:", { hue, sat });
    },
    onColorTemperatureChange: (temp: number) => {
      console.log("Temperature changing:", temp);
    },
    onColorTemperatureChangeComplete: (temp: number) => {
      console.log("Temperature change complete:", temp);
    },
  },
};

export const Loading: Story = {
  args: {
    colorHue: 270,
    colorSaturation: 0.7,
    colorTemperature: 3500,
    loading: true,
    onColorHueChange: (hue: number) => {
      console.log("Hue changed:", hue);
    },
    onColorSaturationChange: (sat: number) => {
      console.log("Saturation changed:", sat);
    },
    onColorHueSaturationChangeComplete: (hue: number, sat: number) => {
      console.log("Color change complete:", { hue, sat });
    },
    onColorTemperatureChange: (temp: number) => {
      console.log("Temperature changing:", temp);
    },
    onColorTemperatureChangeComplete: (temp: number) => {
      console.log("Temperature change complete:", temp);
    },
  },
};
