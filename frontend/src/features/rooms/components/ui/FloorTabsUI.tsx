import { Scenes } from "@/features/scenes";
import { FloorNavUI, type FloorNavItem } from "./FloorNav";
import FloorSectionUI from "./FloorSectionUI";

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
  children: React.ReactNode;
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
      >
        <Scenes scope="house" />
      </FloorNavUI>
      <div className="floor-tabs-content">{children}</div>
    </div>
  );
}
