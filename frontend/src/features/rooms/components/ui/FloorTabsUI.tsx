import { FloorNavUI, type FloorNavItem } from "./FloorNav";
import { FloorSectionUI } from "./FloorSection";

import "./FloorTabsUI.css";

export interface FloorData {
  id: string;
  name: string;
  order: number;
}

interface FloorTabsUIProps {
  floors: FloorData[];
  activeFloorId: string | null;
  iconSize?: number;
  onFloorClick?: (floorId: string) => void;
  onFloorRefChange?: (floorId: string, element: HTMLDivElement | null) => void;
  children: (floor: FloorData, index: number) => React.ReactNode;
}

/**
 * Pure presentational component for floor-based navigation and content.
 * Uses composition to render floor navigation and floor sections.
 * Each floor section's content is provided via the children render prop.
 */
export function FloorTabsUI({
  floors,
  activeFloorId,
  iconSize = 48,
  onFloorClick = () => {},
  onFloorRefChange,
  children,
}: FloorTabsUIProps) {
  return (
    <div className="floor-tabs">
      <FloorNavUI
        floors={floors}
        activeFloorId={activeFloorId}
        onFloorClick={onFloorClick}
        iconSize={32}
      />

      <div className="floor-tabs-content">
        {floors.map((floor, index) => (
          <FloorSectionUI
            key={floor.id}
            floorId={floor.id}
            floorName={floor.name}
            floorOrder={floor.order}
            totalFloors={floors.length}
            isActive={floor.id === activeFloorId}
            iconSize={iconSize}
            {...(onFloorRefChange && {
              onRefChange: (el) => onFloorRefChange(floor.id, el),
            })}
          >
            {children(floor, index)}
          </FloorSectionUI>
        ))}
      </div>
    </div>
  );
}
