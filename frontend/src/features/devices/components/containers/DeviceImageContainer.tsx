import { useEffect } from "react";
import { DeviceImage } from "../ui/DeviceImage";
import {
  useDeviceLocalStateStore,
  useLocalLightLevel,
  useDeviceColor,
  type DeviceLocalState,
} from "../../hooks/useDeviceLocalState";
import type { Device } from "@/graphql.types";

export interface DeviceImageContainerProps {
  device: Device;
  imagePath: string | undefined;
}

export function DeviceImageContainer({
  device,
  imagePath,
}: DeviceImageContainerProps) {
  const localLightLevel = useLocalLightLevel(device.id);
  const deviceColor = useDeviceColor(device.id);
  const { syncDeviceState } = useDeviceLocalStateStore();

  // Sync server state to local state
  useEffect(() => {
    const stateUpdate: Partial<DeviceLocalState> = {};
    if (device.isOn != null) stateUpdate.isOn = device.isOn;
    if (device.lightLevel != null) stateUpdate.lightLevel = device.lightLevel;
    if (device.colorHue != null) stateUpdate.colorHue = device.colorHue;
    if (device.colorSaturation != null)
      stateUpdate.colorSaturation = device.colorSaturation;
    if (device.colorTemperature != null)
      stateUpdate.colorTemperature = device.colorTemperature;

    if (Object.keys(stateUpdate).length > 0) {
      syncDeviceState(device.id, stateUpdate);
    }
  }, [
    device.id,
    device.isOn,
    device.lightLevel,
    device.colorHue,
    device.colorSaturation,
    device.colorTemperature,
    syncDeviceState,
  ]);

  return (
    <DeviceImage
      imagePath={imagePath}
      name={device.name}
      isOn={!!device.isOn}
      isReachable={device.isReachable}
      {...(localLightLevel != null && { lightLevel: localLightLevel })}
      {...(deviceColor && { lightColor: deviceColor })}
    />
  );
}
