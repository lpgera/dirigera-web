import React from "react";
import { Card, Divider } from "@/components/ui";
import { Row, Col } from "@/components/ui/Grid";
import { BatteryIndicator } from "@/features/devices";
import { CompactDeviceControl } from "./CompactDeviceControl";
import type { Device } from "@/graphql.types";
import "./CompactRoomCardUI.css";

interface CompactRoomCardUIProps {
  roomName: string;
  devices: Device[];
  scenes?: React.ReactNode;
  onDeviceClick?: (device: Device) => void;
  getDeviceImage?: (deviceId: string) => string | undefined;
  defaultCollapsed?: boolean;
}

export function CompactRoomCardUI({
  roomName,
  devices,
  scenes,
  onDeviceClick,
  defaultCollapsed = false,
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
    <Card title={roomName} collapsible defaultCollapsed={defaultCollapsed}>
      {/* Scene buttons section */}
      {scenes}

      {/* Device controls section */}
      {devicesWithoutBattery.length > 0 && (
        <div className="compact-room-card-devices">
          {devicesWithoutBattery.map((device) => (
            <div
              key={device.id}
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
              <CompactDeviceControl device={device} />
            </div>
          ))}
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
