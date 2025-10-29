import React from "react";
import { Row, Col } from "@/components/ui";
import type { Room } from "@/graphql.types";
import type { ColumnSizes } from "../../types";

interface RoomsGridUIProps {
  rooms: Room[];
  columnSizes: ColumnSizes;
  renderRoomCard: (room: Room) => React.ReactNode;
}

export function RoomsGridUI({
  rooms,
  columnSizes,
  renderRoomCard,
}: RoomsGridUIProps) {
  return (
    <Row gutter={[16, 16]}>
      {rooms.map((room) => (
        <Col key={room.id} {...columnSizes}>
          {renderRoomCard(room)}
        </Col>
      ))}
    </Row>
  );
}
