import React, { useCallback, useEffect } from "react";
import { useFloors } from "@/hooks";
import FloorSectionUI from "../ui/FloorSectionUI";
import { Scenes, OrphanedScenes } from "@/features/scenes";
import { useRooms } from "../../hooks/useRooms";
import { CompactRoomCard } from "./CompactRoomCard";
import { useFloorNavigationStore } from "../../stores/floorNavigationStore";
import { registerFloorElement, floorRefRegistry } from "./FloorSection";

export const ORPHANED_SECTION_ID = "orphaned";

interface OrphanedSectionProps {
  floorIndex: number;
}

/**
 * Section for rooms and scenes that are not assigned to any floor.
 */
const OrphanedSection: React.FC<OrphanedSectionProps> = ({ floorIndex }) => {
  const { groupRoomsByFloor, totalFloorCount } = useFloors();
  const { rooms } = useRooms();
  const activeFloorId = useFloorNavigationStore((s) => s.activeFloorId);

  const orphanedRooms = React.useMemo(() => {
    const grouped = groupRoomsByFloor(rooms);
    const unassigned = grouped.get("unassigned");
    return unassigned ? unassigned.rooms : [];
  }, [groupRoomsByFloor, rooms]);

  const handleRefChange = useCallback((el: HTMLDivElement | null) => {
    registerFloorElement(ORPHANED_SECTION_ID, el);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      floorRefRegistry.delete(ORPHANED_SECTION_ID);
    };
  }, []);

  // Don't render if there are no orphaned rooms
  if (orphanedRooms.length === 0) {
    return null;
  }

  const isActive = activeFloorId === ORPHANED_SECTION_ID;

  const renderedRooms = orphanedRooms.map(
    (room) => (defaultCollapsed: boolean) => (
      <CompactRoomCard
        key={room.id}
        room={room as unknown as any}
        scenes={<Scenes scope="room" scopeId={room.id} />}
        defaultCollapsed={defaultCollapsed}
      />
    )
  );

  return (
    <FloorSectionUI
      floorId={ORPHANED_SECTION_ID}
      floorName="Other"
      floorOrder={-1}
      totalFloors={totalFloorCount + 1}
      isActive={isActive}
      iconSize={48}
      scenes={<OrphanedScenes wrapScenes={false} />}
      rooms={renderedRooms}
      onRefChange={handleRefChange}
    />
  );
};

export default OrphanedSection;
