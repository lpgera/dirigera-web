import React from "react";
import { RoomsGridUI } from "../ui/RoomsGridUI";
import { RoomCard } from "./RoomCard";
import type { Room } from "@/graphql.types";
import type { ColumnSizes } from "../../types";

interface RoomsGridProps {
  rooms: Room[];
  columnSizes: ColumnSizes;
}

export function RoomsGrid({ rooms, columnSizes }: RoomsGridProps) {
  const renderRoomCard = (room: Room) => <RoomCard room={room} />;

  return (
    <RoomsGridUI
      rooms={rooms}
      columnSizes={columnSizes}
      renderRoomCard={renderRoomCard}
    />
  );
}
