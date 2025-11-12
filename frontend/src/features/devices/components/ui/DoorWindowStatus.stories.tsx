import type { Meta, StoryObj } from "@storybook/react";
import { DoorWindowStatus } from "./DoorWindowStatus";

const meta = {
  component: DoorWindowStatus,
  title: "Features/Devices/UI/DoorWindowStatus",
  tags: ["autodocs"],
} satisfies Meta<typeof DoorWindowStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    label: "Status",
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    label: "Status",
  },
};

export const DoorOpen: Story = {
  args: {
    isOpen: true,
    label: "Door",
  },
};

export const DoorClosed: Story = {
  args: {
    isOpen: false,
    label: "Door",
  },
};

export const WindowOpen: Story = {
  args: {
    isOpen: true,
    label: "Window",
  },
};

export const WindowClosed: Story = {
  args: {
    isOpen: false,
    label: "Window",
  },
};
