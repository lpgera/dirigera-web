import React from "react";
import { Card, Divider } from "@/components/ui";
import { Row, Col } from "@/components/ui/Grid";
import type { Device } from "@/graphql.types";
import "./CompactRoomCardUI.css";

interface CompactRoomCardUIProps {
  roomName: string;
  devices: Device[];
  renderScenes?: React.ReactNode;
  renderDeviceImage: (device: Device, onClick: () => void) => React.ReactNode;
  renderBatteryIcon: (device: Device) => React.ReactNode;
  onDeviceClick: (device: Device) => void;
}

export function CompactRoomCardUI({
  roomName,
  devices,
  renderScenes,
  renderDeviceImage,
  renderBatteryIcon,
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
      {renderScenes}

      {/* Device images section */}
      {devicesWithoutBattery.length > 0 && (
        <div className="compact-room-card-devices">
          <Row gutter={[8, 8]}>
            {devicesWithoutBattery.map((device) => (
              <Col key={device.id} flex="none">
                <div
                  className="compact-room-card-device"
                  onClick={() => onDeviceClick(device)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onDeviceClick(device);
                    }
                  }}
                >
                  {renderDeviceImage(device, () => onDeviceClick(device))}
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
                {renderBatteryIcon(device)}
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
