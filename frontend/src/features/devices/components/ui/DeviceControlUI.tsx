import { Row, Col } from "@/components/ui/Grid";
import { DeviceImage } from "./DeviceImage";
import { DeviceToggle } from "./DeviceToggle";
import { LightLevelControl } from "./LightLevelControl";
import { VolumeControl } from "./VolumeControl";
import { BatteryIndicator } from "./BatteryIndicator";
import { ColorControl } from "./ColorControl";
import { PlaybackControl } from "./PlaybackControl";
import { PlayItemDisplay } from "./PlayItemDisplay";
import { SensorDisplay } from "./SensorDisplay";
import { DoorWindowStatus } from "./DoorWindowStatus";
import {
  useDeviceColorStore,
  useDeviceHue,
  useDeviceSaturation,
  useDeviceTemperature,
  useDeviceColor,
} from "@/features/devices/stores/deviceColorStore";
import { useEffect } from "react";
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
  // Use Zustand store for local color state
  const localHue = useDeviceHue(device.id);
  const localSaturation = useDeviceSaturation(device.id);
  const localTemperature = useDeviceTemperature(device.id);
  const deviceColor = useDeviceColor(device.id);
  console.log(device.name, device.lightLevel);

  const {
    syncDeviceColor,
    setDeviceHue,
    setDeviceSaturation,
    setDeviceTemperature,
  } = useDeviceColorStore();

  // Sync server state to local state when device props change
  useEffect(() => {
    syncDeviceColor(
      device.id,
      device.colorHue ?? undefined,
      device.colorSaturation ?? undefined,
      device.colorTemperature ?? undefined
    );
  }, [
    device.id,
    device.colorHue,
    device.colorSaturation,
    device.colorTemperature,
    syncDeviceColor,
  ]);

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
          <DeviceImage
            imagePath={imagePath}
            name={device.name}
            isOn={!!device.isOn}
            isReachable={device.isReachable}
            {...(device.lightLevel != null && {
              lightLevel: device.lightLevel,
            })}
            {...(deviceColor && { lightColor: deviceColor })}
          />
        </Col>

        {/* Device Name */}
        <Col flex="auto" className="device-control-name">
          {device.name}
        </Col>
      </Row>

      <Row gutter={8} className="device-control-row">
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
                  disabled={!device.isReachable || !device.isOn}
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
              disabled={!device.isReachable || !device.isOn}
              colorHue={localHue}
              colorSaturation={localSaturation}
              colorTemperature={localTemperature}
              isReachable={device.isReachable}
              onColorHueChange={(hue) => setDeviceHue(device.id, hue)}
              onColorSaturationChange={(sat) =>
                setDeviceSaturation(device.id, sat)
              }
              onColorTemperatureChange={(temp) =>
                setDeviceTemperature(device.id, temp)
              }
              onColorHueSaturationChangeComplete={
                device.colorHue != null && device.colorSaturation != null
                  ? onColorHueSaturationChange
                  : undefined
              }
              onColorTemperatureChangeComplete={
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
