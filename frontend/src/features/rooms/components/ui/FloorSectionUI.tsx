import React from "react";
import { FloorIcon } from "@/components/ui/FloorIcon";

import "./FloorSectionUI.css";

interface FloorSectionUIProps {
  floorId: string;
  floorName: string;
  floorOrder: number;
  totalFloors: number;
  isActive?: boolean;
  iconSize?: number;
  onRefChange?: (element: HTMLDivElement | null) => void;
  scenes: React.ReactNode;
  floorPlan?: React.ReactNode;
  rooms: React.ReactNode[];
}

/**
 * Pure presentational component for displaying a floor section.
 * Contains a header with floor icon and name, plus content area for rooms.
 */
export function FloorSectionUI({
  floorId,
  floorName,
  floorOrder,
  totalFloors,
  isActive = false,
  iconSize = 48,
  onRefChange,
  scenes,
  floorPlan,
  rooms,
}: FloorSectionUIProps) {
  return (
    <div
      ref={onRefChange}
      className={`floor-section ${isActive ? "floor-section-active" : ""}`}
      data-floor-id={floorId}
    >
      <h2 className="floor-section-title">
        <FloorIcon
          totalFloors={totalFloors}
          floorOrder={floorOrder}
          isActive={isActive}
          size={iconSize}
        />
        {floorName}
      </h2>

      {scenes}
      {floorPlan}
      {rooms}
    </div>
  );
}

// Export both names for backward compatibility during migration
export default FloorSectionUI;
