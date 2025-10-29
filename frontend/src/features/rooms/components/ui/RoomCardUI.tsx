import React from "react";
import { Button, Card, Col, Divider, Row } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import type { Device } from "@/graphql.types";

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
        <Row gutter={[8, 16]} style={{ marginBottom: 16 }}>
          {devicesWithoutBattery.map((device, index) => (
            <Col key={device.id} span={24}>
              {renderDeviceControl(device)}
              {index < devicesWithoutBattery.length - 1 && (
                <Divider style={{ margin: "4px 0" }} />
              )}
            </Col>
          ))}
        </Row>
      )}

      {devicesWithBattery.length > 0 && (
        <>
          <Divider />
          <Row>
            {devicesWithBattery.map((device) => (
              <Col key={device.id} style={{ marginRight: 8 }}>
                {renderBatteryIcon(device)}
              </Col>
            ))}
          </Row>
        </>
      )}
    </Card>
  );
}
