import { useFloors } from "@/hooks";
import React from "react";
import FloorSectionUI from "../ui/FloorSectionUI";
import { Scenes } from "@/features/scenes";
import { useRooms } from "../../hooks/useRooms";
import { CompactRoomCard } from "./CompactRoomCard";
import { FloorPlan } from "./FloorPlan";

interface FloorSectionProps {
  floorId: string;
  floorIndex: number;
}
const FloorSection: React.FC<FloorSectionProps> = ({ floorId, floorIndex }) => {
  const { getFloorById, groupRoomsByFloor, totalFloorCount } = useFloors();
  const { rooms, loading, error } = useRooms();

  const floorRooms = React.useMemo(() => {
    const grouped = groupRoomsByFloor(rooms);
    const floorGroup = grouped.get(floorId);
    return floorGroup ? floorGroup.rooms : [];
  }, [floorId, groupRoomsByFloor, rooms]);

  const floor = getFloorById(floorId);

  if (!floor) {
    return null; // Floor not found
  }

  const renderedRooms = floorRooms.map((room) => (
    <CompactRoomCard
      room={room as unknown as any}
      scenes={<Scenes scope="room" scopeId={room.id} />}
    />
  ));
  return (
    <FloorSectionUI
      key={floor.id}
      floorId={floor.id}
      floorName={floor.name}
      floorOrder={floor.order}
      totalFloors={totalFloorCount}
      isActive={true}
      iconSize={48}
      scenes={<Scenes scope="floor" scopeId={floor.id} />}
      floorPlan={<FloorPlan floorId={floor.id} scale={0.8} />}
      rooms={renderedRooms}
    />
  );
};

export default FloorSection;
