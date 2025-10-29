import React from "react";
import { Button, Card, Divider } from "@/components/ui";
import { InfoCircleOutlined } from "@ant-design/icons";
import type { Device } from "@/graphql.types";
import "./RoomCardUI.css";

interface RoomCardUIProps {
  roomName: string;
  devices: Device[];
  onNavigateToRoom: () => void;
  renderScenes?: React.ReactNode;
  renderDeviceControl: (device: Device) => React.ReactNode;
  renderBatteryIcon: (device: Device) => React.ReactNode;
}

export function RoomCardUI({
  roomName,
  devices,
  onNavigateToRoom,
  renderScenes,
  renderDeviceControl,
  renderBatteryIcon,
}: RoomCardUIProps) {
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
    <Card
      title={roomName}
      extra={
        <Button
          shape="circle"
          onClick={onNavigateToRoom}
          icon={
            <InfoCircleOutlined
              style={{ fontSize: 32, color: "#1890ff", marginTop: 2 }}
            />
          }
          title="View room details"
        />
      }
    >
      {renderScenes}

      {devicesWithoutBattery.length > 0 && (
        <div className="room-card-devices">
          {devicesWithoutBattery.map((device, index) => (
            <div key={device.id} className="room-card-device">
              {renderDeviceControl(device)}
              {index < devicesWithoutBattery.length - 1 && (
                <Divider style={{ margin: "4px 0" }} />
              )}
            </div>
          ))}
        </div>
      )}

      {devicesWithBattery.length > 0 && (
        <>
          <Divider />
          <div className="room-card-batteries">
            {devicesWithBattery.map((device) => (
              <div key={device.id} className="room-card-battery">
                {renderBatteryIcon(device)}
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
