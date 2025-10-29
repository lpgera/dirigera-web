import { FloorIcon } from "@/components/ui/FloorIcon";

import type { Floor } from "@/hooks";

import "./FloorSection.css";

interface FloorSectionProps {
  floor: Floor;
  totalFloors: number;
  isActive: boolean;
  isDesktop: boolean;
  onRefChange: (element: HTMLDivElement | null) => void;
  children: React.ReactNode;
}

export function FloorSection({
  floor,
  totalFloors,
  isActive,
  isDesktop,
  onRefChange,
  children,
}: FloorSectionProps) {
  return (
    <div
      ref={onRefChange}
      className={`floor-section ${isActive ? "floor-section-active" : ""}`}
      data-floor-id={floor.id}
    >
      <h2 className="floor-section-title">
        <FloorIcon
          totalFloors={totalFloors}
          floorOrder={floor.order}
          isActive={isActive}
          size={isDesktop ? 48 : 40}
        />
        {floor.name}
      </h2>
      {children}
    </div>
  );
}
