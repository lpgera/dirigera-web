import { BulbOutlined } from "@ant-design/icons";
import { Row, Col } from "@/components/ui/Grid";
import { DeviceToggle } from "./DeviceToggle";
import { LightLevelControl } from "./LightLevelControl";
import { VolumeControl } from "./VolumeControl";
import { BatteryIndicator } from "./BatteryIndicator";
import type { Device } from "@/graphql.types";
import "./DeviceControlUI.css";

export interface DeviceControlUIProps {
  device: Device;
  imagePath: string | undefined;
  onIsOnChange: (isOn: boolean) => void;
  onLightLevelChange: (lightLevel: number) => void;
  onVolumeChange: (volume: number) => void;
  loading: {
    isOn: boolean;
    lightLevel: boolean;
    volume: boolean;
  };
}

export function DeviceControlUI({
  device,
  imagePath,
  onIsOnChange,
  onLightLevelChange,
  onVolumeChange,
  loading,
}: DeviceControlUIProps) {
  const hasControls =
    device.isOn != null ||
    device.lightLevel != null ||
    device.volume != null;

  return (
    <Row align="middle" gutter={8} className="device-control">
      {/* Device Image or Icon */}
      <Col flex="none">
        <div className="device-control-image-wrapper">
          {imagePath ? (
            <img
              src={imagePath}
              alt={device.name}
              className={`device-control-image ${!device.isReachable ? "device-control-image-unreachable" : ""}`}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div
              className={`device-control-icon ${!device.isReachable ? "device-control-icon-unreachable" : ""}`}
            >
              <BulbOutlined style={{ fontSize: 24 }} />
            </div>
          )}
          {device.isReachable === false && (
            <div className="device-control-unreachable-overlay">
              <div className="device-control-unreachable-slash" />
            </div>
          )}
        </div>
      </Col>

      {/* Device Name */}
      <Col flex="auto" className="device-control-name">
        {device.name}
      </Col>

      {/* Device Controls */}
      {hasControls && (
        <>
          {device.isOn != null && (
            <Col flex="none">
              <DeviceToggle
                isOn={device.isOn}
                isReachable={device.isReachable}
                onChange={onIsOnChange}
                loading={loading.isOn}
              />
            </Col>
          )}

          {device.lightLevel != null && (
            <Col flex="auto" className="device-control-slider">
              <LightLevelControl
                lightLevel={device.lightLevel}
                isReachable={device.isReachable}
                onChange={onLightLevelChange}
                loading={loading.lightLevel}
              />
            </Col>
          )}

          {device.volume != null && (
            <Col flex="auto" className="device-control-slider">
              <VolumeControl
                volume={device.volume}
                isReachable={device.isReachable}
                onChange={onVolumeChange}
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
        </>
      )}
    </Row>
  );
}
