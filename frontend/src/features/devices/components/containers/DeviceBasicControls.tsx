import { Row, Col } from "@/components/ui/Grid";
import { DeviceToggle } from "../ui/DeviceToggle";
import { LightLevelControl } from "../ui/LightLevelControl";
import { VolumeControl } from "../ui/VolumeControl";
import { BatteryIndicator } from "../ui/BatteryIndicator";
import {
  useLocalIsOn,
  useLocalLightLevel,
  useLocalVolume,
} from "../../hooks/useDeviceLocalState";
import type { Device } from "@/graphql.types";
import { useDeviceControl } from "../../hooks/useDeviceControl";

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

  const hasControls =
    device.isOn != null ||
    device.lightLevel != null ||
    device.volume != null ||
    device.batteryPercentage != null;

  if (!hasControls) {
    return null;
  }

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
