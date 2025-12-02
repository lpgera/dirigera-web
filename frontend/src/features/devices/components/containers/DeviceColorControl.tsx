import { ColorControl } from "../ui/ColorControlUI";
import {
  useDeviceLocalStateStore,
  useLocalColorHue,
  useLocalColorSaturation,
  useLocalColorTemperature,
} from "../../hooks/useDeviceLocalState";
import type { Device } from "@/graphql.types";
import { useDeviceControl } from "../../hooks/useDeviceControl";

export interface DeviceColorControlProps {
  device: Device;
}

export function DeviceColorControl({ device }: DeviceColorControlProps) {
  const localHue = useLocalColorHue(device.id);
  const localSaturation = useLocalColorSaturation(device.id);
  const localTemperature = useLocalColorTemperature(device.id);

  const {
    setDeviceColorSaturation,
    setDeviceColorHue,
    setDeviceColorTemperature,
  } = useDeviceLocalStateStore();

  const {
    handleColorTemperatureChange,
    handleColorHueSaturationChange,
    loading,
  } = useDeviceControl({
    id: device.id,
    type: device.type,
  });

  return (
    <ColorControl
      disabled={!device.isReachable || !device.isOn}
      colorHue={localHue}
      colorSaturation={localSaturation}
      colorTemperature={localTemperature}
      isReachable={device.isReachable}
      onColorHueChange={(hue) => setDeviceColorHue(device.id, hue)}
      onColorSaturationChange={(saturation) =>
        setDeviceColorSaturation(device.id, saturation)
      }
      onColorTemperatureChange={(temperature) =>
        setDeviceColorTemperature(device.id, temperature)
      }
      onColorHueSaturationChangeComplete={
        device.colorHue != null && device.colorSaturation != null
          ? handleColorHueSaturationChange
          : undefined
      }
      onColorTemperatureChangeComplete={
        device.colorTemperature != null
          ? handleColorTemperatureChange
          : undefined
      }
      loading={loading.colorTemperature || loading.colorHueSaturation}
    />
  );
}
