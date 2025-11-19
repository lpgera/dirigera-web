import type { Meta, StoryObj } from "@storybook/react";
import { DeviceImage } from "./DeviceImage";

const meta = {
  component: DeviceImage,
  title: "Features/Devices/UI/DeviceImage",

  tags: ["autodocs"],
  argTypes: {
    imagePath: { control: "text" },
    name: { control: "text" },
    isOn: { control: "boolean" },
    isReachable: { control: "boolean" },
    lightLevel: { control: { type: "range", min: 0, max: 100, step: 1 } },
    lightColor: { control: "color" },
  },
} satisfies Meta<typeof DeviceImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
  args: {
    name: "Living Room Light",
    isReachable: true,
  },
};

export const WithIconUnreachable: Story = {
  args: {
    name: "Living Room Light",
    isReachable: false,
  },
};

export const WithImage: Story = {
  args: {
    imagePath: "https://picsum.photos/id/199/80/80",
    name: "Living Room Light",
    isOn: true,
    isReachable: true,
  },
};

export const WithImageUnreachable: Story = {
  args: {
    imagePath: "https://picsum.photos/id/199/80/80",
    name: "Living Room Light",
    isOn: true,
    isReachable: false,
  },
};

export const WithLightLevel: Story = {
  args: {
    imagePath: "https://picsum.photos/id/199/80/80",
    name: "Living Room Light",
    isOn: true,
    isReachable: true,
    lightLevel: 50,
  },
};

export const WithLightColor: Story = {
  args: {
    imagePath: "https://picsum.photos/id/199/80/80",
    name: "Living Room Light",
    isOn: true,
    isReachable: true,
    lightColor: "#ff6b35",
  },
};

export const WithLightLevelAndColor: Story = {
  args: {
    imagePath: "https://picsum.photos/id/199/80/80",
    name: "Living Room Light",
    isOn: true,
    isReachable: true,
    lightLevel: 75,
    lightColor: "#4ecdc4",
  },
};

export const DimmedWithColor: Story = {
  args: {
    imagePath: "https://picsum.photos/id/199/80/80",
    name: "Bedroom Light",
    isOn: true,
    isReachable: true,
    lightLevel: 25,
    lightColor: "#ffd93d",
  },
};

export const BrightWarmLight: Story = {
  args: {
    imagePath: "https://picsum.photos/id/199/80/80",
    name: "Kitchen Light",
    isOn: true,
    isReachable: true,
    lightLevel: 100,
    lightColor: "#ffb347",
  },
};
