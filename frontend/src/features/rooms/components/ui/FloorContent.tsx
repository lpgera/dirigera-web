import { Row, Col } from "@/components/ui";
import { Scenes } from "@/features/scenes";
import { CompactRoomCard } from "../containers/CompactRoomCard";
import type { Device, Room } from "@/graphql.types";
import type { ColumnSizes } from "../../types";
import "./FloorContent.css";

interface FloorContentProps {
  floorId: string;
  rooms: Room[];
  columnSizes: ColumnSizes;
  onDeviceClick: (device: Device) => void;
}

/**
 * Pure presentational component for rendering floor content.
 * Displays floor-level scenes and a grid of room cards.
 */
export function FloorContent({
  floorId,
  rooms,
  columnSizes,
  onDeviceClick,
}: FloorContentProps) {
  return (
    <div className="floor-content">
      <Scenes scope="floor" scopeId={floorId} />

      <Row gutter={[16, 16]}>
        {rooms.map((room) => (
          <Col key={room.id} {...columnSizes}>
            <CompactRoomCard
              room={room}
              onDeviceClick={onDeviceClick}
              scenes={<Scenes scope="room" scopeId={room.id} />}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
