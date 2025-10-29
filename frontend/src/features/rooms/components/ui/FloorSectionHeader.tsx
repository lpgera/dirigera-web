import { FloorIcon } from "@/components/ui/FloorIcon";
import type { Floor } from "@/hooks";

import "./FloorSectionHeader.css";

interface FloorSectionHeaderProps {
  floor: Floor;
  isActive: boolean;
  size?: number;
  totalFloors: number;
}

export function FloorSectionHeader({
  floor,
  isActive,
  size = 48,
  totalFloors,
}: FloorSectionHeaderProps) {
  return (
    <h2 className="floor-section-header">
      <FloorIcon
        totalFloors={totalFloors}
        floorOrder={floor.order}
        isActive={isActive}
        size={size}
      />
      {floor.name}
    </h2>
  );
}
