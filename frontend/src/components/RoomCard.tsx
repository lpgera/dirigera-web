import React from "react";
import { Button, Card, Col, Divider, Row } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Scenes from "./Scenes";
import BatteryIcon from "./BatteryIcon";
import DeviceControl from "./DeviceControl";
import { Device } from "../graphql.types";

interface Room {
  id: string;
  name: string;
  devices: Device[];
}

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const navigate = useNavigate();

  const devicesWithoutBattery = room.devices.filter(
    (device) =>
      device.batteryPercentage === null ||
      device.batteryPercentage === undefined
  );

  const devicesWithBattery = room.devices.filter(
    (device) =>
      device.batteryPercentage !== null &&
      device.batteryPercentage !== undefined
  );

  return (
    <Card
      title={room.name}
      extra={
        <Button
          shape="circle"
          onClick={() => navigate(`room/${room.id}`)}
          icon={
            <InfoCircleOutlined
              style={{ fontSize: 32, color: "#1890ff", marginTop: 2 }}
            />
          }
          title="View room details"
        />
      }
    >
      {/* Room-level scenes */}
      <Scenes scope="room" scopeId={room.id} />

      {/* Device Controls Section */}
      {devicesWithoutBattery.length > 0 && (
        <Row gutter={[8, 16]} style={{ marginBottom: 16 }}>
          {devicesWithoutBattery.map((device, index) => (
            <Col key={device.id} span={24}>
              <DeviceControl device={device} />
              {index < devicesWithoutBattery.length - 1 && (
                <Divider style={{ margin: "4px 0" }} />
              )}
            </Col>
          ))}
        </Row>
      )}

      {/* Battery Status Section */}
      {devicesWithBattery.length > 0 && (
        <>
          <Divider />
          <Row>
            {devicesWithBattery.map((device) => (
              <Col key={device.id} style={{ marginRight: 8 }}>
                <BatteryIcon
                  batteryPercentage={device.batteryPercentage!}
                  name={device.name}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Card>
  );
};

export default RoomCard;
