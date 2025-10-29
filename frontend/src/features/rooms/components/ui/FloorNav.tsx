import { Button } from "@/components/ui";
import { FloorIcon } from "@/components/ui/FloorIcon";
import type { Floor } from "@/hooks";

import "./FloorNav.css";

interface FloorNavProps {
  floors: Floor[];
  activeFloorId: string | null;
  onFloorClick: (floorId: string) => void;
}

export function FloorNav({
  floors,
  activeFloorId,
  onFloorClick,
}: FloorNavProps) {
  return (
    <nav className="floor-nav">
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
            size={32}
          />
          <span>{floor.name}</span>
        </Button>
      ))}
    </nav>
  );
}
