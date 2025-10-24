import React from "react";
import { Card, Col, Grid, Result, Row, Skeleton } from "antd";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { RoomsQuery } from "./Rooms.types.gen";
import Scenes from "./Scenes";
import { useRefetch } from "../useRefetch";
import { useFloors } from "../useFloors";
import FloorTabs from "./FloorTabs";
import RoomsGrid from "./RoomsGrid";

const { useBreakpoint } = Grid;

const columnSizes = {
  xs: 12,
  sm: 12,
  md: 8,
  lg: 8,
  xl: 6,
  xxl: 4,
};

export const ROOMS_QUERY = gql`
  query Rooms {
    rooms {
      id
      name
      quickControls {
        id
        name
        isReachable
        isOn
        playback
        type
      }
      devices {
        id
        name
        type
        isReachable
        batteryPercentage
        isOn
        lightLevel
        colorTemperature
        colorHue
        colorSaturation
      }
    }
  }
`;

const Rooms = () => {
  const screens = useBreakpoint();
  const { data, refetch, error } = useQuery<RoomsQuery>(ROOMS_QUERY);

  useRefetch(refetch);

  const { groupRoomsByFloor, hasFloors, floors } = useFloors();

  const rooms = data?.rooms ?? [];
  const groupedRooms = hasFloors ? groupRoomsByFloor(rooms) : null;

  // Determine if we should use side tabs (desktop) or top tabs (mobile)
  const isDesktop = screens.md || screens.lg || screens.xl || screens.xxl;

  return (
    <>
      {/* House-level scenes - sticky */}
      <div
        style={{
          position: "sticky",
          top: 97,
          zIndex: 50,
          backgroundColor: "rgb(30 30 30)",
          boxSizing: "border-box",
        }}
      >
        <Scenes scope="house" />
      </div>

      {!data ? (
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
        <FloorTabs
          groupedRooms={groupedRooms}
          floors={floors}
          isDesktop={!!isDesktop}
          columnSizes={columnSizes}
        />
      ) : (
        <RoomsGrid rooms={rooms} columnSizes={columnSizes} />
      )}
    </>
  );
};

export default Rooms;
