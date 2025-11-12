import type { Meta, StoryObj } from "@storybook/react";
import { PlayItemDisplay } from "./PlayItemDisplay";

const meta = {
  component: PlayItemDisplay,
  title: "Features/Devices/UI/PlayItemDisplay",
  tags: ["autodocs"],
} satisfies Meta<typeof PlayItemDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BothItems: Story = {
  args: {
    playItem: "The Less I Know The Better - Tame Impala",
    nextPlayItem: "Let It Happen - Tame Impala",
  },
};

export const OnlyCurrentItem: Story = {
  args: {
    playItem: "The Less I Know The Better - Tame Impala",
    nextPlayItem: null,
  },
};

export const OnlyNextItem: Story = {
  args: {
    playItem: null,
    nextPlayItem: "Let It Happen - Tame Impala",
  },
};

export const LongText: Story = {
  args: {
    playItem:
      "This is a very long song title that should wrap properly and not overflow the container - Artist Name",
    nextPlayItem:
      "Another extremely long song title to test text wrapping behavior in the component - Another Artist",
  },
};

export const Empty: Story = {
  args: {
    playItem: null,
    nextPlayItem: null,
  },
};
