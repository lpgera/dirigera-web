import type { Meta, StoryObj } from "@storybook/react";
import { DeviceToggle } from "./DeviceToggle";

const meta = {
  component: DeviceToggle,
  title: "Features/Devices/UI/DeviceToggle",
  tags: ["autodocs"],
  args: {
    onChange: (value: boolean) => console.log("Toggle changed to:", value),
  },
  decorators: [(story) => <div style={{ padding: "20px" }}>{story()}</div>],
} satisfies Meta<typeof DeviceToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {
  args: {
    isOn: true,
    isReachable: true,
    loading: false,
  },
};

export const Off: Story = {
  args: {
    isOn: false,
    isReachable: true,
    loading: false,
  },
};

export const OnButUnreachable: Story = {
  args: {
    isOn: true,
    isReachable: false,
    loading: false,
  },
};

export const OffButUnreachable: Story = {
  args: {
    isOn: false,
    isReachable: false,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    isOn: true,
    isReachable: true,
    loading: true,
  },
};

export const LoadingAndUnreachable: Story = {
  args: {
    isOn: true,
    isReachable: false,
    loading: true,
  },
};
