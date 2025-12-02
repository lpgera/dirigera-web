import { useEffect } from "react";
import {
  useDeviceLocalStateStore,
  useLocalIsOn,
  useLocalLightLevel,
  useDeviceColor,
  type DeviceLocalState,
} from "@/features/devices/hooks/useDeviceLocalState";
import type { Device } from "@/graphql.types";
import { useDeviceImages } from "@/hooks";
import { CompactDeviceControlUI } from "../ui/CompactDeviceControlUI";

export interface CompactDeviceControlProps {
  device: Device;
}

export function CompactDeviceControl({ device }: CompactDeviceControlProps) {
  const localIsOn = useLocalIsOn(device.id);
  const localLightLevel = useLocalLightLevel(device.id);
  const deviceColor = useDeviceColor(device.id);
  const { syncDeviceState } = useDeviceLocalStateStore();
  const { getDeviceImage } = useDeviceImages();

  const imagePath = getDeviceImage(device.id);

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

  const isOn = localIsOn ?? !!device.isOn;
  const lightLevel = localLightLevel ?? device.lightLevel ?? 0;
  const lightColor = deviceColor ?? "#ffffff";
  const shouldShowGlow = !!(
    lightColor &&
    lightLevel &&
    isOn &&
    device.isReachable
  );

  return (
    <CompactDeviceControlUI
      name={device.name}
      imagePath={imagePath}
      isOn={isOn}
      isReachable={device.isReachable}
      lightLevel={lightLevel}
      lightColor={lightColor}
      showGlow={shouldShowGlow}
    />
  );
}
