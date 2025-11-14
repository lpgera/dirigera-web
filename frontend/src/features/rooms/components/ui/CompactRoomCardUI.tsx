import React from "react";
import { Card, Divider } from "@/components/ui";
import { Row, Col } from "@/components/ui/Grid";
import { DeviceImage, BatteryIndicator } from "@/features/devices";
import type { Device } from "@/graphql.types";
import type { ProcessedDevice } from "../../types";
import "./CompactRoomCardUI.css";

interface CompactRoomCardUIProps {
  roomName: string;
  devices: ProcessedDevice[];
  scenes?: React.ReactNode;
  onDeviceClick?: (device: Device) => void;
}

export function CompactRoomCardUI({
  roomName,
  devices,
  scenes,
  onDeviceClick,
}: CompactRoomCardUIProps) {
  const devicesWithoutBattery = devices.filter(
    (device) =>
      device.batteryPercentage === null ||
      device.batteryPercentage === undefined
  );

  const devicesWithBattery = devices.filter(
    (device) =>
      device.batteryPercentage !== null &&
      device.batteryPercentage !== undefined
  );

  return (
    <Card title={roomName}>
      {/* Scene buttons section */}
      {scenes}

      {/* Device images section */}
      {devicesWithoutBattery.length > 0 && (
        <div className="compact-room-card-devices">
          <Row gutter={[8, 8]}>
            {devicesWithoutBattery.map((device) => (
              <Col key={device.id} flex="none">
                <div
                  className="compact-room-card-device"
                  onClick={() => onDeviceClick?.(device)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onDeviceClick?.(device);
                    }
                  }}
                >
                  <DeviceImage
                    imagePath={device.imagePath}
                    name={device.name}
                    isOn={!!device.isOn}
                    isReachable={device.isReachable}
                    {...(device.lightLevel != null && {
                      lightLevel: device.lightLevel,
                    })}
                    {...(device.deviceColor && {
                      lightColor: device.deviceColor,
                    })}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Battery devices section */}
      {devicesWithBattery.length > 0 && (
        <>
          <Divider />
          <div className="compact-room-card-batteries">
            {devicesWithBattery.map((device) => (
              <div key={device.id} className="compact-room-card-battery">
                <BatteryIndicator
                  batteryPercentage={device.batteryPercentage!}
                  name={device.name}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
