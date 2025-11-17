import { useEffect } from "react";
import { ColorControl } from "../ui/ColorControl";
import {
  useDeviceLocalStateStore,
  useLocalColorHue,
  useLocalColorSaturation,
  useLocalColorTemperature,
  type DeviceLocalState,
} from "../../hooks/useDeviceLocalState";
import type { Device } from "@/graphql.types";

export interface DeviceColorControlProps {
  device: Device;
  onColorTemperatureChange: (colorTemperature: number) => void;
  onColorHueSaturationChange: (
    colorHue: number,
    colorSaturation: number
  ) => void;
  loading: {
    colorTemperature: boolean;
    colorHueSaturation: boolean;
  };
}

export function DeviceColorControl({
  device,
  onColorTemperatureChange,
  onColorHueSaturationChange,
  loading,
}: DeviceColorControlProps) {
  const localHue = useLocalColorHue(device.id);
  const localSaturation = useLocalColorSaturation(device.id);
  const localTemperature = useLocalColorTemperature(device.id);

  const {
    setDeviceColorHue,
    setDeviceColorSaturation,
    setDeviceColorTemperature,
    syncDeviceState,
  } = useDeviceLocalStateStore();

  // Sync server state to local state when device props change
  useEffect(() => {
    const stateUpdate: Partial<DeviceLocalState> = {};
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
    device.colorHue,
    device.colorSaturation,
    device.colorTemperature,
    syncDeviceState,
  ]);

  return (
    <ColorControl
      disabled={!device.isReachable || !device.isOn}
      colorHue={localHue}
      colorSaturation={localSaturation}
      colorTemperature={localTemperature}
      isReachable={device.isReachable}
      onColorHueChange={(hue) => setDeviceColorHue(device.id, hue)}
      onColorSaturationChange={(sat) =>
        setDeviceColorSaturation(device.id, sat)
      }
      onColorTemperatureChange={(temp) =>
        setDeviceColorTemperature(device.id, temp)
      }
      onColorHueSaturationChangeComplete={
        device.colorHue != null && device.colorSaturation != null
          ? onColorHueSaturationChange
          : undefined
      }
      onColorTemperatureChangeComplete={
        device.colorTemperature != null ? onColorTemperatureChange : undefined
      }
      loading={loading.colorTemperature || loading.colorHueSaturation}
    />
  );
}
