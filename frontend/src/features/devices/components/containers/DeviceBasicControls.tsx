import { useEffect } from "react";
import { Row, Col } from "@/components/ui/Grid";
import { DeviceToggle } from "../ui/DeviceToggle";
import { LightLevelControl } from "../ui/LightLevelControl";
import { VolumeControl } from "../ui/VolumeControl";
import { BatteryIndicator } from "../ui/BatteryIndicator";
import {
  useDeviceLocalStateStore,
  useLocalIsOn,
  useLocalLightLevel,
  useLocalVolume,
  type DeviceLocalState,
} from "../../hooks/useDeviceLocalState";
import type { Device } from "@/graphql.types";

export interface DeviceBasicControlsProps {
  device: Device;
  onIsOnChange: (isOn: boolean) => void;
  onLightLevelChange: (lightLevel: number) => void;
  onVolumeChange: (volume: number) => void;
  loading: {
    isOn: boolean;
    lightLevel: boolean;
    volume: boolean;
  };
}

export function DeviceBasicControls({
  device,
  onIsOnChange,
  onLightLevelChange,
  onVolumeChange,
  loading,
}: DeviceBasicControlsProps) {
  const localIsOn = useLocalIsOn(device.id);
  const localLightLevel = useLocalLightLevel(device.id);
  const localVolume = useLocalVolume(device.id);

  const {
    setDeviceIsOn,
    setDeviceLightLevel,
    setDeviceVolume,
    syncDeviceState,
  } = useDeviceLocalStateStore();

  // Sync server state to local state when device props change
  useEffect(() => {
    const stateUpdate: Partial<DeviceLocalState> = {};
    if (device.isOn != null) stateUpdate.isOn = device.isOn;
    if (device.lightLevel != null) stateUpdate.lightLevel = device.lightLevel;
    if (device.volume != null) stateUpdate.volume = device.volume;

    if (Object.keys(stateUpdate).length > 0) {
      syncDeviceState(device.id, stateUpdate);
    }
  }, [
    device.id,
    device.isOn,
    device.lightLevel,
    device.volume,
    syncDeviceState,
  ]);

  const hasControls =
    device.isOn != null ||
    device.lightLevel != null ||
    device.volume != null ||
    device.batteryPercentage != null;

  if (!hasControls) {
    return null;
  }

  // Handle changes with local state updates
  const handleIsOnChange = (isOn: boolean) => {
    setDeviceIsOn(device.id, isOn);
    onIsOnChange(isOn);
  };

  const handleLightLevelChange = (lightLevel: number) => {
    setDeviceLightLevel(device.id, lightLevel);
    onLightLevelChange(lightLevel);
  };

  const handleVolumeChange = (volume: number) => {
    setDeviceVolume(device.id, volume);
    onVolumeChange(volume);
  };

  return (
    <Row gutter={8} className="device-control-row">
      {device.isOn != null && (
        <Col flex="none">
          <DeviceToggle
            isOn={localIsOn ?? device.isOn}
            isReachable={device.isReachable}
            onChange={handleIsOnChange}
            loading={loading.isOn}
          />
        </Col>
      )}

      {device.lightLevel != null && (
        <Col flex="auto" className="device-control-slider">
          <LightLevelControl
            disabled={!device.isReachable || !device.isOn}
            lightLevel={localLightLevel ?? device.lightLevel}
            isReachable={device.isReachable}
            onChange={handleLightLevelChange}
            loading={loading.lightLevel}
          />
        </Col>
      )}

      {device.volume != null && (
        <Col flex="auto" className="device-control-slider">
          <VolumeControl
            volume={localVolume ?? device.volume}
            isReachable={device.isReachable}
            onChange={handleVolumeChange}
            loading={loading.volume}
          />
        </Col>
      )}

      {device.batteryPercentage != null && (
        <Col flex="none">
          <BatteryIndicator
            batteryPercentage={device.batteryPercentage}
            name={device.name}
          />
        </Col>
      )}
    </Row>
  );
}
