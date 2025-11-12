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
    onColorTemperatureChange: (value: number) =>
      console.log("colorTemperature changed to:", value),
    onColorHueSaturationChange: (hue: number, saturation: number) =>
      console.log(`colorHue: ${hue}, colorSaturation: ${saturation}`),
    onPlaybackPlayPause: () => console.log("playback play/pause"),
    onPlaybackPrevious: () => console.log("playback previous"),
    onPlaybackNext: () => console.log("playback next"),
    loading: {
      isOn: false,
      lightLevel: false,
      volume: false,
      colorTemperature: false,
      colorHueSaturation: false,
      playback: false,
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

export const LightWithColorTemperature: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Kitchen Light",
      isOn: true,
      lightLevel: 50,
      colorTemperature: 3000,
    },
    imagePath: undefined,
  },
};

export const ColorBulb: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Color LED Strip",
      isOn: true,
      lightLevel: 80,
      colorHue: 180,
      colorSaturation: 0.8,
    },
    imagePath: "https://placehold.co/64x64/cyan/white?text=RGB",
  },
};

export const FullColorLight: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Smart Color Bulb",
      isOn: true,
      lightLevel: 60,
      colorTemperature: 2700,
      colorHue: 240,
      colorSaturation: 0.9,
    },
    imagePath: undefined,
  },
};

export const MediaPlayer: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Living Room Speaker",
      isOn: true,
      volume: 45,
      playback: "playbackPlaying" as any,
      playbackNextAvailable: true,
      playbackPreviousAvailable: true,
      playItem: "Bohemian Rhapsody - Queen",
      nextPlayItem: "Stairway to Heaven - Led Zeppelin",
    },
    imagePath: "https://placehold.co/64x64/purple/white?text=Music",
  },
};

export const MediaPlayerPaused: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Bedroom Speaker",
      isOn: true,
      volume: 30,
      playback: "playbackPaused" as any,
      playbackNextAvailable: true,
      playbackPreviousAvailable: false,
      playItem: "The Less I Know The Better - Tame Impala",
    },
    imagePath: undefined,
  },
};

export const DoorSensor: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Front Door",
      isOpen: false,
    },
    imagePath: undefined,
  },
};

export const WindowSensorOpen: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Kitchen Window",
      isOpen: true,
      batteryPercentage: 65,
    },
    imagePath: undefined,
  },
};

export const TemperatureSensor: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Living Room Sensor",
      temperature: 22,
      humidity: 45,
      batteryPercentage: 85,
    },
    imagePath: "https://placehold.co/64x64/green/white?text=Temp",
  },
};

export const AirQualitySensor: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Air Quality Monitor",
      temperature: 23,
      humidity: 50,
      pm25: 12,
      vocIndex: 150,
    },
    imagePath: undefined,
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
      colorTemperature: false,
      colorHueSaturation: false,
      playback: false,
    },
  },
};
