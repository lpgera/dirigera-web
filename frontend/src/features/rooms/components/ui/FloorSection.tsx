import { FloorIcon } from "@/components/ui/FloorIcon";

import "./FloorSection.css";

interface FloorSectionUIProps {
  floorId: string;
  floorName: string;
  floorOrder: number;
  totalFloors: number;
  isActive?: boolean;
  iconSize?: number;
  onRefChange?: (element: HTMLDivElement | null) => void;
  children: React.ReactNode;
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
  children,
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
      {children}
    </div>
  );
}

// Export both names for backward compatibility during migration
export { FloorSectionUI as FloorSection };
