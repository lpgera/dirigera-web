import { Row, Col } from "@/components/ui/Grid";
import { PlaybackControl } from "./PlaybackControl";
import { PlayItemDisplay } from "./PlayItemDisplay";
import { SensorDisplay } from "./SensorDisplay";
import { DoorWindowStatus } from "./DoorWindowStatus";
import type { Device } from "@/graphql.types";
import type { ReactNode } from "react";
import "./DeviceControlUI.css";

export interface DeviceControlUIProps {
  device: Device;
  deviceImageSlot?: ReactNode;
  basicControlsSlot?: ReactNode;
  colorControlSlot?: ReactNode;
  onPlaybackPlayPause: () => void;
  onPlaybackPrevious: () => void;
  onPlaybackNext: () => void;
  loading: {
    playback: boolean;
  };
}
export function DeviceControlUI({
  device,
  deviceImageSlot,
  basicControlsSlot,
  colorControlSlot,
  onPlaybackPlayPause,
  onPlaybackPrevious,
  onPlaybackNext,
  loading,
}: DeviceControlUIProps) {
  const hasSensors =
    device.temperature != null ||
    device.humidity != null ||
    device.pm25 != null ||
    device.vocIndex != null;

  return (
    <div className="device-control">
      <Row align="middle" gutter={8} className="device-control-row">
        {/* Device Image or Icon */}
        {deviceImageSlot && <Col flex="none">{deviceImageSlot}</Col>}

        {/* Device Name */}
        <Col flex="auto" className="device-control-name">
          {device.name}
        </Col>
      </Row>

      {/* Basic Controls (isOn, lightLevel, volume, battery) */}
      {basicControlsSlot}

      {/* Color Control (temperature, hue/saturation) */}
      {colorControlSlot && (
        <Row gutter={8} className="device-control-row">
          <Col flex="auto">{colorControlSlot}</Col>
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
