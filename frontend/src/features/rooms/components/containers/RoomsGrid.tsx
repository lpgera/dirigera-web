import React from "react";
import { Row, Col } from "@/components/ui";
import { RoomCard } from "./RoomCard";
import { CompactRoomCard } from "./CompactRoomCard";
import type { Room, Device } from "@/graphql.types";
import type { ColumnSizes } from "../../types";

interface RoomsGridProps {
  rooms: Room[];
  columnSizes: ColumnSizes;
}

export function RoomsGrid({ rooms, columnSizes }: RoomsGridProps) {
  const handleDeviceClick = (device: Device) => {
    console.log("Device clicked:", device.name);
  };

  return (
    <Row gutter={[16, 16]}>
      {rooms.map((room) => (
        <React.Fragment key={room.id}>
          <Col {...columnSizes}>
            <div style={{ marginBottom: 8, fontSize: 12, color: "#888" }}>
              Standard RoomCard
            </div>
            <RoomCard room={room} />
          </Col>
          <Col {...columnSizes}>
            <div style={{ marginBottom: 8, fontSize: 12, color: "#888" }}>
              Compact RoomCard
            </div>
            <CompactRoomCard room={room} onDeviceClick={handleDeviceClick} />
          </Col>
        </React.Fragment>
      ))}
    </Row>
  );
}
