import { useDeviceControl } from "../../hooks/useDeviceControl";
import { DeviceControlUI } from "../ui/DeviceControlUI";
import { DeviceBasicControls } from "./DeviceBasicControls";
import { DeviceColorControl } from "./DeviceColorControl";
import { DeviceImageContainer } from "./DeviceImageContainer";
import { useDeviceImages } from "@/hooks";
import type { Device } from "@/graphql.types";

export interface DeviceControlProps {
  device: Device;
}

export function DeviceControl({ device }: DeviceControlProps) {
  const {
    handleIsOnChange,
    handleLightLevelChange,
    handleVolumeChange,
    loading,
  } = useDeviceControl({
    id: device.id,
    type: device.type,
  });

  // Determine if we should show basic controls
  const hasBasicControls =
    device.isOn != null ||
    device.lightLevel != null ||
    device.volume != null ||
    device.batteryPercentage != null;

  // Determine if we should show color controls
  const hasColorControls =
    device.colorTemperature != null ||
    (device.colorHue != null && device.colorSaturation != null);

  return (
    <DeviceControlUI
      device={device}
      deviceImageSlot={<DeviceImageContainer device={device} />}
      basicControlsSlot={
        hasBasicControls ? <DeviceBasicControls device={device} /> : undefined
      }
      colorControlSlot={
        hasColorControls ? <DeviceColorControl device={device} /> : undefined
      }
      onPlaybackPlayPause={() => {}}
      onPlaybackPrevious={() => {}}
      onPlaybackNext={() => {}}
      loading={{ playback: loading.playback }}
    />
  );
}
