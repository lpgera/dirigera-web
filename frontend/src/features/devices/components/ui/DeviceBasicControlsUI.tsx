import type { ReactNode } from "react";
import { Row, Col } from "@/components/ui/Grid";

export interface DeviceBasicControlsUIProps {
  /** Slot for the toggle control (DeviceToggleContainer) */
  toggleSlot?: ReactNode;
  /** Slot for the light level control (LightLevelControlContainer) */
  lightLevelSlot?: ReactNode;
  /** Slot for the volume control (VolumeControlContainer) */
  volumeSlot?: ReactNode;
  /** Slot for the battery indicator (BatteryIndicatorContainer) */
  batterySlot?: ReactNode;
}

export function DeviceBasicControlsUI({
  toggleSlot,
  lightLevelSlot,
  volumeSlot,
  batterySlot,
}: DeviceBasicControlsUIProps) {
  const hasControls = toggleSlot || lightLevelSlot || volumeSlot || batterySlot;

  if (!hasControls) {
    return null;
  }

  return (
    <Row gutter={8} className="device-control-row">
      {toggleSlot && <Col flex="none">{toggleSlot}</Col>}

      {lightLevelSlot && (
        <Col flex="auto" className="device-control-slider">
          {lightLevelSlot}
        </Col>
      )}

      {volumeSlot && (
        <Col flex="auto" className="device-control-slider">
          {volumeSlot}
        </Col>
      )}

      {batterySlot && <Col flex="none">{batterySlot}</Col>}
    </Row>
  );
}
