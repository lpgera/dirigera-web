import { Row, Col } from "@/components/ui/Grid";
import { DeviceToggle } from "./DeviceToggle";
import { LightLevelControl } from "./LightLevelControl";
import { VolumeControl } from "./VolumeControl";
import { BatteryIndicator } from "./BatteryIndicator";

export interface DeviceBasicControlsUIProps {
  /** Current on/off state, null if device doesn't support this control */
  isOn: boolean | null;
  /** Current light level (0-100), null if device doesn't support this control */
  lightLevel: number | null;
  /** Current volume (0-100), null if device doesn't support this control */
  volume: number | null;
  /** Battery percentage (0-100), null if device doesn't have a battery */
  batteryPercentage: number | null;
  /** Whether the device is reachable */
  isReachable: boolean;
  /** Device name for accessibility */
  name: string;
  /** Loading states for each control */
  loading: {
    isOn?: boolean;
    lightLevel?: boolean;
    volume?: boolean;
  };
  /** Callback when on/off state changes */
  onIsOnChange: (isOn: boolean) => void;
  /** Callback when light level changes */
  onLightLevelChange: (level: number) => void;
  /** Callback when volume changes */
  onVolumeChange: (volume: number) => void;
}

export function DeviceBasicControlsUI({
  isOn,
  lightLevel,
  volume,
  batteryPercentage,
  isReachable,
  name,
  loading,
  onIsOnChange,
  onLightLevelChange,
  onVolumeChange,
}: DeviceBasicControlsUIProps) {
  const hasControls =
    isOn != null ||
    lightLevel != null ||
    volume != null ||
    batteryPercentage != null;

  if (!hasControls) {
    return null;
  }

  return (
    <Row gutter={8} className="device-control-row">
      {isOn != null && (
        <Col flex="none">
          <DeviceToggle
            isOn={isOn}
            isReachable={isReachable}
            onChange={onIsOnChange}
            loading={loading.isOn}
          />
        </Col>
      )}

      {lightLevel != null && (
        <Col flex="auto" className="device-control-slider">
          <LightLevelControl
            disabled={!isReachable || !isOn}
            lightLevel={lightLevel}
            isReachable={isReachable}
            onChange={onLightLevelChange}
            loading={loading.lightLevel}
          />
        </Col>
      )}

      {volume != null && (
        <Col flex="auto" className="device-control-slider">
          <VolumeControl
            volume={volume}
            isReachable={isReachable}
            onChange={onVolumeChange}
            loading={loading.volume}
          />
        </Col>
      )}

      {batteryPercentage != null && (
        <Col flex="none">
          <BatteryIndicator batteryPercentage={batteryPercentage} name={name} />
        </Col>
      )}
    </Row>
  );
}
