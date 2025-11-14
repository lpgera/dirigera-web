import { Button } from "@/components/ui";
import { FloorIcon } from "@/components/ui/FloorIcon";

import "./FloorNav.css";

export interface FloorNavItem {
  id: string;
  name: string;
  order: number;
}

interface FloorNavUIProps {
  floors: FloorNavItem[];
  activeFloorId: string | null;
  iconSize?: number;
  onFloorClick?: (floorId: string) => void;
  children?: React.ReactNode;
}

/**
 * Pure presentational component for floor navigation.
 * Renders a vertical list of floor navigation buttons.
 */
export function FloorNavUI({
  floors,
  activeFloorId,
  iconSize = 32,
  onFloorClick = () => {},
  children,
}: FloorNavUIProps) {
  return (
    <nav className="floor-nav">
      {children}
      {floors.map((floor) => (
        <Button
          key={floor.id}
          variant={floor.id === activeFloorId ? "default" : "text"}
          onClick={() => onFloorClick(floor.id)}
          block
          className="floor-nav-button"
        >
          <FloorIcon
            totalFloors={floors.length}
            floorOrder={floor.order}
            isActive={floor.id === activeFloorId}
            size={iconSize}
          />
          <span>{floor.name}</span>
        </Button>
      ))}
    </nav>
  );
}

// Export both names for backward compatibility during migration
export { FloorNavUI as FloorNav };
