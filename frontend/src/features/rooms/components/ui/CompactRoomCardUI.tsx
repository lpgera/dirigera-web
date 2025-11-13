import React from "react";
import { Card } from "@/components/ui";
import { Row, Col } from "@/components/ui/Grid";
import type { Device } from "@/graphql.types";
import "./CompactRoomCardUI.css";

interface CompactRoomCardUIProps {
  roomName: string;
  devices: Device[];
  renderScenes?: React.ReactNode;
  renderDeviceImage: (device: Device, onClick: () => void) => React.ReactNode;
  onDeviceClick: (device: Device) => void;
}

export function CompactRoomCardUI({
  roomName,
  devices,
  renderScenes,
  renderDeviceImage,
  onDeviceClick,
}: CompactRoomCardUIProps) {
  return (
    <Card title={roomName}>
      {/* Scene buttons section */}
      {renderScenes}

      {/* Device images section */}
      {devices.length > 0 && (
        <div className="compact-room-card-devices">
          <Row gutter={[8, 8]}>
            {devices.map((device) => (
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
    </Card>
  );
}
