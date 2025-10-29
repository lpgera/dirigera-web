import React from "react";
import { Grid } from "antd";
import { FloorTabsUI } from "../ui/FloorTabsUI";
import { useFloors } from "@/hooks";
import type { Room } from "@/graphql.types";
import type { ColumnSizes } from "../../types";

const { useBreakpoint } = Grid;

interface FloorTabsProps {
  rooms: Room[];
  columnSizes: ColumnSizes;
}

export function FloorTabs({ rooms, columnSizes }: FloorTabsProps) {
  const screens = useBreakpoint();
  const { groupRoomsByFloor, floors } = useFloors();

  const groupedRooms = groupRoomsByFloor(rooms);
  const isDesktop = screens.md || screens.lg || screens.xl || screens.xxl;

  return (
    <FloorTabsUI
      groupedRooms={groupedRooms}
      floors={floors}
      isDesktop={!!isDesktop}
      columnSizes={columnSizes}
    />
  );
}
