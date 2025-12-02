import {
  useLocalIsOn,
  useLocalLightLevel,
  useLocalVolume,
} from "../../hooks/useDeviceLocalState";
import { useDeviceControl } from "../../hooks/useDeviceControl";
import { DeviceBasicControlsUI } from "../ui/DeviceBasicControlsUI";
import type { Device } from "@/graphql.types";

export interface DeviceBasicControlsProps {
  device: Device;
}

export function DeviceBasicControls({ device }: DeviceBasicControlsProps) {
  const localIsOn = useLocalIsOn(device.id);
  const localLightLevel = useLocalLightLevel(device.id);
  const localVolume = useLocalVolume(device.id);

  const {
    handleIsOnChange,
    handleLightLevelChange,
    handleVolumeChange,
    loading,
  } = useDeviceControl({
    id: device.id,
    type: device.type,
  });

  return (
    <DeviceBasicControlsUI
      isOn={localIsOn ?? device.isOn ?? null}
      lightLevel={localLightLevel ?? device.lightLevel ?? null}
      volume={localVolume ?? device.volume ?? null}
      batteryPercentage={device.batteryPercentage ?? null}
      isReachable={device.isReachable}
      name={device.name}
      loading={loading}
      onIsOnChange={handleIsOnChange}
      onLightLevelChange={handleLightLevelChange}
      onVolumeChange={handleVolumeChange}
    />
  );
}
