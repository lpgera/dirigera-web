import { useDeviceImages } from "@/hooks/useDeviceImages";
import { useDeviceControl } from "../../hooks/useDeviceControl";
import { DeviceControlUI } from "../ui/DeviceControlUI";
import type { Device } from "@/graphql.types";

export interface DeviceControlProps {
  device: Device;
}

export function DeviceControl({ device }: DeviceControlProps) {
  const { getDeviceImage } = useDeviceImages();
  const imagePath = getDeviceImage(device.id);

  const { handleIsOnChange, handleLightLevelChange, handleVolumeChange, loading } =
    useDeviceControl({
      id: device.id,
      type: device.type,
    });

  return (
    <DeviceControlUI
      device={device}
      imagePath={imagePath}
      onIsOnChange={handleIsOnChange}
      onLightLevelChange={handleLightLevelChange}
      onVolumeChange={handleVolumeChange}
      loading={loading}
    />
  );
}
