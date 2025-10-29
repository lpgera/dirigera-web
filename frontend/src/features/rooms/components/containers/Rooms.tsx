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
import Scenes from "@/components/Scenes";
import type { ColumnSizes } from "../../types";

const columnSizes: ColumnSizes = {
  xs: 12,
  sm: 12,
  md: 8,
  lg: 8,
  xl: 6,
  xxl: 4,
};

export function Rooms() {
  const screens = useBreakpoint();
  const { rooms, loading, error } = useRooms();
  const { groupRoomsByFloor, hasFloors, floors } = useFloors();

  const groupedRooms = hasFloors ? groupRoomsByFloor(rooms) : null;
  const isDesktop = screens.md || screens.lg || screens.xl || screens.xxl;

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 97,
          zIndex: 50,
          backgroundColor: "var(--color-background)",
          boxSizing: "border-box",
        }}
      >
        <Scenes scope="house" />
      </div>

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
