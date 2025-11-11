import type { Meta, StoryObj } from "@storybook/react";
import { DeviceControlUI } from "./DeviceControlUI";
import type { Device } from "@/graphql.types";

const baseDevice: Device = {
  __typename: "Device",
  id: "1",
  name: "Living Room Light",
  isReachable: true,
  type: "light" as any,
  batteryPercentage: null,
  colorHue: null,
  colorSaturation: null,
  colorTemperature: null,
  humidity: null,
  isOn: null,
  isOpen: null,
  lightLevel: null,
  nextPlayItem: null,
  playItem: null,
  playback: null,
  playbackNextAvailable: null,
  playbackPauseAvailable: null,
  playbackPreviousAvailable: null,
  pm25: null,
  temperature: null,
  vocIndex: null,
  volume: null,
};

const meta = {
  component: DeviceControlUI,
  title: "Features/Devices/UI/DeviceControlUI",
  tags: ["autodocs"],
  args: {
    onIsOnChange: (value: boolean) => console.log("isOn changed to:", value),
    onLightLevelChange: (value: number) =>
      console.log("lightLevel changed to:", value),
    onVolumeChange: (value: number) => console.log("volume changed to:", value),
    loading: {
      isOn: false,
      lightLevel: false,
      volume: false,
    },
  },
  decorators: [
    (story) => <div style={{ maxWidth: 600, padding: "20px" }}>{story()}</div>,
  ],
} satisfies Meta<typeof DeviceControlUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightWithToggleAndLevel: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Living Room Light",
      isOn: true,
      lightLevel: 75,
    },
    imagePath: undefined,
  },
};

export const LightWithImage: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Kitchen Light",
      isOn: true,
      lightLevel: 50,
    },
    imagePath: "https://placehold.co/64x64/orange/white?text=Light",
  },
};

export const LightOff: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Bedroom Light",
      isOn: false,
      lightLevel: 0,
    },
    imagePath: undefined,
  },
};

export const SpeakerWithVolume: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Living Room Speaker",
      isOn: true,
      volume: 65,
    },
    imagePath: "https://placehold.co/64x64/blue/white?text=Speaker",
  },
};

export const DeviceWithBattery: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Motion Sensor",
      batteryPercentage: 85,
    },
    imagePath: undefined,
  },
};

export const ComplexDevice: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Smart Speaker",
      isOn: true,
      lightLevel: 60,
      volume: 45,
      batteryPercentage: 55,
    },
    imagePath: "https://placehold.co/64x64/purple/white?text=Smart",
  },
};

export const Unreachable: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Hallway Light",
      isReachable: false,
      isOn: true,
      lightLevel: 50,
    },
    imagePath: undefined,
  },
};

export const UnreachableWithImage: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Garage Light",
      isReachable: false,
      isOn: true,
      lightLevel: 75,
    },
    imagePath: "https://placehold.co/64x64/red/white?text=Offline",
  },
};

export const Loading: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Bedroom Light",
      isOn: true,
      lightLevel: 50,
    },
    imagePath: undefined,
    loading: {
      isOn: true,
      lightLevel: true,
      volume: false,
    },
  },
};

export const NoControls: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Temperature Sensor",
      temperature: 22,
    },
    imagePath: "https://placehold.co/64x64/green/white?text=Sensor",
  },
};
