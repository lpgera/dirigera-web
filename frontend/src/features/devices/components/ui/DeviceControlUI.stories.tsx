import type { Meta, StoryObj } from "@storybook/react";
import { DeviceControlUI } from "./DeviceControlUI";
import { DeviceImage } from "./DeviceImage";
import { DeviceBasicControlsUI } from "./DeviceBasicControlsUI";
import { DeviceToggle } from "./DeviceToggle";
import { LightLevelControl } from "./LightLevelControl";
import { VolumeControl } from "./VolumeControl";
import { BatteryIndicator } from "./BatteryIndicator";
import { ColorControl } from "./ColorControlUI";
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
  render: (args) => {
    const {
      device,
      deviceImageSlot,
      onPlaybackPlayPause,
      onPlaybackPrevious,
      onPlaybackNext,
      loading,
    } = args;

    // Determine if we should show color controls
    const hasColorControls =
      device.colorTemperature != null ||
      (device.colorHue != null && device.colorSaturation != null);

    return (
      <DeviceControlUI
        device={device}
        deviceImageSlot={deviceImageSlot}
        basicControlsSlot={
          <DeviceBasicControlsUI
            toggleSlot={
              device.isOn != null ? (
                <DeviceToggle
                  isOn={device.isOn}
                  isReachable={device.isReachable}
                  onChange={() => console.log("isOn change")}
                  loading={false}
                />
              ) : undefined
            }
            lightLevelSlot={
              device.lightLevel != null ? (
                <LightLevelControl
                  lightLevel={device.lightLevel}
                  isReachable={device.isReachable}
                  disabled={!device.isOn}
                  onChange={() => console.log("lightLevel change")}
                  loading={false}
                />
              ) : undefined
            }
            volumeSlot={
              device.volume != null ? (
                <VolumeControl
                  volume={device.volume}
                  isReachable={device.isReachable}
                  onChange={() => console.log("volume change")}
                  loading={false}
                />
              ) : undefined
            }
            batterySlot={
              device.batteryPercentage != null ? (
                <BatteryIndicator
                  batteryPercentage={device.batteryPercentage}
                  name={device.name}
                />
              ) : undefined
            }
          />
        }
        colorControlSlot={
          hasColorControls ? (
            <ColorControl
              colorHue={device.colorHue ?? undefined}
              colorSaturation={device.colorSaturation ?? undefined}
              colorTemperature={device.colorTemperature ?? undefined}
              isReachable={device.isReachable}
              disabled={!device.isOn}
              onColorHueChange={() => console.log("colorHue change")}
              onColorSaturationChange={() =>
                console.log("colorSaturation change")
              }
              onColorTemperatureChange={() =>
                console.log("colorTemperature change")
              }
              loading={false}
            />
          ) : undefined
        }
        onPlaybackPlayPause={onPlaybackPlayPause}
        onPlaybackPrevious={onPlaybackPrevious}
        onPlaybackNext={onPlaybackNext}
        loading={loading}
      />
    );
  },
  args: {
    onPlaybackPlayPause: () => console.log("playback play/pause"),
    onPlaybackPrevious: () => console.log("playback previous"),
    onPlaybackNext: () => console.log("playback next"),
    loading: {
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
    deviceImageSlot: (
      <DeviceImage
        imagePath="https://placehold.co/64x64/yellow/black?text=Light"
        name="Living Room Light"
        isOn={true}
        isReachable={true}
        lightLevel={75}
      />
    ),
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
    deviceImageSlot: (
      <DeviceImage
        imagePath="https://placehold.co/64x64/orange/white?text=Warm"
        name="Kitchen Light"
        isOn={true}
        isReachable={true}
        lightLevel={50}
      />
    ),
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
    deviceImageSlot: (
      <DeviceImage
        imagePath="https://placehold.co/64x64/cyan/white?text=RGB"
        name="Color LED Strip"
        isOn={true}
        isReachable={true}
      />
    ),
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
    deviceImageSlot: (
      <DeviceImage
        imagePath="https://placehold.co/64x64/blue/white?text=Color"
        name="Smart Color Bulb"
        isOn={true}
        isReachable={true}
        lightLevel={60}
      />
    ),
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
    deviceImageSlot: (
      <DeviceImage
        imagePath="https://placehold.co/64x64/purple/white?text=Music"
        name="Living Room Speaker"
        isOn={true}
        isReachable={true}
      />
    ),
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
    deviceImageSlot: (
      <DeviceImage
        imagePath="https://placehold.co/64x64/gray/white?text=Paused"
        name="Bedroom Speaker"
        isOn={true}
        isReachable={true}
      />
    ),
  },
};

export const DoorSensor: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Front Door",
      isOpen: false,
    },
    deviceImageSlot: (
      <DeviceImage
        imagePath="https://placehold.co/64x64/brown/white?text=Door"
        name="Front Door"
        isOn={false}
        isReachable={true}
      />
    ),
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
    deviceImageSlot: (
      <DeviceImage
        imagePath="https://placehold.co/64x64/lightblue/black?text=Window"
        name="Kitchen Window"
        isOn={false}
        isReachable={true}
      />
    ),
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
    deviceImageSlot: (
      <DeviceImage
        imagePath="https://placehold.co/64x64/green/white?text=Temp"
        name="Living Room Sensor"
        isOn={false}
        isReachable={true}
      />
    ),
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
    deviceImageSlot: (
      <DeviceImage
        imagePath="https://placehold.co/64x64/teal/white?text=AQ"
        name="Air Quality Monitor"
        isOn={false}
        isReachable={true}
      />
    ),
  },
};

export const DeviceWithBattery: Story = {
  args: {
    device: {
      ...baseDevice,
      name: "Motion Sensor",
      batteryPercentage: 85,
    },
    deviceImageSlot: (
      <DeviceImage
        imagePath="https://placehold.co/64x64/lime/black?text=Motion"
        name="Motion Sensor"
        isOn={false}
        isReachable={true}
      />
    ),
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
    deviceImageSlot: (
      <DeviceImage
        imagePath="https://placehold.co/64x64/purple/white?text=Smart"
        name="Smart Speaker"
        isOn={true}
        isReachable={true}
      />
    ),
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
    deviceImageSlot: (
      <DeviceImage
        imagePath="https://placehold.co/64x64/darkgray/white?text=Offline"
        name="Hallway Light"
        isOn={true}
        isReachable={false}
        lightLevel={50}
      />
    ),
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
    deviceImageSlot: (
      <DeviceImage
        imagePath="https://placehold.co/64x64/red/white?text=Offline"
        name="Garage Light"
        isOn={true}
        isReachable={false}
      />
    ),
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
    deviceImageSlot: (
      <DeviceImage
        imagePath="https://placehold.co/64x64/white/black?text=Load"
        name="Bedroom Light"
        isOn={true}
        isReachable={true}
        lightLevel={50}
      />
    ),
    loading: {
      playback: true,
    },
  },
};
