import { BulbOutlined } from "@ant-design/icons";
import { Row, Col } from "@/components/ui/Grid";
import { DeviceToggle } from "./DeviceToggle";
import { LightLevelControl } from "./LightLevelControl";
import { VolumeControl } from "./VolumeControl";
import { BatteryIndicator } from "./BatteryIndicator";
import { ColorControl } from "./ColorControl";
import { PlaybackControl } from "./PlaybackControl";
import { PlayItemDisplay } from "./PlayItemDisplay";
import { SensorDisplay } from "./SensorDisplay";
import { DoorWindowStatus } from "./DoorWindowStatus";
import type { Device } from "@/graphql.types";
import "./DeviceControlUI.css";

export interface DeviceControlUIProps {
  device: Device;
  imagePath: string | undefined;
  onIsOnChange: (isOn: boolean) => void;
  onLightLevelChange: (lightLevel: number) => void;
  onVolumeChange: (volume: number) => void;
  onColorTemperatureChange: (colorTemperature: number) => void;
  onColorHueSaturationChange: (
    colorHue: number,
    colorSaturation: number
  ) => void;
  onPlaybackPlayPause: () => void;
  onPlaybackPrevious: () => void;
  onPlaybackNext: () => void;
  loading: {
    isOn: boolean;
    lightLevel: boolean;
    volume: boolean;
    colorTemperature: boolean;
    colorHueSaturation: boolean;
    playback: boolean;
  };
}

export function DeviceControlUI({
  device,
  imagePath,
  onIsOnChange,
  onLightLevelChange,
  onVolumeChange,
  onColorTemperatureChange,
  onColorHueSaturationChange,
  onPlaybackPlayPause,
  onPlaybackPrevious,
  onPlaybackNext,
  loading,
}: DeviceControlUIProps) {
  const hasControls =
    device.isOn != null ||
    device.lightLevel != null ||
    device.volume != null ||
    device.colorTemperature != null ||
    (device.colorHue != null && device.colorSaturation != null) ||
    device.playback != null;

  const hasSensors =
    device.temperature != null ||
    device.humidity != null ||
    device.pm25 != null ||
    device.vocIndex != null;

  return (
    <div className="device-control">
      <Row align="middle" gutter={8} className="device-control-row">
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

      {/* Color Control (combines Temperature and Hue/Saturation) */}
      {(device.colorTemperature != null ||
        (device.colorHue != null && device.colorSaturation != null)) && (
        <Row gutter={8} className="device-control-row">
          <Col flex="auto">
            <ColorControl
              colorHue={device.colorHue ?? undefined}
              colorSaturation={device.colorSaturation ?? undefined}
              colorTemperature={device.colorTemperature ?? undefined}
              isReachable={device.isReachable}
              onColorHueSaturationChange={
                device.colorHue != null && device.colorSaturation != null
                  ? onColorHueSaturationChange
                  : undefined
              }
              onColorTemperatureChange={
                device.colorTemperature != null
                  ? onColorTemperatureChange
                  : undefined
              }
              loading={loading.colorTemperature || loading.colorHueSaturation}
            />
          </Col>
        </Row>
      )}

      {/* Playback Control */}
      {device.playback != null && (
        <Row gutter={8} className="device-control-row">
          <Col
            flex="auto"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <PlaybackControl
              playback={device.playback}
              playbackNextAvailable={device.playbackNextAvailable}
              playbackPreviousAvailable={device.playbackPreviousAvailable}
              isReachable={device.isReachable}
              onPlayPause={onPlaybackPlayPause}
              onPrevious={onPlaybackPrevious}
              onNext={onPlaybackNext}
              loading={loading.playback}
            />
          </Col>
        </Row>
      )}

      {/* Play Item Display */}
      {(device.playItem != null || device.nextPlayItem != null) && (
        <Row gutter={8} className="device-control-row">
          <Col flex="auto">
            <PlayItemDisplay
              playItem={device.playItem}
              nextPlayItem={device.nextPlayItem}
            />
          </Col>
        </Row>
      )}

      {/* Door/Window Status */}
      {device.isOpen != null && (
        <Row gutter={8} className="device-control-row">
          <Col flex="auto">
            <DoorWindowStatus isOpen={device.isOpen} label="Status" />
          </Col>
        </Row>
      )}

      {/* Sensor Display */}
      {hasSensors && (
        <Row gutter={8} className="device-control-row">
          <Col flex="auto">
            <SensorDisplay
              temperature={device.temperature}
              humidity={device.humidity}
              pm25={device.pm25}
              vocIndex={device.vocIndex}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}
