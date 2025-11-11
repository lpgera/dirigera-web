import type { Meta, StoryObj } from "@storybook/react";
import { VolumeControl } from "./VolumeControl";

const meta = {
  component: VolumeControl,
  title: "Features/Devices/UI/VolumeControl",
  tags: ["autodocs"],
  args: {
    onChange: (value: number) => console.log("Volume changed to:", value),
  },
  decorators: [
    (story) => <div style={{ width: 320, padding: "20px" }}>{story()}</div>,
  ],
} satisfies Meta<typeof VolumeControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    volume: 50,
    isReachable: true,
    loading: false,
  },
};

export const Muted: Story = {
  args: {
    volume: 0,
    isReachable: true,
    loading: false,
  },
};

export const MaxVolume: Story = {
  args: {
    volume: 100,
    isReachable: true,
    loading: false,
  },
};

export const Disabled: Story = {
  args: {
    volume: 50,
    isReachable: false,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    volume: 50,
    isReachable: true,
    loading: true,
  },
};

export const LoadingAndUnreachable: Story = {
  args: {
    volume: 50,
    isReachable: false,
    loading: true,
  },
};
