import { useFloors } from "@/hooks";
import React, { useCallback, useEffect, useRef } from "react";
import FloorSectionUI from "../ui/FloorSectionUI";
import { Scenes } from "@/features/scenes";
import { useRooms } from "../../hooks/useRooms";
import { CompactRoomCard } from "./CompactRoomCard";
import { FloorPlan } from "./FloorPlan";
import { useFloorNavigationStore } from "../../stores/floorNavigationStore";

// Global ref registry for floor elements - used by FloorTabs for scroll tracking
const floorRefRegistry = new Map<string, HTMLDivElement>();

export function getFloorElement(floorId: string): HTMLDivElement | undefined {
  return floorRefRegistry.get(floorId);
}

export function registerFloorElement(
  floorId: string,
  el: HTMLDivElement | null
): void {
  if (el) {
    floorRefRegistry.set(floorId, el);
  } else {
    floorRefRegistry.delete(floorId);
  }
}

export { floorRefRegistry };

interface FloorSectionProps {
  floorId: string;
  floorIndex: number;
}

const FloorSection: React.FC<FloorSectionProps> = ({ floorId, floorIndex }) => {
  const { getFloorById, groupRoomsByFloor, totalFloorCount } = useFloors();
  const { rooms, loading, error } = useRooms();
  const activeFloorId = useFloorNavigationStore((s) => s.activeFloorId);

  const floorRooms = React.useMemo(() => {
    const grouped = groupRoomsByFloor(rooms);
    const floorGroup = grouped.get(floorId);
    return floorGroup ? floorGroup.rooms : [];
  }, [floorId, groupRoomsByFloor, rooms]);

  const floor = getFloorById(floorId);

  const handleRefChange = useCallback(
    (el: HTMLDivElement | null) => {
      registerFloorElement(floorId, el);
    },
    [floorId]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      floorRefRegistry.delete(floorId);
    };
  }, [floorId]);

  if (!floor) {
    return null; // Floor not found
  }

  const isActive = activeFloorId === floorId;

  if (!floor) {
    return null; // Floor not found
  }

  const renderedRooms = floorRooms.map(
    (room) => (defaultCollapsed: boolean) => (
      <CompactRoomCard
        room={room as unknown as any}
        scenes={<Scenes scope="room" scopeId={room.id} />}
        defaultCollapsed={defaultCollapsed}
      />
    )
  );
  return (
    <FloorSectionUI
      key={floor.id}
      floorId={floor.id}
      floorName={floor.name}
      floorOrder={floor.order}
      totalFloors={totalFloorCount}
      isActive={isActive}
      iconSize={48}
      scenes={<Scenes scope="floor" scopeId={floor.id} wrapScenes={false} />}
      floorPlan={<FloorPlan floorId={floor.id} scale={0.8} />}
      rooms={renderedRooms}
      onRefChange={handleRefChange}
    />
  );
};

export default FloorSection;
