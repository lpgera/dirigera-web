import type { Meta, StoryObj } from "@storybook/react";
import { LightLevelControl } from "./LightLevelControl";

const meta = {
  component: LightLevelControl,
  title: "Features/Devices/UI/LightLevelControl",
  tags: ["autodocs"],
  args: {
    onChange: (value: number) => console.log("Light level changed to:", value),
  },
  decorators: [
    (story) => <div style={{ width: 320, padding: "20px" }}>{story()}</div>,
  ],
} satisfies Meta<typeof LightLevelControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lightLevel: 50,
    isReachable: true,
    loading: false,
  },
};

export const MinLevel: Story = {
  args: {
    lightLevel: 1,
    isReachable: true,
    loading: false,
  },
};

export const MaxLevel: Story = {
  args: {
    lightLevel: 100,
    isReachable: true,
    loading: false,
  },
};

export const Disabled: Story = {
  args: {
    lightLevel: 50,
    isReachable: false,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    lightLevel: 50,
    isReachable: true,
    loading: true,
  },
};

export const LoadingAndUnreachable: Story = {
  args: {
    lightLevel: 50,
    isReachable: false,
    loading: true,
  },
};
