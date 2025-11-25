import React from "react";
import {
  Card,
  Col,
  Row,
  Skeleton,
  Result,
  useBreakpoint,
} from "@/components/ui";
import { useRooms } from "../../hooks/useRooms";
import { useFloors } from "@/hooks";
import { RoomsGrid } from "./RoomsGrid";
import { FloorTabs } from "./FloorTabs";
import type { ColumnSizes } from "../../types";

const columnSizes: ColumnSizes = {
  xs: 24, // 100% width (1 card per row on mobile)
  sm: 24, // 100% width (1 card per row on small tablets)
  md: 24, // 100% width (1 card per row on medium screens)
  lg: 12, // 50% width (2 cards per row on large screens)
  xl: 8, // 50% width (2 cards per row on extra large)
  xxl: 6, // 50% width (2 cards per row on extra extra large)
};

export function Rooms() {
  const screens = useBreakpoint();
  const { rooms, loading, error } = useRooms();
  const { groupRoomsByFloor, hasFloors, floors } = useFloors();

  const groupedRooms = hasFloors ? groupRoomsByFloor(rooms) : null;
  const isDesktop = screens.md || screens.lg || screens.xl || screens.xxl;

  return (
    <>
      {loading && !rooms.length ? (
        <Row gutter={[16, 16]}>
          <Col key="loading" {...columnSizes}>
            <Card>
              <Skeleton active={true} />
            </Card>
          </Col>
        </Row>
      ) : error ? (
        <Result status="error" title="Error" subTitle={error.message} />
      ) : groupedRooms && floors && floors.length > 0 ? (
        <FloorTabs rooms={rooms} columnSizes={columnSizes} />
      ) : (
        <RoomsGrid rooms={rooms} columnSizes={columnSizes} />
      )}
    </>
  );
}

export default Rooms;
