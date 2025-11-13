import type { Meta, StoryObj } from "@storybook/react";
import { DeviceImage } from "./DeviceImage";

const meta = {
  component: DeviceImage,
  title: "Features/Devices/UI/DeviceImage",

  tags: ["autodocs"],
  argTypes: {
    imagePath: { control: "text" },
    name: { control: "text" },
    isReachable: { control: "boolean" },
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
    imagePath: "/devices/bulb-e27-ws-globe.png",
    name: "Living Room Light",
    isReachable: true,
  },
};

export const WithImageUnreachable: Story = {
  args: {
    imagePath: "/devices/bulb-e27-ws-globe.png",
    name: "Living Room Light",
    isReachable: false,
  },
};
