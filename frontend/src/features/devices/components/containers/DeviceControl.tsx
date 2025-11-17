import { useDeviceImages } from "@/hooks/useDeviceImages";
import { useDeviceControl } from "../../hooks/useDeviceControl";
import { DeviceControlUI } from "../ui/DeviceControlUI";
import { DeviceBasicControls } from "./DeviceBasicControls";
import { DeviceColorControl } from "./DeviceColorControl";
import { DeviceImageContainer } from "./DeviceImageContainer";
import type { Device } from "@/graphql.types";

export interface DeviceControlProps {
  device: Device;
}

export function DeviceControl({ device }: DeviceControlProps) {
  const { getDeviceImage } = useDeviceImages();
  const imagePath = getDeviceImage(device.id);

  const {
    handleIsOnChange,
    handleLightLevelChange,
    handleVolumeChange,
    handleColorTemperatureChange,
    handleColorHueSaturationChange,
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
      deviceImageSlot={<DeviceImageContainer device={device} imagePath={imagePath} />}
      basicControlsSlot={
        hasBasicControls ? (
          <DeviceBasicControls
            device={device}
            onIsOnChange={handleIsOnChange}
            onLightLevelChange={handleLightLevelChange}
            onVolumeChange={handleVolumeChange}
            loading={{
              isOn: loading.isOn,
              lightLevel: loading.lightLevel,
              volume: loading.volume,
            }}
          />
        ) : undefined
      }
      colorControlSlot={
        hasColorControls ? (
          <DeviceColorControl
            device={device}
            onColorTemperatureChange={handleColorTemperatureChange}
            onColorHueSaturationChange={handleColorHueSaturationChange}
            loading={{
              colorTemperature: loading.colorTemperature,
              colorHueSaturation: loading.colorHueSaturation,
            }}
          />
        ) : undefined
      }
      onPlaybackPlayPause={() => {}}
      onPlaybackPrevious={() => {}}
      onPlaybackNext={() => {}}
      loading={{ playback: loading.playback }}
    />
  );
}
