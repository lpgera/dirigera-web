import type { Meta, StoryObj } from "@storybook/react";
import { PlaybackControl } from "./PlaybackControl";

const meta = {
  component: PlaybackControl,
  title: "Features/Devices/UI/PlaybackControl",
  tags: ["autodocs"],
  args: {
    onPlayPause: () => console.log("Play/Pause clicked"),
    onPrevious: () => console.log("Previous clicked"),
    onNext: () => console.log("Next clicked"),
  },
} satisfies Meta<typeof PlaybackControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playing: Story = {
  args: {
    playback: "playbackPlaying",
    playbackNextAvailable: true,
    playbackPreviousAvailable: true,
    isReachable: true,
    loading: false,
  },
};

export const Paused: Story = {
  args: {
    playback: "playbackPaused",
    playbackNextAvailable: true,
    playbackPreviousAvailable: true,
    isReachable: true,
    loading: false,
  },
};

export const Buffering: Story = {
  args: {
    playback: "playbackBuffering",
    playbackNextAvailable: true,
    playbackPreviousAvailable: true,
    isReachable: true,
    loading: false,
  },
};

export const NoPrevious: Story = {
  args: {
    playback: "playbackPlaying",
    playbackNextAvailable: true,
    playbackPreviousAvailable: false,
    isReachable: true,
    loading: false,
  },
};

export const NoNext: Story = {
  args: {
    playback: "playbackPlaying",
    playbackNextAvailable: false,
    playbackPreviousAvailable: true,
    isReachable: true,
    loading: false,
  },
};

export const Disabled: Story = {
  args: {
    playback: "playbackPlaying",
    playbackNextAvailable: true,
    playbackPreviousAvailable: true,
    isReachable: false,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    playback: "playbackPlaying",
    playbackNextAvailable: true,
    playbackPreviousAvailable: true,
    isReachable: true,
    loading: true,
  },
};
