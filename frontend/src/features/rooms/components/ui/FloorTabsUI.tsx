import { FloorNav } from "./FloorNav";
import { FloorSection } from "./FloorSection";

import type { Floor } from "@/hooks";

import "./FloorTabsUI.css";

interface FloorTabsUIProps {
  floors: Floor[];
  isDesktop: boolean;
  activeFloorId: string | null;
  onFloorClick: (floorId: string) => void;
  onFloorRefChange: (floorId: string, element: HTMLDivElement | null) => void;
  renderFloorContent: (floor: Floor) => React.ReactNode;
}

export function FloorTabsUI({
  floors,
  isDesktop,
  activeFloorId,
  onFloorClick,
  onFloorRefChange,
  renderFloorContent,
}: FloorTabsUIProps) {
  return (
    <div className="floor-tabs">
      <FloorNav
        floors={floors}
        activeFloorId={activeFloorId}
        onFloorClick={onFloorClick}
      />

      <div className="floor-tabs-content">
        {floors.map((floor) => (
          <FloorSection
            key={floor.id}
            floor={floor}
            totalFloors={floors.length}
            isActive={floor.id === activeFloorId}
            isDesktop={isDesktop}
            onRefChange={(el) => onFloorRefChange(floor.id, el)}
          >
            {renderFloorContent(floor)}
          </FloorSection>
        ))}
      </div>
    </div>
  );
}
